import { create } from 'zustand';
import { UserProfile } from '../auth.types';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
  sessionExpiresAt: number | null;
  login: (user: UserProfile, rememberMe: boolean) => void;
  logout: () => void;
  updateUser: (user: Partial<UserProfile>) => void;
  checkSession: () => boolean;
  hydrate: () => void;
}

const REMEMBER_ME_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 gün
const STORAGE_KEY = 'auth-storage';

function saveToStorage(data: object, rememberMe: boolean) {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(STORAGE_KEY, JSON.stringify(data));
  if (rememberMe) {
    sessionStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function readFromStorage() {
  try {
    const fromLocal = localStorage.getItem(STORAGE_KEY);
    if (fromLocal) return JSON.parse(fromLocal);
    const fromSession = sessionStorage.getItem(STORAGE_KEY);
    if (fromSession) return JSON.parse(fromSession);
  } catch {
    return null;
  }
  return null;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  rememberMe: false,
  sessionExpiresAt: null,

  hydrate: () => {
    const saved = readFromStorage();
    if (!saved) return;

    if (saved.rememberMe && saved.sessionExpiresAt) {
      const isExpired = Date.now() > saved.sessionExpiresAt;
      if (isExpired) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
    }

    if (saved.isAuthenticated) {
      set({
        user: saved.user,
        isAuthenticated: true,
        rememberMe: saved.rememberMe,
        sessionExpiresAt: saved.sessionExpiresAt,
      });
    }
  },

  login: (user, rememberMe) => {
    const expiresAt = rememberMe ? Date.now() + REMEMBER_ME_DURATION : null;
    const state = {
      user,
      isAuthenticated: true,
      rememberMe,
      sessionExpiresAt: expiresAt,
    };
    set(state);
    saveToStorage(state, rememberMe);
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    set({
      user: null,
      isAuthenticated: false,
      rememberMe: false,
      sessionExpiresAt: null,
    });
  },

  updateUser: (userData) => set((state) => ({
    user: state.user ? { ...state.user, ...userData } : null
  })),

  checkSession: () => {
    const { sessionExpiresAt, rememberMe, isAuthenticated } = get();
    if (!isAuthenticated) return false;
    if (rememberMe && sessionExpiresAt) {
      const isExpired = Date.now() > sessionExpiresAt;
      if (isExpired) {
        get().logout();
        return false;
      }
    }
    return true;
  },
}));