import { render, screen } from '@testing-library/react'
import { Button } from '../../components/ui/Button'

describe('Button — design system Zattini', () => {
  it('variante primary tem data-variant="primary"', () => {
    render(<Button variant="primary">Confirmar</Button>)
    const btn = screen.getByRole('button')
    expect(btn.dataset.variant).toBe('primary')
  })

  it('variante primary usa --c-brand como backgroundColor', () => {
    render(<Button variant="primary">Confirmar</Button>)
    const btn = screen.getByRole('button')
    expect(btn.style.backgroundColor).toBe('var(--c-brand)')
  })

  it('variante secondary tem data-variant="secondary"', () => {
    render(<Button variant="secondary">Cancelar</Button>)
    const btn = screen.getByRole('button')
    expect(btn.dataset.variant).toBe('secondary')
  })

  it('variante secondary usa --c-accent como borderColor', () => {
    render(<Button variant="secondary">Cancelar</Button>)
    const btn = screen.getByRole('button')
    expect(btn.style.borderColor).toBe('var(--c-accent)')
  })

  it('tem rounded-lg (border-radius 8px Zattini)', () => {
    render(<Button>Confirmar</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('rounded-lg')
  })

  it('tem font-semibold (font-weight 600 Zattini)', () => {
    render(<Button>Confirmar</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('font-semibold')
  })

  it('tem uppercase e tracking-widest', () => {
    render(<Button>Confirmar</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('uppercase')
    expect(btn.className).toContain('tracking-widest')
  })

  it('não tem hover:scale (sem efeito de escala)', () => {
    render(<Button>Confirmar</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).not.toContain('hover:scale')
  })

  it('variante danger tem borda vermelha', () => {
    render(<Button variant="danger">Excluir</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('border-red-600')
  })

  it('loading desativa o botão', () => {
    render(<Button loading>Salvando</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
  })
})
