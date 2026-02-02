import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../auth.types";

interface AuthState {
  user: User | null;
  token: string | null;
  isLogin: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLogin: false,
      setAuth: (user, token) => set({ user, token, isLogin: true }),
      logout: () => set({ user: null, token: null, isLogin: false }),
    }),
    { name: "auth-storage" }
  )
);