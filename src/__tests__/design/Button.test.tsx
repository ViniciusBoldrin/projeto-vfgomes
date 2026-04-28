import { render, screen } from '@testing-library/react'
import { Button } from '../../components/ui/Button'

describe('Button — design system Zara', () => {
  it('variante primary tem bg-black', () => {
    render(<Button variant="primary">Confirmar</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-black')
  })

  it('não tem rounded-lg nem rounded-xl', () => {
    render(<Button>Confirmar</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).not.toContain('rounded-lg')
    expect(btn.className).not.toContain('rounded-xl')
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
})
