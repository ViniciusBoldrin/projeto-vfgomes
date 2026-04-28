import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from '../../components/layout/Header'

vi.mock('../../store/authStore', () => ({
  useAuthStore: () => ({ logout: vi.fn(), username: 'testuser' }),
}))

vi.mock('../../store/cartStore', () => ({
  useCartStore: () => ({ items: [] }),
}))

vi.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: vi.fn() }),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => vi.fn() }
})

function renderHeader(props = {}) {
  render(
    <MemoryRouter>
      <Header {...props} />
    </MemoryRouter>
  )
}

import ClientLayout from '../../components/layout/ClientLayout'

function renderClientLayout() {
  render(
    <MemoryRouter>
      <ClientLayout />
    </MemoryRouter>
  )
}

describe('Header (ClientLayout) — design system Zattini', () => {
  it('header do ClientLayout contém [data-container] para centralização', () => {
    renderClientLayout()
    const header = document.querySelector('header')
    expect(header).toBeTruthy()
    const container = header?.querySelector('[data-container]')
    expect(container).toBeTruthy()
  })
})

describe('Header — design system Zattini', () => {
  it('elemento header tem classe h-14 (56px)', () => {
    renderHeader()
    const header = document.querySelector('header')
    expect(header?.className).toContain('h-14')
  })

  it('header tem sticky top-0', () => {
    renderHeader()
    const header = document.querySelector('header')
    expect(header?.className).toContain('sticky')
    expect(header?.className).toContain('top-0')
  })

  it('logo exibe "VF GOMES"', () => {
    renderHeader()
    expect(screen.getByText('VF GOMES')).toBeTruthy()
  })

  it('logo usa font-sans font-bold (não font-serif)', () => {
    renderHeader()
    const logo = screen.getByText('VF GOMES')
    expect(logo.className).toContain('font-bold')
    expect(logo.className).not.toContain('font-serif')
  })

  it('"Compra Segura" é exibido quando showCart=true', () => {
    renderHeader({ showCart: true, onCartClick: vi.fn() })
    expect(screen.getByText('Compra Segura')).toBeTruthy()
  })

  it('badge do carrinho usa --c-brand como backgroundColor', () => {
    renderHeader({ showCart: true, cartCount: 3, onCartClick: vi.fn() })
    const badge = document.querySelector('[data-badge="cart"]')
    expect(badge).toBeTruthy()
    expect((badge as HTMLElement).style.backgroundColor).toBe('var(--c-brand)')
  })

  it('hamburger abre drawer com animate-slide-right', () => {
    renderHeader({ onMenuToggle: undefined })
    const hamburger = screen.queryByLabelText('Abrir menu')
    if (!hamburger) return

    fireEvent.click(hamburger)
    const drawer = document.querySelector('.animate-slide-right')
    expect(drawer).toBeTruthy()
  })
})
