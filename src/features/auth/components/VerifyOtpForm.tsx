'use client';

import { OtpInput } from '@/components/common/Form/OtpInput.tsx/OtpInput';
import { Button, Badge } from '@/components/common';
import { useVerifyOtp } from '../hooks/useVerifyOtp';
import { useTranslations } from 'next-intl';

interface Props {
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  isLoading: boolean;
  serverError?: string;
  expiresIn?: number; 
}

export function VerifyOtpForm({ email, onVerify, onResend, isLoading, serverError, expiresIn = 20 }: Props) {
  const { 
    otp, 
    timeLeft,
    canResend,
    isExpired,
    formattedTime,
    handleOtpChange, 
    handleResend, 
    handleSubmit,
    returnRegisterForm
  } = useVerifyOtp({
    onVerify,
    onResend,
    isLoading,
    expiresIn,
  }); 

  const t = useTranslations('auth.verifyOtp');
  const tBtn = useTranslations('common.buttons');

  return (
    <div className="w-full max-w-96 mx-auto animate-in fade-in zoom-in-95 duration-300">
      <form onSubmit={handleSubmit} className="bg-(--bg-neutral-primary-soft) p-8 rounded-(--radius-base) border border-(--border-default) space-y-6 shadow-xl">
        <div className='w-full flex flex-col gap-3'>
          <div className='text-(--text-heading) font-semibold text-xl leading-7'>
            {t('title')} 
          </div>
          <div>   
            <p className='text-sm text-(--text-heading)'>
              {email}
              <span className='text-(--text-body)'> {t('sentTo')}</span>
            </p>
            <p className='text-sm text-(--text-heading)'>
              {t('verificationCode')}
              <span className='text-(--text-body)'> {t('enterBelow')}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-(--text-heading) text-left">
              {t('codeLabel')}
            </label>
            
          </div>
          <OtpInput 
            value={otp} 
            onChange={handleOtpChange} 
            length={6} 
            disabled={isLoading || isExpired} 
          />
          {isExpired && (
            <p className="text-xs text-(--text-fg-danger) mt-1">
              {t('expired')}
            </p>
          )}
        </div>

        {/* Hata Mesajı */}
        {serverError && (
          <Badge text={serverError} theme='danger' className='w-full py-3 justify-center'/>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-(--text-body) text-sm">{t('verifying')}</span>
          </div>
        )}

        <div className="text-center space-y-3">
          <Button 
            type="button" 
            variant='secondary'
            text={
              isLoading 
                ? tBtn('sending') 
                : canResend 
                ? tBtn('resend') 
                : `${tBtn('resend')} (${timeLeft} sn)`
            }
            disabled={isLoading || !canResend}
            onClick={handleResend}
          />
          {canResend && !isExpired && (
            <p className="text-xs text-(--text-body)">
              {t('resendHint')}
            </p>
          )}
          <Button text={tBtn('goBack')} variant='secondary' onClick={() => returnRegisterForm()}/>
        </div>
      </form>    
    </div>
  );
}