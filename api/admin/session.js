// GET /api/admin/session  -> 200 when the admin cookie is valid, otherwise 401
import { requireAdmin } from '../_lib/security.js'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ success: false })
  }
  if (!requireAdmin(req, res)) return
  return res.status(200).json({ success: true, authenticated: true })
}
