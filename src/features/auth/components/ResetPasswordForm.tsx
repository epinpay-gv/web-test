'use client';

// components/ResetPasswordForm.tsx

import { Lock, Eye, EyeSlash, CheckCircle, ExclamationCircle, Check, Close } from 'flowbite-react-icons/outline';
import { Button, Input } from '@/components/common';
import { useResetPassword } from '../hooks/useResetPassword';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import Image from "next/image";
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';

interface ResetPasswordFormProps {
  oobCode: string;
}

export function ResetPasswordForm({ oobCode }: ResetPasswordFormProps) {
  const hook = useResetPassword(oobCode);
  const { view } = hook;

  if (view === 'invalid-link') return <InvalidLinkView />;
  if (view === 'success') return <SuccessView />;
  return <FormView hook={hook} />;
}

/* =========================================
                  FORM VIEW
   ========================================= */ 
function FormView({ hook }: { hook: ReturnType<typeof useResetPassword> }) {
  const {
    formData,
    errors,
    touched,
    isLoading,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleBlur,
    handleSubmit,
    toggleShowPassword,
    toggleShowConfirmPassword,
    validationRules,
    isPasswordSecure,
    strength,
  } = hook;

  const { resolvedTheme } = useTheme();
  const themeSuffix = resolvedTheme === "light" ? "black" : "white";
  const logoSrc = `/image/logos/epinpay-${themeSuffix}-sm.png`;

  return (
    <div className="w-full max-w-96 mx-auto">
      {/* Logo */}
      <div className='mb-8'>
        <Image
          src={logoSrc}
          alt="Epinpay"
          width={160}
          height={40}
          className="h-6 md:h-10 w-auto object-contain cursor-pointer"
          priority
        />
      </div>

      {/* Başlık */}
      <div className="mb-8">
        <h2 className="text-(--text-heading) font-semibold text-xl mb-2">
          Şifre oluştur
        </h2>
        <p className="text-(--text-body) font-normal text-sm leading-relaxed">
          Yeni şifrenizi oluşturun
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-(--bg-neutral-primary-soft) p-6 rounded-(--radius-base) border border-(--border-default)"
      >
        {/* Yeni Şifre */}
        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">
            Yeni Şifre <span className="text-(--text-fg-danger)">*</span>
          </label>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            leftIcon={<Lock />}
            rightIcon={
              <button
                type="button"
                onClick={toggleShowPassword}
                className="focus:outline-none flex items-center justify-center"
              >
                {showPassword
                  ? <Eye className="w-5 h-5" />
                  : <EyeSlash className="w-5 h-5" />}
              </button>
            }
            value={formData.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            aria-invalid={touched.password ? !isPasswordSecure : undefined}
            inputSize="base"
            disabled={isLoading}
          />
        </div>

        {/* ✅ RegisterForm'dan alınan Password Strength */}
        {formData.password.length > 0 && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-1">
            <ProgressBar progress={strength} variant='dynamic' size='sm' showLabels={false} />
            <div className="space-y-2">
              <p className="text-xs font-medium text-(--text-heading)">
                {isPasswordSecure ? "Şifre güçlü" : "Şifre zayıf. Şunlar zorunlu:"}
              </p>
              <ul className="grid grid-cols-1 gap-1.5">
                <ValidationItem label="En az 10 karakter" isValid={validationRules.minLength} />
                <ValidationItem label="En az bir sayı" isValid={validationRules.hasNumber} />
                <ValidationItem label="Büyük ve küçük harf" isValid={validationRules.hasUpperCase && validationRules.hasLowerCase} />
                <ValidationItem label="En az bir sembol" isValid={validationRules.hasSymbol} />
              </ul>
            </div>
          </div>
        )}

        {/* Şifre Tekrar */}
        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">
            Şifre Tekrar <span className="text-(--text-fg-danger)">*</span>
          </label>
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="••••••••"
            leftIcon={<Lock />}
            rightIcon={
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="focus:outline-none flex items-center justify-center"
              >
                {showConfirmPassword
                  ? <Eye className="w-5 h-5" />
                  : <EyeSlash className="w-5 h-5" />}
              </button>
            }
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            aria-invalid={
              formData.confirmPassword.length > 0 
                ? formData.password !== formData.confirmPassword 
                : undefined
            }
            inputSize="base"
            disabled={isLoading}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <span className="text-(--text-fg-danger-strong) text-xs font-medium">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Form Hatası */}
        {errors.form && (
          <p className="text-red-500 text-xs text-center font-medium bg-red-500/10 py-2.5 rounded-(--radius-sm) border border-red-500/20">
            {errors.form}
          </p>
        )}

        {/* Submit */}
        <Button
          variant="brand"
          text={isLoading ? 'Kaydediliyor...' : 'Şifre Yenile'}
          type="submit"
          disabled={isLoading || !isPasswordSecure || formData.password !== formData.confirmPassword}
          className="w-full py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        />
      </form>
    </div>
  );
}

