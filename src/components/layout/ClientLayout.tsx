import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useCartStore } from '../../store/cartStore'
import { useTheme } from '../../context/ThemeContext'
import { Container } from '../ui/Container'
import { Footer } from '../ui/Footer'

export default function ClientLayout() {
  const navigate = useNavigate()
  const { logout, username } = useAuthStore()
  const { items } = useCartStore()
  const { theme, toggleTheme } = useTheme()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate(`/store?q=${encodeURIComponent(searchQuery)}`)
    setSearchOpen(false)
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)' }}>
      {/* Header — centrado via Container */}
      <header
        className="h-12 sticky top-0 z-40 shrink-0 border-b"
        style={{
          borderColor: 'var(--c-border)',
          backgroundColor: 'var(--c-bg)',
        }}
      >
        <Container className="h-full flex items-center justify-between gap-4">
          {/* Esquerda — username em desktop */}
          <div className="flex items-center w-1/3">
            <span
              className="hidden md:block text-xs uppercase tracking-widest"
              style={{ color: 'var(--c-muted)' }}
            >
              {username}
            </span>
          </div>

          {/* Centro — Logo */}
          <div className="flex justify-center w-1/3">
            <Link
              to="/store"
              className="font-serif text-sm tracking-[0.4em] uppercase hover:opacity-60 transition-opacity"
              style={{ color: 'var(--c-text)' }}
            >
              FAKESTORE
            </Link>
          </div>

          {/* Direita — ações */}
          <div className="flex items-center justify-end gap-3 w-1/3">
            {/* Busca — ícone em mobile, campo inline em desktop */}
            <div className="hidden md:flex items-center gap-2">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <label htmlFor="search-desktop" className="sr-only">Buscar produtos</label>
                <input
                  id="search-desktop"
                  type="search"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs pb-0.5 bg-transparent border-0 border-b w-32 focus:w-48 transition-all duration-300 focus:outline-none"
                  style={{
                    borderColor: 'var(--c-border)',
                    color: 'var(--c-text)',
                  }}
                />
              </form>
            </div>

            {/* Busca mobile — ícone */}
            <button
              onClick={() => setSearchOpen((o) => !o)}
              aria-label={searchOpen ? 'Fechar busca' : 'Abrir busca'}
              className="md:hidden p-1 transition-colors focus-visible:outline-none"
              style={{ color: 'var(--c-muted)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Carrinho */}
            <Link
              to="/store/cart"
              aria-label={`Carrinho com ${cartCount} itens`}
              className="relative p-1 transition-colors focus-visible:outline-none"
              style={{ color: 'var(--c-muted)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-[10px] w-4 h-4 flex items-center justify-center leading-none"
                  style={{
                    backgroundColor: 'var(--c-text)',
                    color: 'var(--c-bg)',
                  }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Tema */}
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="p-1 text-xs transition-colors focus-visible:outline-none"
              style={{ color: 'var(--c-muted)' }}
            >
              {theme === 'dark' ? '○' : '●'}
            </button>

            {/* Sair */}
            <button
              onClick={handleLogout}
              className="hidden md:block text-xs uppercase tracking-widest transition-colors focus-visible:outline-none"
              style={{ color: 'var(--c-muted)' }}
            >
              Sair
            </button>
          </div>
        </Container>
      </header>

      {/* Busca expandível — mobile */}
      {searchOpen && (
        <div
          className="border-b animate-fade-up"
          style={{ borderColor: 'var(--c-border)', backgroundColor: 'var(--c-bg)' }}
        >
          <Container className="py-3">
            <form onSubmit={handleSearch} className="flex items-center gap-4">
              <label htmlFor="search-mobile" className="sr-only">Buscar produtos</label>
              <input
                id="search-mobile"
                type="search"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 pb-1 bg-transparent border-0 border-b text-sm focus:outline-none transition-colors"
                style={{
                  borderColor: 'var(--c-border)',
                  color: 'var(--c-text)',
                }}
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-widest transition-colors"
                style={{ color: 'var(--c-muted)' }}
              >
                Buscar
              </button>
            </form>
          </Container>
        </div>
      )}

      {/* Conteúdo principal */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
