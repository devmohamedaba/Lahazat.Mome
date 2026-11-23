// scripts/fetch-articles.mjs  (runs automatically before `vite build`)
// Pulls published articles from Google Sheets (through Apps Script) and writes public/articles.json.
// The public site reads that static file, so visitors never hit Google's quotas.
//
// Test locally without Google:  CMS_ARTICLES_FILE=./sample-articles.json npm run build

import fs from 'node:fs'
import path from 'node:path'
import { toPublicArticle } from '../shared/articleSchema.js'

const OUT = path.resolve('public/articles.json')
const GAS_PREFIX = 'https://script.google.com/macros/s/'
const onVercel = Boolean(process.env.VERCEL)

function write(articles) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), articles }))
  console.log(`[cms] public/articles.json written with ${articles.length} article(s)`)
}

function fail(message) {
  if (onVercel) {
    // Fail the deployment so the previous (good) version stays live instead of publishing a site without articles.
    console.error(`[cms] ERROR: ${message}`)
    process.exit(1)
  }
  console.warn(`[cms] WARNING: ${message} — continuing with an empty list (local build).`)
  write([])
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
  if (!url.startsWith(GAS_PREFIX)) return fail('GAS_URL must start with ' + GAS_PREFIX)

  let data
  try {
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ secret, action: 'list', scope: 'public' }),
      signal: AbortSignal.timeout(60000),
    })
    data = await response.json()
  } catch (error) {
    return fail(`Could not reach Apps Script (${error.message})`)
  }

  if (!data || !data.success || !Array.isArray(data.articles)) {
    return fail(`Apps Script returned an error (${data && data.error ? data.error : 'unknown'})`)
  }

  const valid = data.articles.filter((a) => a.slug && a.title_ar && a.content_ar)
  write(valid.map(toPublicArticle))
}

main()
