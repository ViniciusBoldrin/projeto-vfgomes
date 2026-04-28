import { render, screen } from '@testing-library/react'
import { Footer } from '../../components/ui/Footer'

describe('Footer — design system Polish', () => {
  it('renderiza um elemento <footer>', () => {
    render(<Footer />)
    expect(document.querySelector('footer')).toBeTruthy()
  })

  it('contém o copyright © 2026 FAKESTORE', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 FAKESTORE/i)).toBeInTheDocument()
  })

  it('copyright tem classe font-serif', () => {
    render(<Footer />)
    const text = screen.getByText(/© 2026 FAKESTORE/i)
    expect(text.className).toContain('font-serif')
  })

  it('copyright tem texto uppercase e tracking largo', () => {
    render(<Footer />)
    const text = screen.getByText(/© 2026 FAKESTORE/i)
    expect(text.className).toContain('uppercase')
    expect(text.className).toContain('tracking-')
  })
})
