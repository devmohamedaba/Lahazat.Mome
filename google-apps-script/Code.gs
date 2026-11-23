/**
 * Lahazat CMS — Google Apps Script (Web App)
 *
 * Script Properties required (Project Settings > Script Properties):
 *   SHEET_ID    -> the id of your Google Sheet (between /d/ and /edit in its URL)
 *   API_SECRET  -> a long random string (40+ chars). Same value as GAS_SECRET in Vercel.
 *
 * Deploy: Deploy > New deployment > Web app
 *   Execute as: Me      |   Who has access: Anyone
 * (The secret protects it. Never share the /exec URL or the secret publicly.)
 */

const SHEET_NAME = 'Articles'
const MAX_CELL_CHARS = 45000 // Google Sheets hard limit is 50,000 per cell
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const HEADERS = [
  'id', 'slug',
  'title_ar', 'title_en',
  'excerpt_ar', 'excerpt_en',
  'content_ar', 'content_en',
  'image', 'image_alt_ar', 'image_alt_en',
  'category_ar', 'category_en',
  'author',
  'seo_title_ar', 'seo_title_en',
  'seo_description_ar', 'seo_description_en',
  'status', 'published_at', 'created_at', 'updated_at',
]

// Columns that hold large text; omitted from list summaries to keep responses small.
const HEAVY_COLUMNS = ['content_ar', 'content_en']

/* ---------------------------------------------------------------
 * Run ONCE from the editor. Safe to re-run: it NEVER clears data,
 * it only creates the sheet / adds missing header columns.
 * ------------------------------------------------------------- */
function setupCMS() {
  const sheet = getSheet_(true)
  ensureHeaders_(sheet)
  sheet.setFrozenRows(1)
  sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold')
  // Plain-text format: stops "=...", "+...", "@..." from being executed as formulas.
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).setNumberFormat('@')
  return 'CMS sheet is ready'
}

/* ------------------------------ Entry point ------------------------------ */
function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}')

    if (!safeEqual_(String(body.secret || ''), String(prop_('API_SECRET')))) {
      return json_({ success: false, error: 'Unauthorized' })
    }

    const sheet = getSheet_(false)
    ensureHeaders_(sheet)

    switch (body.action) {
      case 'list':
        return json_({ success: true, articles: listArticles_(sheet, body) })
      case 'get':
        return json_(getArticle_(sheet, body.id))
      case 'save':
        return json_(saveArticle_(sheet, body.article))
      case 'delete':
        return json_(deleteArticle_(sheet, body.id))
      default:
        return json_({ success: false, error: 'Unknown action' })
    }
  } catch (error) {
    return json_({ success: false, error: String(error && error.message ? error.message : error) })
  }
}

/* ------------------------------ Actions ------------------------------ */

// body.scope: 'public' (published + date reached, full content) | 'admin' (everything)
// body.summary: true => omit heavy content columns
function listArticles_(sheet, body) {
  const isAdmin = body.scope === 'admin'
  const now = new Date()
  const rows = readAll_(sheet)

  return rows
    .filter(function (a) {
      if (!a.id) return false
      if (isAdmin) return true
      return a.status === 'published' && a.published_at && new Date(a.published_at) <= now
    })
    .sort(function (a, b) {
      return new Date(b.published_at || b.updated_at || 0) - new Date(a.published_at || a.updated_at || 0)
    })
    .map(function (a) {
      if (!body.summary) return a
      const copy = {}
      Object.keys(a).forEach(function (k) {
        if (HEAVY_COLUMNS.indexOf(k) === -1) copy[k] = a[k]
      })
      return copy
    })
}

function getArticle_(sheet, id) {
  const found = readAll_(sheet).filter(function (a) { return a.id === String(id) })[0]
  return found ? { success: true, article: found } : { success: false, error: 'Article not found' }
}

