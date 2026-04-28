import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import StorePage from '../../pages/client/Store/StorePage'
import { useProductsStore } from '../../store/productsStore'
import type { Product } from '../../types/product'

// productsService mockado pois productsStore.init() o usa internamente
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
    title: 'Produto A',
    price: 50,
    description: 'desc',
    category: 'electronics',
    image: 'https://example.com/a.jpg',
    rating: { rate: 4, count: 10 },
  },
]

beforeEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
  useProductsStore.setState({ products: mockProducts, loading: false, error: null })
})

function renderPage() {
  return render(
    <MemoryRouter>
      <StorePage />
    </MemoryRouter>
  )
}

describe('StorePage — design system Zattini', () => {
  it('grid tem gap-4 (espaço real entre cards)', async () => {
    renderPage()
    await waitFor(() => {
      const grid = document.querySelector('[class*="grid"][class*="gap-4"]')
      expect(grid).toBeTruthy()
    })
  })

  it('grid NÃO usa gap-px (sem bordas artificiais)', async () => {
    renderPage()
    await waitFor(() => {
      const gapPxEl = document.querySelector('[class*="gap-px"]')
      expect(gapPxEl).toBeFalsy()
    })
  })

  it('existe [data-container] na página (Container sendo usado)', async () => {
    renderPage()
    await waitFor(() => {
      const container = document.querySelector('[data-container]')
      expect(container).toBeTruthy()
    })
  })

  it('banner [data-banner] está presente na página', async () => {
    renderPage()
    await waitFor(() => {
      const banner = document.querySelector('[data-banner]')
      expect(banner).toBeTruthy()
    })
  })

  it('banner contém uma imagem', async () => {
    renderPage()
    await waitFor(() => {
      const img = document.querySelector('[data-banner] img')
      expect(img).toBeTruthy()
    })
  })

  it('banner aparece antes do grid de produtos no DOM', async () => {
    renderPage()
    await waitFor(() => {
      const banner = document.querySelector('[data-banner]')
      const grid = document.querySelector('[class*="grid"]')
      expect(banner).toBeTruthy()
      expect(grid).toBeTruthy()
      if (banner && grid) {
        const position = banner.compareDocumentPosition(grid)
        // DOCUMENT_POSITION_FOLLOWING = 4 (grid vem depois do banner)
        expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
      }
    })
  })

  it('chip "Todos" tem data-active="true" inicialmente', async () => {
    renderPage()
    await waitFor(() => {
      const chipTodos = document.querySelector('[data-active="true"]')
      expect(chipTodos).toBeTruthy()
    })
  })

  it('chip ativo usa --c-brand como backgroundColor', async () => {
    renderPage()
    await waitFor(() => {
      const activeChip = document.querySelector('[data-active="true"]') as HTMLElement
      expect(activeChip).toBeTruthy()
      expect(activeChip?.style.backgroundColor).toBe('var(--c-brand)')
    })
  })

  it('chip inativo tem classe border', async () => {
    renderPage()
    await waitFor(() => {
      const inactiveChips = document.querySelectorAll('[data-active="false"]')
      expect(inactiveChips.length).toBeGreaterThan(0)
      inactiveChips.forEach(chip => {
        expect(chip.className).toContain('border')
      })
    })
  })
})
