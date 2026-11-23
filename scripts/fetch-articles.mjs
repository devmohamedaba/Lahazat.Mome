// scripts/fetch-articles.mjs  (runs automatically before `vite build`)
// Pulls published articles from Google Sheets (through Apps Script) and writes public/articles.json.
// The public site reads that static file, so visitors never hit Google's quotas.
//
// This script NEVER fails the deployment. If Google cannot be reached (or is misconfigured), it:
//   1) retries a few times,
//   2) falls back to the articles.json that the LIVE site is currently serving, so no article disappears,
//   3) otherwise continues with an empty list and prints a clear message explaining what to fix.
//
// Test locally without Google:  CMS_ARTICLES_FILE=./sample-articles.json npm run build

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { toPublicArticle } from '../shared/articleSchema.js'

const OUT = path.resolve('public/articles.json')
const GAS_PREFIX = 'https://script.google.com/macros/s/'
const ATTEMPTS = 3

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function write(articles, note = '') {
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), articles }))
  console.log(`[cms] public/articles.json written with ${articles.length} article(s)${note}`)
}

// Hints for errors that retrying cannot fix: they are setup mistakes on the Google side.
function hintFor(error) {
  if (/Missing Script Property/i.test(error)) {
    return 'Open Apps Script > Project Settings > Script Properties and add SHEET_ID and API_SECRET (API_SECRET must equal GAS_SECRET in Vercel).'
  }
  if (/Unauthorized/i.test(error)) return 'GAS_SECRET in Vercel does not match API_SECRET in Apps Script.'
  if (/Sheet "?Articles"? not found/i.test(error)) return 'Run the setupCMS function once in Apps Script.'
  if (/Unknown action/i.test(error)) return 'The deployed Apps Script is an old version: Deploy > Manage deployments > Edit > New version.'
  return ''
}

async function readLiveSnapshot() {
  let base = process.env.CMS_SNAPSHOT_URL
  if (!base) {
    const { default: siteConfig } = await import(pathToFileURL(path.resolve('src/config/siteConfig.js')))
    base = `${siteConfig.company.website.replace(/\/$/, '')}/articles.json`
  }

  try {
    const response = await fetch(base, { signal: AbortSignal.timeout(15000) })
    if (!response.ok) return null
    const data = await response.json() // the SPA fallback returns HTML here, which throws and is ignored
    return Array.isArray(data.articles) ? data.articles.map(toPublicArticle) : null
  } catch {
    return null
  }
}

async function giveUp(message) {
  console.warn(`[cms] WARNING: ${message}`)
  const hint = hintFor(message)
  if (hint) console.warn(`[cms] FIX: ${hint}`)

  const live = await readLiveSnapshot()
  if (live) return write(live, ' (kept from the currently live site)')

  console.warn('[cms] No live snapshot available — building without CMS articles. The deployment is NOT blocked.')
  write([])
}

async function requestArticles(url, secret) {
  let lastError = ''
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ secret, action: 'list', scope: 'public' }),
        signal: AbortSignal.timeout(60000),
      })
      const data = await response.json()

      if (data && data.success && Array.isArray(data.articles)) return { articles: data.articles }

      lastError = `Apps Script returned an error (${data && data.error ? data.error : 'unknown'})`
      if (hintFor(lastError)) break // configuration problem: retrying will not help
    } catch (error) {
      lastError = `Could not reach Apps Script (${error.message})`
    }
    if (attempt < ATTEMPTS) await sleep(attempt * 2000)
  }
  return { error: lastError }
}

async function main() {
  if (process.env.CMS_ARTICLES_FILE) {
    const rows = JSON.parse(fs.readFileSync(process.env.CMS_ARTICLES_FILE, 'utf8'))
    return write(rows.map(toPublicArticle))
  }

  const url = process.env.GAS_URL
  const secret = process.env.GAS_SECRET

  if (!url || !secret) {
    console.warn('[cms] GAS_URL / GAS_SECRET not set — CMS articles skipped.')
    return write([])
  }
  if (!url.startsWith(GAS_PREFIX)) return giveUp(`GAS_URL must start with ${GAS_PREFIX}`)

  const result = await requestArticles(url, secret)
  if (result.error) return giveUp(result.error)

  const valid = result.articles.filter((a) => a.slug && a.title_ar && a.content_ar)
  return write(valid.map(toPublicArticle))
}

main().catch((error) => giveUp(`Unexpected error (${error.message})`))
