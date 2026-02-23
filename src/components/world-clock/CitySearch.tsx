'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { City } from '../../utils/cityDatabase';
import { fuzzySearchCities, getPopularCities } from '../../services/timezoneService';

interface CitySearchProps {
  onCitySelect: (city: City) => void;
  placeholder?: string;
  maxResults?: number;
}

export default function CitySearch({ 
  onCitySelect, 
  placeholder = 'Search for a city...',
  maxResults = 10 
}: CitySearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search for cities when query changes
  const performSearch = useCallback((searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    
    try {
      const searchResults = fuzzySearchCities(searchQuery, maxResults);
      setResults(searchResults);
      setShowDropdown(searchResults.length > 0);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [maxResults]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 150);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          selectCity(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        inputRef.current?.blur();
        break;
    }
  };

  const selectCity = (city: City) => {
    onCitySelect(city);
    setQuery('');
    setShowDropdown(false);
    setResults([]);
    setHighlightedIndex(-1);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get popular cities for initial display
  const popularCities = getPopularCities();

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      {/* Search Input Container */}
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.length < 2 && popularCities.length > 0) {
              setResults(popularCities.slice(0, 5));
              setShowDropdown(true);
            }
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-slate-800/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          autoComplete="off"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors duration-200 focus:outline-none"
            aria-label="Clear search"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}

        {/* Loading Indicator */}
        {isSearching && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
          {/* Popular Cities Section */}
          {query.length < 2 && popularCities.length > 0 && (
            <div className="px-4 py-2 border-b border-slate-600/50">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Popular Cities
              </p>
            </div>
          )}

          {/* Search Results */}
          {results.length > 0 ? (
            <ul className="py-2">
              {results.map((city, index) => (
                <li
                  key={city.id}
                  onClick={() => selectCity(city)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`
                    px-4 py-3 cursor-pointer transition-all duration-150
                    flex items-center justify-between
                    ${index === highlightedIndex 
                      ? 'bg-blue-600/30 border-l-4 border-blue-400' 
                      : 'border-l-4 border-transparent hover:bg-slate-700/50'
                    }
                  `}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-100">
                      {city.name}
                    </span>
                    <span className="text-sm text-slate-400">
                      {city.country}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-500 font-mono">
                      {city.timezone}
                    </span>
                    <span className="text-xs text-slate-400">
                      UTC{city.timezone.includes('America/New_York') ? '-05:00/-04:00' : 
                         city.timezone.includes('Europe/London') ? '+00:00/+01:00' :
                         city.timezone.includes('Asia/Tokyo') ? '+09:00' :
                         city.timezone.includes('Australia/Sydney') ? '+10:00/+11:00' :
                         ''}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 ? (
            <div className="px-4 py-6 text-center text-slate-400">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 mx-auto mb-2 opacity-50" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <p className="text-sm">No cities found</p>
              <p className="text-xs mt-1 opacity-70">Try a different search term</p>
            </div>
          ) : null}

          {/* Keyboard Navigation Hint */}
          <div className="px-4 py-2 border-t border-slate-600/50 text-xs text-slate-500 flex items-center justify-between">
            <span>Use ↑↓ to navigate, Enter to select</span>
            <span>ESC to close</span>
          </div>
        </div>
      )}
    </div>
  );
}
