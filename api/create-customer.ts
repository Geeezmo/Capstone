import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  // handler will fail fast if envs missing
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_URL on server')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const payload = req.body
  if (!payload?.id) return res.status(400).json({ error: 'Missing user id' })

  try {
    const { data, error } = await supabase.from('customers').insert([payload]).select().single()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ data })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: errorMessage })
  }
}