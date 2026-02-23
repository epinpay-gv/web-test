import { create } from 'zustand';
import { RegisterFormData } from '../auth.types';

interface RegisterState {
  step: 'form' | 'otp';
  formData: RegisterFormData;
  isLoading: boolean;
  error: string | null;
  otpExpiresIn: number; // OTP süresi (saniye)
  // Actions
  setStep: (step: 'form' | 'otp') => void;
  updateFormData: (data: Partial<RegisterFormData>) => void;
  setIsLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  setOtpExpiresIn: (seconds: number) => void;
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
  otpExpiresIn: 10, // Varsayılan 5 dakika
  setStep: (step) => set({ step }),
  updateFormData: (data) => set((state) => ({ 
    formData: { ...state.formData, ...data } 
  })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setOtpExpiresIn: (otpExpiresIn) => set({ otpExpiresIn }),
  reset: () => set({ step: 'form', error: null, otpExpiresIn: 300 }),
}));