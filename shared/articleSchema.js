// shared/articleSchema.js
// Single source of truth for article fields, validation and HTML sanitizing.
// Used by: Vercel API (api/), build scripts (scripts/) and Google Apps Script mirrors the same limits.

import sanitizeHtml from 'sanitize-html'

export const ARTICLE_HEADERS = [
  'id',
  'slug',
  'title_ar',
  'title_en',
  'excerpt_ar',
  'excerpt_en',
  'content_ar',
  'content_en',
  'image',
  'image_alt_ar',
  'image_alt_en',
  'category_ar',
  'category_en',
  'author',
  'seo_title_ar',
  'seo_title_en',
  'seo_description_ar',
  'seo_description_en',
  'status',
  'published_at',
  'created_at',
  'updated_at',
]

// Google Sheets allows 50,000 characters per cell. Stay safely below it.
export const MAX_CONTENT_CHARS = 45000

const LIMITS = {
  slug: 90,
  title: 120,
  excerpt: 320,
  category: 60,
  author: 80,
  imageAlt: 160,
  seoTitle: 90,
  seoDescription: 200,
  image: 500,
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const isValidSlug = (slug) =>
  typeof slug === 'string' &&
  slug.length >= 3 &&
  slug.length <= LIMITS.slug &&
  SLUG_RE.test(slug)

// ---------- HTML sanitizing (authoritative; runs on the server) ----------

const SANITIZE_OPTIONS = {
  allowedTags: [
    'h2', 'h3', 'h4', 'p', 'br', 'hr', 'strong', 'em', 'u', 's', 'code', 'pre',
    'blockquote', 'ul', 'ol', 'li', 'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    th: ['colspan', 'rowspan'],
    td: ['colspan', 'rowspan'],
  },
  allowedSchemes: ['https', 'http', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['https'] },
  allowProtocolRelative: false,
  disallowedTagsMode: 'discard',
  transformTags: {
    // The page already has one <h1> (the article title) — never allow another.
    h1: 'h2',
    a: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, rel: 'noopener noreferrer' },
    }),
    img: (tagName, attribs) => {
      // Only absolute https images or images hosted inside the site are allowed.
      const safeSrc = /^https:\/\//i.test(attribs.src || '') || /^\/(?!\/)/.test(attribs.src || '')
      return {
        tagName,
        attribs: { ...attribs, src: safeSrc ? attribs.src : '', alt: attribs.alt || '', loading: 'lazy' },
      }
    },
  },
}

export function sanitizeArticleHtml(html) {
  if (typeof html !== 'string') return ''
  return sanitizeHtml(html, SANITIZE_OPTIONS).trim()
}

