'use client';

import { useState } from 'react';
import { useLogin } from '../service';
import { Input } from '@/components/common/Form/Input/Input';
import { Link } from 'lucide-react';
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
        <Image src="/image/logos/epinpay-white-lg.png" height={30} width={132} alt='Epinpay' />
      </div>

      {/* Title */}
      <div className="mb-8">
        <h2 className="text-(--text-heading) font-semibold text-xl mb-2">
          Hesabına Giriş Yap
        </h2>
        <p className="text-(--text-body) font-normal lea text-sm">
          Fırsatladan faydalanmak ve alışveriş yapabilmek için hemen üye ol ya da giriş yap.
        </p>
        <div className="text-(--text-body) flex gap-1 text-sm mt-2">
          Hesabın yok mu?{' '}
          <p  className="text-(--text-fg-brand) transition-colors">
            Kayıt Ol
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 bg-(--bg-neutral-primary-soft) p-6 rounded-(--radius-base) border border-(--border-default)">
        {/* Email */}
        <div className="flex flex-col gap-1.5 max-w-84 w-full">
          <label className="text-(--tex-heading) text-sm font-medium">
            Email <span className="text-(--text-fg-danger)">*</span>
          </label>
          <Input
            type="text"
            name="email"
            placeholder="Email adresini girisin"
            leftIcon={<Envelope />}
            value={formData.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            onClear={handleClear('email')}
            aria-invalid={touched.email ? !!errors.email : undefined}
            inputSize="base"
          />
          {touched.email && errors.email && (
            <span className="text-(--text-fg-danger-strong) text-xs">{errors.email}</span>
          )}
        </div>

        {/* Password */}
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
                className="input-right-icon " 
              >
                {showPassword ? <Eye /> : <EyeSlash />}
              </button>
            }
            value={formData.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            aria-invalid={touched.password ? !!errors.password : undefined}
            inputSize="base"
          />
          {touched.password && errors.password && (
            <span className="text-(--text-fg-danger-strong) text-xs">{errors.password}</span>
          )}
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleRememberMe}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-blue-500"
            />
            <span className="text-gray-400 text-sm">Beni hatırla</span>
          </label>
          <p
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            Şifremi unuttum
          </p>
        </div>

        {/* Form Error (API Error) */}
        {errors.form && (
          <div className="bg-red-900/30 border border-red-800 rounded-(--radius-base) px-3 py-2">
            <p className="text-red-400 text-sm">{errors.form}</p>
          </div>
        )}

        {/* Login Button */}
        <Button
          variant='brand'
          text={isLoading ? "Giriş Yapılıyor... ": "Giriş Yap"}
          type="submit"
          disabled={isLoading}
          className="w-full btn-brand-filled py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        />
              

        {/* Google Login */}
        <button
          type="button"
          className="btn w-full py-3  btn-secondary-filled border border-(--border-default-medium)"
        >
          <Google/>
          Google ile Giriş Yap
        </button>
      </form>
    </div>
  );
}