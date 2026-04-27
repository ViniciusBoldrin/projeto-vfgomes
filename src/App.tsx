import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { PrivateRoute, AdminRoute, ClientRoute, PublicOnlyRoute } from './components/layout/PrivateRoute'
import AdminLayout from './components/layout/AdminLayout'
import ClientLayout from './components/layout/ClientLayout'
import LoginPage from './pages/Login/LoginPage'
import DashboardPage from './pages/admin/Dashboard/DashboardPage'
import UsersPage from './pages/admin/Users/UsersPage'
import ProductsPage from './pages/admin/Products/ProductsPage'
import StorePage from './pages/client/Store/StorePage'
import CartPage from './pages/client/Cart/CartPage'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsPage />} />
          </Route>

          <Route
            path="/store"
            element={
              <PrivateRoute>
                <ClientRoute>
                  <ClientLayout />
                </ClientRoute>
              </PrivateRoute>
            }
          >
            <Route index element={<StorePage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
