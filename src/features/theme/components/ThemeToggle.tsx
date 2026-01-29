'use client';

import { useThemeStore } from '../store/useThemeStore';
import { Sun, Moon } from 'flowbite-react-icons/outline';

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
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        w-10 h-10
        flex items-center justify-center
        rounded-full
        text-gray-900 dark:text-white
        hover:bg-gray-100 dark:hover:bg-gray-700
        transition-all
      "
    >
      {isDark ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
    </button>
  );
}
