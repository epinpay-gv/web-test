'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Google } from 'flowbite-react-icons/solid';
import { useLogin } from '../hooks/useLogin';
import { Button } from '@/components/common';
import { FastLoginForm } from './FastLoginForm';

export function AuthDropdown() {
  const [view, setView] = useState<'options' | 'login'>('options');
  const router = useRouter();
  const { handleGoogleLogin, isLoading } = useLogin();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => setView('options'), 300);
    }
  };
  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant='secondary' text='Giriş Yap' padding='xs' />        
      </PopoverTrigger>

      <PopoverContent className="w-60 bg-(--bg-neutral-primary-medium) border-(--border-default-medium) border p-4 overflow-hidden shadow-2xl rounded-xl">
        {view === 'options' ? (
          <div className="flex flex-col space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <Button
              variant="brand"
              text="Giriş Yap"
              padding='xs'
              onClick={() => setView('login')}
              className="w-full text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            />
            
            <button
                type="button"
                disabled={isLoading}
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 w-full py-1.5 rounded-(--radius-base) border border-(--border-default-medium) bg-white/5 hover:bg-white/10 text-(--text-body) text-sm font-medium transition-colors disabled:opacity-50"
            >
                <Google className="w-5 h-5" />
                Google ile Giriş Yap
            </button>

            <Button
              onClick={() => router.push('/signup')}
              variant='tertiatry'
              text='Kayıt Ol'
              padding='xs'
              className='text-sm'
            />              
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <FastLoginForm />            
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
