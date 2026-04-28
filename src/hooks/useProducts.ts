import { useEffect, useMemo, useState } from 'react'
import { useProductsStore } from '../store/productsStore'

interface UseProductsResult {
  products: ReturnType<typeof useProductsStore.getState>['products']
  filteredProducts: ReturnType<typeof useProductsStore.getState>['products']
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
  const { products, loading, error, init, reload } = useProductsStore()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    init()
  }, [init])

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  )

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
    reload()
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
