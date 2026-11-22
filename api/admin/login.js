// POST /api/admin/login  { password }
import {
  checkPassword,
  clearFailures,
  clientIp,
  createSessionCookie,
  getSecrets,
  isJsonRequest,
  isSameOrigin,
  isThrottled,
  recordFailure,
  sleep,
} from '../_lib/security.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const secrets = getSecrets()
  if (!secrets) {
    return res.status(500).json({ success: false, error: 'الخادم غير مهيأ بعد. راجع متغيرات البيئة.' })
  }

  if (!isSameOrigin(req) || !isJsonRequest(req)) {
    return res.status(403).json({ success: false, error: 'طلب غير مسموح.' })
  }

  const ip = clientIp(req)
  if (isThrottled(ip)) {
    return res.status(429).json({ success: false, error: 'محاولات كثيرة. انتظر 15 دقيقة ثم حاول مرة أخرى.' })
  }

  const password = req.body && req.body.password

  if (!checkPassword(password, secrets.password)) {
    recordFailure(ip)
    await sleep(800) // slows down guessing
    return res.status(401).json({ success: false, error: 'كلمة المرور غير صحيحة.' })
  }

  clearFailures(ip)
  res.setHeader('Set-Cookie', createSessionCookie(secrets.sessionSecret))
  return res.status(200).json({ success: true })
}
