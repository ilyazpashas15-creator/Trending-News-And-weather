'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { searchLocations } from '@/services/weatherService';
import { LocationSearchResult } from '@/types/weather.types';

interface SavedCity {
  id: string;
  name: string;
  country: string;
  countryCode?: string;
  timezone: string;
}

function getFlag(code?: string) {
  if (!code) return '🌐';
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function getClosestTimezone(lat: number, lon: number): string {
  const offset = Math.round(lon / 15);
  if (offset >= -10 && offset <= -4) return 'America/New_York';
  if (offset >= -3 && offset <= 3) return 'Europe/London';
  if (offset >= 4 && offset <= 7) return 'Asia/Dubai';
  if (offset >= 8 && offset <= 12) return 'Asia/Tokyo';
  if (offset >= -4 && offset <= -11) return 'America/Los_Angeles';
  if (offset >= 12 && offset <= 15) return 'Australia/Sydney';
  return 'Europe/London';
}

function getPreviewTime(timezone: string): string {
  try {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '--:--';
  }
}

export default function WorldClockAddCityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [savedCities, setSavedCities] = useState<SavedCity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Load saved cities from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedWorldClockCities');
    if (saved) {
      try {
        const parsed: SavedCity[] = JSON.parse(saved);
        setSavedCities(parsed);
      } catch (e) {
        console.error('Error parsing saved cities:', e);
      }
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        handleSearch(searchTerm.trim());
      } else {
        setSearchResults([]);
        setError(null);
      }
    }, 450);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchLocations(query);
      setSearchResults(results || []);
      if (!results || results.length === 0) {
        setError('No locations found matching this query.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Unable to fetch locations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addCity = (city: LocationSearchResult) => {
    const alreadySaved = savedCities.some(
      (sc) => sc.name.toLowerCase() === city.name.toLowerCase() && sc.country.toLowerCase() === city.country.toLowerCase()
    );

    if (alreadySaved) {
      setSuccessToast(`${city.name} is already in your watchlist.`);
      setTimeout(() => setSuccessToast(null), 3000);
      return;
    }

    const tz = getClosestTimezone(city.lat, city.lon);
    const newCity: SavedCity = {
      id: `${city.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name: city.name,
      country: city.country,
      countryCode: city.country,
      timezone: tz,
    };

    const updated = [...savedCities, newCity];
    setSavedCities(updated);
    localStorage.setItem('savedWorldClockCities', JSON.stringify(updated));

    setSuccessToast(`✓ Added ${city.name} to My Locations!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const removeCity = (id: string) => {
    const updated = savedCities.filter((c) => c.id !== id);
    setSavedCities(updated);
    localStorage.setItem('savedWorldClockCities', JSON.stringify(updated));
  };

  const isCitySaved = (cityName: string, countryName: string) => {
    return savedCities.some(
      (c) => c.name.toLowerCase() === cityName.toLowerCase() && c.country.toLowerCase() === countryName.toLowerCase()
    );
  };

  const T = {
    bgPage: isDark
      ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)'
      : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark
      ? 'radial-gradient(circle 800px at 20% 0%, rgba(99,102,241,0.08), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(14,165,233,0.06), transparent 70%)'
      : 'radial-gradient(circle 800px at 20% 0%, rgba(99,102,241,0.04), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(14,165,233,0.03), transparent 70%)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.85)' : '#ffffff',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    subheading: isDark ? '#94a3b8' : '#64748b',
    footerText: isDark ? '#64748b' : '#94a3b8',
  };

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-200" style={{ background: T.bgPage }}>
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" style={{ background: T.ambientOrbs }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-7 pb-16">
        
        {/* Header */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 shadow-xs bg-indigo-500/10 border border-indigo-500/25">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Global City Directory · Instant Lookup
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-slate-900 dark:text-white">
            Add New City
          </h1>
          <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: T.subheading }}>
            Search any city, capital, or municipality worldwide to add to your personal world clock watchlist.
          </p>
        </header>

        {/* Success Toast */}
        {successToast && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold text-center transition-all animate-in fade-in slide-in-from-top-2">
            {successToast}
          </div>
        )}

        {/* Search Toolbar */}
        <div
          className="rounded-2xl p-3 sm:p-4 mb-6 backdrop-blur-xl"
          style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
        >
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Type city name (e.g., Chicago, Seoul, Amsterdam)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/40 transition-all"
              autoFocus
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => { setSearchTerm(''); searchInputRef.current?.focus(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center justify-center py-8 gap-2.5 text-xs text-indigo-500 font-medium">
            <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            <span>Searching global databases...</span>
          </div>
        )}

        {/* Error message */}
        {error && !loading && (
          <div className="text-center py-6 px-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium mb-6">
            {error}
          </div>
        )}

        {/* Search Results List */}
        {searchResults.length > 0 && !loading && (
          <div
            className="rounded-2xl overflow-hidden mb-8 divide-y divide-slate-100 dark:divide-slate-800"
            style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
          >
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Found {searchResults.length} Match{searchResults.length > 1 ? 'es' : ''}
              </span>
              <span className="text-[10px] text-slate-400">Click to add to your World Clock</span>
            </div>

            {searchResults.map((city, idx) => {
              const tz = getClosestTimezone(city.lat, city.lon);
              const preview = getPreviewTime(tz);
              const isAdded = isCitySaved(city.name, city.country);

              return (
                <div
                  key={`${city.name}-${city.lat}-${idx}`}
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base select-none">{getFlag(city.country)}</span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {city.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      <span>{city.country}</span>
                      <span>·</span>
                      <span className="text-[10px] font-mono text-slate-400 truncate">{tz}</span>
                    </div>
                  </div>

                  {/* Live time preview + Action */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="hidden sm:block text-right">
                      <span suppressHydrationWarning className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                        {preview}
                      </span>
                      <span className="block text-[9px] text-slate-400">Local Time</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addCity(city)}
                      disabled={isAdded}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                        isAdded
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-white/5'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs hover:shadow-sm'
                      }`}
                    >
                      {isAdded ? '✓ Added' : '+ Add City'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Current Watchlist Chips */}
        <section
          className="rounded-2xl p-4 sm:p-5 backdrop-blur-xl"
          style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Currently in Your Watchlist ({savedCities.length})
            </h2>
            <Link
              href="/world-clock/my-locations"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View Dashboard</span>
              <span>→</span>
            </Link>
          </div>

          {savedCities.length === 0 ? (
            <p className="text-xs text-slate-400">No saved cities yet. Search above to add your first location.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {savedCities.map((city) => (
                <span
                  key={city.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200"
                >
                  <span className="text-xs">{getFlag(city.countryCode)}</span>
                  <span>{city.name}</span>
                  <button
                    onClick={() => removeCity(city.id)}
                    className="ml-1 text-slate-400 hover:text-rose-500 p-0.5 cursor-pointer"
                    title={`Remove ${city.name}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </section>

        <footer className="text-center text-xs mt-10" style={{ color: T.footerText }}>
          <span>Search powered by OpenWeather Geo API</span>
          <span className="mx-2">·</span>
          <span>Automatic timezone &amp; daylight offset calculation</span>
        </footer>
      </div>
    </div>
  );
}