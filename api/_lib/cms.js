// api/_lib/cms.js
// Talks to Google Apps Script (the only place that can touch the Google Sheet)
// and triggers a Vercel rebuild so static SEO pages stay in sync.

const GAS_PREFIX = 'https://script.google.com/macros/s/'
const HOOK_PREFIX = 'https://api.vercel.com/v1/integrations/deploy/'

export class CmsError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.status = status
  }
}

export async function callGas(action, payload = {}) {
  const url = process.env.GAS_URL
  const secret = process.env.GAS_SECRET

  if (!url || !secret || !url.startsWith(GAS_PREFIX)) {
    throw new CmsError('إعدادات Google Sheets غير مكتملة.')
  }

  let response
  try {
    response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      // text/plain avoids a CORS preflight that Apps Script cannot answer.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ secret, action, ...payload }),
      signal: AbortSignal.timeout(25000),
    })
  } catch (error) {
    console.error('[cms] Apps Script request failed:', error?.message)
    throw new CmsError('تعذر الاتصال بـ Google Sheets. حاول مرة أخرى.', 502)
  }

  let data
  try {
    data = await response.json()
  } catch {
    console.error('[cms] Apps Script returned non-JSON, status', response.status)
    throw new CmsError('رد غير متوقع من Google Sheets. تأكد من نشر السكربت كـ Web app.', 502)
  }

  if (!data.success) {
    if (data.error === 'SLUG_EXISTS') throw new CmsError('هذا الرابط (Slug) مستخدم في مقال آخر.', 409)
    if (data.error === 'Article not found') throw new CmsError('المقال غير موجود.', 404)
    console.error('[cms] Apps Script error:', data.error)
    throw new CmsError('حدث خطأ أثناء التعامل مع Google Sheets.', 502)
  }

  return data
}

/** Returns 'triggered' | 'skipped' | 'failed'. Never throws: saving must not fail because of a rebuild. */
export async function triggerRebuild() {
  const hook = process.env.DEPLOY_HOOK_URL
  if (!hook || !hook.startsWith(HOOK_PREFIX)) return 'skipped'

  try {
    const response = await fetch(hook, { method: 'POST', signal: AbortSignal.timeout(8000) })
    return response.ok ? 'triggered' : 'failed'
  } catch (error) {
    console.error('[cms] Deploy hook failed:', error?.message)
    return 'failed'
  }
}
