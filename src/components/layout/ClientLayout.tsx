import { useState } from 'react'
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom'
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
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '')

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
        className="h-14 sticky top-0 z-40 shrink-0 border-b"
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
              className="font-sans font-bold text-sm tracking-[0.3em] uppercase hover:opacity-60 transition-opacity"
              style={{ color: 'var(--c-text)' }}
            >
              VF GOMES outlet
            </Link>
          </div>

          {/* Direita — ações */}
          <div className="flex items-center justify-end gap-3 w-1/3">
            {/* Busca — campo inline em desktop */}
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
                  data-badge="cart"
                  className="absolute -top-1 -right-1 text-white text-[10px] w-4 h-4 flex items-center justify-center leading-none rounded-full"
                  style={{ backgroundColor: 'var(--c-brand)' }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Compra Segura */}
            <div className="hidden md:flex items-center gap-1" style={{ color: 'var(--c-muted)' }}>
              <svg width="12" height="14" viewBox="0 0 22 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.5 7H18A7 7 0 1 0 4 7h1.5a5.5 5.5 0 1 1 11 0ZM20.5 8.5h-19v15h19v-15ZM0 7v18h22V7H0Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="m11.5 16.566.5-.448a1.5 1.5 0 1 0-2 0l.5.448V20a.5.5 0 0 0 1 0v-3.434Zm1.5.67V20a2 2 0 1 1-4 0v-2.764a3 3 0 1 1 4 0Z" />
              </svg>
              <span className="text-xs">Compra Segura</span>
            </div>

            {/* Tema */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
              className="p-1.5 rounded-md transition-colors focus-visible:outline-none hover:opacity-70"
              style={{ color: 'var(--c-text)' }}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
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
