import { useCallback, useEffect, useMemo, useState } from 'react'
import { productsService } from '../services/productsService'
import type { Product } from '../types/product'

interface UseProductsResult {
  products: Product[]
  filteredProducts: Product[]
  categories: string[]
  selectedCategory: string
  searchQuery: string
  loading: boolean
  error: string | null
  setSelectedCategory: (cat: string) => void
  setSearchQuery: (q: string) => void
  retry: () => void
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [prods, cats] = await Promise.all([
        productsService.getAll(),
        productsService.getCategories(),
      ])
      setProducts(prods)
      setCategories(cats)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [tick]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    load()
  }, [load])

  const filteredProducts = useMemo(() => {
    let result = products
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(q))
    }
    return result
  }, [products, selectedCategory, searchQuery])

  function retry() {
    setTick((t) => t + 1)
  }

  return {
    products,
    filteredProducts,
    categories,
    selectedCategory,
    searchQuery,
    loading,
    error,
    setSelectedCategory,
    setSearchQuery,
    retry,
  }
}