// ✅ RegisterForm'dan alınan ValidationItem component
function ValidationItem({ label, isValid }: { label: string; isValid: boolean }) {
  return (
    <li className={`flex items-center gap-2 text-[11px] transition-all ${isValid ? 'text-(--text-fg-success)' : 'text-gray-400'}`}>
      {isValid ? <Check className="w-3.5 h-3.5" /> : <Close className="w-3.5 h-3.5 opacity-50" />}
      <span>{label}</span>
    </li>
  );
}

// ─── Success View ─────────────────────────────────────────────────────────────

function SuccessView() {
   const router = useRouter();
  const { resolvedTheme } = useTheme();
  const themeSuffix = resolvedTheme === "light" ? "black" : "white";
  const logoSrc = `/image/logos/epinpay-${themeSuffix}-sm.png`;
  return (
    <div className="w-full max-w-96 mx-auto">
      <div className='pb-8'>
        <Image
          src={logoSrc}
          alt="Epinpay"
          width={160}
          height={40}
          className="h-6 md:h-10 w-auto object-contain cursor-pointer"
          priority
        />
      </div>
      <div>
        <h2 className="text-(--text-heading) font-semibold text-xl mb-2">
          Şifreniz yenilendi
        </h2>
        <p className="text-(--text-body) font-normal text-sm leading-relaxed">
          Yeni şifreniz ile giriş yapabilirsiniz.
        </p>
      </div>
      <div className="bg-(--bg-neutral-primary-soft) mt-6 p-6 rounded-(--radius-base) border border-(--border-default) text-center space-y-4 animate-in fade-in duration-300">        
        <div className="flex flex-col gap-2 pt-1">
          <Button
            variant="brand"
            text="Giriş Yap"            
            onClick={() => router.push('/login')}
            className="w-full py-3 text-sm font-semibold transition-all active:scale-[0.98]"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Invalid Link View ────────────────────────────────────────────────────────

function InvalidLinkView() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const themeSuffix = resolvedTheme === "light" ? "black" : "white";
  const logoSrc = `/image/logos/epinpay-${themeSuffix}-sm.png`;
  return (
    <div className="w-full max-w-96 mx-auto">
      <div className='pb-8'>
        <Image
          src={logoSrc}
          alt="Epinpay"
          width={160}
          height={40}
          className="h-6 md:h-10 w-auto object-contain cursor-pointer"
          priority
        />
      </div>
      <div>
        <h2 className="text-(--text-heading) font-semibold text-xl mb-2">
          Bağlantının süresi dolmuş
        </h2>
        <p className="text-(--text-body) font-normal text-sm leading-relaxed">
          Şifrenizi değiştirmek için lütfen yeni bağlantı oluşturun.
        </p>
      </div>
      <div className="bg-(--bg-neutral-primary-soft) mt-6 p-6 rounded-(--radius-base) border border-(--border-default) text-center space-y-4 animate-in fade-in duration-300">        
        <div className="flex flex-col gap-2 pt-1">
          <Button
            variant="secondary"
            text="Yeni Bağlantı Talep Et"            
            onClick={() => router.push('/login')}
            className="w-full py-3 text-sm font-semibold transition-all active:scale-[0.98]"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Şifre Gücü Hesaplama ─────────────────────────────────────────────────────

// function getPasswordStrength(password: string): StrengthLevel {
//   let score = 0;
//   if (password.length >= 8) score++;
//   if (/[A-Z]/.test(password)) score++;
//   if (/[0-9]/.test(password)) score++;
//   if (/[^A-Za-z0-9]/.test(password)) score++; // özel karakter bonus

//   if (score <= 1) return 'weak';
//   if (score <= 2) return 'medium';
//   return 'strong';
// }