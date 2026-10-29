import { createHash, timingSafeEqual } from 'node:crypto'
import { BlobNotFoundError, get, head, list, put } from '@vercel/blob'

const SOURCES = new Set(['cta', 'footer', 'popup', 'coa'])
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_MAX = 8

const writeOpts = (overwrite) => ({
  access: 'private',
  addRandomSuffix: false,
  allowOverwrite: overwrite,
  contentType: 'application/json',
  cacheControlMaxAge: 60
})

export function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase()
}

export function isValidEmail(email) {
  return email.length >= 5 && email.length <= 254 && EMAIL_RE.test(email)
}

export function isAllowedSource(source) {
  return SOURCES.has(source)
}

export function clientIp(req) {
  const raw = req.headers['x-forwarded-for']
  if (typeof raw === 'string' && raw.length) return raw.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

export function hashIp(ip) {
  return createHash('sha256').update(`k9pd-nl:${ip}`).digest('hex').slice(0, 32)
}

export function emailKey(email) {
  return createHash('sha256').update(`k9pd-email:${email}`).digest('hex')
}

export function emailPath(email) {
  return `subscribers/${emailKey(email)}.json`
}

export function ratePath(ipHash) {
  return `ratelimit/${ipHash}.json`
}

export function configured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

export function exportAuthorized(req) {
  const expected = process.env.SUBSCRIBERS_EXPORT_TOKEN
  if (!expected) return false
  const header = req.headers.authorization || ''
  const bearer = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  const query = typeof req.query?.token === 'string' ? req.query.token : ''
  return safeEqual(bearer || query, expected)
}

function safeEqual(a, b) {
  if (!a || !b) return false
  const left = Buffer.from(String(a))
  const right = Buffer.from(String(b))
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

async function readBlobJson(pathname) {
  try {
    const result = await get(pathname, { access: 'private', useCache: false })
    if (!result || result.statusCode !== 200 || !result.stream) return null
    const text = await new Response(result.stream).text()
    return JSON.parse(text)
  } catch (err) {
    if (err instanceof BlobNotFoundError) return null
    throw err
  }
}

export async function findSubscriber(email) {
  try {
    return await head(emailPath(email))
  } catch (err) {
    if (err instanceof BlobNotFoundError) return null
    throw err
  }
}

export async function listSubscribers() {
  const { blobs } = await list({ prefix: 'subscribers/', limit: 1000 })
  const rows = []
  for (const blob of blobs) {
    if (!blob.pathname.endsWith('.json')) continue
    try {
      const data = await readBlobJson(blob.pathname)
      if (!data) continue
      rows.push({
        email: data.email || '',
        source: data.source || '',
        createdAt: data.createdAt || (blob.uploadedAt ? new Date(blob.uploadedAt).toISOString() : ''),
        label: data.label || ''
      })
    } catch {
      // skip unreadable blobs
    }
  }
  return rows.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export async function checkRateLimit(ipHash) {
  const pathname = ratePath(ipHash)
  const now = Date.now()
  let existing = null
  try {
    existing = await readBlobJson(pathname)
  } catch (err) {
    if (!(err instanceof BlobNotFoundError)) throw err
  }
  if (!existing || now - Number(existing.windowStart || 0) > RATE_WINDOW_MS) {
    await put(pathname, JSON.stringify({ windowStart: now, hits: 1 }), writeOpts(true))
    return { ok: true }
  }
  const hits = Number(existing.hits || 0) + 1
  await put(pathname, JSON.stringify({ windowStart: existing.windowStart, hits }), writeOpts(true))
  if (hits > RATE_MAX) return { ok: false }
  return { ok: true }
}

export async function saveSubscriber({ email, source, ipHash, userAgent }) {
  const existing = await findSubscriber(email)
  if (existing) return { status: 'already' }
  const record = {
    email,
    source,
    createdAt: new Date().toISOString(),
    ipHash,
    userAgent: String(userAgent || '').slice(0, 180),
    label: email.includes('k9pd-preview-test') ? 'preview-test' : ''
  }
  await put(emailPath(email), JSON.stringify(record), writeOpts(false))
  return { status: 'subscribed' }
}

export function parseBody(req) {
  const raw = req.body
  if (raw && typeof raw === 'object' && !Buffer.isBuffer(raw)) return raw
  if (typeof raw === 'string') {
    const trimmed = raw.trim()
    if (!trimmed) return {}
    try { return JSON.parse(trimmed) }
    catch {
      return Object.fromEntries(new URLSearchParams(trimmed))
    }
  }
  return {}
}

export function wantsHtml(req) {
  const accept = req.headers.accept || ''
  const type = req.headers['content-type'] || ''
  return accept.includes('text/html') && !type.includes('application/json')
}

export function send(req, res, status, payload) {
  if (wantsHtml(req)) {
    const ok = Boolean(payload.ok)
    const title = ok ? 'You are on the list' : 'Please try again'
    const msg = ok
      ? (payload.status === 'already'
        ? 'You are already on the K9 Peptides Direct newsletter list.'
        : 'You are on the list. We write when there is a restock, a new product, or a research note worth opening.')
      : (payload.error || 'Something went wrong.')
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    return res.status(status).send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | K9 Peptides Direct</title><link rel="stylesheet" href="/style.css"></head><body><section class="sec"><div class="w"><h1>${title}</h1><p>${msg}</p><p><a class="btn n" href="/">Back to home</a></p></div></section></body></html>`)
  }
  return res.status(status).json(payload)
}
