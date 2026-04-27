import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute, AdminRoute, PublicOnlyRoute } from '../../components/layout/PrivateRoute'
import { useAuthStore } from '../../store/authStore'

beforeEach(() => {
  useAuthStore.setState({ token: null, username: null, role: null })
})

describe('PrivateRoute', () => {
  it('CA-F4-1: unauthenticated user is redirected to /login', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <div>Admin Content</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument()
  })

  it('CA-F4-1: authenticated user can access protected route', () => {
    useAuthStore.setState({ token: 'valid-token', username: 'admin', role: 'admin' })

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <div>Admin Content</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Admin Content')).toBeInTheDocument()
  })

  it('CA-F4-2: client role cannot access admin routes', () => {
    useAuthStore.setState({ token: 'valid-token', username: 'client', role: 'client' })

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/store" element={<div>Store Page</div>} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <div>Admin Content</div>
              </AdminRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Store Page')).toBeInTheDocument()
    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument()
  })

  it('CA-F1-4: logged-in user visiting /login is redirected to their area', () => {
    useAuthStore.setState({ token: 'valid-token', username: 'admin', role: 'admin' })

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <div>Login Page</div>
              </PublicOnlyRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
  })
})
