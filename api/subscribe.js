import {
  checkRateLimit,
  clientIp,
  configured,
  hashIp,
  isAllowedSource,
  isValidEmail,
  normalizeEmail,
  parseBody,
  saveSubscriber,
  send
} from '../lib/subscribers.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return res.status(204).end()
  }
  if (req.method !== 'POST') {
    return send(req, res, 405, { ok: false, error: 'Use POST to subscribe.', code: 'method' })
  }
  if (!configured()) {
    return send(req, res, 503, {
      ok: false,
      error: 'Signup is temporarily unavailable.',
      code: 'unavailable'
    })
  }

  const body = parseBody(req)
  if (String(body.company || '').trim()) {
    return send(req, res, 200, { ok: true, status: 'subscribed' })
  }

  const email = normalizeEmail(body.email)
  const source = String(body.source || '').trim()
  if (!isValidEmail(email)) {
    return send(req, res, 400, { ok: false, error: 'Please enter a valid email.', code: 'invalid' })
  }
  if (!isAllowedSource(source)) {
    return send(req, res, 400, { ok: false, error: 'Please try again.', code: 'invalid' })
  }

  const ipHash = hashIp(clientIp(req))
  try {
    const rate = await checkRateLimit(ipHash)
    if (!rate.ok) {
      return send(req, res, 429, {
        ok: false,
        error: 'Please wait a few minutes and try again.',
        code: 'rate'
      })
    }
    const result = await saveSubscriber({
      email,
      source,
      ipHash,
      userAgent: req.headers['user-agent']
    })
    return send(req, res, 200, { ok: true, status: result.status })
  } catch (err) {
    const msg = String(err && err.message || err)
    if (/already exists|already_exists|overwrite/i.test(msg)) {
      return send(req, res, 200, { ok: true, status: 'already' })
    }
    console.error('subscribe failed', msg)
    return send(req, res, 500, {
      ok: false,
      error: 'Something went wrong. Please try again.',
      code: 'server'
    })
  }
}
