import { beforeEach, describe, it, expect } from 'vitest'
import { useAuthStore } from '../../store/authStore'
import { useCartStore } from '../../store/cartStore'
import type { Product } from '../../types/product'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 50,
  description: 'desc',
  category: 'test',
  image: 'https://example.com/img.jpg',
  rating: { rate: 4, count: 10 },
}

beforeEach(() => {
  localStorage.clear()
  useAuthStore.setState({ token: 'test-token', username: 'testuser', role: 'client' })
  useCartStore.setState({ items: [], total: 0 })
})

describe('authStore — logout limpa o carrinho (F3)', () => {
  it('F3-CA2: useCartStore.items está vazio após logout()', () => {
    useCartStore.getState().addToCart(mockProduct)
    expect(useCartStore.getState().items).toHaveLength(1)

    useAuthStore.getState().logout()

    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('F3-CA1: cart-storage no localStorage está vazio após logout()', () => {
    useCartStore.getState().addToCart(mockProduct)

    useAuthStore.getState().logout()

    const stored = localStorage.getItem('cart-storage')
    if (stored) {
      const parsed = JSON.parse(stored) as { state?: { items?: unknown[] } }
      expect(parsed?.state?.items ?? []).toHaveLength(0)
    }
  })
})
