import { createClient } from '@supabase/supabase-js'

// Add type assertions for environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string

function mask(val?: string) {
  if (!val) return '<missing>'
  return val.length > 12 ? `${val.slice(0, 8)}...${val.slice(-4)}` : val
}

console.info('[supabase] VITE_SUPABASE_URL:', mask(SUPABASE_URL))
console.info('[supabase] VITE_SUPABASE_ANON_KEY:', mask(SUPABASE_ANON_KEY))

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env or Vercel env settings.')
  throw new Error('supabaseUrl is required. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data?.session ?? null
}

export async function signOut() {
  return supabase.auth.signOut()
}