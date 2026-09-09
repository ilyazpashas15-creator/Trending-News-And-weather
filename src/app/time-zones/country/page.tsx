'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { getAllTimeZones, formatTimeForTimezone } from '@/utils/timezones';

interface TimeZoneData {
  name: string;
  city: string;
  country: string;
  flag: string;
  time: string;
  date: string;
  offset: string;
}

const COUNTRY_MAP: Record<string, { country: string; flag: string }> = {
  New_York: { country: 'United States', flag: '🇺🇸' },
  Los_Angeles: { country: 'United States', flag: '🇺🇸' },
  Chicago: { country: 'United States', flag: '🇺🇸' },
  Phoenix: { country: 'United States', flag: '🇺🇸' },
  London: { country: 'United Kingdom', flag: '🇬🇧' },
  Paris: { country: 'France', flag: '🇫🇷' },
  Berlin: { country: 'Germany', flag: '🇩🇪' },
  Tokyo: { country: 'Japan', flag: '🇯🇵' },
  Sydney: { country: 'Australia', flag: '🇦🇺' },
  Melbourne: { country: 'Australia', flag: '🇦🇺' },
  Perth: { country: 'Australia', flag: '🇦🇺' },
  Moscow: { country: 'Russia', flag: '🇷🇺' },
  Shanghai: { country: 'China', flag: '🇨🇳' },
  Madrid: { country: 'Spain', flag: '🇪🇸' },
  Rome: { country: 'Italy', flag: '🇮🇹' },
  Amsterdam: { country: 'Netherlands', flag: '🇳🇱' },
  Stockholm: { country: 'Sweden', flag: '🇸🇪' },
  Kolkata: { country: 'India', flag: '🇮🇳' },
  Toronto: { country: 'Canada', flag: '🇨🇦' },
  Vancouver: { country: 'Canada', flag: '🇨🇦' },
  Mexico_City: { country: 'Mexico', flag: '🇲🇽' },
  Sao_Paulo: { country: 'Brazil', flag: '🇧🇷' },
  Buenos_Aires: { country: 'Argentina', flag: '🇦🇷' },
  Cairo: { country: 'Egypt', flag: '🇪🇬' },
  Johannesburg: { country: 'South Africa', flag: '🇿🇦' },
  Seoul: { country: 'South Korea', flag: '🇰🇷' },
  Bangkok: { country: 'Thailand', flag: '🇹🇭' },
  Singapore: { country: 'Singapore', flag: '🇸🇬' },
  Dubai: { country: 'United Arab Emirates', flag: '🇦🇪' },
  Istanbul: { country: 'Turkey', flag: '🇹🇷' },
  Zurich: { country: 'Switzerland', flag: '🇨🇭' },
  Dublin: { country: 'Ireland', flag: '🇮🇪' },
  Auckland: { country: 'New Zealand', flag: '🇳🇿' },
};

const POPULAR_COUNTRIES = [
  'All', 'United States', 'United Kingdom', 'Japan', 'Germany', 'France', 'India', 'Australia', 'Canada', 'Brazil', 'United Arab Emirates'
];

