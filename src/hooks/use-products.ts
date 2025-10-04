import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export type Product = {
  id: string
  name: string
  description?: string
  price?: number
  stock?: number
  image_url?: string
  vendor_id?: string
  created_at?: string
}

export default function useProducts(limit = 20) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from<Product>('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      setProducts(data ?? [])
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refresh: fetchProducts }
}