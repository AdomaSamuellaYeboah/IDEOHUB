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
    likes: ['user2', 'user3'],
    comments: ['comment1', 'comment2'],
    shares: 5,
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
    likes: ['user3'],
    comments: [],
    shares: 0,
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
    likes: ['user2'],
    comments: ['comment3'],
    shares: 2,
  }
];

// Mock comments data
const mockComments = {
  'comment1': {
    id: 'comment1',
    boardId: '1',
    userId: 'user2',
    text: 'Love these project ideas! The mobile app concept is really innovative.',
    createdAt: new Date('2024-01-20T10:30:00.000Z').toISOString(),
    updatedAt: new Date('2024-01-20T10:30:00.000Z').toISOString(),
  },
  'comment2': {
    id: 'comment2',
    boardId: '1',
    userId: 'user3',
    text: 'The AI recipe generator sounds amazing! Would love to see that built.',
    createdAt: new Date('2024-01-21T14:15:00.000Z').toISOString(),
    updatedAt: new Date('2024-01-21T14:15:00.000Z').toISOString(),
  },
  'comment3': {
    id: 'comment3',
    boardId: '3',
    userId: 'user2',
    text: 'Great design inspiration! The color palette is beautiful.',
    createdAt: new Date('2024-01-22T09:45:00.000Z').toISOString(),
    updatedAt: new Date('2024-01-22T09:45:00.000Z').toISOString(),
  }
};

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

// Sample posts for different template types
const templateSamplePosts = {
  'Brainstorm Wall': [
    {
      id: 'template-1',
      content: { text: 'Add your first idea here' },
      position: { x: 50, y: 50 },
    },
    {
      id: 'template-2',
      content: { text: 'Another great idea' },
      position: { x: 200, y: 100 },
    },
    {
      id: 'template-3',
      content: { text: 'Keep brainstorming!' },
      position: { x: 100, y: 200 },
    }
  ],
  'Timeline': [
    {
      id: 'template-1',
      content: { text: 'Start here' },
      position: { x: 50, y: 50 },
    },
    {
      id: 'template-2',
      content: { text: 'Next milestone' },
      position: { x: 200, y: 50 },
    },
    {
      id: 'template-3',
      content: { text: 'Final goal' },
      position: { x: 350, y: 50 },
    }
  ],
  'Feedback Shelf': [
    {
      id: 'template-1',
      content: { text: 'What went well?' },
      position: { x: 50, y: 50 },
    },
    {
      id: 'template-2',
      content: { text: 'What could be improved?' },
      position: { x: 50, y: 150 },
    },
    {
      id: 'template-3',
      content: { text: 'Action items' },
      position: { x: 50, y: 250 },
    }
  ],
  'Kanban Board': [
    {
      id: 'template-1',
      content: { text: 'To Do' },
      position: { x: 50, y: 50 },
    },
    {
      id: 'template-2',
      content: { text: 'In Progress' },
      position: { x: 200, y: 50 },
    },
    {
      id: 'template-3',
      content: { text: 'Done' },
      position: { x: 350, y: 50 },
    }
  ],
  'Q&A Shelf': [
    {
      id: 'template-1',
      content: { text: 'Frequently Asked Questions' },
      position: { x: 50, y: 50 },
    },
    {
      id: 'template-2',
      content: { text: 'Common Issues' },
      position: { x: 50, y: 150 },
    },
    {
      id: 'template-3',
      content: { text: 'Solutions' },
      position: { x: 50, y: 250 },
    }
  ],
  'Research Board': [
    {
      id: 'template-1',
      content: { text: 'Key Findings' },
      position: { x: 50, y: 50 },
    },
    {
      id: 'template-2',
      content: { text: 'Sources & References' },
      position: { x: 50, y: 150 },
    },
    {
      id: 'template-3',
      content: { text: 'Next Steps' },
      position: { x: 50, y: 250 },
    }
  ],
  'Design Sprint': [
    {
      id: 'template-1',
      content: { text: 'Understand' },
      position: { x: 50, y: 50 },
    },
    {
      id: 'template-2',
      content: { text: 'Define' },
      position: { x: 200, y: 50 },
    },
    {
      id: 'template-3',
      content: { text: 'Ideate' },
      position: { x: 350, y: 50 },
    },
    {
      id: 'template-4',
      content: { text: 'Prototype' },
      position: { x: 500, y: 50 },
    },
    {
      id: 'template-5',
      content: { text: 'Test' },
      position: { x: 650, y: 50 },
    }
  ],
  'Voting Wall': [
    {
      id: 'template-1',
      content: { text: 'Option A' },
      position: { x: 50, y: 50 },
    },
    {
      id: 'template-2',
      content: { text: 'Option B' },
      position: { x: 200, y: 50 },
    },
    {
      id: 'template-3',
      content: { text: 'Option C' },
      position: { x: 350, y: 50 },
    }
  ],
  'Story Timeline': [
    {
      id: 'template-1',
      content: { text: 'Beginning' },
      position: { x: 50, y: 50 },
    },
    {
      id: 'template-2',
      content: { text: 'Middle' },
      position: { x: 200, y: 50 },
    },
    {
      id: 'template-3',
      content: { text: 'End' },
      position: { x: 350, y: 50 },
    }
  ]
};

