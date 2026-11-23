// POST /api/admin/logout
import { clearSessionCookie, isJsonRequest, isSameOrigin } from '../_lib/security.js'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false })
  }
  if (!isSameOrigin(req) || !isJsonRequest(req)) {
    return res.status(403).json({ success: false })
  }

  res.setHeader('Set-Cookie', clearSessionCookie())
  return res.status(200).json({ success: true })
}
