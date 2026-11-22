// scripts/prerender-articles.mjs  (runs automatically after `vite build`)
// For every article (CMS + legacy i18n ones) it writes dist/resources/<slug>/index.html with:
//   - real <title>, description, canonical, Open Graph, Twitter, JSON-LD (Article + Breadcrumb) in <head>
//   - the full article HTML inside #root, so crawlers that don't run JavaScript still read the content
// It also appends all article URLs to dist/sitemap.xml.
// Tags carry data-rh="true" so react-helmet-async replaces them (no duplicates) once React starts.

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { sanitizeArticleHtml, htmlToText } from '../shared/articleSchema.js'

const DIST = path.resolve('dist')
const SRC = path.resolve('src')
const DEFAULT_IMAGE = '/images/seo-cover.jpg'

const { default: siteConfig } = await import(pathToFileURL(path.join(SRC, 'config/siteConfig.js')))
const { default: registry } = await import(pathToFileURL(path.join(SRC, 'data/articlesRegistry.js')))
const SITE = siteConfig.company.website.replace(/\/$/, '')

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c')
const absolute = (url) => (/^https?:\/\//.test(url) ? url : `${SITE}${url || DEFAULT_IMAGE}`)

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

// ---------- Collect articles (Arabic is the default language, so the static page is Arabic) ----------

function blocksToHtml(blocks) {
  return (Array.isArray(blocks) ? blocks : [])
    .map((b) => {
      if (b.type === 'heading') return `<h2>${esc(b.value)}</h2>`
      if (b.type === 'list') return `<ul>${(b.items || []).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
      return `<p>${esc(b.value)}</p>`
    })
    .join('')
}

function legacyArticles() {
  const ar = readJson(path.join(SRC, 'i18n/locales/ar/resources.json'), {})
  return registry
    .map((entry) => {
      const a = ar.articles && ar.articles[entry.translationKey]
      if (!a) return null
      return {
        slug: entry.slug,
        title: a.title,
        description: a.excerpt,
        author: a.author,
        category: a.category,
        image: entry.image,
        imageAlt: a.title,
        html: blocksToHtml(a.content),
        published: entry.publishedAt,
        modified: entry.publishedAt,
      }
    })
    .filter(Boolean)
}

function cmsArticles() {
  const data = readJson(path.join(DIST, 'articles.json'), { articles: [] })
  return (data.articles || []).map((a) => ({
    slug: a.slug,
    title: a.seo_title_ar || a.title_ar,
    heading: a.title_ar,
    description: a.seo_description_ar || a.excerpt_ar,
    author: a.author,
    category: a.category_ar,
    image: a.image,
    imageAlt: a.image_alt_ar || a.title_ar,
    html: sanitizeArticleHtml(a.content_ar),
    published: a.published_at,
    modified: a.updated_at || a.published_at,
  }))
}

const bySlug = new Map()
for (const a of [...legacyArticles(), ...cmsArticles()]) bySlug.set(a.slug, a) // CMS overrides legacy
const articles = [...bySlug.values()]

// ---------- Build pages ----------

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')

function render(a) {
  const url = `${SITE}/resources/${a.slug}`
  const title = `${a.title} | ${siteConfig.company.name}`
  const image = absolute(a.image)
  const description = a.description || htmlToText(a.html).slice(0, 160)

  const head = [
    `<meta name="description" content="${esc(description)}" data-rh="true" />`,
    `<link rel="canonical" href="${esc(url)}" data-rh="true" />`,
    `<meta name="robots" content="index,follow,max-image-preview:large" data-rh="true" />`,
    `<meta property="og:type" content="article" data-rh="true" />`,
    `<meta property="og:title" content="${esc(a.title)}" data-rh="true" />`,
    `<meta property="og:description" content="${esc(description)}" data-rh="true" />`,
    `<meta property="og:url" content="${esc(url)}" data-rh="true" />`,
    `<meta property="og:image" content="${esc(image)}" data-rh="true" />`,
    `<meta property="og:locale" content="ar_EG" data-rh="true" />`,
    `<meta property="og:site_name" content="${esc(siteConfig.company.name)}" data-rh="true" />`,
    a.published ? `<meta property="article:published_time" content="${esc(a.published)}" data-rh="true" />` : '',
    a.modified ? `<meta property="article:modified_time" content="${esc(a.modified)}" data-rh="true" />` : '',
    `<meta name="twitter:card" content="summary_large_image" data-rh="true" />`,
    `<meta name="twitter:title" content="${esc(a.title)}" data-rh="true" />`,
    `<meta name="twitter:description" content="${esc(description)}" data-rh="true" />`,
    `<meta name="twitter:image" content="${esc(image)}" data-rh="true" />`,
    `<script type="application/ld+json" data-rh="true">${jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: a.heading || a.title,
          description,
          image: [image],
          inLanguage: 'ar',
          author: { '@type': 'Person', name: a.author || siteConfig.company.name },
          datePublished: a.published || undefined,
          dateModified: a.modified || undefined,
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          publisher: { '@type': 'Organization', name: siteConfig.company.name, url: SITE },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: 'المقالات', item: `${SITE}/resources` },
            { '@type': 'ListItem', position: 3, name: a.heading || a.title, item: url },
          ],
        },
      ],
    })}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ')

  const body = `<article style="max-width:46rem;margin:0 auto;padding:6rem 1rem 2rem;font-family:system-ui,sans-serif;line-height:1.9">
      <h1>${esc(a.heading || a.title)}</h1>
      <p>${esc(a.author)}${a.category ? ' · ' + esc(a.category) : ''}</p>
      ${a.image ? `<img src="${esc(a.image)}" alt="${esc(a.imageAlt)}" style="max-width:100%;height:auto" />` : ''}
      ${a.html}
    </article>`

  return template
    .replace(/<html[^>]*>/i, '<html lang="ar" dir="rtl">')
    .replace(/<title>[\s\S]*?<\/title>/i, `<title data-rh="true">${esc(title)}</title>`)
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

for (const a of articles) {
  const dir = path.join(DIST, 'resources', a.slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), render(a))
}
console.log(`[seo] prerendered ${articles.length} article page(s)`)

// ---------- Sitemap ----------

const sitemapPath = path.join(DIST, 'sitemap.xml')
if (fs.existsSync(sitemapPath)) {
  let xml = fs.readFileSync(sitemapPath, 'utf8')
  const entries = articles
    .map((a) => {
      const lastmod = (a.modified || a.published || '').slice(0, 10)
      return `    <url>\n        <loc>${esc(`${SITE}/resources/${a.slug}`)}</loc>${lastmod ? `\n        <lastmod>${lastmod}</lastmod>` : ''}\n        <changefreq>monthly</changefreq>\n        <priority>0.7</priority>\n    </url>`
    })
    .join('\n\n')
  xml = xml.replace('</urlset>', `\n${entries}\n\n</urlset>`)
  fs.writeFileSync(sitemapPath, xml)
  console.log('[seo] sitemap.xml updated')
}
