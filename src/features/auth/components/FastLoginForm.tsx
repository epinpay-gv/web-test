'use client';

// components/LoginForm.tsx

import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import Image from 'next/image';
import { Google } from 'flowbite-react-icons/solid';
import { Envelope, Lock, Eye, EyeSlash } from 'flowbite-react-icons/outline';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/common';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { AuthView } from '../auth.types';

export function FastLoginForm() {
  const {
    formData,
    errors,
    isLoading,
    touched,
    handleChange,
    handleClear,
    handleBlur,
    handleRememberMe,
    handleSubmit,
    handleGoogleLogin
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const router = useRouter();

  // ── Şifremi Unuttum ekranına geç ──
  if (currentView === 'forgot-password') {
    return (
      <ForgotPasswordForm onBack={() => setCurrentView('login')} />
    );
  }

  return (
    <div className="w-full mx-auto">

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-(--radius-base) border border-(--border-default)"
      >
        <div className='space-y-3'>
            {/* Email Field */}
            <div className="flex flex-col gap-1.5 w-full">          
            <Input
                type="text"
                name="email"
                placeholder="Email adresini girin"
                leftIcon={<Envelope size={16}/>}
                rightIcon={<></>}
                value={formData.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                onClear={handleClear('email')}
                aria-invalid={touched.email ? !!errors.email : undefined}
                inputSize="sm"
                disabled={isLoading}
                className='text-sm'
                />
            {touched.email && errors.email && (
                <span className="text-(--text-fg-danger-strong) text-xs font-medium">
                {errors.email}
                </span>
            )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">          
            <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Şifre girin"
                leftIcon={<Lock size={16}/>}
                rightIcon={
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none flex items-center justify-center"
                    >
                    {showPassword ? (
                        <Eye className="input-right-icon" />
                    ) : (
                        <EyeSlash className="input-right-icon" />
                    )}
                </button>
                }
                value={formData.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                aria-invalid={touched.password ? !!errors.password : undefined}
                inputSize="sm"
                disabled={isLoading}
                className='text-sm'
                />
            {touched.password && errors.password && (
                <span className="text-(--text-fg-danger-strong) text-xs font-medium">
                {errors.password}
                </span>
            )}
            </div>

            {/* Form Error */}
            {errors.form && (
                <div className="bg-red-500/10 border border-red-500/40 rounded-(--radius-base) px-3 py-2 animate-in fade-in duration-300">
                <p className="text-red-500 text-xs text-center font-medium leading-tight">
                {errors.form}
                </p>
            </div>
            )}
        </div>
        <div className='space-y-3'>
            {/* Login Button */}
            <Button
            variant="brand"
            text={isLoading ? 'Giriş Yapılıyor... ' : 'Giriş Yap'}
            type="submit"
            padding='xs'
            disabled={isLoading}
            className="w-full text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            />

            {/* Google Login */}
            <button
            type="button"
            disabled={isLoading}
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 text-sm w-full py-1.5 rounded-(--radius-base) border border-(--border-default-medium) bg-white/5 hover:bg-white/10 text-(--text-body) font-medium transition-colors disabled:opacity-50"
            >
            <Google className="w-5 h-5" />
            Google ile Giriş Yap
            </button>
        </div>
      </form>
    </div>
  );
}