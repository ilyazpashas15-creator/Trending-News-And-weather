'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useBookmarks } from '@/context/BookmarkContext';

const NavbarBookmarks: React.FC = () => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

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
      {/* Bookmark Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100/80 dark:hover:bg-white/10 transition-all duration-200 touch-target flex items-center justify-center"
        aria-label={`Saved Reads (${bookmarks.length})`}
        title="Saved Articles"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>

        {/* Counter badge */}
        {bookmarks.length > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-[9px] font-extrabold text-white shadow-sm">
            {bookmarks.length}
          </span>
        )}
      </button>

      {/* Bookmarks Popover Menu */}
      {isOpen && (
        <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-16 sm:top-full sm:mt-2 sm:w-96 max-w-[calc(100vw-1.5rem)] sm:max-w-none bg-white/95 dark:bg-[#0c1324]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Saved Reads
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                {bookmarks.length} saved
              </span>
            </div>

            {bookmarks.length > 0 && (
              <a
                href="/#news"
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
              >
                Go to feed →
              </a>
            )}
          </div>

          {/* Bookmarks List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-white/5 scrollbar-none">
            {bookmarks.length > 0 ? (
              bookmarks.map((article) => (
                <div
                  key={article.url}
                  className="p-3 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors flex items-start gap-3 group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex-shrink-0 relative">
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-lg text-white">
                        📰
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-purple-600 dark:hover:text-purple-300 transition-colors leading-snug mb-1"
                    >
                      {article.title}
                    </a>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{article.source.name || 'News Source'}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeBookmark(article.url);
                        }}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Remove bookmark"
                        aria-label="Remove bookmark"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 px-4 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto mb-3 text-xl">
                  🔖
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white mb-1">
                  No Saved Reads Yet
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Click the bookmark ribbon on any news article card to save it for reading later.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {bookmarks.length > 0 && (
            <div className="p-2.5 bg-slate-50/80 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 text-center">
              <span className="text-[11px] text-slate-400 dark:text-slate-400">
                Bookmarks saved offline in your browser
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarBookmarks;
