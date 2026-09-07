'use client';

import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { NewsArticle } from '@/types';
import { fetchTopHeadlines, fetchNewsByQueryAndCategory } from '@/services/newsService';
import LoadingSpinner from './LoadingSpinner';
import { useBookmarks } from '@/context/BookmarkContext';
import { trackEvent } from '@/lib/analytics';

interface NewsSectionProps {
  defaultCategory?: string;
  defaultCountry?: string;
  useWorldAPI?: boolean;
  showTitle?: boolean;
}

const CATEGORIES = [
  { id: 'general', name: 'Trending' },
  { id: 'technology', name: 'Tech' },
  { id: 'business', name: 'Finance' },
  { id: 'sports', name: 'Sports' },
  { id: 'science', name: 'Science' },
  { id: 'health', name: 'Health' },
  { id: 'entertainment', name: 'Culture' },
];

const COUNTRIES = [
  { code: 'in', name: 'India', flag: '🇮🇳' },
  { code: 'us', name: 'US', flag: '🇺🇸' },
  { code: 'gb', name: 'UK', flag: '🇬🇧' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦' },
  { code: 'au', name: 'Australia', flag: '🇦🇺' },
];

const NewsSection: React.FC<NewsSectionProps> = ({
  defaultCategory = 'general',
  defaultCountry = 'in',
  useWorldAPI = false,
  showTitle = true,
}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedCountry, setSelectedCountry] = useState<string>(defaultCountry);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'news' | 'bookmarks'>('news');

  const { bookmarks } = useBookmarks();

  useEffect(() => {
    if (activeTab === 'news') {
      loadNews();
    }
  }, [selectedCategory, selectedCountry, searchQuery, activeTab]);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);

      let newsData: NewsArticle[] = [];

      if (searchQuery.trim()) {
        newsData = await fetchNewsByQueryAndCategory(searchQuery.trim(), selectedCategory);
        trackEvent('search_news', { query: searchQuery, category: selectedCategory });
      } else {
        newsData = await fetchTopHeadlines(selectedCategory, selectedCountry, 20, 1, useWorldAPI);
      }

      setArticles(newsData);
    } catch (err) {
      console.error('Error loading news:', err);
      setError('Could not fetch live updates. Displaying cached headlines.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('news');
    trackEvent('category_filter', { category: catId });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab !== 'news') setActiveTab('news');
  };

  return (
    <section className="w-full my-8" aria-label="Trending News Feed">
      {showTitle && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white section-heading tracking-tight">
              Trending News & Insights
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Curated real-time headlines filtered by category, region, and bookmarks
            </p>
          </div>

          {/* Bookmarks Counter Button */}
          <button
            onClick={() => setActiveTab(activeTab === 'bookmarks' ? 'news' : 'bookmarks')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
              activeTab === 'bookmarks'
                ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30'
                : 'bg-white/80 dark:bg-white/5 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-purple-400'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={activeTab === 'bookmarks' ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 text-purple-400"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
            <span>Saved Reads</span>
            <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold">
              {bookmarks.length}
            </span>
          </button>
        </div>
      )}

      {/* Category Pills & Search Bar Container */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-6 p-2.5 rounded-2xl glass-card">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none flex-nowrap">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all duration-200 ${
                activeTab === 'news' && selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Right Tools: Country Selector & Search */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Country Quick Select */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 rounded-xl p-1 border border-slate-200 dark:border-white/10">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  setSelectedCountry(country.code);
                  setActiveTab('news');
                }}
                className={`px-2 py-1 text-xs rounded-lg transition-all ${
                  selectedCountry === country.code
                    ? 'bg-white dark:bg-white/20 shadow-sm font-bold scale-105'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title={country.name}
              >
                {country.flag}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter headlines..."
              className="w-full px-3.5 py-2 pl-8 text-xs sm:text-sm glass-input rounded-xl border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <svg
              className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Bookmarks Mode Header */}
      {activeTab === 'bookmarks' && (
        <div className="p-4 mb-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base">Saved Articles ({bookmarks.length})</h3>
            <p className="text-xs opacity-80">Articles you have bookmarked are saved offline in your browser.</p>
          </div>
          <button
            onClick={() => setActiveTab('news')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors"
          >
            Back to Live News
          </button>
        </div>
      )}

      {/* Content Grid or State */}
      {activeTab === 'bookmarks' ? (
        bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarks.map((article, index) => (
              <NewsCard key={`bookmark-${article.url}-${index}`} article={article} category="general" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-3xl p-8 max-w-lg mx-auto">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">No bookmarked articles yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Click the bookmark ribbon on any news card to save stories for later reading.
            </p>
            <button
              onClick={() => setActiveTab('news')}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-all shadow-md"
            >
              Browse Trending News
            </button>
          </div>
        )
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden p-0 animate-pulse h-80 flex flex-col justify-between">
              <div className="h-44 bg-slate-300/40 dark:bg-white/10 w-full" />
              <div className="p-4 flex flex-col gap-2.5">
                <div className="h-4 bg-slate-300/40 dark:bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-slate-300/40 dark:bg-white/10 rounded w-full" />
                <div className="h-3 bg-slate-300/40 dark:bg-white/10 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <NewsCard
              key={`${article.url}-${index}`}
              article={article}
              category={selectedCategory}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card rounded-3xl">
          <p className="text-base text-slate-600 dark:text-slate-300 font-medium">No articles matched your current query.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('general');
            }}
            className="mt-3 text-xs text-purple-600 dark:text-purple-400 font-semibold underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default NewsSection;