import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CartPage from '../../pages/client/Cart/CartPage'
import { useCartStore } from '../../store/cartStore'
import type { Product } from '../../types/product'

const mockProduct1: Product = {
  id: 1,
  title: 'Laptop Pro',
  price: 100.00,
  description: 'A laptop',
  category: 'electronics',
  image: 'https://example.com/laptop.jpg',
  rating: { rate: 4.5, count: 200 },
}

const mockProduct2: Product = {
  id: 2,
  title: 'Blue Shirt',
  price: 25.00,
  description: 'A shirt',
  category: "men's clothing",
  image: 'https://example.com/shirt.jpg',
  rating: { rate: 3.9, count: 80 },
}

function renderPage() {
  return render(
    <MemoryRouter>
      <CartPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  useCartStore.setState({ items: [], total: 0 })
})

describe('CartPage — design system Zara', () => {
  it('CA-D6-2: footer de checkout tem sticky bottom-0', () => {
    useCartStore.setState({
      items: [{ product: mockProduct1, quantity: 1 }],
      total: 100,
    })
    renderPage()
    const stickyEl = document.querySelector('[class*="sticky"][class*="bottom-0"]')
    expect(stickyEl).toBeTruthy()
  })

  it('CA-D6-1: botão finalizar compra tem bg-black e uppercase', () => {
    useCartStore.setState({
      items: [{ product: mockProduct1, quantity: 1 }],
      total: 100,
    })
    renderPage()
    const btn = screen.getByRole('button', { name: /finalizar compra/i })
    expect(btn.className).toContain('uppercase')
    expect(btn.style.backgroundColor).toBeTruthy()
  })
})

describe('CartPage', () => {
  it('shows correct subtotals and total for cart items', () => {
    // 2 laptops (100 × 2 = 200) + 1 shirt (25 × 1 = 25) = 225
    useCartStore.setState({
      items: [
        { product: mockProduct1, quantity: 2 },
        { product: mockProduct2, quantity: 1 },
      ],
      total: 225,
    })

    renderPage()

    // Laptop (2 × $100 = $200) and shirt (1 × $25 = $25) should appear
    const items200 = screen.getAllByText(/\$ 200\.00/)
    expect(items200.length).toBeGreaterThan(0)

    const items25 = screen.getAllByText(/\$ 25\.00/)
    expect(items25.length).toBeGreaterThan(0)

    // Total should be $225
    expect(screen.getByText(/\$ 225\.00/)).toBeInTheDocument()
  })

  it('CA-F3.2-5: clicking "Finalizar compra" clears cart and shows success message', async () => {
    useCartStore.setState({
      items: [{ product: mockProduct1, quantity: 1 }],
      total: 100,
    })

    renderPage()

    await userEvent.click(screen.getByRole('button', { name: /finalizar compra/i }))

    await waitFor(() => {
      const { items } = useCartStore.getState()
      expect(items).toHaveLength(0)
    })

    expect(screen.getByText(/pedido realizado|compra finalizada|sucesso/i)).toBeInTheDocument()
  })

  it('shows empty state when cart is empty', () => {
    useCartStore.setState({ items: [], total: 0 })

    renderPage()

    expect(screen.getByText(/carrinho vazio/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /voltar|continuar/i })).toBeInTheDocument()
  })
})
