'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NewsArticle } from '@/types';
import { useToast } from './ToastContext';

interface BookmarkContextType {
  bookmarks: NewsArticle[];
  isBookmarked: (url: string) => boolean;
  toggleBookmark: (article: NewsArticle) => void;
  removeBookmark: (url: string) => void;
  clearBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

const BOOKMARKS_STORAGE_KEY = 'weather_news_bookmarks_v1';

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { addToast } = useToast();

  // Load bookmarks on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load bookmarks from localStorage:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  const saveBookmarks = (items: NewsArticle[]) => {
    setBookmarks(items);
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save bookmarks to localStorage:', err);
    }
  };

  const isBookmarked = (url: string): boolean => {
    if (!url) return false;
    return bookmarks.some((item) => item.url === url);
  };

  const toggleBookmark = (article: NewsArticle) => {
    if (!article || !article.url) return;

    if (isBookmarked(article.url)) {
      const next = bookmarks.filter((item) => item.url !== article.url);
      saveBookmarks(next);
      addToast('Article removed from bookmarks', 'info');
    } else {
      const next = [article, ...bookmarks];
      saveBookmarks(next);
      addToast('Article bookmarked!', 'success');
    }
  };

  const removeBookmark = (url: string) => {
    if (!url) return;
    const next = bookmarks.filter((item) => item.url !== url);
    saveBookmarks(next);
    addToast('Article removed from bookmarks', 'info');
  };

  const clearBookmarks = () => {
    saveBookmarks([]);
    addToast('All bookmarks cleared', 'info');
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        toggleBookmark,
        removeBookmark,
        clearBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = (): BookmarkContextType => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
