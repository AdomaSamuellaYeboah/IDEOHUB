import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeColors } from '../constants/colors';

// Mock user profiles
const mockUsers = {
  'user1': {
    id: 'user1',
    name: 'Alex Johnson',
    username: '@alexjohnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Product designer and creative thinker. Building the future of collaboration. Passionate about user experience and innovative design solutions that make a difference.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.design',
    followers: ['user2', 'user3'],
    following: ['user2'],
    likedBoards: ['1', '3'],
    boards: ['1', '2', '3'],
    createdAt: '2024-01-15T00:00:00.000Z',
  },
  'user2': {
    id: 'user2',
    name: 'Sarah Chen',
    username: '@sarahchen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'UX researcher and design strategist. Exploring human-centered design and creating meaningful digital experiences. Always curious about how people interact with technology.',
    location: 'New York, NY',
    website: 'https://sarahchen.ux',
    followers: ['user1'],
    following: ['user1'],
    likedBoards: ['1'],
    boards: ['4', '5'],
    createdAt: '2024-02-20T00:00:00.000Z',
  },
  'user3': {
    id: 'user3',
    name: 'Mike Rodriguez',
    username: '@mikerodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Frontend developer and design enthusiast. Creating beautiful digital experiences with clean code and modern technologies. Love exploring new frameworks and tools.',
    location: 'Austin, TX',
    website: 'https://mikerodriguez.dev',
    followers: [],
    following: ['user1'],
    likedBoards: ['1', '2'],
    boards: ['6'],
    createdAt: '2024-03-10T00:00:00.000Z',
  }
};

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: mockUsers['user1'], // Current user
      isAuthenticated: true,
      jwt: null,
      theme: 'light', // Default to light theme
      
      // User profile management
      getUserProfile: (userId) => {
        return mockUsers[userId] || null;
      },
      
      // Follow/Unfollow functionality
      followUser: (userId) => set((state) => {
        const currentUser = state.user;
        const targetUser = mockUsers[userId];
        
        if (!currentUser || !targetUser) return state;
        
        // Add to current user's following
        const updatedFollowing = [...(currentUser.following || []), userId];
        
        // Add current user to target's followers
        const updatedTargetFollowers = [...(targetUser.followers || []), currentUser.id];
        
        // Update mockUsers
        mockUsers[userId] = {
          ...targetUser,
          followers: updatedTargetFollowers
        };
        
        return {
          user: {
            ...currentUser,
            following: updatedFollowing
          }
        };
      }),
      
      unfollowUser: (userId) => set((state) => {
        const currentUser = state.user;
        const targetUser = mockUsers[userId];
        
        if (!currentUser || !targetUser) return state;
        
        // Remove from current user's following
        const updatedFollowing = (currentUser.following || []).filter(id => id !== userId);
        
        // Remove current user from target's followers
        const updatedTargetFollowers = (targetUser.followers || []).filter(id => id !== currentUser.id);
        
        // Update mockUsers
        mockUsers[userId] = {
          ...targetUser,
          followers: updatedTargetFollowers
        };
        
        return {
          user: {
            ...currentUser,
            following: updatedFollowing
          }
        };
      }),
      
      isFollowing: (userId) => {
        const state = get();
        return state.user?.following?.includes(userId) || false;
      },
      
      setUser: (updatedUser, isAuth, jwt) => set((state) => ({ 
        user: updatedUser,
        isAuthenticated: isAuth,
        jwt: jwt
      })),
      
      // Helper selectors for following/followers count
      followingCount: () => get().user?.following?.length || 0,
      followersCount: () => get().user?.followers?.length || 0,
      
      // Board like helpers
      likeBoard: (boardId) => set((state) => ({ 
        user: { 
          ...state.user, 
          likedBoards: [...(state.user?.likedBoards || []), boardId] 
        } 
      })),
      
      unlikeBoard: (boardId) => set((state) => ({ 
        user: { 
          ...state.user, 
          likedBoards: (state.user?.likedBoards || []).filter(id => id !== boardId) 
        } 
      })),
      
      isBoardLiked: (boardId) => !!get().user?.likedBoards?.includes(boardId),
      likedBoardsCount: () => get().user?.likedBoards?.length || 0,
      
      setTheme: (theme) => set({ theme }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // Memoized theme colors function to prevent infinite loops
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