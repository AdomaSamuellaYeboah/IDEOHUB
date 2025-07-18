import { create } from 'zustand';

const mockBoards = [
  {
    id: '1',
    title: 'Project Ideas',
    description: 'Brainstorming for new projects',
    layout: 'grid',
    isPublic: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ownerId: 'user1',
    coverImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71',
  },
  {
    id: '2',
    title: 'Weekly Planning',
    description: 'Team tasks and goals',
    layout: 'timeline',
    isPublic: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ownerId: 'user1',
    coverImage: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc',
  },
  {
    id: '3',
    title: 'Design Inspiration',
    layout: 'stream',
    isPublic: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ownerId: 'user1',
    coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766',
  }
];

const mockPosts = [
  {
    id: '101',
    boardId: '1',
    content: {
      text: 'Mobile app for plant care tracking',
      imageUrl: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'user1',
    position: { x: 10, y: 10 },
  },
  {
    id: '102',
    boardId: '1',
    content: {
      text: 'AI-powered recipe generator',
      linkUrl: 'https://example.com/ai-recipes',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'user1',
    position: { x: 250, y: 50 },
  },
  {
    id: '103',
    boardId: '1',
    content: {
      text: 'Smart home dashboard concept',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'user2',
    position: { x: 100, y: 200 },
  }
];

export const useBoardStore = create((set, get) => ({
  boards: mockBoards,
  currentBoard: null,
  posts: [],
  isLoading: false,
  error: null,
  
  fetchBoards: async () => {
    set({ isLoading: true, error: null });
    try {
      set({ boards: mockBoards, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch boards', isLoading: false });
    }
  },
  
  fetchBoardById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const board = mockBoards.find(b => b.id === id) || null;
      set({ currentBoard: board, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch board', isLoading: false });
    }
  },
  
  createBoard: async (board) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const newBoard = {
        id: Date.now().toString(),
        title: board.title || 'Untitled Board',
        layout: board.layout || 'grid',
        isPublic: board.isPublic || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ownerId: 'user1', // In a real app, this would be the current user's ID
        ...board,
      };
      
      set(state => ({ 
        boards: [...state.boards, newBoard],
        isLoading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to create board', isLoading: false });
    }
  },
  
  updateBoard: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      set(state => ({
        boards: state.boards.map(board => 
          board.id === id 
            ? { ...board, ...updates, updatedAt: new Date().toISOString() } 
            : board
        ),
        currentBoard: state.currentBoard?.id === id 
          ? { ...state.currentBoard, ...updates, updatedAt: new Date().toISOString() } 
          : state.currentBoard,
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update board', isLoading: false });
    }
  },
  
  deleteBoard: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      set(state => ({
        boards: state.boards.filter(board => board.id !== id),
        currentBoard: state.currentBoard?.id === id ? null : state.currentBoard,
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete board', isLoading: false });
    }
  },
  
  changeLayout: async (id, layout) => {
    get().updateBoard(id, { layout });
  },
  
  fetchPosts: async (boardId) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const boardPosts = mockPosts.filter(post => post.boardId === boardId);
      set({ posts: boardPosts, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', isLoading: false });
    }
  },
  
  createPost: async (post) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const newPost = {
        id: Date.now().toString(),
        boardId: post.boardId || '',
        content: post.content || { text: '' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'user1', // In a real app, this would be the current user's ID
        position: post.position || { x: 0, y: 0 },
      };
      
      set(state => ({ 
        posts: [...state.posts, newPost],
        isLoading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to create post', isLoading: false });
    }
  },
  
  updatePost: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      set(state => ({
        posts: state.posts.map(post => 
          post.id === id 
            ? { ...post, ...updates, updatedAt: new Date().toISOString() } 
            : post
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update post', isLoading: false });
    }
  },
  
  deletePost: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      set(state => ({
        posts: state.posts.filter(post => post.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete post', isLoading: false });
    }
  },
  
  movePost: async (id, position) => {
    get().updatePost(id, { position });
  },
}));