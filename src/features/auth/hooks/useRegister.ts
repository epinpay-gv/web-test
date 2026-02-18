'use client';

import { useMemo, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterStore } from '../store/register.store';
import { authService } from '../authService';
import { useLogin } from './useLogin';
import { ValidationRules } from '../auth.types';

export function useRegister() {
  const router = useRouter();
  const store = useRegisterStore();
  const { performLogin } = useLogin();

  const validationRules = useMemo((): ValidationRules => {
    const pass = store.formData.password || '';
    return {
      minLength: pass.length >= 10,
      hasNumber: /[0-9]/.test(pass),
      hasLowerCase: /[a-z]/.test(pass),
      hasUpperCase: /[A-Z]/.test(pass),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    };
  }, [store.formData.password]);

  const isPasswordSecure = useMemo(() => 
    Object.values(validationRules).every(Boolean), 
  [validationRules]);

  const strength = useMemo(() => 
    Object.values(validationRules).filter(Boolean).length * 20, 
  [validationRules]);

  const handleChange = (field: keyof typeof store.formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    store.updateFormData({ [field]: e.target.value });
  };

  const handleInitiate = async (e: FormEvent) => {
    e.preventDefault();
    if (store.formData.password !== store.formData.passwordAgain) {
      store.setError("Şifreler birbiriyle eşleşmiyor.");
      return;
    }

    if (!isPasswordSecure) {
      store.setError("Lütfen tüm şifre kriterlerini karşılayın.");
      return;
    }

    store.setIsLoading(true);
    store.setError(null);

    try {
      const response = await authService.initiateRegister(store.formData);
      
      if (response.expiresIn) {
        store.setOtpExpiresIn(response.expiresIn);
      }
      
      store.setStep('otp');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Kayıt başlatılamadı.";
      store.setError(errorMessage);
    } finally {
      store.setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otpCode: string) => {
    store.setIsLoading(true);
    store.setError(null);

    try {
      const response = await authService.verifyOtp(store.formData.email, otpCode);          
      
      // Tip güvenli kontrol: response.user varsa performLogin'e gönder
      if (response.user) {
        performLogin(response.user, store.formData.rememberMe, response.token);
      } else {
        router.push('/login');
      }

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Doğrulama kodu hatalı.";
      store.setError(errorMessage);
    } finally {
      store.setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    store.setIsLoading(true);
    store.setError(null);

    try {
      const response = await authService.resendOtp(store.formData.email);
      if (response.expiresIn) {
        store.setOtpExpiresIn(response.expiresIn);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "OTP tekrar gönderilemedi.";
      store.setError(errorMessage);
    } finally {
      store.setIsLoading(false);
    }
  };

  const handleClear = (field: keyof typeof store.formData) => () => {
    store.updateFormData({ [field]: '' });
  };

  const handleBlur = (field: string) => () => {
    // Audit/Logging için kullanılabilir
  };

  return {
    formData: store.formData,
    step: store.step,
    isLoading: store.isLoading,
    error: store.error,
    otpExpiresIn: store.otpExpiresIn,
    errors: {
      form: store.error,
    },
    validationRules,
    isPasswordSecure,
    strength,
    handleChange,
    handleBlur,
    handleClear,
    handleInitiate,
    handleVerifyOtp,
    handleResendOtp,
    setStep: store.setStep,
  };
}