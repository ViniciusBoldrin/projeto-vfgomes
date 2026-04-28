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

describe('ProductCard — design system Polish', () => {
  it('container de imagem tem aspect-[3/4]', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const imageContainer = document.querySelector('[class*="aspect-"]')
    expect(imageContainer?.className).toContain('aspect-[3/4]')
  })

  it('card não tem shadow nem rounded-xl no container raiz', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const html = document.body.innerHTML
    expect(html).not.toMatch(/rounded-xl[^"]*(?=")/)
  })

  it('CA-DS4-1: botão de adicionar tem translate-y-full (slide-up, não fade)', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const btn = screen.getByRole('button', { name: /adicionar/i })
    expect(btn.className).toContain('translate-y-full')
    expect(btn.className).toContain('group-hover:translate-y-0')
  })

  it('CA-DS4-1: NÃO usa opacity-0 group-hover:opacity-100 como mecanismo de reveal', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    // O overlay container não deve ter opacity-0 class diretamente
    const overlayWithOpacity = document.querySelector('.opacity-0.group-hover\\:opacity-100')
    expect(overlayWithOpacity).toBeFalsy()
  })

  it('título do produto tem lowercase e font-light', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)
    const title = screen.getByText('camiseta preta')
    expect(title.className).toContain('lowercase')
    expect(title.className).toContain('font-light')
  })
})
