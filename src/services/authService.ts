import api from './api'
import type { AuthResponse, LoginCredentials } from '../types/auth'
import type { FakeStoreUser } from '../types/user'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  async getUserByUsername(username: string): Promise<FakeStoreUser | null> {
    const response = await api.get<FakeStoreUser[]>('/users')
    return response.data.find((u) => u.username === username) ?? null
  },
}
