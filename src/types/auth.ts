export type UserRole = 'admin' | 'client'

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
}

export interface AuthState {
  token: string | null
  username: string | null
  role: UserRole | null
}
