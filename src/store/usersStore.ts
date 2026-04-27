import { create } from 'zustand'
import type { FakeStoreUser, UserFormData } from '../types/user'
import { usersService } from '../services/usersService'
import { getItem, setItem } from '../utils/localStorage'

const STORAGE_KEY = 'admin_users'

interface UsersStore {
  users: FakeStoreUser[]
  loading: boolean
  error: string | null
  init: () => Promise<void>
  addUser: (data: UserFormData) => Promise<void>
  updateUser: (id: number, data: UserFormData) => Promise<void>
  removeUser: (id: number) => Promise<void>
}

export const useUsersStore = create<UsersStore>()((set, get) => ({
  users: [],
  loading: false,
  error: null,

  init: async () => {
    if (get().users.length > 0) return
    const cached = getItem<FakeStoreUser[]>(STORAGE_KEY)
    if (cached && cached.length > 0) {
      set({ users: cached })
      return
    }
    set({ loading: true, error: null })
    try {
      const users = await usersService.getAll()
      setItem(STORAGE_KEY, users)
      set({ users, loading: false })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
    }
  },

  addUser: async (data) => {
    try { await usersService.create(data) } catch {}
    const newUser: FakeStoreUser = {
      id: Date.now(),
      email: data.email,
      username: data.username,
      password: data.password,
      name: { firstname: data.firstname, lastname: data.lastname },
      phone: data.phone,
      address: {
        city: '',
        street: '',
        number: 0,
        zipcode: '',
        geolocation: { lat: '', long: '' },
      },
    }
    const users = [...get().users, newUser]
    setItem(STORAGE_KEY, users)
    set({ users })
  },

  updateUser: async (id, data) => {
    try { await usersService.update(id, data) } catch {}
    const users = get().users.map((u) =>
      u.id === id
        ? {
            ...u,
            email: data.email,
            username: data.username,
            name: { firstname: data.firstname, lastname: data.lastname },
            phone: data.phone,
          }
        : u
    )
    setItem(STORAGE_KEY, users)
    set({ users })
  },

  removeUser: async (id) => {
    try { await usersService.remove(id) } catch {}
    const users = get().users.filter((u) => u.id !== id)
    setItem(STORAGE_KEY, users)
    set({ users })
  },
}))
