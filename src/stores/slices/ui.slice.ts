import { StateCreator } from 'zustand'

export interface UISlice {
  sidebar: {
    isOpen: boolean
    width: number
  }
  theme: 'light' | 'dark'
  actions: {
    toggleSidebar: () => void
    setSidebarWidth: (width: number) => void
    setTheme: (theme: UISlice['theme']) => void
  }
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
  sidebar: {
    isOpen: true,
    width: 240
  },
  theme: 'light',
  actions: {
    toggleSidebar: () => 
      set((state) => ({
        sidebar: { ...state.sidebar, isOpen: !state.sidebar.isOpen }
      })),
    setSidebarWidth: (width) =>
      set((state) => ({
        sidebar: { ...state.sidebar, width }
      })),
    setTheme: (theme) => set({ theme })
  }
}) 