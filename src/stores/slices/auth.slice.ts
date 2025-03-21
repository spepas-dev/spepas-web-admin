import { StateCreator } from 'zustand'
import { User } from '@/types'


export interface AuthSlice {
  token: string | null
  user: User | null
  refresh_token: string | null
  isAuthenticated: boolean
  actions: {
    setToken: (token: string | null) => void
    setRefreshToken: (refresh_token: string | null) => void
    setUser: (user: AuthSlice['user']) => void
    logout: () => void
  }
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  token: null,
  refresh_token: null,
  user: null,
  isAuthenticated: false,
  actions: {
    setToken: (token) => set({ token, isAuthenticated: !!token }),
    setRefreshToken: (refresh_token) => set({ refresh_token, isAuthenticated: !!refresh_token }),
    setUser: (user) => set({ user }),
    logout: () => set({ token: null, user: null, isAuthenticated: false })
  }
})  