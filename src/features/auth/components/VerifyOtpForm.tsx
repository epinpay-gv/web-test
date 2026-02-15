'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/common/Form/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { useRegisterStore } from '../store/useRegisterStore';
import { OtpInput } from '@/components/common/Form/OtpInput.tsx/OtpInput';

import Badges from '@/components/common/Badges/Badges';

interface Props {
  email: string;
  onVerify: (otp: string) => void;
  isLoading: boolean;
  serverError?: string;
}

export function VerifyOtpForm({ email, onVerify, isLoading, serverError }: Props) {
  const [otp, setOtp] = useState('');
  const setStep = useRegisterStore((state) => state.setStep);

  // Sayfa yüklendiğinde veya hata geldiğinde input'a odaklanması için
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6 && !isLoading) {
      onVerify(otp);
    }
  };

  return (
    <div className="w-full max-w-96 mx-auto animate-in fade-in zoom-in-95 duration-300">
      {/* Geri Dön Butonu */}
      <form onSubmit={handleSubmit} className="bg-(--bg-neutral-primary-soft) p-8 rounded-(--radius-base) border border-(--border-default) space-y-6 shadow-xl">
        <div className='w-full flex flex-col gap-3'>
            <div className='text-(--text-heading)  font-semibold text-xl leading-7'>
                Mailinizi kontrol edin 
            </div>
            <div>   
            <p className='text-sm text-(--text-heading)'>{email}<span className='text-(--text-body)'>adresine gönderilen</span></p>
            <p className='text-sm text-(--text-heading)'>doğrulama kodunu<span className='text-(--text-body)'>aşağıya girin.</span></p>
            </div>
            
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-semibold text-(--text-heading) text-left">
            Giriş kodu
          </label>
          <OtpInput 
            value={otp} 
            onChange={setOtp} 
            length={6} 
            disabled={isLoading} 
          />
        </div>

        {/* Hata Mesajı */}
        {serverError && (
          <Badges text={serverError} theme='danger' className='w-full py-3 justify-center'/>
        )}

        <Button 
          variant="brand" 
          text={isLoading ? "Doğrulanıyor..." : "Giriş Yap"} 
          type="submit"
          disabled={otp.length !== 6 || isLoading}
        />

        <div className="text-center space-y-3">            
            <Button 
              type="button" 
              variant='secondary'
              text='Tekrar Gönder'
              disabled={isLoading}
            />          
        </div>
      </form>    
    </div>
  );
}