import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import ProductsPage from '../../pages/admin/Products/ProductsPage'
import { useProductsStore } from '../../store/productsStore'
import type { Product } from '../../types/product'

vi.mock('../../services/productsService', () => ({
  productsService: {
    getAll: vi.fn(),
    getCategories: vi.fn(),
    getByCategory: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Fjallraven Backpack',
    price: 109.95,
    description: 'Nice backpack',
    category: "men's clothing",
    image: 'https://example.com/img1.jpg',
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit',
    price: 22.3,
    description: 'Nice shirt',
    category: "men's clothing",
    image: 'https://example.com/img2.jpg',
    rating: { rate: 4.1, count: 259 },
  },
]

function renderPage() {
  return render(
    <MemoryRouter>
      <ProductsPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  useProductsStore.setState({ products: mockProducts, loading: false, error: null })
})

describe('ProductsPage Admin', () => {
  it('CA-F2.2-1: shows image, title, price and category for each product', () => {
    renderPage()

    expect(screen.getByText('Fjallraven Backpack')).toBeInTheDocument()
    expect(screen.getByText(/109\.95/)).toBeInTheDocument()
    expect(screen.getByText('Mens Casual Premium Slim Fit')).toBeInTheDocument()
    expect(screen.getByText(/22\.3/)).toBeInTheDocument()

    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(2)
  })

  it('CA-F2.2-2: creates a new product and shows it in the list', async () => {
    renderPage()

    await userEvent.click(screen.getByRole('button', { name: /novo produto/i }))

    const dialog = screen.getByRole('dialog')
    await userEvent.type(within(dialog).getByLabelText(/título/i), 'New Product')
    await userEvent.type(within(dialog).getByLabelText(/preço/i), '99.99')
    await userEvent.type(within(dialog).getByLabelText(/descrição/i), 'A new product description')
    await userEvent.type(within(dialog).getByLabelText(/categoria/i), 'electronics')
    await userEvent.type(within(dialog).getByLabelText(/imagem/i), 'https://example.com/new.jpg')

    await userEvent.click(within(dialog).getByRole('button', { name: /salvar/i }))

    await waitFor(() => {
      expect(screen.getByText('New Product')).toBeInTheDocument()
    })
  })

  it('CA-F2.2-3: store updateProduct reflects updated title in the list', async () => {
    renderPage()

    expect(screen.getByText('Fjallraven Backpack')).toBeInTheDocument()

    await useProductsStore.getState().updateProduct(1, {
      title: 'Updated Backpack',
      price: 109.95,
      description: 'Nice backpack',
      category: "men's clothing",
      image: 'https://example.com/img1.jpg',
    })

    await waitFor(() => {
      expect(screen.getByText('Updated Backpack')).toBeInTheDocument()
      expect(screen.queryByText('Fjallraven Backpack')).not.toBeInTheDocument()
    })
  })

  it('CA-F2.2-4: deletes a product and removes from the list', async () => {
    renderPage()

    expect(screen.getByText('Fjallraven Backpack')).toBeInTheDocument()

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i })
    await userEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(screen.queryByText('Fjallraven Backpack')).not.toBeInTheDocument()
    })
  })
})
