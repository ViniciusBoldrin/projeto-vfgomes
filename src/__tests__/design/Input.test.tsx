import { render, screen } from '@testing-library/react'
import { Input } from '../../components/ui/Input'

describe('Input — design system Zattini', () => {
  it('wrapper tem classe input-wrapper', () => {
    render(<Input label="Nome" />)
    const wrapper = document.querySelector('.input-wrapper')
    expect(wrapper).toBeTruthy()
  })

  it('label tem classe input-label (posição absoluta flutuante)', () => {
    render(<Input label="Nome" />)
    const label = document.querySelector('.input-label')
    expect(label).toBeTruthy()
  })

  it('input tem classe input-field', () => {
    render(<Input label="Nome" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('input-field')
  })

  it('input tem placeholder com espaço (necessário para :not(:placeholder-shown))', () => {
    render(<Input label="Nome" />)
    const input = screen.getByRole('textbox')
    expect(input.getAttribute('placeholder')).toBe(' ')
  })

  it('tem border-b (linha inferior)', () => {
    render(<Input label="Nome" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('border-b')
  })

  it('tem bg-transparent', () => {
    render(<Input label="Nome" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('bg-transparent')
  })

  it('não tem rounded-lg no input', () => {
    render(<Input label="Nome" />)
    const input = screen.getByRole('textbox')
    expect(input.className).not.toContain('rounded-lg')
    expect(input.className).not.toContain('rounded-md')
  })

  it('label está associada ao input via htmlFor/id', () => {
    render(<Input label="Nome" />)
    const input = screen.getByRole('textbox')
    const label = document.querySelector('label')
    expect(label?.getAttribute('for')).toBe(input.id)
  })

  it('exibe mensagem de erro quando error prop é passada', () => {
    render(<Input label="Email" error="Campo obrigatório" />)
    expect(screen.getByText('Campo obrigatório')).toBeTruthy()
  })
})
