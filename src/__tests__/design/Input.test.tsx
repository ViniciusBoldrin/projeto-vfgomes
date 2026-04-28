import { render, screen } from '@testing-library/react'
import { Input } from '../../components/ui/Input'

describe('Input — design system Zara', () => {
  it('tem border-b (linha inferior)', () => {
    render(<Input label="Nome" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('border-b')
  })

  it('não tem rounded-lg', () => {
    render(<Input label="Nome" />)
    const input = screen.getByRole('textbox')
    expect(input.className).not.toContain('rounded-lg')
    expect(input.className).not.toContain('rounded-md')
  })

  it('tem bg-transparent', () => {
    render(<Input label="Nome" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('bg-transparent')
  })

  it('label tem texto uppercase e tracking-widest', () => {
    render(<Input label="Nome" />)
    const label = screen.getByText('Nome')
    expect(label.className).toContain('uppercase')
    expect(label.className).toContain('tracking-widest')
  })
})
