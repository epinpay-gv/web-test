'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/features/theme/store/useThemeStore';

export function ThemeInitializer() {
  const setHydrated = useThemeStore((state) => state.setHydrated);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // Hydration tamamlandı
    setHydrated();

    // localStorage'dan tema yükle
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      useThemeStore.setState({ theme: savedTheme });
    }

    // Temayı uygula
    const applyTheme = () => {
      let resolvedTheme: 'light' | 'dark' = 'light';

      if (theme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      } else {
        resolvedTheme = theme;
      }

      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolvedTheme);
    };

    applyTheme();

    // System tema değişikliklerini dinle
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    }
  }, [theme, setHydrated]);

  return null;
}