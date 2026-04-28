import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import StorePage from '../../pages/client/Store/StorePage'

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

import { productsService } from '../../services/productsService'
import type { Product } from '../../types/product'

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Laptop Pro',
    price: 999.99,
    description: 'Fast laptop',
    category: 'electronics',
    image: 'https://example.com/laptop.jpg',
    rating: { rate: 4.5, count: 200 },
  },
  {
    id: 2,
    title: 'Blue T-Shirt',
    price: 29.99,
    description: 'Comfy shirt',
    category: "men's clothing",
    image: 'https://example.com/shirt.jpg',
    rating: { rate: 3.9, count: 80 },
  },
]

function renderPage() {
  return render(
    <MemoryRouter>
      <StorePage />
    </MemoryRouter>
  )
}

function renderPageWithQuery(q: string) {
  return render(
    <MemoryRouter initialEntries={[`/store?q=${encodeURIComponent(q)}`]}>
      <StorePage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(productsService.getCategories).mockResolvedValue(['electronics', "men's clothing"])
})

describe('StorePage — design system Zattini', () => {
  it('grid tem classe grid-cols-2', async () => {
    vi.mocked(productsService.getAll).mockResolvedValue(mockProducts)
    renderPage()
    await waitFor(() => {
      const grid = document.querySelector('[class*="grid-cols-2"]')
      expect(grid).toBeTruthy()
    })
  })

  it('chip de filtro tem rounded-[20px] (pill Zattini)', async () => {
    vi.mocked(productsService.getAll).mockResolvedValue(mockProducts)
    renderPage()
    await waitFor(() => {
      const filterBtn = screen.getByRole('button', { name: /electronics/i })
      expect(filterBtn.className).toContain('rounded-[20px]')
    })
  })

  it('chip ativo tem data-active="true" e backgroundColor brand', async () => {
    vi.mocked(productsService.getAll).mockResolvedValue(mockProducts)
    renderPage()
    await waitFor(() => {
      const allBtn = screen.getByRole('button', { name: /todos/i })
      expect(allBtn.dataset.active).toBe('true')
      expect(allBtn.style.backgroundColor).toBe('var(--c-brand)')
    })
  })
})

describe('StorePage — busca via URL (?q=)', () => {
  it('F1-CA1: ?q=laptop exibe apenas produtos com "laptop" no título', async () => {
    vi.mocked(productsService.getAll).mockResolvedValue(mockProducts)
    renderPageWithQuery('laptop')
    await waitFor(() => {
      expect(screen.getByText('laptop pro')).toBeInTheDocument()
      expect(screen.queryByText('blue t-shirt')).not.toBeInTheDocument()
    })
  })

  it('F1-CA2: sem ?q= exibe todos os produtos', async () => {
    vi.mocked(productsService.getAll).mockResolvedValue(mockProducts)
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('laptop pro')).toBeInTheDocument()
      expect(screen.getByText('blue t-shirt')).toBeInTheDocument()
    })
  })

  it('F1-CA4: busca é case-insensitive (?q=LAPTOP exibe "Laptop Pro")', async () => {
    vi.mocked(productsService.getAll).mockResolvedValue(mockProducts)
    renderPageWithQuery('LAPTOP')
    await waitFor(() => {
      expect(screen.getByText('laptop pro')).toBeInTheDocument()
      expect(screen.queryByText('blue t-shirt')).not.toBeInTheDocument()
    })
  })
})

describe('StorePage (Client)', () => {
  it('CA-F3.1-1: shows product cards with title and price', async () => {
    vi.mocked(productsService.getAll).mockResolvedValue(mockProducts)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('laptop pro')).toBeInTheDocument()
      expect(screen.getByText(/999\.99/)).toBeInTheDocument()
      expect(screen.getByText('blue t-shirt')).toBeInTheDocument()
      expect(screen.getByText(/29\.99/)).toBeInTheDocument()
    })
  })

  it('CA-F3.1-2: filtering by category shows only that category products', async () => {
    vi.mocked(productsService.getAll).mockResolvedValue(mockProducts)

    renderPage()

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('laptop pro')).toBeInTheDocument()
    })

    // Click on "electronics" category filter
    await userEvent.click(screen.getByRole('button', { name: /electronics/i }))

    expect(screen.getByText('laptop pro')).toBeInTheDocument()
    expect(screen.queryByText('blue t-shirt')).not.toBeInTheDocument()
  })

  it('CA-F3.1-3: shows loading state while API is pending', () => {
    vi.mocked(productsService.getAll).mockImplementation(
      () => new Promise(() => {}) // never resolves
    )

    renderPage()

    expect(screen.getAllByTestId('loading').length).toBeGreaterThan(0)
  })

  it('CA-F3.1-4: shows error message with retry button when API fails', async () => {
    vi.mocked(productsService.getAll).mockRejectedValue(new Error('Network error'))

    renderPage()

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument()
    })
  })
})
