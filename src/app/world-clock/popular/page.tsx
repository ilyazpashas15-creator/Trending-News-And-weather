'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { fetchWeatherByCity } from '@/services/weatherService';
import { WeatherData } from '@/types/weather.types';

interface CityTime {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  timezone: string;
  weather?: WeatherData;
  region: 'Americas' | 'Europe' | 'Asia' | 'Middle East' | 'Oceania';
}

const CITIES: CityTime[] = [
  { id: 'new-york', name: 'New York', country: 'United States', countryCode: 'US', timezone: 'America/New_York', region: 'Americas' },
  { id: 'london', name: 'London', country: 'United Kingdom', countryCode: 'GB', timezone: 'Europe/London', region: 'Europe' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', countryCode: 'JP', timezone: 'Asia/Tokyo', region: 'Asia' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Sydney', region: 'Oceania' },
  { id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', timezone: 'Asia/Dubai', region: 'Middle East' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', countryCode: 'SG', timezone: 'Asia/Singapore', region: 'Asia' },
  { id: 'paris', name: 'Paris', country: 'France', countryCode: 'FR', timezone: 'Europe/Paris', region: 'Europe' },
  { id: 'hong-kong', name: 'Hong Kong', country: 'China', countryCode: 'HK', timezone: 'Asia/Hong_Kong', region: 'Asia' },
  { id: 'los-angeles', name: 'Los Angeles', country: 'United States', countryCode: 'US', timezone: 'America/Los_Angeles', region: 'Americas' },
  { id: 'toronto', name: 'Toronto', country: 'Canada', countryCode: 'CA', timezone: 'America/Toronto', region: 'Americas' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', countryCode: 'DE', timezone: 'Europe/Berlin', region: 'Europe' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', region: 'Asia' },
  { id: 'shanghai', name: 'Shanghai', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', region: 'Asia' },
  { id: 'sao-paulo', name: 'São Paulo', country: 'Brazil', countryCode: 'BR', timezone: 'America/Sao_Paulo', region: 'Americas' },
  { id: 'moscow', name: 'Moscow', country: 'Russia', countryCode: 'RU', timezone: 'Europe/Moscow', region: 'Europe' },
];

// Color styling accents per city for subtle brand identity
const CITY_THEMES: Record<string, { accent: string; badgeBg: string; borderAccent: string }> = {
  'new-york':    { accent: '#4f46e5', badgeBg: 'rgba(79,70,229,0.08)',  borderAccent: '#6366f1' },
  'london':      { accent: '#0284c7', badgeBg: 'rgba(2,132,199,0.08)',   borderAccent: '#38bdf8' },
  'tokyo':       { accent: '#db2777', badgeBg: 'rgba(219,39,119,0.08)',  borderAccent: '#f472b6' },
  'sydney':      { accent: '#0ea5e9', badgeBg: 'rgba(14,165,233,0.08)',  borderAccent: '#38bdf8' },
  'dubai':       { accent: '#d97706', badgeBg: 'rgba(217,119,6,0.08)',   borderAccent: '#f59e0b' },
  'singapore':   { accent: '#059669', badgeBg: 'rgba(5,150,105,0.08)',   borderAccent: '#10b981' },
  'paris':       { accent: '#7c3aed', badgeBg: 'rgba(124,58,237,0.08)',  borderAccent: '#a855f7' },
  'hong-kong':   { accent: '#ea580c', badgeBg: 'rgba(234,88,12,0.08)',   borderAccent: '#fb923c' },
  'los-angeles': { accent: '#e11d48', badgeBg: 'rgba(225,29,72,0.08)',   borderAccent: '#fb7185' },
  'toronto':     { accent: '#0d9488', badgeBg: 'rgba(13,148,136,0.08)',  borderAccent: '#2dd4bf' },
  'berlin':      { accent: '#2563eb', badgeBg: 'rgba(37,99,235,0.08)',   borderAccent: '#60a5fa' },
  'mumbai':      { accent: '#b45309', badgeBg: 'rgba(180,83,9,0.08)',    borderAccent: '#f59e0b' },
  'shanghai':    { accent: '#dc2626', badgeBg: 'rgba(220,38,38,0.08)',   borderAccent: '#f87171' },
  'sao-paulo':   { accent: '#16a34a', badgeBg: 'rgba(22,163,74,0.08)',   borderAccent: '#4ade80' },
  'moscow':      { accent: '#6366f1', badgeBg: 'rgba(99,102,241,0.08)',  borderAccent: '#818cf8' },
};

function getFlag(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function formatTime(date: Date, timezone: string, is24h: boolean): { hoursMinutes: string; seconds: string; period: string } {
  if (is24h) {
    const t = date.toLocaleTimeString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const parts = t.split(':');
    return { hoursMinutes: `${parts[0]}:${parts[1]}`, seconds: `:${parts[2] || '00'}`, period: '24H' };
  }
  const t = date.toLocaleTimeString('en-US', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const [timePart, periodPart] = t.split(' ');
  const parts = (timePart || '').split(':');
  return { hoursMinutes: `${parts[0]}:${parts[1]}`, seconds: `:${parts[2] || '00'}`, period: periodPart || '' };
}

function formatDate(date: Date, timezone: string): string {
  return date.toLocaleDateString('en-US', { timeZone: timezone, weekday: 'short', month: 'short', day: 'numeric' });
}

function getUTCOffset(date: Date, timezone: string): string {
  const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const local = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  const off = (local.getTime() - utc.getTime()) / 60000;
  const h = Math.floor(Math.abs(off) / 60);
  const m = Math.abs(off) % 60;
  const s = off >= 0 ? '+' : '-';
  return m === 0 ? `UTC${s}${h}` : `UTC${s}${h}:${String(m).padStart(2, '0')}`;
}

function isDaytime(date: Date, timezone: string): boolean {
  const h = parseInt(date.toLocaleTimeString('en-US', { timeZone: timezone, hour: 'numeric', hour12: false }), 10);
  return h >= 6 && h < 20;
}

const REGIONS = ['All', 'Americas', 'Europe', 'Asia', 'Middle East', 'Oceania'] as const;
type RegionFilter = typeof REGIONS[number];

const PopularCitiesPage = () => {
  const [cities, setCities] = useState<CityTime[]>(CITIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('All');
  const [is24Hour, setIs24Hour] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Sync theme with the app's root .dark class
  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Fetch live weather data on mount
  useEffect(() => {
    let isMounted = true;
    const loadWeather = async () => {
      const updated = await Promise.all(
        CITIES.map(async (city) => {
          try {
            const weather = await fetchWeatherByCity(city.name);
            return { ...city, weather };
          } catch {
            return city;
          }
        })
      );
      if (isMounted) setCities(updated);
    };
    loadWeather();
    return () => { isMounted = false; };
  }, []);

  // Live second tick
  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Filter logic
  const filtered = useMemo(() => {
    return cities.filter(c => {
      const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term ||
        c.name.toLowerCase().includes(term) ||
        c.country.toLowerCase().includes(term) ||
        c.region.toLowerCase().includes(term);
      return matchesRegion && matchesSearch;
    });
  }, [cities, selectedRegion, searchTerm]);

  // Counts per region
  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { All: cities.length };
    cities.forEach(c => {
      counts[c.region] = (counts[c.region] || 0) + 1;
    });
    return counts;
  }, [cities]);

  // Design tokens tailored for compact, high-density professional presentation
  const T = {
    bgPage: isDark
      ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)'
      : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark
      ? 'radial-gradient(circle 800px at 20% 0%, rgba(99,102,241,0.08), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(14,165,233,0.06), transparent 70%)'
      : 'radial-gradient(circle 800px at 20% 0%, rgba(99,102,241,0.04), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(14,165,233,0.03), transparent 70%)',
    badgeLiveBg: isDark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.08)',
    badgeLiveBorder: isDark ? 'rgba(16,185,129,0.30)' : 'rgba(16,185,129,0.25)',
    badgeLiveText: isDark ? '#34d399' : '#059669',
    heading: isDark
      ? 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)'
      : 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
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
    // Card styles
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
    <div
      className="min-h-screen overflow-x-hidden transition-colors duration-200"
      style={{ background: T.bgPage }}
    >
      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: T.ambientOrbs }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-7 pb-16">

        {/* ── Top Header / Hero (Compact & Sleek) ── */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 shadow-xs"
            style={{ background: T.badgeLiveBg, border: `1px solid ${T.badgeLiveBorder}` }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T.badgeLiveText }}>
              Live Telemetry · 1-Sec Precision
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-slate-900 dark:text-white">
            World Popular Cities
          </h1>
          <p className="text-xs sm:text-sm max-w-lg mx-auto" style={{ color: T.subheading }}>
            Live clocks, timezone offsets, and weather conditions across major financial &amp; cultural hubs worldwide.
          </p>
        </header>

        {/* ── Control Bar: Search + Continent Filters + 12/24h toggle (All-in-one dense bar) ── */}
        <section
          aria-label="Filter and Search Controls"
          className="rounded-2xl p-3 sm:p-4 mb-6 transition-all duration-200"
          style={{
            background: T.toolbarBg,
            border: `1px solid ${T.toolbarBorder}`,
            boxShadow: T.toolbarShadow,
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">

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
                id="city-search"
                type="search"
                placeholder="Search city, country or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl focus:outline-none transition-colors"
                style={{
                  background: T.inputBg,
                  border: `1px solid ${T.inputBorder}`,
                  color: T.inputText,
                }}
                aria-label="Search cities"
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

            {/* Right Tools: 12h/24h toggle & Stats */}
            <div className="flex items-center justify-between md:justify-end gap-2.5">
              {/* Live counts */}
              <div
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: T.statPillBg, border: `1px solid ${T.statPillBorder}`, color: T.statPillText }}
              >
                <span className="font-bold text-sky-500">{filtered.length}</span>
                <span>/ {cities.length} Hubs</span>
              </div>

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
                  style={{
                    background: !is24Hour ? T.pillActiveBg : 'transparent',
                    color: !is24Hour ? T.pillActiveText : T.pillInactiveText,
                  }}
                >
                  12-Hour
                </button>
                <button
                  type="button"
                  onClick={() => setIs24Hour(true)}
                  className="px-2.5 py-1 rounded-md cursor-pointer text-xs font-medium transition-all"
                  style={{
                    background: is24Hour ? T.pillActiveBg : 'transparent',
                    color: is24Hour ? T.pillActiveText : T.pillInactiveText,
                  }}
                >
                  24-Hour
                </button>
              </div>
            </div>
          </div>

          {/* Continent Filter Chips */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
            {REGIONS.map((region) => {
              const isActive = selectedRegion === region;
              const count = regionCounts[region] ?? 0;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all duration-150"
                  style={{
                    background: isActive ? T.pillActiveBg : T.pillInactiveBg,
                    color: isActive ? T.pillActiveText : T.pillInactiveText,
                    border: `1px solid ${isActive ? 'transparent' : T.pillInactiveBorder}`,
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  <span>{region}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.2 rounded-full"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.25)' : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Compact Cards Grid ── */}
        {filtered.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl"
            style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}
          >
            <div className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: T.cityName }}>No cities matched your filter</p>
            <p className="text-xs mb-4" style={{ color: T.country }}>Try clearing search keywords or selecting All continents</p>
            <button
              type="button"
              onClick={() => { setSearchTerm(''); setSelectedRegion('All'); }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer text-white bg-sky-600 hover:bg-sky-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {filtered.map((city, idx) => {
              const theme = CITY_THEMES[city.id] ?? { accent: '#4f46e5', badgeBg: 'rgba(79,70,229,0.08)', borderAccent: '#6366f1' };
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
                    transition: `opacity 0.35s ease ${idx * 30}ms, transform 0.35s ease ${idx * 30}ms, box-shadow 0.2s ease`,
                  }}
                >
                  <div
                    className="relative rounded-xl p-3 flex flex-col justify-between overflow-hidden transition-all duration-200"
                    style={{
                      background: T.cardBg,
                      border: `1px solid ${isHovered ? (isDark ? theme.borderAccent : theme.accent) : T.cardBorder}`,
                      boxShadow: isHovered ? T.cardHoverShadow : T.cardShadow,
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                  >
                    {/* Top micro-indicator stripe with city identity color */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-[2.5px] transition-opacity duration-200"
                      style={{
                        background: `linear-gradient(90deg, ${theme.accent}, ${theme.borderAccent})`,
                        opacity: isHovered ? 1 : 0.65,
                      }}
                    />

                    {/* ── ROW 1: City & Country + Weather lockup ── */}
                    <div className="flex items-start justify-between gap-1.5 mb-1.5 pt-0.5">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm leading-none select-none" aria-label={city.countryCode}>
                            {getFlag(city.countryCode)}
                          </span>
                          <h2
                            className="text-xs sm:text-sm font-semibold truncate leading-snug tracking-tight"
                            style={{ color: T.cityName }}
                            title={city.name}
                          >
                            {city.name}
                          </h2>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] truncate" style={{ color: T.country }} title={city.country}>
                            {city.country}
                          </span>
                          <span
                            className="text-[8px] font-semibold px-1 py-0.2 rounded uppercase tracking-wider"
                            style={{ background: theme.badgeBg, color: theme.accent }}
                          >
                            {city.region}
                          </span>
                        </div>
                      </div>

                      {/* Compact Weather Badge */}
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
                        {temp !== null ? (
                          <div className="text-right">
                            <span className="text-[11px] font-semibold leading-none" style={{ color: T.tempText }}>
                              {temp}°C
                            </span>
                            <span className="block text-[8px] capitalize truncate max-w-[48px]" style={{ color: T.tempDesc }} title={desc}>
                              {desc}
                            </span>
                          </div>
                        ) : (
                          <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" aria-hidden="true" />
                        )}
                      </div>
                    </div>

                    {/* ── ROW 2: Digital Clock (Sleek hour:minute with lighter seconds) ── */}
                    <div className="flex items-baseline justify-between my-1">
                      <div className="flex items-baseline gap-0.5">
                        <span
                          suppressHydrationWarning
                          className="font-mono text-lg sm:text-xl font-bold tracking-tight tabular-nums leading-none"
                          style={{ color: T.clockText }}
                        >
                          {hoursMinutes}
                        </span>
                        <span
                          suppressHydrationWarning
                          className="font-mono text-xs font-normal tabular-nums opacity-60"
                          style={{ color: T.clockText }}
                        >
                          {seconds}
                        </span>
                        {period && (
                          <span
                            suppressHydrationWarning
                            className="text-[10px] font-semibold uppercase tracking-wider ml-1"
                            style={{ color: isHovered ? theme.accent : T.periodText }}
                          >
                            {period}
                          </span>
                        )}
                      </div>

                      {/* Day / Night indicator */}
                      <span
                        suppressHydrationWarning
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                        style={{
                          background: daytime
                            ? (isDark ? 'rgba(245,158,11,0.15)' : '#fef3c7')
                            : (isDark ? 'rgba(99,102,241,0.15)' : '#e0e7ff'),
                          color: daytime
                            ? (isDark ? '#fbbf24' : '#b45309')
                            : (isDark ? '#a5b4fc' : '#4338ca'),
                        }}
                      >
                        <span aria-hidden="true">{daytime ? '☀️' : '🌙'}</span>
                        <span>{daytime ? 'Day' : 'Night'}</span>
                      </span>
                    </div>

                    {/* ── ROW 3: Date & Timezone Metadata (Tight bottom bar) ── */}
                    <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1 truncate" style={{ color: T.metaText }}>
                        <svg className="w-2.5 h-2.5 flex-shrink-0" style={{ color: T.metaIcon }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        <span suppressHydrationWarning className="truncate">{formatDate(currentTime, city.timezone)}</span>
                      </div>

                      {/* UTC Offset Pill */}
                      <span
                        suppressHydrationWarning
                        className="font-mono text-[9px] font-semibold px-1.5 py-0.2 rounded flex-shrink-0 ml-1"
                        style={{
                          background: T.utcBg,
                          color: T.utcText,
                          border: `1px solid ${T.utcBorder}`,
                        }}
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

        {/* ── Professional Footer Note ── */}
        <footer className="text-center text-xs mt-10" style={{ color: T.footerText }}>
          <span>Clocks sync automatically every second</span>
          <span className="mx-2">·</span>
          <span>Weather cached via OpenWeather API</span>
          <span className="mx-2">·</span>
          <span>High-precision UTC astronomical offsets</span>
        </footer>
      </div>
    </div>
  );
};

export default PopularCitiesPage;