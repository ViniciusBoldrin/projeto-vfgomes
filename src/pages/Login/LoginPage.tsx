import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import { useAuthStore } from '../../store/authStore'

const ADMIN_USERNAME = 'mor_2314'

export default function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { token } = await authService.login({ username, password })
      const role = username === ADMIN_USERNAME ? 'admin' : 'client'
      setAuth({ token, username, role })
      navigate(role === 'admin' ? '/admin/dashboard' : '/store')
    } catch {
      setError('Credenciais inválidas. Verifique seu usuário e senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Lado esquerdo: imagem editorial */}
      <div className="hidden md:block bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/7667437/pexels-photo-7667437.jpeg?_gl=1*1hwbtlh*_ga*MTU0MDIwMzcxOC4xNzc3NDA2NDAw*_ga_8JE65Q40S6*czE3Nzc0MDY0MDAkbzEkZzEkdDE3Nzc0MDY0MjkkajMxJGwwJGgw"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Lado direito: formulário */}
      <div className="flex flex-col items-center justify-center px-8 md:px-16 bg-white dark:bg-black min-h-screen md:min-h-0">
        {/* Logo */}
        <h1 className="font-serif text-2xl tracking-[0.4em] uppercase text-black dark:text-white mb-12">
          VF GOMES outlet
        </h1>

        <form onSubmit={handleSubmit} noValidate className="w-full max-w-xs space-y-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="username"
                className="text-xs uppercase tracking-widest text-neutral-500"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label="username"
                className="w-full pb-2 bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-600 text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                placeholder="seu username"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-widest text-neutral-500"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="password"
                className="w-full pb-2 bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-600 text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="text-xs text-red-600 dark:text-red-400 py-2 border-b border-red-200"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-xs uppercase tracking-widest py-3.5 transition-colors hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

      </div>
    </div>
  )
}
