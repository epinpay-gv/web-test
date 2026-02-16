import { create } from 'zustand';
import { LoginFormData } from '../auth.types';

interface LoginState {
  formData: LoginFormData;
  isLoading: boolean;
  error: string | null;
  touched: {
    email: boolean;
    password: boolean;
  };
  // Actions
  updateFormData: (data: Partial<LoginFormData>) => void;
  setIsLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  setTouched: (field: keyof LoginFormData) => void;
  reset: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  formData: {
    email: '',
    password: '',
    rememberMe: false,
  },
  isLoading: false,
  error: null,
  touched: {
    email: false,
    password: false,
  },
  updateFormData: (data) => set((state) => ({ 
    formData: { ...state.formData, ...data } 
  })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setTouched: (field) => set((state) => ({
    touched: { ...state.touched, [field]: true }
  })),
  reset: () => set({ 
    formData: { email: '', password: '', rememberMe: false },
    error: null,
    touched: { email: false, password: false }
  }),
}));