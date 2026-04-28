import { renderHook, waitFor } from '@testing-library/react'
import { act } from 'react'
import { vi, beforeEach, describe, it, expect } from 'vitest'
import { useProducts } from '../../hooks/useProducts'
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

import { productsService } from '../../services/productsService'

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

beforeEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
  useProductsStore.setState({ products: [], loading: false, error: null })
})

describe('useProducts — consome useProductsStore', () => {
  it('F1-CA1: produto adicionado via addProduct aparece em filteredProducts', async () => {
    useProductsStore.setState({ products: mockProducts, loading: false, error: null })
    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.filteredProducts).toHaveLength(2)
    })

    const newProduct: Product = {
      id: 3,
      title: 'New Sneaker',
      price: 89.99,
      description: 'Fresh kicks',
      category: 'footwear',
      image: 'https://example.com/sneaker.jpg',
      rating: { rate: 4.0, count: 50 },
    }

    act(() => {
      useProductsStore.setState({ products: [...mockProducts, newProduct] })
    })

    await waitFor(() => {
      const titles = result.current.filteredProducts.map((p) => p.title)
      expect(titles).toContain('New Sneaker')
    })
  })

  it('F1-CA2: produto editado via updateProduct reflete novo título', async () => {
    useProductsStore.setState({ products: mockProducts, loading: false, error: null })
    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.filteredProducts).toHaveLength(2)
    })

    act(() => {
      useProductsStore.setState({
        products: mockProducts.map((p) =>
          p.id === 1 ? { ...p, title: 'Laptop Pro Max', price: 1299.99 } : p
        ),
      })
    })

    await waitFor(() => {
      const titles = result.current.filteredProducts.map((p) => p.title)
      expect(titles).toContain('Laptop Pro Max')
      expect(titles).not.toContain('Laptop Pro')
    })
  })

  it('F1-CA3: produto removido desaparece de filteredProducts', async () => {
    useProductsStore.setState({ products: mockProducts, loading: false, error: null })
    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.filteredProducts).toHaveLength(2)
    })

    act(() => {
      useProductsStore.setState({ products: mockProducts.filter((p) => p.id !== 1) })
    })

    await waitFor(() => {
      const titles = result.current.filteredProducts.map((p) => p.title)
      expect(titles).not.toContain('Laptop Pro')
      expect(titles).toContain('Blue T-Shirt')
    })
  })

  it('F1-CA4: primeiro load (localStorage vazio) chama productsService.getAll', async () => {
    vi.mocked(productsService.getAll).mockResolvedValue(mockProducts)

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.filteredProducts).toHaveLength(2)
    })

    expect(productsService.getAll).toHaveBeenCalledTimes(1)
  })

  it('F1-CA5: filtro por categoria continua funcionando', async () => {
    useProductsStore.setState({ products: mockProducts, loading: false, error: null })
    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.filteredProducts).toHaveLength(2)
    })

    act(() => {
      result.current.setSelectedCategory('electronics')
    })

    await waitFor(() => {
      expect(result.current.filteredProducts).toHaveLength(1)
      expect(result.current.filteredProducts[0].title).toBe('Laptop Pro')
    })
  })

  it('F2-CA1: categorias são derivadas dos produtos do store', async () => {
    useProductsStore.setState({ products: mockProducts, loading: false, error: null })
    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.categories).toContain('electronics')
      expect(result.current.categories).toContain("men's clothing")
    })
  })

  it('F2-CA2: nova categoria criada via store aparece nas categorias', async () => {
    useProductsStore.setState({ products: mockProducts, loading: false, error: null })
    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.categories).toHaveLength(2)
    })

    const newProduct: Product = {
      id: 3,
      title: 'Running Shoes',
      price: 120,
      description: 'Fast shoes',
      category: 'footwear',
      image: 'https://example.com/shoes.jpg',
      rating: { rate: 4.2, count: 30 },
    }

    act(() => {
      useProductsStore.setState({ products: [...mockProducts, newProduct] })
    })

    await waitFor(() => {
      expect(result.current.categories).toContain('footwear')
    })
  })
})
