'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const applyTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Check localStorage first
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      applyTheme(storedTheme);
    } else {
      // Fallback to system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Listen to OS scheme changes if user has no stored preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  };

  const setThemeMode = (mode: 'light' | 'dark') => {
    applyTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
