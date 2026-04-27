import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types/product'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  total: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

function computeTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      total: 0,

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          const items = existing
            ? state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            : [...state.items, { product, quantity: 1 }]
          return { items, total: computeTotal(items) }
        }),

      removeFromCart: (productId) =>
        set((state) => {
          const items = state.items.filter((i) => i.product.id !== productId)
          return { items, total: computeTotal(items) }
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          const items =
            quantity <= 0
              ? state.items.filter((i) => i.product.id !== productId)
              : state.items.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i
                )
          return { items, total: computeTotal(items) }
        }),

      clearCart: () => set({ items: [], total: 0 }),
    }),
    { name: 'cart-storage' }
  )
)
