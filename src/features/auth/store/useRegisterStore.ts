import { create } from 'zustand';
import { RegisterFormData } from '../auth.types'; // Form tiplerini buradan aldığını varsayıyoruz

interface RegisterState {
  step: 'form' | 'otp';
  formData: RegisterFormData;
  isLoading: boolean;
  error: string | null;
  // Actions
  setStep: (step: 'form' | 'otp') => void;
  updateFormData: (data: Partial<RegisterFormData>) => void;
  setIsLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  step: 'form',
  formData: {
    email: '',
    password: '',
    passwordAgain: '',
    rememberMe: false,
    name: '',
    surname: '',
    referal: '',
  },
  isLoading: false,
  error: null,
  setStep: (step) => set({ step }),
  updateFormData: (data) => set((state) => ({ 
    formData: { ...state.formData, ...data } 
  })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({ step: 'form', error: null }),
}));