import { create } from "zustand";
import { loginFetcher } from "@/lib/auth";
import { LoginRequest, User } from "./auth.types";
import { isApiError } from "@/lib/api/isApiError";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (payload) => {
    set({ loading: true, error: null });

    try {
      const res = await loginFetcher(payload);
      set({ user: res.user, loading: false });
    } catch (error: unknown) {
      if (isApiError(error)) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: "Unexpected error occurred", loading: false });
      }
    }
  },

  logout: () => {
    set({ user: null });
  },
}));
