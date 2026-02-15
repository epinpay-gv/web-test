/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, ChangeEvent } from 'react';

// FormBase'i interface yerine bir tip kısıtlaması olarak kullanalım
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAuth<T extends Record<string, any>>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof T | 'form', string>>>({});

  const handleChange = useCallback((name: keyof T) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleBlur = useCallback((name: keyof T) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleClear = useCallback((name: keyof T) => () => {
    setFormData((prev) => ({ ...prev, [name]: '' as any })); // Generic tip uyumu için cast
  }, []);

  return {
    formData,
    setFormData,
    touched,
    setTouched,
    isLoading,
    setIsLoading,
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleClear,
  };
}