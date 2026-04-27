import { create } from 'zustand'
import type { Product, ProductFormData } from '../types/product'
import { productsService } from '../services/productsService'
import { getItem, setItem } from '../utils/localStorage'

const STORAGE_KEY = 'admin_products'

interface ProductsStore {
  products: Product[]
  loading: boolean
  error: string | null
  init: () => Promise<void>
  addProduct: (data: ProductFormData) => Promise<void>
  updateProduct: (id: number, data: ProductFormData) => Promise<void>
  removeProduct: (id: number) => Promise<void>
}

export const useProductsStore = create<ProductsStore>()((set, get) => ({
  products: [],
  loading: false,
  error: null,

  init: async () => {
    if (get().products.length > 0) return
    const cached = getItem<Product[]>(STORAGE_KEY)
    if (cached && cached.length > 0) {
      set({ products: cached })
      return
    }
    set({ loading: true, error: null })
    try {
      const products = await productsService.getAll()
      setItem(STORAGE_KEY, products)
      set({ products, loading: false })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
    }
  },

  addProduct: async (data) => {
    try { await productsService.create(data) } catch {}
    const newProduct: Product = {
      ...data,
      id: Date.now(),
      rating: { rate: 0, count: 0 },
    }
    const products = [...get().products, newProduct]
    setItem(STORAGE_KEY, products)
    set({ products })
  },

  updateProduct: async (id, data) => {
    try { await productsService.update(id, data) } catch {}
    const products = get().products.map((p) =>
      p.id === id ? { ...p, ...data } : p
    )
    setItem(STORAGE_KEY, products)
    set({ products })
  },

  removeProduct: async (id) => {
    try { await productsService.remove(id) } catch {}
    const products = get().products.filter((p) => p.id !== id)
    setItem(STORAGE_KEY, products)
    set({ products })
  },
}))
