'use client';

import React, { useState } from 'react';
import { NewsArticle } from '@/types';
import ImageWithFallback from './ImageWithFallback';
import { useBookmarks } from '@/context/BookmarkContext';
import SocialShareModal, { triggerShare } from './SocialShareModal';
import { trackEvent } from '@/lib/analytics';

interface NewsCardProps {
  article: NewsArticle;
  category?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, category = 'general' }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [showShareModal, setShowShareModal] = useState(false);
  const bookmarked = isBookmarked(article.url);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Recently';

      const diffMs = Date.now() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;

      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  const calculateReadTime = (content?: string, description?: string) => {
    const text = (content || description || '');
    const wordCount = text.split(/\s+/).length;
    return `${Math.max(2, Math.ceil(wordCount / 40))} min read`;
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const usedNative = await triggerShare(article.title, article.url, article.description || undefined);
    if (!usedNative) {
      setShowShareModal(true);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(article);
    trackEvent('toggle_bookmark', { title: article.title, url: article.url, bookmarked: !bookmarked });
  };

  return (
    <>
      <article className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white/95 dark:bg-[#0c1222]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/12 hover:border-purple-400/60 dark:hover:border-purple-400/60 transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-xl dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] dark:hover:shadow-[0_20px_45px_rgba(168,85,247,0.25)]">
        {/* Top Image Section */}
        <div className="relative w-full h-48 sm:h-52 overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={article.urlToImage}
            alt={article.title}
            category={category}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
          />

          {/* Gentle gradient overlay for contrast while keeping image bright */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

          {/* Source badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-black/60 dark:bg-purple-950/80 text-white dark:text-purple-200 backdrop-blur-md border border-white/15 dark:border-purple-400/40 shadow-sm">
              {article.source.name || 'News Wire'}
            </span>
          </div>

          {/* Floating Actions: Bookmark + Share */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            {/* Bookmark button */}
            <button
              type="button"
              onClick={handleBookmark}
              className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 ${
                bookmarked
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 scale-105'
                  : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/70'
              }`}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
              title={bookmarked ? 'Bookmarked' : 'Save for later'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={bookmarked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </button>

            {/* Share button */}
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-black/50 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-md transition-all duration-200"
              aria-label="Share article"
              title="Share article"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" x2="12" y1="2" y2="15" />
              </svg>
            </button>
          </div>

          {/* Time & reading length strip at bottom of thumbnail */}
          <div className="absolute bottom-2 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-slate-200 font-medium drop-shadow">
            <span>{formatDate(article.publishedAt)}</span>
            <span>{calculateReadTime(article.content || undefined, article.description || undefined)}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
              {article.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
              {article.description || article.content || 'Read the full coverage for comprehensive insights and live reporting.'}
            </p>
          </div>

          {/* Card Footer: Read More + Author */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between mt-auto text-xs">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('read_article_click', { title: article.title, url: article.url })}
              className="inline-flex items-center gap-1 font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors group/link"
            >
              <span>Read story</span>
              <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
            </a>

            {article.author && (
              <span className="text-[11px] text-slate-400 truncate max-w-[120px]" title={article.author}>
                By {article.author}
              </span>
            )}
          </div>
        </div>
      </article>

      {/* Share Modal */}
      <SocialShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={article.title}
        url={article.url}
        description={article.description || undefined}
      />
    </>
  );
};

export default NewsCard;