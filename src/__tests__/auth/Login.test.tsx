import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import LoginPage from '../../pages/Login/LoginPage'
import { useAuthStore } from '../../store/authStore'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../services/authService', () => ({
  authService: {
    login: vi.fn(),
  },
}))

import { authService } from '../../services/authService'

beforeEach(() => {
  vi.clearAllMocks()
  useAuthStore.setState({ token: null, username: null, role: null })
})

function renderLogin() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  )
}

describe('LoginPage — design system Zara', () => {
  it('CA-D2-1: tem split layout md:grid-cols-2', () => {
    renderLogin()
    const splitLayout = document.querySelector('[class*="md:grid-cols-2"]')
    expect(splitLayout).toBeTruthy()
  })

  it('CA-D2-2: botão submit tem bg-black e uppercase', () => {
    renderLogin()
    const btn = screen.getByRole('button', { name: /entrar|login/i })
    expect(btn.className).toContain('bg-black')
    expect(btn.className).toContain('uppercase')
  })

  it('CA-D2-3: logo FAKESTORE tem font-serif', () => {
    renderLogin()
    const logo = screen.getByText('FAKESTORE')
    expect(logo.className).toContain('font-serif')
  })
})

describe('LoginPage', () => {
  it('CA-F1-1: admin credentials redirect to /admin/dashboard', async () => {
    vi.mocked(authService.login).mockResolvedValue({ token: 'fake-token' })

    renderLogin()

    await userEvent.type(screen.getByLabelText(/username/i), 'mor_2314')
    await userEvent.type(screen.getByLabelText(/password|senha/i), '83r5^_')
    await userEvent.click(screen.getByRole('button', { name: /entrar|login/i }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard')
    })
  })

  it('CA-F1-2: client credentials redirect to /store', async () => {
    vi.mocked(authService.login).mockResolvedValue({ token: 'fake-token' })

    renderLogin()

    await userEvent.type(screen.getByLabelText(/username/i), 'kevinryan')
    await userEvent.type(screen.getByLabelText(/password|senha/i), 'kev02937@')
    await userEvent.click(screen.getByRole('button', { name: /entrar|login/i }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/store')
    })
  })

  it('CA-F1-3: invalid credentials show error message', async () => {
    vi.mocked(authService.login).mockRejectedValue(new Error('Unauthorized'))

    renderLogin()

    await userEvent.type(screen.getByLabelText(/username/i), 'wronguser')
    await userEvent.type(screen.getByLabelText(/password|senha/i), 'wrongpass')
    await userEvent.click(screen.getByRole('button', { name: /entrar|login/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })
})
