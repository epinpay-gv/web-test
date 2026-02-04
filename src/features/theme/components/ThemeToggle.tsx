'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
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
      <div className="w-14 h-7 bg-gray-700 rounded-full animate-pulse" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      variant='ghost'
      icon={isDark ? (<Moon />) : (<Sun />)}
      
      aria-label="Toggle theme"
    >
    </Button>
  );
}