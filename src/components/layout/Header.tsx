import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/Button'

interface HeaderProps {
  onMenuToggle?: () => void
  showMenu?: boolean
}

export function Header({ onMenuToggle, showMenu }: HeaderProps) {
  const navigate = useNavigate()
  const { logout, username } = useAuthStore()
  const { theme, toggleTheme } = useTheme()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3">
        {showMenu !== undefined && (
          <button
            onClick={onMenuToggle}
            aria-label="Abrir menu"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <span className="block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1" />
            <span className="block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1" />
            <span className="block w-5 h-0.5 bg-gray-600 dark:bg-gray-300" />
          </button>
        )}
        <span className="font-bold text-lg text-blue-600 dark:text-blue-400">FakeStore</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
          {username}
        </span>

        <button
          onClick={toggleTheme}
          aria-label="Alternar tema"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <Button variant="ghost" onClick={handleLogout} className="text-sm">
          Sair
        </Button>
      </div>
    </header>
  )
}
