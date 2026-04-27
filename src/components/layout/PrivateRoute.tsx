import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface RouteProps {
  children: React.ReactNode
}

export function PrivateRoute({ children }: RouteProps) {
  const token = useAuthStore((s) => s.token)
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

export function AdminRoute({ children }: RouteProps) {
  const role = useAuthStore((s) => s.role)
  if (role !== 'admin') return <Navigate to="/store" replace />
  return <>{children}</>
}

export function ClientRoute({ children }: RouteProps) {
  const role = useAuthStore((s) => s.role)
  if (role !== 'client') return <Navigate to="/admin/dashboard" replace />
  return <>{children}</>
}

export function PublicOnlyRoute({ children }: RouteProps) {
  const { token, role } = useAuthStore()
  if (token) {
    const dest = role === 'admin' ? '/admin/dashboard' : '/store'
    return <Navigate to={dest} replace />
  }
  return <>{children}</>
}
