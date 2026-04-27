import { useCartStore } from '../../store/cartStore'
import type { Product } from '../../types/product'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 10.0,
  description: 'A test product',
  category: 'electronics',
  image: 'https://example.com/img.jpg',
  rating: { rate: 4.5, count: 100 },
}

const mockProduct2: Product = {
  id: 2,
  title: 'Another Product',
  price: 25.0,
  description: 'Another test product',
  category: 'clothing',
  image: 'https://example.com/img2.jpg',
  rating: { rate: 3.5, count: 50 },
}

beforeEach(() => {
  useCartStore.setState({ items: [] })
})

describe('cartStore', () => {
  it('CA-F3.2-1: addToCart with new product creates item with quantity 1', () => {
    useCartStore.getState().addToCart(mockProduct)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].product.id).toBe(1)
    expect(items[0].quantity).toBe(1)
  })

  it('CA-F3.2-2: addToCart with existing product increments quantity', () => {
    useCartStore.getState().addToCart(mockProduct)
    useCartStore.getState().addToCart(mockProduct)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(2)
  })

  it('CA-F3.2-3: removeFromCart removes the item from the list', () => {
    useCartStore.getState().addToCart(mockProduct)
    useCartStore.getState().removeFromCart(1)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('CA-F3.2-4: total is the sum of price × quantity for all items', () => {
    useCartStore.getState().addToCart(mockProduct)   // 10 × 1 = 10
    useCartStore.getState().addToCart(mockProduct)   // 10 × 2 = 20
    useCartStore.getState().addToCart(mockProduct2)  // 25 × 1 = 25
    const { total } = useCartStore.getState()
    expect(total).toBeCloseTo(45)
  })
})
