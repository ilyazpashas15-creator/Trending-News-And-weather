'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SuggestionItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'city' | 'news';
  icon: string;
  action: () => void;
}

const POPULAR_CITIES = [
  { name: 'Bengaluru', country: 'IN', region: 'India' },
  { name: 'New York', country: 'US', region: 'United States' },
  { name: 'London', country: 'GB', region: 'United Kingdom' },
  { name: 'Tokyo', country: 'JP', region: 'Japan' },
  { name: 'Paris', country: 'FR', region: 'France' },
  { name: 'Dubai', country: 'AE', region: 'United Arab Emirates' },
  { name: 'Singapore', country: 'SG', region: 'Singapore' },
  { name: 'Sydney', country: 'AU', region: 'Australia' },
  { name: 'Mumbai', country: 'IN', region: 'India' },
  { name: 'Toronto', country: 'CA', region: 'Canada' },
];

const NEWS_TOPICS = [
  { title: 'Trending Headlines', category: 'general', path: '/#news' },
  { title: 'Technology & AI', category: 'technology', path: '/news/world' },
  { title: 'Finance & Stock Markets', category: 'business', path: '/news/world' },
  { title: 'Global Sports & Leagues', category: 'sports', path: '/news/world' },
  { title: 'Science & Space Discoveries', category: 'science', path: '/sun-moon-space/nasa-apod' },
  { title: 'Health & Medical Insights', category: 'health', path: '/news/world' },
  { title: 'Severe Weather & Alerts', category: 'weather', path: '/weather/alerts' },
];

interface NavbarSearchProps {
  onSelectCity?: (city: string) => void;
  className?: string;
  compact?: boolean;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  onSelectCity,
  className = '',
  compact = false,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on query
  const suggestions: SuggestionItem[] = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const results: SuggestionItem[] = [];

    if (!q) {
      // Default top suggestions when focused with empty query
      POPULAR_CITIES.slice(0, 3).forEach((city) => {
        results.push({
          id: `city-${city.name}`,
          title: city.name,
          subtitle: `Weather in ${city.region}`,
          type: 'city',
          icon: '🏙️',
          action: () => {
            if (onSelectCity) onSelectCity(city.name);
            else router.push(`/?q=${encodeURIComponent(city.name)}`);
            setIsOpen(false);
            setQuery('');
          },
        });
      });

      NEWS_TOPICS.slice(0, 3).forEach((topic) => {
        results.push({
          id: `news-${topic.title}`,
          title: topic.title,
          subtitle: 'Trending News Category',
          type: 'news',
          icon: '📰',
          action: () => {
            router.push(topic.path);
            setIsOpen(false);
            setQuery('');
          },
        });
      });

      return results;
    }

    // Match cities
    POPULAR_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
    ).forEach((city) => {
      results.push({
        id: `city-${city.name}`,
        title: city.name,
        subtitle: `Weather in ${city.region} (${city.country})`,
        type: 'city',
        icon: '🏙️',
        action: () => {
          if (onSelectCity) onSelectCity(city.name);
          else router.push(`/?q=${encodeURIComponent(city.name)}`);
          setIsOpen(false);
          setQuery('');
        },
      });
    });

    // Match news topics
    NEWS_TOPICS.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
    ).forEach((topic) => {
      results.push({
        id: `news-${topic.title}`,
        title: topic.title,
        subtitle: 'Explore News Topic',
        type: 'news',
        icon: '📰',
        action: () => {
          router.push(topic.path);
          setIsOpen(false);
          setQuery('');
        },
      });
    });

    // Custom search fallback
    if (q.length > 1) {
      results.push({
        id: `custom-weather-${q}`,
        title: `Search "${query}" weather`,
        subtitle: 'Fetch live weather conditions',
        type: 'city',
        icon: '🌤️',
        action: () => {
          if (onSelectCity) onSelectCity(query.trim());
          else router.push(`/?q=${encodeURIComponent(query.trim())}`);
          setIsOpen(false);
          setQuery('');
        },
      });
    }

    return results;
  }, [query, onSelectCity, router]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        suggestions[selectedIndex].action();
      } else if (query.trim()) {
        if (onSelectCity) onSelectCity(query.trim());
        else router.push(`/?q=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
        setQuery('');
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative flex items-center group">
        {/* Glow border on focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-0 group-focus-within:opacity-40 dark:group-focus-within:opacity-60 transition duration-300 pointer-events-none" />

        <div className="relative w-full flex items-center">
          {/* Search Icon */}
          <span className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>

          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={compact ? 'Search...' : 'Search weather, news, cities...'}
            className={`w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-full bg-slate-100/90 dark:bg-[#0d1527]/90 border border-slate-200/90 dark:border-white/12 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-md transition-all ${
              compact ? 'w-44 focus:w-64' : 'w-full sm:w-64 md:w-80'
            }`}
            aria-label="Search navbar"
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Autocomplete Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 top-full mt-2 w-72 sm:w-84 md:w-96 bg-white/95 dark:bg-[#0c1324]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 border-b border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400 dark:text-slate-400 px-3">
            <span>{query.trim() ? 'SUGGESTED MATCHES' : 'POPULAR DESTINATIONS'}</span>
            <span className="text-[10px] font-normal opacity-75">Use ↑↓ & Enter</span>
          </div>

          <div className="max-h-80 overflow-y-auto py-1 scrollbar-none">
            {suggestions.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full px-3 py-2.5 flex items-center justify-between text-left transition-all ${
                    isSelected
                      ? 'bg-purple-50 dark:bg-gradient-to-r dark:from-purple-900/40 dark:to-blue-900/40'
                      : 'hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div
                        className={`text-xs sm:text-sm font-semibold ${
                          isSelected
                            ? 'text-purple-600 dark:text-purple-300'
                            : 'text-slate-800 dark:text-slate-100'
                        }`}
                      >
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      item.type === 'city'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30'
                        : 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30'
                    }`}
                  >
                    {item.type === 'city' ? 'Weather' : 'News'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
