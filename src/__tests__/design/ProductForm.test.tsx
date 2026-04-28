import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { ProductForm } from '../../components/shared/ProductForm'
import type { Product } from '../../types/product'

const productA: Product = {
  id: 1,
  title: 'Produto A',
  price: 100,
  description: 'Desc A',
  category: 'cat-a',
  image: 'https://example.com/a.jpg',
  rating: { rate: 4, count: 10 },
}

const productB: Product = {
  id: 2,
  title: 'Produto B',
  price: 200,
  description: 'Desc B',
  category: 'cat-b',
  image: 'https://example.com/b.jpg',
  rating: { rate: 3, count: 5 },
}

function renderForm(initialData?: Product) {
  const onSubmit = vi.fn().mockResolvedValue(undefined)
  const onClose = vi.fn()
  const { rerender } = render(
    <ProductForm isOpen={true} onClose={onClose} onSubmit={onSubmit} initialData={initialData} />
  )
  return { rerender, onSubmit, onClose }
}

describe('ProductForm — reset de estado (F4)', () => {
  it('F4-CA1: campos ficam vazios ao trocar de produto A para "novo produto"', () => {
    const { rerender } = renderForm(productA)

    // Confirm product A data is present
    const titleInput = screen.getByLabelText(/título/i) as HTMLInputElement
    expect(titleInput.value).toBe('Produto A')

    // Switch to "new product" (no initialData)
    rerender(
      <ProductForm isOpen={true} onClose={vi.fn()} onSubmit={vi.fn().mockResolvedValue(undefined)} initialData={undefined} />
    )

    expect((screen.getByLabelText(/título/i) as HTMLInputElement).value).toBe('')
    expect((screen.getByLabelText(/preço/i) as HTMLInputElement).value).toBe('0')
  })

  it('F4-CA2: campos mostram dados de B ao trocar de produto A para produto B', () => {
    const { rerender } = renderForm(productA)

    expect((screen.getByLabelText(/título/i) as HTMLInputElement).value).toBe('Produto A')

    rerender(
      <ProductForm isOpen={true} onClose={vi.fn()} onSubmit={vi.fn().mockResolvedValue(undefined)} initialData={productB} />
    )

    expect((screen.getByLabelText(/título/i) as HTMLInputElement).value).toBe('Produto B')
    expect((screen.getByLabelText(/preço/i) as HTMLInputElement).value).toBe('200')
  })

  it('F6-CA1: campo preço tem atributo min="0.01"', () => {
    renderForm()
    const priceInput = screen.getByLabelText(/preço/i)
    expect(priceInput.getAttribute('min')).toBe('0.01')
  })
})
