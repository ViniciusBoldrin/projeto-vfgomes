import api from './api'
import type { FakeStoreUser, UserFormData } from '../types/user'

export const usersService = {
  async getAll(): Promise<FakeStoreUser[]> {
    const response = await api.get<FakeStoreUser[]>('/users')
    return response.data
  },

  async create(data: UserFormData): Promise<FakeStoreUser> {
    const response = await api.post<FakeStoreUser>('/users', data)
    return response.data
  },

  async update(id: number, data: UserFormData): Promise<FakeStoreUser> {
    const response = await api.put<FakeStoreUser>(`/users/${id}`, data)
    return response.data
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/users/${id}`)
  },
}
