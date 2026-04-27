import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useCartStore } from '../../store/cartStore'
import { useTheme } from '../../context/ThemeContext'

export default function ClientLayout() {
  const navigate = useNavigate()
  const { logout, username } = useAuthStore()
  const { items } = useCartStore()
  const { theme, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    // Search query is passed via URL or context - for now navigate to store
    navigate(`/store?q=${encodeURIComponent(searchQuery)}`)
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6 gap-4 shrink-0">
        <Link
          to="/store"
          className="font-bold text-lg text-blue-600 dark:text-blue-400 shrink-0 hover:text-blue-700 transition-colors"
        >
          FakeStore
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-sm hidden sm:flex">
          <label htmlFor="search" className="sr-only">Buscar produtos</label>
          <input
            id="search"
            type="search"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </form>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">{username}</span>

          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <Link
            to="/store/cart"
            aria-label={`Carrinho com ${cartCount} itens`}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6">
        <Outlet />
      </main>
    </div>
  )
}
