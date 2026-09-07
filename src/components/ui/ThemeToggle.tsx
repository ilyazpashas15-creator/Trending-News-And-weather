'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { trackEvent } from '@/lib/analytics';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const handleToggle = () => {
    toggleTheme();
    trackEvent('theme_change', { new_theme: isDark ? 'light' : 'dark' });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`relative inline-flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 touch-target focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
        isDark
          ? 'bg-white/10 hover:bg-white/15 text-yellow-300 border border-white/10 shadow-lg shadow-black/20'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/80 shadow-sm'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (shown in dark mode to switch to light) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 transition-all duration-500 transform ${
            isDark ? 'rotate-0 scale-100 opacity-100 text-amber-300' : 'rotate-90 scale-0 opacity-0 absolute'
          }`}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>

        {/* Moon Icon (shown in light mode to switch to dark) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 transition-all duration-500 transform ${
            !isDark ? 'rotate-0 scale-100 opacity-100 text-indigo-600' : '-rotate-90 scale-0 opacity-0 absolute'
          }`}
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-semibold uppercase tracking-wider">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
