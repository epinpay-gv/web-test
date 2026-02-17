'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';

export function useLogout() {
  const router = useRouter();
  const logoutFromStore = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    // Cookie'leri temizle (middleware için)
    await fetch('/api/auth/set-cookie', {
      method: 'DELETE',
    });

    // Auth store'u temizle (UI için)
    logoutFromStore();

    console.log('✅ [Logout] Çıkış başarılı');

    router.push('/login');
    router.refresh();
  };

  return { handleLogout };
}