function saveArticle_(sheet, article) {
  if (!article || !article.slug || !article.title_ar) throw new Error('Required article fields are missing')
  if (!SLUG_RE.test(String(article.slug))) throw new Error('Invalid slug')
  HEADERS.forEach(function (h) {
    if (String(article[h] || '').length > MAX_CELL_CHARS) throw new Error('Field too long: ' + h)
  })

  const lock = LockService.getScriptLock()
  lock.waitLock(15000)
  try {
    const map = headerMap_(sheet)
    const lastRow = sheet.getLastRow()
    const data = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues() : []

    const id = article.id || Utilities.getUuid()
    const nowIso = new Date().toISOString()

    // Slug must be unique across *other* articles.
    data.forEach(function (row) {
      if (String(row[map.slug]) === article.slug && String(row[map.id]) !== id) {
        throw new Error('SLUG_EXISTS')
      }
    })

    let existingIndex = -1
    data.forEach(function (row, i) { if (String(row[map.id]) === id) existingIndex = i })

    const oldRow = existingIndex >= 0 ? data[existingIndex] : null
    const previousStatus = oldRow ? String(oldRow[map.status]) : ''

    const record = Object.assign({}, article, {
      id: id,
      created_at: oldRow && oldRow[map.created_at] ? String(oldRow[map.created_at]) : nowIso,
      updated_at: nowIso,
    })

    const width = sheet.getLastColumn()
    const values = new Array(width).fill('')
    Object.keys(map).forEach(function (key) {
      values[map[key]] = record[key] === undefined || record[key] === null ? '' : String(record[key])
    })

    const targetRow = existingIndex >= 0 ? existingIndex + 2 : lastRow + 1
    const range = sheet.getRange(targetRow, 1, 1, width)
    range.setNumberFormat('@')
    range.setValues([values])

    return { success: true, article: rowToObject_(values, map), previous_status: previousStatus }
  } finally {
    lock.releaseLock()
  }
}

function deleteArticle_(sheet, id) {
  if (!id) throw new Error('Article ID is required')

  const lock = LockService.getScriptLock()
  lock.waitLock(15000)
  try {
    const map = headerMap_(sheet)
    const lastRow = sheet.getLastRow()
    if (lastRow < 2) throw new Error('Article not found')
    const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues()

    let index = -1
    data.forEach(function (row, i) { if (String(row[map.id]) === String(id)) index = i })
    if (index < 0) throw new Error('Article not found')

    const status = String(data[index][map.status])
    sheet.deleteRow(index + 2)
    return { success: true, deleted_status: status }
  } finally {
    lock.releaseLock()
  }
}

/* ------------------------------ Helpers ------------------------------ */

function prop_(name) {
  const value = PropertiesService.getScriptProperties().getProperty(name)
  if (!value) throw new Error('Missing Script Property: ' + name)
  return value
}

function getSheet_(createIfMissing) {
  const spreadsheet = SpreadsheetApp.openById(prop_('SHEET_ID'))
  let sheet = spreadsheet.getSheetByName(SHEET_NAME)
  if (!sheet) {
    if (!createIfMissing) throw new Error('Sheet "' + SHEET_NAME + '" not found. Run setupCMS first.')
    sheet = spreadsheet.insertSheet(SHEET_NAME)
  }
  return sheet
}

// Adds any missing header at the end. Never reorders or removes columns.
function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    return
  }
  const current = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String)
  const missing = HEADERS.filter(function (h) { return current.indexOf(h) === -1 })
  if (missing.length) {
    sheet.getRange(1, current.length + 1, 1, missing.length).setValues([missing])
  }
}

function headerMap_(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
  const map = {}
  headers.forEach(function (h, i) { if (h) map[String(h)] = i })
  return map
}

function readAll_(sheet) {
  const lastRow = sheet.getLastRow()
  if (lastRow < 2) return []
  const map = headerMap_(sheet)
  return sheet
    .getRange(2, 1, lastRow - 1, sheet.getLastColumn())
    .getValues()
    .map(function (row) { return rowToObject_(row, map) })
}

function rowToObject_(row, map) {
  const out = {}
  Object.keys(map).forEach(function (key) {
    const v = row[map[key]]
    out[key] = v instanceof Date ? v.toISOString() : v === null || v === undefined ? '' : String(v)
  })
  return out
}

function safeEqual_(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)
}
