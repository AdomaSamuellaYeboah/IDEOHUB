import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeColors } from '../constants/colors';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      theme: 'light', // Default to light theme
      setUser: (user) => set({ user, isAuthenticated: true }),
      updateUser: (updatedUser) => set((state) => ({ 
        user: { ...state.user, ...updatedUser },
        isAuthenticated: true 
      })),
      // Helper selectors for following/followers count
      followingCount: () => get().user?.following?.length || 0,
      followersCount: () => get().user?.followers?.length || 0,
      // Board like helpers
      likeBoard: (boardId) => set((state) => ({ user: { ...state.user, likedBoards: [...(state.user?.likedBoards || []), boardId] } })),
      unlikeBoard: (boardId) => set((state) => ({ user: { ...state.user, likedBoards: (state.user?.likedBoards || []).filter(id => id !== boardId) } })),
      isBoardLiked: (boardId) => !!get().user?.likedBoards?.includes(boardId),
      likedBoardsCount: () => get().user?.likedBoards?.length || 0,
      setTheme: (theme) => set({ theme }),
      logout: () => set({ user: null, isAuthenticated: false }),
      getThemeColors: (colorScheme) => {
        const { theme } = get();
        const actualTheme = theme === 'system' ? (colorScheme || 'light') : theme;
        return getThemeColors(actualTheme);
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);