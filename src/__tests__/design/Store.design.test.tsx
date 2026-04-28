import { render, waitFor } from '@testing-library/react'
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
  vi.mocked(productsService.getCategories).mockResolvedValue(['electronics'])
  vi.mocked(productsService.getAll).mockResolvedValue(mockProducts)
})

function renderPage() {
  return render(
    <MemoryRouter>
      <StorePage />
    </MemoryRouter>
  )
}

describe('StorePage — design system Polish', () => {
  it('CA-DS3-1: grid tem gap-4 (espaço real entre cards)', async () => {
    renderPage()
    await waitFor(() => {
      const grid = document.querySelector('[class*="grid"][class*="gap-4"]')
      expect(grid).toBeTruthy()
    })
  })

  it('CA-DS3-1: grid NÃO usa gap-px (sem bordas artificiais)', async () => {
    renderPage()
    await waitFor(() => {
      const gapPxEl = document.querySelector('[class*="gap-px"]')
      expect(gapPxEl).toBeFalsy()
    })
  })

  it('CA-DS6-1: existe [data-container] na página (Container sendo usado)', async () => {
    renderPage()
    await waitFor(() => {
      const container = document.querySelector('[data-container]')
      expect(container).toBeTruthy()
    })
  })
})
