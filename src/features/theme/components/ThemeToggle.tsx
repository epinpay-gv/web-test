'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Button } from '@/components/common/Button/Button';
import { Moon, Sun } from 'flowbite-react-icons/outline';
import { IconShape } from '@/components/common/IconSahpe/IconShape';

function subscribe() {
  return () => {};
}

function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,  // client
    () => false  // server
  );
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useHydrated();

  if (!mounted) {
    return (
      <div className="lg:w-7 lg:h-7 w-6 h-6 bg-gray-700 rounded-full animate-pulse" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <IconShape 
      icon={isDark ? Moon : Sun} 
      color="custom" 
      customColor="var(--text-heading)" 
      variant="square" 
      size="lg" 
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    />
  
  );
}