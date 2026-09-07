'use client';

import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { BookmarkProvider } from '@/context/BookmarkContext';
import { ReactNode, useEffect } from 'react';

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  useEffect(() => {
    // Register Service Worker for performance and caching (Step 04)
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered successfully with scope:', registration.scope);
          })
          .catch((error) => {
            console.warn('Service Worker registration skipped or failed:', error);
          });
      });
    }
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <BookmarkProvider>
          {children}
        </BookmarkProvider>
      </ToastProvider>
    </AuthProvider>
  );
}