import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  hydrated: boolean;
  setHydrated: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'system',
  hydrated: false,

  setTheme: (theme: Theme) => {
    set({ theme });
    
    // localStorage'a kaydet
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      applyTheme(theme);
    }
  },

  setHydrated: () => {
    set({ hydrated: true });
  },
}));

// Temayı DOM'a uygula
const applyTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return;

  let resolvedTheme: 'light' | 'dark' = 'dark';

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

// localStorage'dan tema yükle (sadece client-side)
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  if (savedTheme) {
    useThemeStore.setState({ theme: savedTheme });
    applyTheme(savedTheme);
  } else {
    // İlk yükleme
    applyTheme('system');
  }
}