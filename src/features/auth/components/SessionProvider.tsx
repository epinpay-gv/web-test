'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const hydrate = useAuthStore((state) => state.hydrate);
  const checkSession = useAuthStore((state) => state.checkSession);
  useEffect(() => {
    hydrate();
    checkSession(); 
  }, [hydrate, checkSession]);

  return <>{children}</>;
}