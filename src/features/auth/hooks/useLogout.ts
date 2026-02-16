'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';

export function useLogout() {
  const router = useRouter();
  const logoutFromStore = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    localStorage.removeItem('authToken');    
    logoutFromStore();    
    router.refresh();
  };

  return {
    handleLogout,
  };
}