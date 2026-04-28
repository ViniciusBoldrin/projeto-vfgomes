import { render, screen } from '@testing-library/react'
import { ProductCard } from '../../components/shared/ProductCard'
import type { Product } from '../../types/product'

const mockProduct: Product = {
  id: 1,
  title: 'Camiseta Preta',
  price: 99.9,
  description: 'Camiseta premium',
  category: "men's clothing",
  image: 'https://example.com/img.jpg',
  rating: { rate: 4.5, count: 10 },
}

describe('ProductCard — design system Zattini', () => {
  it('container de imagem tem aspect-[3/4]', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const imageContainer = document.querySelector('[class*="aspect-"]')
    expect(imageContainer?.className).toContain('aspect-[3/4]')
  })

  it('container raiz tem rounded-lg (border-radius 8px)', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const root = document.querySelector('[class*="rounded-lg"]')
    expect(root).toBeTruthy()
  })

  it('container raiz NÃO tem rounded-xl', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const html = document.body.innerHTML
    expect(html).not.toMatch(/rounded-xl/)
  })

  it('container raiz tem hover:shadow-md (elevação ao hover)', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const root = document.querySelector('[class*="hover:shadow"]')
    expect(root).toBeTruthy()
  })

  it('botão de adicionar tem data-action="add-to-cart"', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const btn = document.querySelector('[data-action="add-to-cart"]')
    expect(btn).toBeTruthy()
  })

  it('botão de adicionar usa --c-brand como backgroundColor', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const btn = document.querySelector('[data-action="add-to-cart"]') as HTMLElement
    expect(btn?.style.backgroundColor).toBe('var(--c-brand)')
  })

  it('botão de adicionar tem translate-y-full (slide-up, não fade)', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const btn = screen.getByRole('button', { name: /adicionar/i })
    expect(btn.className).toContain('translate-y-full')
    expect(btn.className).toContain('group-hover:translate-y-0')
  })

  it('título do produto tem lowercase e font-light', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const title = screen.getByText('camiseta preta')
    expect(title.className).toContain('lowercase')
    expect(title.className).toContain('font-light')
  })
})
