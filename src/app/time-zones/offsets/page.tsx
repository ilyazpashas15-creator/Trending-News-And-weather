'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { getAllTimeZones, formatTimeForTimezone } from '@/utils/timezones';

interface OffsetData {
  name: string;
  city: string;
  region: string;
  time: string;
  date: string;
  offset: string;
  offsetHours: number;
}

const COMMON_OFFSETS = [
  -11, -10, -9, -8, -7, -6, -5, -4, -3, 0, 1, 2, 3, 3.5, 4, 5, 5.5, 6, 7, 8, 9, 9.5, 10, 11, 12, 13
];

export default function TimeZonesOffsetsPage() {
  const [timeZones, setTimeZones] = useState<OffsetData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffset, setSelectedOffset] = useState<number | null>(null);
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
    const parsed: OffsetData[] = raw.map(zone => {
      const parts = zone.split('/');
      const region = parts[0] || 'Other';
      const city = (parts[parts.length - 1] || zone).replace(/_/g, ' ');
      const { time, date, offset } = formatTimeForTimezone(zone);

      const offsetStr = offset.replace('UTC', '');
      const isNeg = offsetStr.startsWith('-');
      const p = offsetStr.replace('+', '').replace('-', '').split(':');
      const offsetHours = (isNeg ? -1 : 1) * (parseInt(p[0] || '0', 10) + (p[1] ? parseInt(p[1], 10) / 60 : 0));

      return { name: zone, city, region, time, date, offset, offsetHours };
    });

    setTimeZones(parsed);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    let list = timeZones;

    if (selectedOffset !== null) {
      list = list.filter(tz => Math.abs(tz.offsetHours - selectedOffset) < 0.05);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(tz =>
        tz.city.toLowerCase().includes(q) ||
        tz.offset.toLowerCase().includes(q) ||
        tz.region.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => a.offsetHours - b.offsetHours || a.city.localeCompare(b.city));
  }, [timeZones, selectedOffset, searchTerm]);

  const T = {
    bgPage: isDark
      ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)'
      : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark
      ? 'radial-gradient(circle 800px at 20% 0%, rgba(14,165,233,0.08), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(99,102,241,0.06), transparent 70%)'
      : 'radial-gradient(circle 800px at 20% 0%, rgba(14,165,233,0.04), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(99,102,241,0.03), transparent 70%)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.85)' : '#ffffff',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    subheading: isDark ? '#94a3b8' : '#64748b',
    footerText: isDark ? '#64748b' : '#94a3b8',
    pillActiveBg: isDark ? '#0ea5e9' : '#0284c7',
    pillActiveText: '#ffffff',
    pillInactiveBg: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(241, 245, 249, 0.8)',
    pillInactiveText: isDark ? '#94a3b8' : '#64748b',
  };

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-200" style={{ background: T.bgPage }}>
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" style={{ background: T.ambientOrbs }} />

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-7 pb-16">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 shadow-xs bg-sky-500/10 border border-sky-500/25">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Astronomical Time Spectrum · UTC-12 to UTC+14
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-slate-900 dark:text-white">
            UTC Offsets Explorer
          </h1>
          <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: T.subheading }}>
            Explore global timezone offsets relative to Coordinated Universal Time (UTC) with live clocks.
          </p>
        </header>

        {/* Toolbar */}
        <section
          aria-label="Offset Controls"
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
                placeholder="Search by offset (e.g. +5:30, -5) or city name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40"
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

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">
                {filtered.length} Zones Active
              </span>
              {selectedOffset !== null && (
                <button
                  onClick={() => setSelectedOffset(null)}
                  className="text-xs text-sky-600 dark:text-sky-400 underline font-semibold cursor-pointer ml-2"
                >
                  Clear Offset Filter
                </button>
              )}
            </div>
          </div>

          {/* Interactive UTC Spectrum Pills */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
              <span>Quick Offset Jump</span>
              <span className="font-normal lowercase">click any offset band</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedOffset(null)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedOffset === null
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5'
                }`}
              >
                All
              </button>
              {COMMON_OFFSETS.map(off => {
                const isSel = selectedOffset === off;
                const sign = off >= 0 ? '+' : '';
                const display = `UTC${sign}${off}`;
                return (
                  <button
                    key={off}
                    type="button"
                    onClick={() => setSelectedOffset(isSel ? null : off)}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSel
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:border-sky-500'
                    }`}
                  >
                    {display}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
            <p className="text-sm font-semibold mb-1 text-slate-900 dark:text-white">No timezones match this offset</p>
            <p className="text-xs text-slate-400 mb-3">Try clearing search or clicking All offsets above.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedOffset(null); }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 cursor-pointer"
            >
              Reset
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
                    className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-sky-500 to-indigo-500 opacity-60 group-hover:opacity-100"
                  />

                  <div className="flex items-start justify-between gap-1 mb-1.5 pt-0.5">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate" title={tz.city}>
                        {tz.city}
                      </h2>
                      <span className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">
                        {tz.region}
                      </span>
                    </div>
                    <span
                      suppressHydrationWarning
                      className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/40"
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
          <span>Coordinated Universal Time (UTC) Standard Reference</span>
          <span className="mx-2">·</span>
          <span>Showing 100+ global zones</span>
        </footer>
      </div>
    </div>
  );
}
