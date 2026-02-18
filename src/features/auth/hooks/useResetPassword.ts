// hooks/useResetPassword.ts

import { useState, useCallback, useMemo } from 'react';
import { authService } from '../authService';
import { ResetPasswordFormData, ResetPasswordView } from '../auth.types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ResetPasswordState {
  formData: ResetPasswordFormData;
  errors: Partial<ResetPasswordFormData & { form: string }>;
  touched: Partial<Record<keyof ResetPasswordFormData, boolean>>;
  isLoading: boolean;
  view: ResetPasswordView;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

interface ValidationRules {
  minLength: boolean;
  hasNumber: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasSymbol: boolean;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | undefined {
  if (!confirmPassword) return 'Şifre tekrarı zorunludur.';
  if (password !== confirmPassword) return 'Şifreler eşleşmiyor.';
  return undefined;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useResetPassword(oobCode: string) {
  const [state, setState] = useState<ResetPasswordState>({
    formData: { password: '', confirmPassword: '' },
    errors: {},
    touched: {},
    isLoading: false,
    view: oobCode ? 'form' : 'invalid-link',
    showPassword: false,
    showConfirmPassword: false,
  });

  // ✅ RegisterForm'dan alınan validation rules
  const validationRules = useMemo((): ValidationRules => {
    const pass = state.formData.password || '';
    return {
      minLength: pass.length >= 10,
      hasNumber: /[0-9]/.test(pass),
      hasLowerCase: /[a-z]/.test(pass),
      hasUpperCase: /[A-Z]/.test(pass),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    };
  }, [state.formData.password]);

  const isPasswordSecure = useMemo(
    () => Object.values(validationRules).every(Boolean),
    [validationRules]
  );

  const strength = useMemo(
    () => Object.values(validationRules).filter(Boolean).length * 20,
    [validationRules]
  );

  /** Alan değişikliği */
  const handleChange = useCallback(
    (field: keyof ResetPasswordFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setState((prev) => {
          const newFormData = { ...prev.formData, [field]: value };
          // Touched ise anlık validasyon
          const errors = prev.touched[field]
            ? {
                ...prev.errors,
                confirmPassword:
                  prev.touched.confirmPassword
                    ? validateConfirmPassword(
                        newFormData.password,
                        newFormData.confirmPassword
                      )
                    : prev.errors.confirmPassword,
              }
            : prev.errors;

          return { ...prev, formData: newFormData, errors };
        });
      },
    []
  );

  /** Blur → touched + validate */
  const handleBlur = useCallback(
    (field: keyof ResetPasswordFormData) => () => {
      setState((prev) => {
        const newTouched = { ...prev.touched, [field]: true };
        const errors = {
          ...prev.errors,
          confirmPassword: validateConfirmPassword(
            prev.formData.password,
            prev.formData.confirmPassword
          ),
        };
        return { ...prev, touched: newTouched, errors };
      });
    },
    []
  );

  /** Toggle şifre göster/gizle */
  const toggleShowPassword = useCallback(() => {
    setState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showConfirmPassword: !prev.showConfirmPassword,
    }));
  }, []);

  /** Form submit */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validasyon
      setState((prev) => ({
        ...prev,
        touched: { password: true, confirmPassword: true },
      }));

      if (!isPasswordSecure) {
        setState((prev) => ({
          ...prev,
          errors: { form: 'Lütfen tüm şifre kriterlerini karşılayın.' },
        }));
        return;
      }

      const confirmError = validateConfirmPassword(
        state.formData.password,
        state.formData.confirmPassword
      );

      if (confirmError) {
        setState((prev) => ({
          ...prev,
          errors: { confirmPassword: confirmError },
        }));
        return;
      }

      if (!oobCode) {
        setState((prev) => ({ ...prev, view: 'invalid-link' }));
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, errors: {} }));

      try {
        await authService.confirmPasswordReset(oobCode, state.formData.password);
        setState((prev) => ({ ...prev, isLoading: false, view: 'success' }));
      } catch (err: unknown) {
        const code = err instanceof Error ? err.message : 'UNKNOWN_ERROR';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          errors: { form: mapFirebaseError(code) },
        }));
      }
    },
    [oobCode, state.formData, isPasswordSecure]
  );

  return {
    ...state,
    handleChange,
    handleBlur,
    handleSubmit,
    toggleShowPassword,
    toggleShowConfirmPassword,
    validationRules,
    isPasswordSecure,
    strength,
  };
}

// ─── Firebase SDK Error Mapping ──────────────────────────────────────────────

function mapFirebaseError(code: string): string {
  if (code.includes('auth/expired-action-code'))
    return 'Şifre sıfırlama bağlantısının süresi dolmuş. Lütfen tekrar talep edin.';
  if (code.includes('auth/invalid-action-code'))
    return 'Geçersiz bağlantı. Lütfen yeni bir sıfırlama bağlantısı talep edin.';
  if (code.includes('auth/weak-password'))
    return 'Şifre çok zayıf. Daha güçlü bir şifre seçin.';
  if (code.includes('auth/user-disabled'))
    return 'Bu hesap devre dışı bırakılmıştır.';
  if (code.includes('auth/too-many-requests'))
    return 'Çok fazla deneme. Lütfen bir süre bekleyin.';
  if (code.includes('auth/network-request-failed'))
    return 'İnternet bağlantınızı kontrol edin.';
  return 'Bir hata oluştu. Lütfen tekrar deneyin.';
}