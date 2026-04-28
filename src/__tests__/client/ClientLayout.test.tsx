import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import ClientLayout from '../../components/layout/ClientLayout'

vi.mock('../../store/authStore', () => ({
  useAuthStore: () => ({ logout: vi.fn(), username: 'testuser' }),
}))

vi.mock('../../store/cartStore', () => ({
  useCartStore: () => ({ items: [], addToCart: vi.fn() }),
}))

vi.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: vi.fn() }),
}))

function renderLayout(initialEntry = '/store') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/store" element={<div>store content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('ClientLayout — busca reflete ?q= da URL', () => {
  it('F2-CA1: input desktop exibe o termo da URL ao carregar /store?q=tenis', () => {
    renderLayout('/store?q=tenis')
    const input = screen.getByRole<HTMLInputElement>('searchbox', { name: /buscar produtos/i })
    expect(input.value).toBe('tenis')
  })

  it('F2-CA2: input vazio ao carregar /store sem ?q=', () => {
    renderLayout('/store')
    const input = screen.getByRole<HTMLInputElement>('searchbox', { name: /buscar produtos/i })
    expect(input.value).toBe('')
  })
})
