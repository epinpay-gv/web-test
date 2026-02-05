'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Button } from '@/components/common/Button/Button';
import { Moon, Sun } from 'flowbite-react-icons/outline';

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
    <Button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      variant='ghost'
      padding='xs'
      icon={isDark ? (<Moon className='w-4 h-4 md:w-5 md:h-5' />) : (<Sun className='w-4 h-4 md:w-6 md:h-6'/>)}
      
      aria-label="Toggle theme"
    >
    </Button>
  );
}