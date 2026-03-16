// hooks/useForgotPassword.ts

import { useState, useCallback } from 'react';
import { authService } from '../auth.service';
import { ForgotPasswordFormData } from '../auth.types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ForgotPasswordState {
  formData: ForgotPasswordFormData;
  errors: Partial<ForgotPasswordFormData & { form: string }>;
  touched: Partial<Record<keyof ForgotPasswordFormData, boolean>>;
  isLoading: boolean;
  isSuccess: boolean;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateEmail(email: string): string | undefined {
  if (!email.trim()) return 'E-posta adresi zorunludur.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Geçerli bir e-posta adresi girin.';
  return undefined;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useForgotPassword() {
  const [state, setState] = useState<ForgotPasswordState>({
    formData: { email: '' },
    errors: {},
    touched: {},
    isLoading: false,
    isSuccess: false,
  });

  /** Alan değişikliği */
  const handleChange = useCallback(
    (field: keyof ForgotPasswordFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setState((prev) => ({
          ...prev,
          formData: { ...prev.formData, [field]: value },
          // Touched ise anlık validasyon
          errors: prev.touched[field]
            ? { ...prev.errors, [field]: validateEmail(value) }
            : prev.errors,
        }));
      },
    []
  );

  /** Blur → touched + validasyon */
  const handleBlur = useCallback(
    (field: keyof ForgotPasswordFormData) => () => {
      setState((prev) => {
        const error = validateEmail(prev.formData.email);
        return {
          ...prev,
          touched: { ...prev.touched, [field]: true },
          errors: { ...prev.errors, [field]: error },
        };
      });
    },
    []
  );

  /** Alanı temizle */
  const handleClear = useCallback(
    (field: keyof ForgotPasswordFormData) => () => {
      setState((prev) => ({
        ...prev,
        formData: { ...prev.formData, [field]: '' },
        errors: { ...prev.errors, [field]: undefined },
      }));
    },
    []
  );

  /** Form submit */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    setState((prev) => {
      const emailError = validateEmail(prev.formData.email);
      return {
        ...prev,
        touched: { email: true },
        errors: { email: emailError },
      };
    });

    // Validasyon başarısız ise dur
    const emailError = validateEmail(state.formData.email);
    if (emailError) return;

    setState((prev) => ({ ...prev, isLoading: true, errors: {} }));

    try {
      await authService.sendPasswordResetEmail({ email: state.formData.email });
      setState((prev) => ({ ...prev, isLoading: false, isSuccess: true }));
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? mapFirebaseError(err.message)
          : 'Bir hata oluştu. Lütfen tekrar deneyin.';

      setState((prev) => ({
        ...prev,
        isLoading: false,
        errors: { form: message },
      }));
    }
  }, [state.formData.email]);

  /** Formu sıfırla (tekrar dene) */
  const handleReset = useCallback(() => {
    setState({
      formData: { email: '' },
      errors: {},
      touched: {},
      isLoading: false,
      isSuccess: false,
    });
  }, []);

  return {
    ...state,
    handleChange,
    handleBlur,
    handleClear,
    handleSubmit,
    handleReset,
  };
}

// ─── Firebase SDK Error Mapping ──────────────────────────────────────────────
// Firebase SDK hataları FirebaseError objesi olarak gelir: { code: "auth/too-many-requests" }

function mapFirebaseError(code: string): string {
  if (code.includes('auth/invalid-email'))
    return 'Geçersiz e-posta adresi.';
  if (code.includes('auth/user-not-found'))
    return 'Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.';
  if (code.includes('auth/too-many-requests'))
    return 'Çok fazla istek gönderildi. Lütfen bir süre bekleyin.';
  if (code.includes('auth/user-disabled'))
    return 'Bu hesap devre dışı bırakılmıştır.';
  if (code.includes('auth/network-request-failed'))
    return 'İnternet bağlantınızı kontrol edin.';
  return 'Bir hata oluştu. Lütfen tekrar deneyin.';
}