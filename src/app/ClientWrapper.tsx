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
    // Unregister any active service worker and clear cache on localhost
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then(() => {
            console.log('[SW] Unregistered service worker');
          });
        }
      });
      if ('caches' in window) {
        caches.keys().then((names) => {
          for (const name of names) {
            caches.delete(name);
          }
        });
      }
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