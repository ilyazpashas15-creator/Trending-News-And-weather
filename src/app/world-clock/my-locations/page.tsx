'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { fetchWeatherByCity } from '@/services/weatherService';
import { WeatherData } from '@/types/weather.types';

interface SavedCity {
  id: string;
  name: string;
  country: string;
  countryCode?: string;
  timezone: string;
  weather?: WeatherData;
}

const PRESET_SUGGESTIONS: SavedCity[] = [
  { id: 'new-york', name: 'New York', country: 'United States', countryCode: 'US', timezone: 'America/New_York' },
  { id: 'london', name: 'London', country: 'United Kingdom', countryCode: 'GB', timezone: 'Europe/London' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', countryCode: 'JP', timezone: 'Asia/Tokyo' },
  { id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', timezone: 'Asia/Dubai' },
  { id: 'paris', name: 'Paris', country: 'France', countryCode: 'FR', timezone: 'Europe/Paris' },
];

function getFlag(code?: string) {
  if (!code) return '🌐';
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function formatTime(date: Date, timezone: string, is24h: boolean): { hoursMinutes: string; seconds: string; period: string } {
  try {
    if (is24h) {
      const t = date.toLocaleTimeString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      const parts = t.split(':');
      return { hoursMinutes: `${parts[0]}:${parts[1]}`, seconds: `:${parts[2] || '00'}`, period: '24H' };
    }
    const t = date.toLocaleTimeString('en-US', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const [timePart, periodPart] = t.split(' ');
    const parts = (timePart || '').split(':');
    return { hoursMinutes: `${parts[0]}:${parts[1]}`, seconds: `:${parts[2] || '00'}`, period: periodPart || '' };
  } catch {
    return { hoursMinutes: '--:--', seconds: ':--', period: '' };
  }
}

function formatDate(date: Date, timezone: string): string {
  try {
    return date.toLocaleDateString('en-US', { timeZone: timezone, weekday: 'short', month: 'short', day: 'numeric' });
  } catch {
    return '---';
  }
}

function getUTCOffset(date: Date, timezone: string): string {
  try {
    const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const local = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const off = (local.getTime() - utc.getTime()) / 60000;
    const h = Math.floor(Math.abs(off) / 60);
    const m = Math.abs(off) % 60;
    const s = off >= 0 ? '+' : '-';
    return m === 0 ? `UTC${s}${h}` : `UTC${s}${h}:${String(m).padStart(2, '0')}`;
  } catch {
    return 'UTC';
  }
}

function isDaytime(date: Date, timezone: string): boolean {
  try {
    const h = parseInt(date.toLocaleTimeString('en-US', { timeZone: timezone, hour: 'numeric', hour12: false }), 10);
    return h >= 6 && h < 20;
  } catch {
    return true;
  }
}

export default function WorldClockMyLocationsPage() {
  const [savedCities, setSavedCities] = useState<SavedCity[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [is24Hour, setIs24Hour] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Sync theme
  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Load from localStorage or seed initial popular hubs
  useEffect(() => {
    const saved = localStorage.getItem('savedWorldClockCities');
    if (saved) {
      try {
        const parsed: SavedCity[] = JSON.parse(saved);
        if (parsed.length > 0) {
          setSavedCities(parsed);
          loadWeather(parsed);
          return;
        }
      } catch (e) {
        console.error('Error parsing saved cities:', e);
      }
    }
    // Default seed
    setSavedCities(PRESET_SUGGESTIONS);
    localStorage.setItem('savedWorldClockCities', JSON.stringify(PRESET_SUGGESTIONS));
    loadWeather(PRESET_SUGGESTIONS);
  }, []);

  const loadWeather = async (cityList: SavedCity[]) => {
    const updated = await Promise.all(
      cityList.map(async (city) => {
        try {
          const weather = await fetchWeatherByCity(city.name);
          return { ...city, weather };
        } catch {
          return city;
        }
      })
    );
    setSavedCities(updated);
  };

  // Clock tick
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const removeCity = (id: string) => {
    const updated = savedCities.filter(c => c.id !== id);
    setSavedCities(updated);
    localStorage.setItem('savedWorldClockCities', JSON.stringify(updated));
  };

  const addPresetCity = (city: SavedCity) => {
    if (savedCities.some(c => c.name.toLowerCase() === city.name.toLowerCase())) return;
    const updated = [...savedCities, city];
    setSavedCities(updated);
    localStorage.setItem('savedWorldClockCities', JSON.stringify(updated));
    loadWeather(updated);
  };

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return savedCities;
    return savedCities.filter(
      c => c.name.toLowerCase().includes(term) || c.country.toLowerCase().includes(term)
    );
  }, [savedCities, searchTerm]);

  // Design tokens
  const T = {
    bgPage: isDark
      ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)'
      : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark
      ? 'radial-gradient(circle 800px at 20% 0%, rgba(99,102,241,0.08), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(14,165,233,0.06), transparent 70%)'
      : 'radial-gradient(circle 800px at 20% 0%, rgba(99,102,241,0.04), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(14,165,233,0.03), transparent 70%)',
    badgeLiveBg: isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)',
    badgeLiveBorder: isDark ? 'rgba(99,102,241,0.30)' : 'rgba(99,102,241,0.25)',
    badgeLiveText: isDark ? '#a5b4fc' : '#4f46e5',
    subheading: isDark ? '#94a3b8' : '#64748b',
    toolbarBg: isDark ? 'rgba(17, 24, 39, 0.75)' : 'rgba(255, 255, 255, 0.85)',
    toolbarBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.9)',
    toolbarShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    inputBg: isDark ? 'rgba(15, 23, 42, 0.6)' : '#ffffff',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.8)',
    inputText: isDark ? '#f8fafc' : '#0f172a',
    inputPlaceholder: isDark ? '#64748b' : '#94a3b8',
    pillActiveBg: isDark ? '#38bdf8' : '#0284c7',
    pillActiveText: '#ffffff',
    pillInactiveBg: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(241, 245, 249, 0.8)',
    pillInactiveText: isDark ? '#94a3b8' : '#64748b',
    pillInactiveBorder: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(226, 232, 240, 0.8)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.85)' : '#ffffff',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark
      ? '0 2px 8px rgba(0, 0, 0, 0.35)'
      : '0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px -2px rgba(15, 23, 42, 0.05)',
    cardHoverShadow: isDark
      ? '0 12px 28px -4px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.15)'
      : '0 8px 24px -4px rgba(15, 23, 42, 0.09), 0 2px 6px -1px rgba(15, 23, 42, 0.05)',
    cityName: isDark ? '#f8fafc' : '#0f172a',
    country: isDark ? '#94a3b8' : '#64748b',
    clockText: isDark ? '#ffffff' : '#0f172a',
    periodText: isDark ? '#94a3b8' : '#64748b',
    metaIcon: isDark ? '#64748b' : '#94a3b8',
    metaText: isDark ? '#94a3b8' : '#64748b',
    utcBg: isDark ? 'rgba(255, 255, 255, 0.06)' : '#f1f5f9',
    utcText: isDark ? '#cbd5e1' : '#475569',
    utcBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(203, 213, 225, 0.6)',
    tempText: isDark ? '#f1f5f9' : '#1e293b',
    tempDesc: isDark ? '#94a3b8' : '#64748b',
    statPillBg: isDark ? 'rgba(15, 23, 42, 0.6)' : '#ffffff',
    statPillBorder: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(226, 232, 240, 0.8)',
    statPillText: isDark ? '#cbd5e1' : '#475569',
    footerText: isDark ? '#64748b' : '#94a3b8',
  };

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-200" style={{ background: T.bgPage }}>
      {/* Ambient background */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" style={{ background: T.ambientOrbs }} />

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-7 pb-16">
        
        {/* Header */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 shadow-xs"
            style={{ background: T.badgeLiveBg, border: `1px solid ${T.badgeLiveBorder}` }}>
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T.badgeLiveText }}>
              Personal Watchlist · Live Sync
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-slate-900 dark:text-white">
            My Saved Locations
          </h1>
          <p className="text-xs sm:text-sm max-w-lg mx-auto" style={{ color: T.subheading }}>
            Personalized dashboard with your custom bookmarked cities, local clocks, and real-time weather.
          </p>
        </header>

        {/* Toolbar */}
        <section
          aria-label="Controls"
          className="rounded-2xl p-3 sm:p-4 mb-6 transition-all duration-200"
          style={{
            background: T.toolbarBg,
            border: `1px solid ${T.toolbarBorder}`,
            boxShadow: T.toolbarShadow,
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: T.inputPlaceholder }}
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={searchRef}
                id="saved-search"
                type="search"
                placeholder="Search your saved cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl focus:outline-none transition-colors"
                style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.inputText }}
                aria-label="Search saved cities"
                autoComplete="off"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); searchRef.current?.focus(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-0.5"
                  style={{ color: T.inputPlaceholder }}
                  aria-label="Clear search query"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Actions: Add City button & 12h/24h Toggle */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5">
              <Link
                href="/world-clock/add-city"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-sm transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>Add City</span>
              </Link>

              {/* 12H / 24H Toggle */}
              <div
                className="inline-flex items-center p-0.5 rounded-lg text-xs font-medium"
                style={{ background: T.statPillBg, border: `1px solid ${T.statPillBorder}` }}
                role="group"
                aria-label="Time format selector"
              >
                <button
                  type="button"
                  onClick={() => setIs24Hour(false)}
                  className="px-2.5 py-1 rounded-md cursor-pointer text-xs font-medium transition-all"
                  style={{ background: !is24Hour ? T.pillActiveBg : 'transparent', color: !is24Hour ? T.pillActiveText : T.pillInactiveText }}
                >
                  12-Hour
                </button>
                <button
                  type="button"
                  onClick={() => setIs24Hour(true)}
                  className="px-2.5 py-1 rounded-md cursor-pointer text-xs font-medium transition-all"
                  style={{ background: is24Hour ? T.pillActiveBg : 'transparent', color: is24Hour ? T.pillActiveText : T.pillInactiveText }}
                >
                  24-Hour
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="text-center py-14 px-4 rounded-2xl" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
            <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-indigo-500/10 text-indigo-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h2 className="text-base font-bold mb-1 text-slate-900 dark:text-white">No saved cities found</h2>
            <p className="text-xs mb-5 max-w-md mx-auto" style={{ color: T.subheading }}>
              Add custom locations from the Add City page, or quickly click any popular hub below to add it to your watchlist:
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
              {PRESET_SUGGESTIONS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => addPresetCity(preset)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-white/10 hover:border-indigo-500 hover:text-indigo-600 transition-all cursor-pointer bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300"
                >
                  <span>{getFlag(preset.countryCode)}</span>
                  <span>+ {preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {filtered.map((city, idx) => {
              const isHovered = hoveredId === city.id;
              const daytime = isDaytime(currentTime, city.timezone);
              const temp = city.weather ? Math.round(city.weather.main.temp) : null;
              const desc = city.weather?.weather?.[0]?.description ?? '';
              const icon = city.weather?.weather?.[0]?.icon;
              const { hoursMinutes, seconds, period } = formatTime(currentTime, city.timezone, is24Hour);

              return (
                <article
                  key={city.id}
                  onMouseEnter={() => setHoveredId(city.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-label={`${city.name}, ${city.country}`}
                  className="group relative rounded-xl transition-all duration-200"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 0.35s ease ${idx * 30}ms, transform 0.35s ease ${idx * 30}ms`,
                  }}
                >
                  <div
                    className="relative rounded-xl p-3 flex flex-col justify-between overflow-hidden transition-all duration-200"
                    style={{
                      background: T.cardBg,
                      border: `1px solid ${isHovered ? (isDark ? '#818cf8' : '#4f46e5') : T.cardBorder}`,
                      boxShadow: isHovered ? T.cardHoverShadow : T.cardShadow,
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                  >
                    {/* Top micro-indicator stripe */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-[2.5px] transition-opacity duration-200"
                      style={{
                        background: 'linear-gradient(90deg, #6366f1, #38bdf8)',
                        opacity: isHovered ? 1 : 0.65,
                      }}
                    />

                    {/* Delete button on hover */}
                    <button
                      onClick={() => removeCity(city.id)}
                      className="absolute top-2 right-2 p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      title={`Remove ${city.name} from saved locations`}
                      aria-label={`Remove ${city.name}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Row 1: Header + Weather */}
                    <div className="flex items-start justify-between gap-1.5 mb-1.5 pt-0.5 pr-5">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm leading-none select-none" aria-label={city.countryCode}>
                            {getFlag(city.countryCode)}
                          </span>
                          <h2 className="text-xs sm:text-sm font-semibold truncate leading-snug tracking-tight text-slate-900 dark:text-white" title={city.name}>
                            {city.name}
                          </h2>
                        </div>
                        <p className="text-[10px] truncate mt-0.5" style={{ color: T.country }} title={city.country}>
                          {city.country}
                        </p>
                      </div>

                      {/* Weather */}
                      {temp !== null && (
                        <div className="flex items-center gap-1 flex-shrink-0 text-right">
                          {icon && (
                            <img
                              src={`https://openweathermap.org/img/wn/${icon}.png`}
                              alt={desc}
                              width={22}
                              height={22}
                              className="w-[22px] h-[22px] object-contain -my-1"
                              loading="lazy"
                            />
                          )}
                          <div className="text-right">
                            <span className="text-[11px] font-semibold leading-none" style={{ color: T.tempText }}>
                              {temp}°C
                            </span>
                            <span className="block text-[8px] capitalize truncate max-w-[48px]" style={{ color: T.tempDesc }} title={desc}>
                              {desc}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Row 2: Clock & Day/Night */}
                    <div className="flex items-baseline justify-between my-1">
                      <div className="flex items-baseline gap-0.5">
                        <span suppressHydrationWarning className="font-mono text-lg sm:text-xl font-bold tracking-tight tabular-nums leading-none" style={{ color: T.clockText }}>
                          {hoursMinutes}
                        </span>
                        <span suppressHydrationWarning className="font-mono text-xs font-normal tabular-nums opacity-60" style={{ color: T.clockText }}>
                          {seconds}
                        </span>
                        {period && (
                          <span suppressHydrationWarning className="text-[10px] font-semibold uppercase tracking-wider ml-1" style={{ color: isHovered ? '#6366f1' : T.periodText }}>
                            {period}
                          </span>
                        )}
                      </div>

                      <span
                        suppressHydrationWarning
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                        style={{
                          background: daytime ? (isDark ? 'rgba(245,158,11,0.15)' : '#fef3c7') : (isDark ? 'rgba(99,102,241,0.15)' : '#e0e7ff'),
                          color: daytime ? (isDark ? '#fbbf24' : '#b45309') : (isDark ? '#a5b4fc' : '#4338ca'),
                        }}
                      >
                        <span aria-hidden="true">{daytime ? '☀️' : '🌙'}</span>
                        <span>{daytime ? 'Day' : 'Night'}</span>
                      </span>
                    </div>

                    {/* Row 3: Date & Offset */}
                    <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1 truncate" style={{ color: T.metaText }}>
                        <svg className="w-2.5 h-2.5 flex-shrink-0" style={{ color: T.metaIcon }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        <span suppressHydrationWarning className="truncate">{formatDate(currentTime, city.timezone)}</span>
                      </div>

                      <span
                        suppressHydrationWarning
                        className="font-mono text-[9px] font-semibold px-1.5 py-0.2 rounded flex-shrink-0 ml-1"
                        style={{ background: T.utcBg, color: T.utcText, border: `1px solid ${T.utcBorder}` }}
                        title={`Offset: ${getUTCOffset(currentTime, city.timezone)} | Timezone: ${city.timezone}`}
                      >
                        {getUTCOffset(currentTime, city.timezone)}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <footer className="text-center text-xs mt-10" style={{ color: T.footerText }}>
          <span>Clocks sync automatically every second</span>
          <span className="mx-2">·</span>
          <span>Saved locally in browser</span>
          <span className="mx-2">·</span>
          <span>Live weather &amp; astronomical offsets</span>
        </footer>
      </div>
    </div>
  );
}