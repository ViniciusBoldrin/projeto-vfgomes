import { create } from 'zustand'
import type { AuthState, UserRole } from '../types/auth'
import { getItem, setItem, removeItem } from '../utils/localStorage'

export const ADMIN_USERNAME = 'mor_2314'

interface AuthStore extends AuthState {
  setAuth: (payload: { token: string; username: string; role: UserRole }) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
  token: getItem<string>('auth_token'),
  username: getItem<string>('auth_username'),
  role: getItem<UserRole>('auth_role'),

  setAuth: ({ token, username, role }) => {
    setItem('auth_token', token)
    setItem('auth_username', username)
    setItem('auth_role', role)
    set({ token, username, role })
  },

  logout: () => {
    removeItem('auth_token')
    removeItem('auth_username')
    removeItem('auth_role')
    set({ token: null, username: null, role: null })
  },
}))
