'use client';

// components/forgot-password/EmailStep.tsx

import { Envelope } from 'flowbite-react-icons/outline';
import { Button, Input } from '@/components/common';
import { useForgotPassword } from '../../hooks/useForgotPassword';

interface EmailStepProps {
  hook: ReturnType<typeof useForgotPassword>;
  onBack: () => void;
}

export function EmailStep({ hook, onBack }: EmailStepProps) {
  const {
    formData,
    errors,
    touched,
    isLoading,
    handleChange,
    handleBlur,
    handleClear,
    handleSubmit,
  } = hook;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-(--bg-neutral-primary-soft) p-6 rounded-(--radius-base) border border-(--border-default)"
    >
      {/* Email Field */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-(--text-heading) text-sm font-medium">
          E-posta <span className="text-(--text-fg-danger)">*</span>
        </label>
        <Input
          type="text"
          name="email"
          placeholder="Email adresini girin"
          leftIcon={<Envelope />}
          value={formData.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          onClear={handleClear('email')}
          aria-invalid={touched.email ? !!errors.email : undefined}
          inputSize="base"
          disabled={isLoading}
        />
        {touched.email && errors.email && (
          <span className="text-(--text-fg-danger-strong) text-xs font-medium">
            {errors.email}
          </span>
        )}
      </div>

      {/* Form Hatası */}
      {errors.form && (
        <div className="bg-red-500/10 border border-red-500/40 rounded-(--radius-base) px-3 py-2 animate-in fade-in duration-300">
          <p className="text-red-500 text-xs text-center font-medium leading-tight">
            {errors.form}
          </p>
        </div>
      )}

      {/* Submit */}
      <Button
        variant="brand"
        text={isLoading ? 'Gönderiliyor...' : 'Yenileme Bağlantısı Gönder'}
        type="submit"
        disabled={isLoading}
        className="w-full py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
      />

      {/* Geri Dön */}
      <Button
        type="button"
        text='Geri Dön'
        variant='ghost'
        arrows={{left: true}}
        onClick={onBack}
        disabled={isLoading}
        className='gap-1.5'
      />
    </form>
  );
}