'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';

export function useLogout() {
  const router = useRouter();
  const logoutFromStore = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await fetch('/api/auth/set-cookie', {
      method: 'DELETE',
    });

    logoutFromStore();

    // router.push('/login');
    router.refresh();
  };

  return { handleLogout };
}