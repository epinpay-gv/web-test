'use client';

import { useState } from 'react';
import Image from "next/image";
import { Google } from 'flowbite-react-icons/solid';
import { Envelope, Lock, Eye, EyeSlash, Check, Close } from 'flowbite-react-icons/outline';
import { useRouter } from 'next/navigation';
import { useRegister } from '../hooks/useRegister';
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';
import { VerifyOtpForm } from './VerifyOtpForm';
import { Button, Input } from '@/components/common';
import { useTranslations } from 'next-intl';

export function RegisterForm() {
  const router = useRouter();
  const {
    formData,
    error,
    isLoading,
    otpExpiresIn,
    handleChange,
    handleInitiate,
    handleVerifyOtp,
    handleResendOtp,
    validationRules,
    isPasswordSecure,
    strength,
    step
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const t = useTranslations('auth.register');
  const tPw = useTranslations('auth.passwordStrength');
  const tBtn = useTranslations('common.buttons');
  const tLabels = useTranslations('common.labels');

  if (step === 'otp') {
    return (
      <VerifyOtpForm 
        email={formData.email} 
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        isLoading={isLoading}
        serverError={error || undefined}
        expiresIn={otpExpiresIn}
      />
    );
  }

  return (
    <div className="w-full max-w-96 mx-auto animate-in fade-in duration-500">
      <div className="mb-10">
        <Image src="/logos/epinpay-white-lg.png" height={30} width={132} alt='Epinpay' priority />
      </div>

      <div className="mb-8">
        <h2 className="text-(--text-heading) font-semibold text-xl mb-2">{t('title')}</h2>
        <p className="text-(--text-body) text-sm mb-2">
          {t('subtitle')}
        </p>
        <div className='flex gap-1 text-sm'>
          <span className="text-(--text-body)">{t('hasAccount')}</span>
          <button onClick={() => router.push("/login")} className="text-(--text-fg-brand) font-medium hover:underline transition-all">
            {tBtn('login')}
          </button>
        </div>
      </div>

      <form onSubmit={handleInitiate} className="space-y-5 bg-(--bg-neutral-primary-soft) p-6 rounded-(--radius-base) border border-(--border-default)">
        {/* Email */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-(--text-heading) text-sm font-medium">
            {tLabels('email')} <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            placeholder={t('emailPlaceholder')}
            leftIcon={<Envelope />}
            value={formData.email}
            onChange={handleChange('email')}
            disabled={isLoading}
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">
            {tLabels('password')} <span className="text-red-500">*</span>
          </label>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            leftIcon={<Lock />}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye className='w-5 h-5'/> : <EyeSlash className='w-5 h-5'/>}
              </button>
            }
            value={formData.password}
            onChange={handleChange('password')}
            disabled={isLoading}
          />
        </div>

        {/* Password Strength */}
        {formData.password.length > 0 && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-1">
            <ProgressBar progress={strength} variant='dynamic' size='sm' showLabels={false} />
            <div className="space-y-2">
              <p className="text-xs font-medium text-(--text-heading)">
                {isPasswordSecure ? tPw('strong') : tPw('weak')}
              </p>
              <ul className="grid grid-cols-1 gap-1.5">
                <ValidationItem label={tPw('minLength')} isValid={validationRules.minLength} />
                <ValidationItem label={tPw('hasNumber')} isValid={validationRules.hasNumber} />
                <ValidationItem label={tPw('hasCase')} isValid={validationRules.hasUpperCase && validationRules.hasLowerCase} />
                <ValidationItem label={tPw('hasSymbol')} isValid={validationRules.hasSymbol} />
              </ul>
            </div>
          </div>
        )}

        {/* Password Again */}
        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">
            {tLabels('confirmPassword')} <span className="text-red-500">*</span>
          </label>
          <Input
            type={showPasswordAgain ? 'text' : 'password'}
            placeholder="••••••••"
            leftIcon={<Lock />}
            rightIcon={
              <button type="button" onClick={() => setShowPasswordAgain(!showPasswordAgain)}>
                {showPasswordAgain ? <Eye className='w-5 h-5'/> : <EyeSlash className='w-5 h-5'/>}
              </button>
            }
            value={formData.passwordAgain}
            onChange={handleChange('passwordAgain')}
            aria-invalid={formData.passwordAgain.length > 0 ? formData.password !== formData.passwordAgain : undefined}
            disabled={isLoading}
          />
        </div>

        {/* Referral */}
        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">{tLabels('referralCode')}</label>
          <Input
            placeholder={t('referralPlaceholder')}
            value={formData.referal || ''}
            onChange={handleChange('referal')}
            disabled={isLoading}
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center font-medium bg-red-500/10 py-2.5 rounded-(--radius-sm) border border-red-500/20">
            {error}
          </p>
        )}

        <Button 
          variant='brand' 
          text={isLoading ? tBtn('processing') : tBtn('signup')} 
          type="submit" 
          disabled={isLoading || !isPasswordSecure || formData.password !== formData.passwordAgain}
        />

        <button 
          type="button" 
          className="flex items-center text-(--text-body) justify-center gap-2 w-full py-3 rounded-(--radius-base) border border-(--border-default-medium) bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors"
        >
          <Google className="w-5 h-5" /> {tBtn('signupWithGoogle')}
        </button>
      </form>
    </div>
  );
}

function ValidationItem({ label, isValid }: { label: string; isValid: boolean }) {
  return (
    <li className={`flex items-center gap-2 text-[11px] transition-all ${isValid ? 'text-(--text-fg-success)' : 'text-gray-400'}`}>
      {isValid ? <Check className="w-3.5 h-3.5" /> : <Close className="w-3.5 h-3.5 opacity-50" />}
      <span>{label}</span>
    </li>
  );
}