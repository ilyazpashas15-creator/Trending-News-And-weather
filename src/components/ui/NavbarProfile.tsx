'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const NavbarProfile: React.FC = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('temp_unit');
    if (saved === 'F') setTempUnit('F');
  }, []);

  const handleUnitToggle = (unit: 'C' | 'F') => {
    setTempUnit(unit);
    localStorage.setItem('temp_unit', unit);
    window.dispatchEvent(new Event('storage'));
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={popoverRef} className="relative">
      {/* Profile Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-white/10 transition-all duration-200 touch-target"
        aria-label="User profile and settings"
      >
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 p-0.5 shadow-sm">
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-800 dark:text-white">
            {isAuthenticated && user?.email
              ? user.email.charAt(0).toUpperCase()
              : '👤'}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
        </div>
      </button>

      {/* Profile Dropdown Menu */}
      {isOpen && (
        <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-16 sm:top-full sm:mt-2 sm:w-72 max-w-[calc(100vw-1.5rem)] sm:max-w-none bg-white/95 dark:bg-[#0c1324]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header identity */}
          <div className="p-4 border-b border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                {isAuthenticated && user?.email
                  ? user.email.charAt(0).toUpperCase()
                  : 'G'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {isAuthenticated && user?.email ? user.email : 'Guest Explorer'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAuthenticated ? 'Pro Member' : 'Standard Access'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Preferences: Temp Unit */}
          <div className="p-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Temperature Unit
              </span>
              <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-white/10 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleUnitToggle('C')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                    tempUnit === 'C'
                      ? 'bg-white dark:bg-purple-600 text-purple-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  °C
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggle('F')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                    tempUnit === 'F'
                      ? 'bg-white dark:bg-purple-600 text-purple-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  °F
                </button>
              </div>
            </div>
          </div>

          {/* Links list */}
          <div className="py-2 text-xs sm:text-sm">
            <Link
              href="/world-clock/my-locations"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              <span>🌍</span>
              <span>My Saved Cities</span>
            </Link>

            <Link
              href="/#news"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              <span>🔖</span>
              <span>Saved Articles</span>
            </Link>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              <span>⚙️</span>
              <span>Account Preferences</span>
            </Link>
          </div>

          {/* Auth Button */}
          <div className="p-3 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
            {!isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  router.push('/login');
                }}
                className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold text-xs transition-all shadow-md hover:shadow-purple-500/25"
              >
                Sign In to Account
              </button>
            ) : (
              <button
                type="button"
                onClick={async () => {
                  setIsOpen(false);
                  await logout();
                  router.push('/');
                }}
                className="w-full py-2 px-4 rounded-xl border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 font-semibold text-xs transition-all text-center"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarProfile;
