import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LoginFormData } from '../auth.types';

interface LoginState {
  formData: LoginFormData;
  isLoading: boolean;
  error: string | null;
  touched: {
    email: boolean;
    password: boolean;
  };
  updateFormData: (data: Partial<LoginFormData>) => void;
  setIsLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  setTouched: (field: keyof LoginFormData) => void;
  reset: () => void;
}

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'login-storage',
      storage: createJSONStorage(() => localStorage),
      // Sadece email ve rememberMe persist ediliyor, şifre asla kaydedilmiyor
      partialize: (state) => ({
        formData: {
          email: state.formData.rememberMe ? state.formData.email : '',
          password: '',
          rememberMe: state.formData.rememberMe,
        },
      }),
    }
  )
);