export const useBoardStore = create((set, get) => ({
  boards: mockBoards,
  currentBoard: null,
  posts: [],
  comments: mockComments,
  isLoading: false,
  error: null,
  
  fetchBoards: async () => {
    set({ isLoading: true, error: null });
    try {
      // Only set mock boards if no boards exist yet
      set(state => {
        if (state.boards.length === 0) {
          return { boards: mockBoards, isLoading: false };
        }
        return { isLoading: false };
      });
    } catch (error) {
      set({ error: 'Failed to fetch boards', isLoading: false });
    }
  },
  
  fetchBoardById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Look in the current boards state, not just mockBoards
      const state = get();
      const board = state.boards.find(b => b.id === id) || null;
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
        description: board.description || '',
        layout: board.layout || 'grid',
        isPublic: board.isPublic || false,
        backgroundColor: board.backgroundColor || '#4CAF50',
        category: board.category || 'General',
        coverImage: board.coverImage || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ownerId: 'user1', // In a real app, this would be the current user's ID
        likes: [],
        comments: [],
        shares: 0,
        ...board,
      };
      
      // Add sample posts if this is a template-based board
      let samplePosts = [];
      if (board.templateName && templateSamplePosts[board.templateName]) {
        samplePosts = templateSamplePosts[board.templateName].map((post, index) => ({
          ...post,
          id: `${newBoard.id}-sample-${index + 1}`,
          boardId: newBoard.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'user1',
        }));
      }
      
      set(state => {
        const updatedState = { 
          boards: [...state.boards, newBoard],
          posts: [...state.posts, ...samplePosts],
          isLoading: false 
        };
        return updatedState;
      });
    } catch (error) {
      set({ error: 'Failed to create board', isLoading: false });
    }
  },
  
  updateBoard: async (id, updates) => {
    console.log('updateBoard called with ID:', id, 'updates:', updates);
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      set(state => {
        const updatedBoards = state.boards.map(board => {
          if (board.id === id) {
            const updatedBoard = { ...board, ...updates, updatedAt: new Date().toISOString() };
            console.log('Updated board:', updatedBoard);
            return updatedBoard;
          }
          return board;
        });
        
        const updatedCurrentBoard = state.currentBoard?.id === id 
          ? { ...state.currentBoard, ...updates, updatedAt: new Date().toISOString() } 
          : state.currentBoard;
        
        console.log('Board updated successfully');
        return {
          boards: updatedBoards,
          currentBoard: updatedCurrentBoard,
          isLoading: false
        };
      });
    } catch (error) {
      console.error('Error updating board:', error);
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
        posts: state.posts.filter(post => post.boardId !== id), // Also remove associated posts
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
      // Look in the current posts state, not just mockPosts
      const state = get();
      const boardPosts = state.posts.filter(post => post.boardId === boardId);
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
  
  // Social interaction functions
  likeBoard: async (boardId, userId) => {
    set({ isLoading: true, error: null });
    try {
      set(state => {
        const updatedBoards = state.boards.map(board => {
          if (board.id === boardId) {
            const likes = board.likes || [];
            const isLiked = likes.includes(userId);
            return {
              ...board,
              likes: isLiked 
                ? likes.filter(id => id !== userId)
                : [...likes, userId]
            };
          }
          return board;
        });
        
        const updatedCurrentBoard = state.currentBoard?.id === boardId 
          ? {
              ...state.currentBoard,
              likes: state.currentBoard.likes?.includes(userId)
                ? state.currentBoard.likes.filter(id => id !== userId)
                : [...(state.currentBoard.likes || []), userId]
            }
          : state.currentBoard;
        
        return {
          boards: updatedBoards,
          currentBoard: updatedCurrentBoard,
          isLoading: false
        };
      });
    } catch (error) {
      set({ error: 'Failed to like board', isLoading: false });
    }
  },
  
  addComment: async (boardId, userId, text) => {
    set({ isLoading: true, error: null });
    try {
      const newComment = {
        id: `comment-${Date.now()}`,
        boardId,
        userId,
        text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set(state => {
        const updatedBoards = state.boards.map(board => {
          if (board.id === boardId) {
            return {
              ...board,
              comments: [...(board.comments || []), newComment.id]
            };
          }
          return board;
        });
        
        const updatedCurrentBoard = state.currentBoard?.id === boardId 
          ? {
              ...state.currentBoard,
              comments: [...(state.currentBoard.comments || []), newComment.id]
            }
          : state.currentBoard;
        
        return {
          boards: updatedBoards,
          currentBoard: updatedCurrentBoard,
          comments: { ...state.comments, [newComment.id]: newComment },
          isLoading: false
        };
      });
    } catch (error) {
      set({ error: 'Failed to add comment', isLoading: false });
    }
  },
  
  deleteComment: async (commentId, boardId) => {
    set({ isLoading: true, error: null });
    try {
      set(state => {
        const updatedBoards = state.boards.map(board => {
          if (board.id === boardId) {
            return {
              ...board,
              comments: (board.comments || []).filter(id => id !== commentId)
            };
          }
          return board;
        });
        
        const updatedCurrentBoard = state.currentBoard?.id === boardId 
          ? {
              ...state.currentBoard,
              comments: (state.currentBoard.comments || []).filter(id => id !== commentId)
            }
          : state.currentBoard;
        
        const updatedComments = { ...state.comments };
        delete updatedComments[commentId];
        
        return {
          boards: updatedBoards,
          currentBoard: updatedCurrentBoard,
          comments: updatedComments,
          isLoading: false
        };
      });
    } catch (error) {
      set({ error: 'Failed to delete comment', isLoading: false });
    }
  },
  
  shareBoard: async (boardId) => {
    set({ isLoading: true, error: null });
    try {
      set(state => {
        const updatedBoards = state.boards.map(board => {
          if (board.id === boardId) {
            return {
              ...board,
              shares: (board.shares || 0) + 1
            };
          }
          return board;
        });
        
        const updatedCurrentBoard = state.currentBoard?.id === boardId 
          ? {
              ...state.currentBoard,
              shares: (state.currentBoard.shares || 0) + 1
            }
          : state.currentBoard;
        
        return {
          boards: updatedBoards,
          currentBoard: updatedCurrentBoard,
          isLoading: false
        };
      });
    } catch (error) {
      set({ error: 'Failed to share board', isLoading: false });
    }
  },
  
  getBoardComments: (boardId) => {
    const state = get();
    const board = state.boards.find(b => b.id === boardId);
    if (!board || !board.comments) return [];
    
    return board.comments
      .map(commentId => state.comments[commentId])
      .filter(Boolean)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  },
}));