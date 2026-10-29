import { configured, exportAuthorized, listSubscribers } from '../lib/subscribers.js'

function csvEscape(value) {
  const s = String(value ?? '')
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ ok: false, error: 'Use GET to export subscribers.' })
  }
  if (!process.env.SUBSCRIBERS_EXPORT_TOKEN) {
    return res.status(503).json({
      ok: false,
      error: 'Export is not configured. Set SUBSCRIBERS_EXPORT_TOKEN on the Vercel project.'
    })
  }
  if (!exportAuthorized(req)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized.' })
  }
  if (!configured()) {
    return res.status(503).json({ ok: false, error: 'Email storage is not configured.' })
  }

  try {
    const rows = await listSubscribers()
    const format = String(req.query?.format || 'csv').toLowerCase()
    if (format === 'json') {
      return res.status(200).json({ ok: true, count: rows.length, subscribers: rows })
    }
    const header = 'email,source,created_at,label'
    const body = rows.map((r) => [r.email, r.source, r.createdAt, r.label || ''].map(csvEscape).join(',')).join('\n')
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="k9-newsletter-subscribers.csv"')
    return res.status(200).send(`${header}\n${body}\n`)
  } catch (err) {
    console.error('export failed', err)
    return res.status(500).json({ ok: false, error: 'Could not export subscribers.' })
  }
}
