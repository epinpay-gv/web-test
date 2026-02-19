'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LoginForm } from './LoginForm'; 
import { Google } from 'flowbite-react-icons/solid';
import { useLogin } from '../hooks/useLogin';
import { Button } from '@/components/common';

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

      <PopoverContent className="w-[320px] bg-(--bg-neutral-primary-medium) border-(--border-default-medium) p-4 overflow-hidden shadow-2xl rounded-xl">
        {view === 'options' ? (
          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <Button
              variant="brand"
              text="Giriş Yap"
              onClick={() => setView('login')}
              className="w-full py-2.5 font-bold text-sm bg-cyan-400 text-black hover:bg-cyan-500"
            />
            
            <button
                type="button"
                disabled={isLoading}
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-(--radius-base) border border-(--border-default-medium) bg-white/5 hover:bg-white/10 text-(--text-body) text-sm font-medium transition-colors disabled:opacity-50"
            >
                <Google className="w-5 h-5" />
                Google ile Giriş Yap
            </button>

            <button
              onClick={() => router.push('/signup')}
              className="w-full py-2.5 rounded-md bg-[#1e293b] text-gray-300 text-sm font-medium hover:text-white border border-gray-700 transition-colors"
            >
              Kayıt Ol
            </button>
          </div>
        ) : (
          <div className="p-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <LoginForm />
            <button 
              onClick={() => setView('options')}
              className="mt-4 text-xs text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              ← Geri Dön
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}