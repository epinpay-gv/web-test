'use client';

import { useThemeStore } from '../store/useThemeStore';
import { Sun, Moon } from 'flowbite-react-icons/outline';
import { Button } from '@/components/common/Button/Button';

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const hydrated = useThemeStore((state) => state.hydrated);

  if (!hydrated) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Button
      onClick={() => toggleTheme()}
      aria-label="Toggle theme"
      variant="ghost"
      icon={isDark ? (<Moon className='w-6 h-6'></Moon>) : (<Sun className="w-6 h-6"></Sun>)}
    > 
    </Button>
  );
}
