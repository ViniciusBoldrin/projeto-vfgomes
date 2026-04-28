import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useTheme } from '../../context/ThemeContext'

interface HeaderProps {
  onMenuToggle?: () => void
  showMenu?: boolean
  cartCount?: number
  onCartClick?: () => void
  onSearchToggle?: () => void
  searchOpen?: boolean
  showCart?: boolean
  navLinks?: { label: string; href: string }[]
}

export function Header({
  showMenu,
  cartCount = 0,
  onCartClick,
  onSearchToggle,
  searchOpen,
  showCart,
}: HeaderProps) {
  const navigate = useNavigate()
  const { logout, username } = useAuthStore()
  const { theme, toggleTheme } = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <>
      <header className="h-12 sticky top-0 z-40 bg-white dark:bg-black border-b border-neutral-100 dark:border-neutral-900 flex items-center justify-between px-4 shrink-0">
        {/* Esquerda */}
        <div className="flex items-center gap-4 w-1/3">
          {showMenu !== undefined && (
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menu"
              className="flex flex-col gap-1 p-1 focus-visible:outline-none"
            >
              <span className="block w-4 h-px bg-black dark:bg-white" />
              <span className="block w-4 h-px bg-black dark:bg-white" />
              <span className="block w-4 h-px bg-black dark:bg-white" />
            </button>
          )}
          {showMenu === undefined && (
            <nav className="hidden md:flex items-center gap-6">
              <span className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                {username}
              </span>
            </nav>
          )}
        </div>

        {/* Centro — Logo */}
        <div className="flex justify-center w-1/3">
          <span className="font-serif text-sm tracking-[0.3em] uppercase text-black dark:text-white select-none">
            FAKESTORE
          </span>
        </div>

        {/* Direita */}
        <div className="flex items-center justify-end gap-3 w-1/3">
          {onSearchToggle && (
            <button
              onClick={onSearchToggle}
              aria-label={searchOpen ? 'Fechar busca' : 'Abrir busca'}
              className="p-1 text-neutral-500 hover:text-black dark:hover:text-white transition-colors focus-visible:outline-none"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          )}

          {showCart && (
            <button
              onClick={onCartClick}
              aria-label="Ver carrinho"
              className="relative p-1 text-neutral-500 hover:text-black dark:hover:text-white transition-colors focus-visible:outline-none"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-[10px] w-4 h-4 flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-1 text-neutral-500 hover:text-black dark:hover:text-white transition-colors focus-visible:outline-none text-xs"
          >
            {theme === 'dark' ? '○' : '●'}
          </button>

          <button
            onClick={handleLogout}
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors focus-visible:outline-none"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Drawer mobile */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/60"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="animate-slide-right fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black border-r border-neutral-100 dark:border-neutral-900 flex flex-col p-6">
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Fechar menu"
              className="self-end text-neutral-400 hover:text-black dark:hover:text-white mb-8 focus-visible:outline-none"
            >
              ✕
            </button>
            <span className="text-xs uppercase tracking-widest text-neutral-400 mb-6">Menu</span>
            <nav className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                {username}
              </span>
              <button
                onClick={() => { setDrawerOpen(false); handleLogout() }}
                className="text-left text-xs uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
              >
                Sair
              </button>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
