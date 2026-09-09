'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Plus, Trash2, Globe, Sparkles, SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { getAllTimeZones } from '@/utils/timezones';

interface ClockLocation {
  id: string;
  name: string;
  timezone: string;
  flag: string;
}

const DEFAULT_LOCATIONS: ClockLocation[] = [
  { id: '1', name: 'New York', timezone: 'America/New_York', flag: '🇺🇸' },
  { id: '2', name: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
  { id: '3', name: 'Paris', timezone: 'Europe/Paris', flag: '🇫🇷' },
  { id: '4', name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯PT' },
  { id: '5', name: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { id: '6', name: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪' },
  { id: '7', name: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬' },
  { id: '8', name: 'New Delhi', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { id: '9', name: 'San Francisco', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { id: '10', name: 'UTC Coordinated', timezone: 'UTC', flag: '🌐' },
];

export default function TimersClockPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [is24Hour, setIs24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [locations, setLocations] = useState<ClockLocation[]>(DEFAULT_LOCATIONS);
  
  // Add custom timezone
  const [selectedTz, setSelectedTz] = useState('Europe/Berlin');
  const [customName, setCustomName] = useState('');
  const allTimezones = useMemo(() => getAllTimeZones(), []);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    try {
      const saved = localStorage.getItem('myweatherapp_clock_locations');
      if (saved) setLocations(JSON.parse(saved));
    } catch {}

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      obs.disconnect();
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('myweatherapp_clock_locations', JSON.stringify(locations));
    } catch {}
  }, [locations, mounted]);

  const handleAddLocation = () => {
    const name = customName.trim() || selectedTz.split('/').pop()?.replace(/_/g, ' ') || 'Custom';
    const newLoc: ClockLocation = {
      id: Date.now().toString(),
      name,
      timezone: selectedTz,
      flag: '📍',
    };
    setLocations((prev) => [...prev, newLoc]);
    setCustomName('');
  };

  const handleRemove = (id: string) => {
    setLocations((prev) => prev.filter((l) => l.id !== id));
  };

  const formatLocationTime = (tz: string) => {
    if (!currentTime) return { time: '--:--', date: '---', isDay: true, offsetStr: 'UTC' };
    try {
      const timeStr = currentTime.toLocaleTimeString('en-US', {
        timeZone: tz,
        hour12: !is24Hour,
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
      });

      const dateStr = currentTime.toLocaleDateString('en-US', {
        timeZone: tz,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      // Day / Night indicator
      const hourInTz = parseInt(
        currentTime.toLocaleTimeString('en-US', { timeZone: tz, hour12: false, hour: '2-digit' }),
        10
      );
      const isDay = hourInTz >= 6 && hourInTz < 18;

      // Offset string
      const utcDate = new Date(currentTime.toLocaleString('en-US', { timeZone: 'UTC' }));
      const tzDate = new Date(currentTime.toLocaleString('en-US', { timeZone: tz }));
      const diffHours = Math.round((tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60));
      const offsetStr = `UTC${diffHours >= 0 ? '+' : ''}${diffHours}`;

      return { time: timeStr, date: dateStr, isDay, offsetStr };
    } catch {
      return { time: '--:--', date: '---', isDay: true, offsetStr: 'UTC' };
    }
  };

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(14,165,233,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(14,165,233,0.08), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    textPrimary: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    inputBg: isDark ? 'rgba(15, 23, 42, 0.9)' : '#ffffff',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(203, 213, 225, 0.9)',
  };

  return (
    <div style={{ background: T.bgPage, minHeight: '100vh' }} className="relative transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: T.ambientOrbs }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-sky-500/10 text-sky-500 border-sky-500/20">
            <Globe className="w-3.5 h-3.5" /> Multi-Zone World Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            World Clock & Timers
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-xl mx-auto" style={{ color: T.textSecondary }}>
            Synchronized live clocks with day/night status, UTC offsets, and custom time zones.
          </p>
        </div>

        {/* Toolbar & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Format switches */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIs24Hour(!is24Hour)}
              className="text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: is24Hour ? (isDark ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.15)') : (isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff'),
                borderColor: is24Hour ? '#0ea5e9' : T.cardBorder,
                color: is24Hour ? '#0ea5e9' : T.textPrimary,
              }}
            >
              {is24Hour ? '24-Hour Format' : '12-Hour (AM/PM)'}
            </button>
            <button
              onClick={() => setShowSeconds(!showSeconds)}
              className="text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: showSeconds ? (isDark ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.15)') : (isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff'),
                borderColor: showSeconds ? '#0ea5e9' : T.cardBorder,
                color: showSeconds ? '#0ea5e9' : T.textPrimary,
              }}
            >
              {showSeconds ? 'Seconds ON' : 'Seconds OFF'}
            </button>
          </div>

          {/* Add City quick inline */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedTz}
              onChange={(e) => setSelectedTz(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border font-medium max-w-xs focus:outline-none"
              style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
            >
              {allTimezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddLocation}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-bold bg-sky-500 hover:bg-sky-600 text-white transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" /> Add Clock
            </button>
          </div>
        </div>

        {/* Clocks 5-Column Responsive Grid (lg:grid-cols-5 for Chrome & Edge consistency) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {locations.map((loc) => {
            const info = formatLocationTime(loc.timezone);

            return (
              <div
                key={loc.id}
                className="group relative rounded-2xl border p-4 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
                style={{
                  backgroundColor: T.cardBg,
                  borderColor: T.cardBorder,
                  boxShadow: T.cardShadow,
                  minHeight: '130px',
                }}
              >
                {/* Top color stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-t-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

                {/* Delete on hover */}
                <button
                  onClick={() => handleRemove(loc.id)}
                  className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 p-1 rounded-md text-rose-400 hover:bg-rose-500/10 transition-all"
                  title="Remove clock"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div>
                  <div className="flex items-center gap-1.5 mb-1 pr-6">
                    <span className="text-base">{loc.flag}</span>
                    <h3 className="font-bold text-sm truncate" style={{ color: T.textPrimary }}>
                      {loc.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] mb-2 font-medium" style={{ color: T.textSecondary }}>
                    <span>{info.offsetStr}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      {info.isDay ? <Sun className="w-3 h-3 text-amber-500" /> : <Moon className="w-3 h-3 text-indigo-400" />}
                      {info.isDay ? 'Day' : 'Night'}
                    </span>
                  </div>
                </div>

                <div>
                  <div
                    className="font-mono font-black text-2xl tracking-tight"
                    style={{ color: T.textPrimary }}
                    suppressHydrationWarning
                  >
                    {info.time}
                  </div>
                  <div className="text-[11px] font-medium mt-0.5" style={{ color: T.textSecondary }} suppressHydrationWarning>
                    {info.date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}