export default function TimeZonesCountryPage() {
  const [timeZones, setTimeZones] = useState<TimeZoneData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const raw = getAllTimeZones();
    const parsed: TimeZoneData[] = raw.map(zone => {
      const parts = zone.split('/');
      const key = parts[parts.length - 1] || zone;
      const city = key.replace(/_/g, ' ');
      const match = COUNTRY_MAP[key] || { country: parts[0] || 'International', flag: '🌐' };
      const { time, date, offset } = formatTimeForTimezone(zone);

      return {
        name: zone,
        city,
        country: match.country,
        flag: match.flag,
        time,
        date,
        offset,
      };
    });

    setTimeZones(parsed);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    let list = timeZones;

    if (selectedCountry !== 'All') {
      list = list.filter(tz => tz.country.toLowerCase() === selectedCountry.toLowerCase());
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(tz =>
        tz.city.toLowerCase().includes(q) ||
        tz.country.toLowerCase().includes(q) ||
        tz.offset.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => a.country.localeCompare(b.country) || a.city.localeCompare(b.city));
  }, [timeZones, selectedCountry, searchTerm]);

  const T = {
    bgPage: isDark
      ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)'
      : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark
      ? 'radial-gradient(circle 800px at 20% 0%, rgba(245,158,11,0.08), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(99,102,241,0.06), transparent 70%)'
      : 'radial-gradient(circle 800px at 20% 0%, rgba(245,158,11,0.04), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(99,102,241,0.03), transparent 70%)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.85)' : '#ffffff',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    subheading: isDark ? '#94a3b8' : '#64748b',
    footerText: isDark ? '#64748b' : '#94a3b8',
    pillActiveBg: isDark ? '#f59e0b' : '#d97706',
    pillActiveText: '#ffffff',
    pillInactiveBg: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(241, 245, 249, 0.8)',
    pillInactiveText: isDark ? '#94a3b8' : '#64748b',
    pillInactiveBorder: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(226, 232, 240, 0.8)',
  };

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-200" style={{ background: T.bgPage }}>
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" style={{ background: T.ambientOrbs }} />

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-7 pb-16">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 shadow-xs bg-amber-500/10 border border-amber-500/25">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              National Time Index · By Sovereign Nation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-slate-900 dark:text-white">
            Time Zones by Country
          </h1>
          <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: T.subheading }}>
            Directory of legal standard time zones across nations, including regional multi-zone states.
          </p>
        </header>

        {/* Toolbar */}
        <section
          aria-label="Country Toolbar"
          className="rounded-2xl p-4 mb-6 backdrop-blur-xl"
          style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3">
            <div className="relative flex-1 max-w-md">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search country, city, or offset..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
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

            <span className="text-xs font-semibold text-slate-500">
              {filtered.length} Zones Displayed
            </span>
          </div>

          {/* Country Quick Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {POPULAR_COUNTRIES.map(country => {
              const isActive = selectedCountry === country;
              return (
                <button
                  key={country}
                  type="button"
                  onClick={() => setSelectedCountry(country)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
                  style={{
                    background: isActive ? T.pillActiveBg : T.pillInactiveBg,
                    color: isActive ? T.pillActiveText : T.pillInactiveText,
                    border: `1px solid ${isActive ? 'transparent' : T.pillInactiveBorder}`,
                  }}
                >
                  <span>{country}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
            <p className="text-sm font-semibold mb-1 text-slate-900 dark:text-white">No timezones found for this country</p>
            <p className="text-xs text-slate-400 mb-3">Try clearing search keywords or selecting All.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCountry('All'); }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {filtered.slice(0, 100).map(tz => {
              const localTime = new Date().toLocaleTimeString('en-US', { timeZone: tz.name, hour: '2-digit', minute: '2-digit', hour12: true });
              return (
                <article
                  key={tz.name}
                  className="group relative rounded-xl p-3 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: T.cardBg,
                    border: `1px solid ${T.cardBorder}`,
                    boxShadow: T.cardShadow,
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 to-rose-500 opacity-60 group-hover:opacity-100"
                  />

                  <div className="flex items-start justify-between gap-1 mb-1.5 pt-0.5">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{tz.flag}</span>
                        <h2 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate" title={tz.city}>
                          {tz.city}
                        </h2>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5" title={tz.country}>
                        {tz.country}
                      </p>
                    </div>
                    <span
                      suppressHydrationWarning
                      className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40"
                    >
                      {tz.offset}
                    </span>
                  </div>

                  <div className="my-1.5">
                    <span
                      suppressHydrationWarning
                      className="font-mono text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums leading-none"
                    >
                      {localTime}
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-[130px]">{tz.name}</span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <footer className="text-center text-xs mt-10" style={{ color: T.footerText }}>
          <span>National Boundaries &amp; Territorial Subdivisions</span>
          <span className="mx-2">·</span>
          <span>Showing 100+ locations</span>
        </footer>
      </div>
    </div>
  );
}
