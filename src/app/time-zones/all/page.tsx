'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { getAllTimeZones, formatTimeForTimezone } from '@/utils/timezones';

interface TimeZoneData {
  name: string;
  region: string;
  city: string;
  time: string;
  date: string;
  offset: string;
  offsetNum: number;
}

const REGION_FILTERS = ['All', 'America', 'Europe', 'Asia', 'Africa', 'Pacific', 'Atlantic', 'Australia', 'Indian'] as const;

export default function TimeZonesAllPage() {
  const [timeZones, setTimeZones] = useState<TimeZoneData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortField, setSortField] = useState<'city' | 'offset' | 'time'>('city');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
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

  // Initialize timezones
  useEffect(() => {
    const rawZones = getAllTimeZones();
    const parsed: TimeZoneData[] = rawZones.map(zone => {
      const parts = zone.split('/');
      const region = parts[0] || 'Other';
      const city = (parts[parts.length - 1] || zone).replace(/_/g, ' ');
      const { time, date, offset } = formatTimeForTimezone(zone);

      const offsetClean = offset.replace('UTC', '');
      const isNeg = offsetClean.startsWith('-');
      const p = offsetClean.replace('+', '').replace('-', '').split(':');
      const offsetNum = (isNeg ? -1 : 1) * (parseInt(p[0] || '0', 10) + (p[1] ? parseInt(p[1], 10) / 60 : 0));

      return { name: zone, region, city, time, date, offset, offsetNum };
    });

    setTimeZones(parsed);
  }, []);

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter and Sort
  const filtered = useMemo(() => {
    let list = timeZones;

    if (selectedRegion !== 'All') {
      list = list.filter(tz => tz.region.toLowerCase() === selectedRegion.toLowerCase());
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(tz =>
        tz.city.toLowerCase().includes(q) ||
        tz.name.toLowerCase().includes(q) ||
        tz.offset.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'city') cmp = a.city.localeCompare(b.city);
      else if (sortField === 'offset') cmp = a.offsetNum - b.offsetNum;
      else if (sortField === 'time') cmp = a.time.localeCompare(b.time);
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [timeZones, selectedRegion, searchTerm, sortField, sortDirection]);

  // Counts by region
  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { All: timeZones.length };
    timeZones.forEach(tz => {
      counts[tz.region] = (counts[tz.region] || 0) + 1;
    });
    return counts;
  }, [timeZones]);

  const handleSort = (field: 'city' | 'offset' | 'time') => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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
    pillActiveBg: isDark ? '#38bdf8' : '#0284c7',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 shadow-xs bg-cyan-500/10 border border-cyan-500/25">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Global Time Directory · {timeZones.length} IANA Zones
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-slate-900 dark:text-white">
            All Time Zones
          </h1>
          <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: T.subheading }}>
            Complete directory of astronomical &amp; legal timezones worldwide with live clocks and UTC offsets.
          </p>
        </header>

        {/* Controls Toolbar */}
        <section
          aria-label="Filter Controls"
          className="rounded-2xl p-3 sm:p-4 mb-6 backdrop-blur-xl"
          style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search */}
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
                placeholder="Search timezone by city, continent or offset..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
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

            {/* View Mode & Counters */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {filtered.length} / {timeZones.length} Zones
              </span>

              {/* View Toggle */}
              <div className="inline-flex p-0.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1 rounded-md cursor-pointer font-medium transition-all ${
                    viewMode === 'grid' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                  aria-label="Grid view"
                >
                  Cards
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1 rounded-md cursor-pointer font-medium transition-all ${
                    viewMode === 'table' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                  aria-label="Table view"
                >
                  Table
                </button>
              </div>
            </div>
          </div>

          {/* Region Chips */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
            {REGION_FILTERS.map(region => {
              const isActive = selectedRegion === region;
              const count = regionCounts[region] ?? 0;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all"
                  style={{
                    background: isActive ? T.pillActiveBg : T.pillInactiveBg,
                    color: isActive ? T.pillActiveText : T.pillInactiveText,
                    border: `1px solid ${isActive ? 'transparent' : T.pillInactiveBorder}`,
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  <span>{region}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full opacity-80">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Display: Grid vs Table */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
            <p className="text-sm font-semibold mb-1 text-slate-900 dark:text-white">No timezones matched your query</p>
            <p className="text-xs text-slate-400 mb-3">Try searching for a different city or clearing region filters.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedRegion('All'); }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {filtered.slice(0, 100).map((tz) => {
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
                    className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-500 to-blue-500 opacity-60 group-hover:opacity-100"
                  />

                  <div className="flex items-start justify-between gap-1 mb-1.5 pt-0.5">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate" title={tz.city}>
                        {tz.city}
                      </h2>
                      <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">
                        {tz.region}
                      </span>
                    </div>
                    <span
                      suppressHydrationWarning
                      className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
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

                  <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="truncate max-w-[130px]" title={tz.name}>{tz.name}</span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div
            className="rounded-2xl overflow-hidden backdrop-blur-xl"
            style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">
                    <th
                      className="px-4 py-3 font-semibold cursor-pointer hover:text-cyan-600"
                      onClick={() => handleSort('city')}
                    >
                      City / Location {sortField === 'city' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th className="px-4 py-3 font-semibold">IANA Identifier</th>
                    <th
                      className="px-4 py-3 font-semibold cursor-pointer hover:text-cyan-600"
                      onClick={() => handleSort('time')}
                    >
                      Local Time {sortField === 'time' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th
                      className="px-4 py-3 font-semibold cursor-pointer hover:text-cyan-600"
                      onClick={() => handleSort('offset')}
                    >
                      UTC Offset {sortField === 'offset' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th className="px-4 py-3 font-semibold">Region</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filtered.slice(0, 150).map((tz) => {
                    const localTime = new Date().toLocaleTimeString('en-US', { timeZone: tz.name, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
                    return (
                      <tr key={tz.name} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-2.5 font-bold text-slate-900 dark:text-white">
                          {tz.city}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                          {tz.name}
                        </td>
                        <td suppressHydrationWarning className="px-4 py-2.5 font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                          {localTime}
                        </td>
                        <td className="px-4 py-2.5 font-mono font-medium text-slate-700 dark:text-slate-300">
                          {tz.offset}
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {tz.region}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <footer className="text-center text-xs mt-10" style={{ color: T.footerText }}>
          <span>Showing up to 100+ active zones</span>
          <span className="mx-2">·</span>
          <span>Standards compliant with IANA tz database</span>
        </footer>
      </div>
    </div>
  );
}