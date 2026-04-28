import { render } from '@testing-library/react'
import { Container } from '../../components/ui/Container'

describe('Container — design system Polish', () => {
  it('size="wide" tem data-container="wide" e maxWidth var(--container-wide)', () => {
    const { container } = render(<Container size="wide"><span>content</span></Container>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute('data-container')).toBe('wide')
    expect(el.style.maxWidth).toBe('var(--container-wide)')
  })

  it('size="narrow" tem data-container="narrow" e maxWidth var(--container-narrow)', () => {
    const { container } = render(<Container size="narrow"><span>content</span></Container>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute('data-container')).toBe('narrow')
    expect(el.style.maxWidth).toBe('var(--container-narrow)')
  })

  it('size="full" tem data-container="full" e sem maxWidth', () => {
    const { container } = render(<Container size="full"><span>content</span></Container>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute('data-container')).toBe('full')
    expect(el.style.maxWidth).toBeFalsy()
  })

  it('tem classe mx-auto para centralizar', () => {
    const { container } = render(<Container><span>content</span></Container>)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('mx-auto')
  })

  it('default size é wide', () => {
    const { container } = render(<Container><span>content</span></Container>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute('data-container')).toBe('wide')
  })
})
