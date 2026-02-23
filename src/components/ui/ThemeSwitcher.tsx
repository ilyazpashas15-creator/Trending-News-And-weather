'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switch-wrapper">
      <label className="theme-switch" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <div className="slider round">
          <span className="sun">☀️</span>
          <span className="moon">🌙</span>
        </div>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
