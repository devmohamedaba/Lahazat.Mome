// api/_lib/security.js
// Session cookies, password check, CSRF/origin guard and a best-effort login throttle.

import crypto from 'node:crypto'

const COOKIE_NAME = 'cms_session'
const SESSION_SECONDS = 8 * 60 * 60 // 8 hours

const b64url = (input) => Buffer.from(input).toString('base64url')

function hmac(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url')
}

function safeEqual(a, b) {
  const x = crypto.createHash('sha256').update(String(a)).digest()
  const y = crypto.createHash('sha256').update(String(b)).digest()
  return crypto.timingSafeEqual(x, y)
}

export function getSecrets() {
  const password = process.env.ADMIN_PASSWORD
  const sessionSecret = process.env.SESSION_SECRET
  if (!password || password.length < 12 || !sessionSecret || sessionSecret.length < 32) {
    return null
  }
  return { password, sessionSecret }
}

export function checkPassword(input, expected) {
  if (typeof input !== 'string' || input.length === 0 || input.length > 200) return false
  return safeEqual(input, expected)
}

export function createSessionCookie(secret) {
  const now = Math.floor(Date.now() / 1000)
  const payload = b64url(
    JSON.stringify({ sub: 'admin', iat: now, exp: now + SESSION_SECONDS, jti: crypto.randomUUID() }),
  )
  const token = `${payload}.${hmac(payload, secret)}`
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=${SESSION_SECONDS}`
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=0`
}

function readCookie(req, name) {
  const header = req.headers.cookie || ''
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return rest.join('=')
  }
  return ''
}

export function hasValidSession(req, secret) {
  const token = readCookie(req, COOKIE_NAME)
  const parts = token.split('.')
  if (parts.length !== 2) return false

  const [payload, signature] = parts
  if (!safeEqual(signature, hmac(payload, secret))) return false

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return data.sub === 'admin' && data.exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

/** Rejects cross-site requests for anything that changes data. */
export function isSameOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return false
  try {
    return new URL(origin).host === req.headers.host
  } catch {
    return false
  }
}

export function isJsonRequest(req) {
  return String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')
}

// ---- Best-effort login throttle (memory is per serverless instance, so this only slows attackers;
// real protection = a long random ADMIN_PASSWORD + optional Vercel Firewall rate-limit rule). ----
const attempts = new Map()
const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILS = 5

export function clientIp(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
  return forwarded || req.socket?.remoteAddress || 'unknown'
}

export function isThrottled(ip) {
  const entry = attempts.get(ip)
  if (!entry) return false
  if (Date.now() - entry.first > WINDOW_MS) {
    attempts.delete(ip)
    return false
  }
  return entry.count >= MAX_FAILS
}

export function recordFailure(ip) {
  const entry = attempts.get(ip)
  if (!entry || Date.now() - entry.first > WINDOW_MS) attempts.set(ip, { count: 1, first: Date.now() })
  else entry.count += 1
  if (attempts.size > 500) attempts.clear()
}

export function clearFailures(ip) {
  attempts.delete(ip)
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** Common guard for protected endpoints. Returns true when the request may continue. */
export function requireAdmin(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  const secrets = getSecrets()
  if (!secrets) {
    res.status(500).json({ success: false, error: 'الخادم غير مهيأ بعد. راجع متغيرات البيئة.' })
    return false
  }

  const changes = req.method !== 'GET' && req.method !== 'HEAD'
  if (changes && (!isSameOrigin(req) || !isJsonRequest(req))) {
    res.status(403).json({ success: false, error: 'طلب غير مسموح.' })
    return false
  }

  if (!hasValidSession(req, secrets.sessionSecret)) {
    res.status(401).json({ success: false, error: 'انتهت الجلسة. سجّل الدخول من جديد.' })
    return false
  }

  return true
}
