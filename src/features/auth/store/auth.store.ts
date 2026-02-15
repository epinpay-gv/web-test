// features/auth/store/auth.store.ts

import { create } from 'zustand';
import { User } from '../auth.types';

interface AuthState {
  user: User | null;
  isLogin: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLogin: false,
  login: (user) => set({ user, isLogin: true }),
  logout: () => {
    localStorage.removeItem('auth_token');
    set({ user: null, isLogin: false });
  },
}));