export function htmlToText(html) {
  return sanitizeHtml(String(html || ''), { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, ' ')
    .trim()
}

export function estimateReadMinutes(html) {
  const words = htmlToText(html).split(' ').filter(Boolean).length
  return Math.max(1, Math.ceil(words / 180))
}

// ---------- Validation ----------

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

const clean = (value, max) =>
  String(value ?? '')
    .replace(CONTROL_CHARS, '')
    .trim()
    .slice(0, max)

function cleanImage(value) {
  const image = clean(value, LIMITS.image)
  if (!image) return ''
  if (image.startsWith('/') && !image.startsWith('//')) return image
  try {
    const url = new URL(image)
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

function cleanDate(value) {
  const raw = clean(value, 40)
  if (!raw) return ''
  const date = new Date(raw)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

/**
 * Validates + sanitizes an article coming from the admin editor.
 * Returns { ok: true, value } or { ok: false, errors: string[] } (Arabic messages).
 */
export function validateArticleInput(input) {
  const errors = []
  const src = input && typeof input === 'object' ? input : {}

  const status = src.status === 'published' ? 'published' : 'draft'
  const slug = clean(src.slug, LIMITS.slug).toLowerCase()
  const id = clean(src.id, 40)

  const value = {
    id: UUID_RE.test(id) ? id : '',
    slug,
    title_ar: clean(src.title_ar, LIMITS.title),
    title_en: clean(src.title_en, LIMITS.title),
    excerpt_ar: clean(src.excerpt_ar, LIMITS.excerpt),
    excerpt_en: clean(src.excerpt_en, LIMITS.excerpt),
    content_ar: sanitizeArticleHtml(src.content_ar),
    content_en: sanitizeArticleHtml(src.content_en),
    image: '',
    image_alt_ar: clean(src.image_alt_ar, LIMITS.imageAlt),
    image_alt_en: clean(src.image_alt_en, LIMITS.imageAlt),
    category_ar: clean(src.category_ar, LIMITS.category),
    category_en: clean(src.category_en, LIMITS.category),
    author: clean(src.author, LIMITS.author) || 'فريق لحظات',
    seo_title_ar: clean(src.seo_title_ar, LIMITS.seoTitle),
    seo_title_en: clean(src.seo_title_en, LIMITS.seoTitle),
    seo_description_ar: clean(src.seo_description_ar, LIMITS.seoDescription),
    seo_description_en: clean(src.seo_description_en, LIMITS.seoDescription),
    status,
    published_at: '',
  }

  if (src.id && !value.id) errors.push('معرّف المقال غير صالح.')

  if (!isValidSlug(slug)) {
    errors.push('الرابط (Slug) يجب أن يكون بالإنجليزية الصغيرة وأرقام وشرطات فقط، من 3 إلى 90 حرفًا. مثال: understanding-anxiety')
  }

  const image = cleanImage(src.image)
  if (image === null) errors.push('رابط الصورة يجب أن يبدأ بـ https:// أو يكون مسارًا داخل الموقع يبدأ بـ /')
  else value.image = image

  const publishedAt = cleanDate(src.published_at)
  if (publishedAt === null) errors.push('تاريخ النشر غير صالح.')
  else value.published_at = publishedAt

  if (!value.title_ar) errors.push('العنوان بالعربية مطلوب.')

  for (const lang of ['ar', 'en']) {
    if (value[`content_${lang}`].length > MAX_CONTENT_CHARS) {
      errors.push(`المحتوى ${lang === 'ar' ? 'العربي' : 'الإنجليزي'} طويل جدًا. قسّمه إلى مقالين (الحد الأقصى ${MAX_CONTENT_CHARS} حرفًا بما فيها الوسوم).`)
    }
  }

  if (status === 'published') {
    if (!value.excerpt_ar) errors.push('الوصف المختصر بالعربية مطلوب قبل النشر.')
    if (htmlToText(value.content_ar).length < 200) errors.push('المحتوى العربي قصير جدًا للنشر (200 حرف على الأقل).')
    if (!value.published_at) value.published_at = new Date().toISOString()
  }

  return errors.length ? { ok: false, errors } : { ok: true, value }
}

// ---------- Public shape (what the website is allowed to see) ----------

export function toPublicArticle(row) {
  const a = row || {}
  const contentAr = sanitizeArticleHtml(a.content_ar)
  const contentEn = sanitizeArticleHtml(a.content_en)
  return {
    slug: String(a.slug || ''),
    title_ar: String(a.title_ar || ''),
    title_en: String(a.title_en || ''),
    excerpt_ar: String(a.excerpt_ar || ''),
    excerpt_en: String(a.excerpt_en || ''),
    content_ar: contentAr,
    content_en: contentEn,
    image: String(a.image || ''),
    image_alt_ar: String(a.image_alt_ar || ''),
    image_alt_en: String(a.image_alt_en || ''),
    category_ar: String(a.category_ar || ''),
    category_en: String(a.category_en || ''),
    author: String(a.author || ''),
    seo_title_ar: String(a.seo_title_ar || ''),
    seo_title_en: String(a.seo_title_en || ''),
    seo_description_ar: String(a.seo_description_ar || ''),
    seo_description_en: String(a.seo_description_en || ''),
    published_at: String(a.published_at || ''),
    updated_at: String(a.updated_at || ''),
    read_minutes: estimateReadMinutes(contentAr || contentEn),
  }
}
