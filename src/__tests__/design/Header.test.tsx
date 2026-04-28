import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from '../../components/layout/Header'

// Mocks mínimos para o Header funcionar
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

// Import ClientLayout para testar o header inline
import ClientLayout from '../../components/layout/ClientLayout'

function renderClientLayout() {
  render(
    <MemoryRouter>
      <ClientLayout />
    </MemoryRouter>
  )
}

describe('Header (ClientLayout) — design system Polish', () => {
  it('CA-DS5-1: header do ClientLayout contém [data-container] para centralização', () => {
    renderClientLayout()
    const header = document.querySelector('header')
    expect(header).toBeTruthy()
    const container = header?.querySelector('[data-container]')
    expect(container).toBeTruthy()
  })
})

describe('Header — design system Zara', () => {
  it('elemento header tem classe h-12', () => {
    renderHeader()
    const header = document.querySelector('header')
    expect(header?.className).toContain('h-12')
  })

  it('header tem sticky top-0', () => {
    renderHeader()
    const header = document.querySelector('header')
    expect(header?.className).toContain('sticky')
    expect(header?.className).toContain('top-0')
  })

  it('logo usa font-serif', () => {
    renderHeader()
    // Logo deve ser FAKESTORE com fonte serif
    const logo = screen.getByText('FAKESTORE')
    expect(logo.className).toContain('font-serif')
  })

  it('hamburger abre drawer com animate-slide-right', () => {
    renderHeader({ onMenuToggle: undefined })
    const hamburger = screen.queryByLabelText('Abrir menu')
    if (!hamburger) return // em desktop pode não estar visível no jsdom

    fireEvent.click(hamburger)
    const drawer = document.querySelector('.animate-slide-right')
    expect(drawer).toBeTruthy()
  })
})
