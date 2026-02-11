'use client';

import { useState } from 'react';
import { useLogin } from '../hooks/useLogin'; // Hook yolunu kontrol et
import { Input } from '@/components/common/Form/Input/Input';
import { Button } from '@/components/common/Button/Button';
import Image from "next/image";
import { Google } from 'flowbite-react-icons/solid';
import { Envelope, Lock, Eye, EyeSlash } from 'flowbite-react-icons/outline';

export function LoginForm() {
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
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-96 mx-auto">
      {/* Logo */}
      <div className="mb-10">
        <Image 
          src="/image/logos/epinpay-white-lg.png" 
          height={30} 
          width={132} 
          alt='Epinpay' 
          priority 
        />
      </div>

      {/* Title */}
      <div className="mb-8">
        <h2 className="text-(--text-heading) font-semibold text-xl mb-2">
          Hesabına Giriş Yap
        </h2>
        <p className="text-(--text-body) font-normal text-sm leading-relaxed">
          Fırsatlardan faydalanmak ve alışveriş yapabilmek için hemen üye ol ya da giriş yap.
        </p>
        <div className="text-(--text-body) flex gap-1 text-sm mt-2">
          Hesabın yok mu?{' '}
          <button type="button" className="text-(--text-fg-brand) hover:underline transition-colors font-medium">
            Kayıt Ol
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 bg-(--bg-neutral-primary-soft) p-6 rounded-(--radius-base) border border-(--border-default)">
        
        {/* Email Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-(--text-heading) text-sm font-medium">
            Email <span className="text-(--text-fg-danger)">*</span>
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
            <span className="text-(--text-fg-danger-strong) text-xs font-medium">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">
            Şifre <span className="text-(--text-fg-danger)">*</span>
          </label>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            leftIcon={<Lock />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center justify-center p-1 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <Eye /> : <EyeSlash />}
              </button>
            }
            value={formData.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            aria-invalid={touched.password ? !!errors.password : undefined}
            inputSize="base"
            disabled={isLoading}
          />
          {touched.password && errors.password && (
            <span className="text-(--text-fg-danger-strong) text-xs font-medium">{errors.password}</span>
          )}
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleRememberMe}
              disabled={isLoading}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-(--text-fg-brand) cursor-pointer"
            />
            <span className="text-(--text-body) text-sm group-hover:text-white transition-colors">Beni hatırla</span>
          </label>
          <button 
            type="button"
            className="text-(--text-fg-brand) hover:underline text-sm transition-colors font-medium"
          >
            Şifremi unuttum
          </button>
        </div>

        {/* Form Error (Firebase, Backend veya Profil Hataları) */}
        {errors.form && (
          <div className="bg-red-500/10 border border-red-500/40 rounded-(--radius-base) px-3 py-2 animate-in fade-in duration-300">
            <p className="text-red-500 text-xs text-center font-medium leading-tight">
              {errors.form}
            </p>
          </div>
        )}

        {/* Login Button */}
        <Button
          variant='brand'
          text={isLoading ? "Giriş Yapılıyor... " : "Giriş Yap"}
          type="submit"
          disabled={isLoading}
          className="w-full py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        />

        {/* Divider */}
        <div className="relative flex items-center py-1">
          <div className="flex-grow border-t border-(--border-default)"></div>
          <span className="flex-shrink mx-4 text-(--text-body) text-xs uppercase tracking-wider">veya</span>
          <div className="flex-grow border-t border-(--border-default)"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-(--radius-base) border border-(--border-default-medium) bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors disabled:opacity-50"
        >
          <Google className="w-5 h-5" />
          Google ile Giriş Yap
        </button>
      </form>
    </div>
  );
}