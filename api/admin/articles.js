// /api/admin/articles
//   GET              -> list (summary, no content)
//   GET ?id=<uuid>   -> one full article
//   POST   {article} -> create / update
//   DELETE {id}      -> delete
import { requireAdmin } from '../_lib/security.js'
import { callGas, CmsError, triggerRebuild } from '../_lib/cms.js'
import { validateArticleInput } from '../../shared/articleSchema.js'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return

  try {
    if (req.method === 'GET') {
      const id = typeof req.query.id === 'string' ? req.query.id : ''
      if (id) {
        if (!UUID_RE.test(id)) return res.status(400).json({ success: false, error: 'معرّف غير صالح.' })
        const data = await callGas('get', { id })
        return res.status(200).json({ success: true, article: data.article })
      }
      const data = await callGas('list', { scope: 'admin', summary: true })
      return res.status(200).json({ success: true, articles: data.articles })
    }

    if (req.method === 'POST') {
      const result = validateArticleInput(req.body && req.body.article)
      if (!result.ok) return res.status(400).json({ success: false, error: result.errors[0], errors: result.errors })

      const data = await callGas('save', { article: result.value })
      const touchedLiveSite = data.previous_status === 'published' || data.article.status === 'published'
      const rebuild = touchedLiveSite ? await triggerRebuild() : 'not_needed'

      return res.status(200).json({ success: true, article: data.article, rebuild })
    }

    if (req.method === 'DELETE') {
      const id = req.body && req.body.id
      if (typeof id !== 'string' || !UUID_RE.test(id)) {
        return res.status(400).json({ success: false, error: 'معرّف غير صالح.' })
      }
      const data = await callGas('delete', { id })
      const rebuild = data.deleted_status === 'published' ? await triggerRebuild() : 'not_needed'
      return res.status(200).json({ success: true, rebuild })
    }

    res.setHeader('Allow', 'GET, POST, DELETE')
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  } catch (error) {
    const status = error instanceof CmsError ? error.status : 500
    if (!(error instanceof CmsError)) console.error('[articles] unexpected:', error)
    return res.status(status).json({ success: false, error: error instanceof CmsError ? error.message : 'حدث خطأ غير متوقع.' })
  }
}
