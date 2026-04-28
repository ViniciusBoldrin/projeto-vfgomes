import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CartPage from '../../pages/client/Cart/CartPage'
import { useCartStore } from '../../store/cartStore'
import type { Product } from '../../types/product'

const mockProduct: Product = {
  id: 1,
  title: 'Produto Teste',
  price: 100,
  description: 'desc',
  category: 'electronics',
  image: 'https://example.com/img.jpg',
  rating: { rate: 4, count: 10 },
}

function renderPage() {
  return render(
    <MemoryRouter>
      <CartPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  useCartStore.setState({
    items: [{ product: mockProduct, quantity: 1 }],
    total: 100,
  })
})

afterEach(() => {
  useCartStore.setState({ items: [], total: 0 })
})

describe('CartPage — design system Polish', () => {
  it('CA-DS7-1: lista de itens usa Container narrow', () => {
    renderPage()
    const narrowContainers = document.querySelectorAll('[data-container="narrow"]')
    expect(narrowContainers.length).toBeGreaterThan(0)
  })

  it('CA-DS7-1: footer de checkout usa Container narrow', () => {
    renderPage()
    // O footer sticky deve ter um Container narrow interno
    const stickyEl = document.querySelector('[class*="sticky"][class*="bottom-0"]')
    expect(stickyEl).toBeTruthy()
    const narrowInFooter = stickyEl?.querySelector('[data-container="narrow"]')
    expect(narrowInFooter).toBeTruthy()
  })
})
