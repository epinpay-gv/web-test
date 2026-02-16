import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '../auth.types';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  // Actions
  login: (user: UserProfile) => void;
  logout: () => void;
  updateUser: (user: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (user) => set({ 
        user, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
      
      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null
      })),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);