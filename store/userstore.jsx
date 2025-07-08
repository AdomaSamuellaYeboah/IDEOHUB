import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      theme: 'system',
      setUser: (user) => set({ user, isAuthenticated: true }),
      setTheme: (theme) => set({ theme }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);