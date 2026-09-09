'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import CitySearch from '../../../components/world-clock/CitySearch';
import TimezoneCard from '../../../components/world-clock/TimezoneCard';
import { City, POPULAR_CITIES } from '../../../utils/cityDatabase';
import {
  convertTimeBetweenZones,
  formatTimeForTimezone,
  formatDateForTimezone,
  getTimezoneOffset,
  isDSTActive,
  getTimeDifference,
  formatTimeDifference,
  calculateOptimalMeetingTimes,
  MeetingTime
} from '../../../services/timezoneService';

interface TimezoneEntry {
  city: City;
  id: string;
}

export default function TimezoneConverterPage() {
  const [selectedCities, setSelectedCities] = useState<TimezoneEntry[]>([]);
  const [referenceCity, setReferenceCity] = useState<City | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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

  // Date/Time picker state
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });

  // Conversion results
  const [conversionResults, setConversionResults] = useState<Array<{
    city: City;
    localTime: string;
    localDate: string;
    offset: string;
    isDST: boolean;
    timeDiff: string;
  }>>([]);

  // Meeting planner results
  const [meetingTimes, setMeetingTimes] = useState<MeetingTime[]>([]);

  // DST warnings
  const [dstWarnings, setDstWarnings] = useState<Array<{
    city: City;
    warning: string;
  }>>([]);

  // Initialize with initial cities
  useEffect(() => {
    if (selectedCities.length === 0) {
      const initialCities = POPULAR_CITIES.slice(0, 4).map((city, index) => ({
        city,
        id: `${city.id}-${index}`
      }));
      setSelectedCities(initialCities);
      setReferenceCity(POPULAR_CITIES[0]);
    }
  }, []);

  const handleAddCity = useCallback((city: City) => {
    if (selectedCities.length >= 10) {
      alert('Maximum 10 timezones allowed. Please remove one first.');
      return;
    }
    const exists = selectedCities.some(entry => entry.city.id === city.id);
    if (exists) return;

    setSelectedCities(prev => [...prev, { city, id: `${city.id}-${Date.now()}` }]);
  }, [selectedCities]);

  const handleRemoveCity = useCallback((cityId: string) => {
    setSelectedCities(prev => prev.filter(entry => entry.id !== cityId));
  }, []);

  const handleSetReference = useCallback((city: City) => {
    setReferenceCity(city);
  }, []);

  // Calculate conversions
  useEffect(() => {
    if (selectedCities.length === 0 || !selectedDate) return;

    const baseDate = new Date(selectedDate);
    const refTimezone = referenceCity?.timezone || selectedCities[0]?.city.timezone || 'UTC';

    const results = selectedCities.map(({ city }) => {
      try {
        const convertedDate = convertTimeBetweenZones(refTimezone, city.timezone, baseDate);
        const offset = getTimezoneOffset(city.timezone, convertedDate);
        const isDSTActiveFlag = isDSTActive(city.timezone, convertedDate);
        const timeDiff = getTimeDifference(refTimezone, city.timezone, convertedDate);

        return {
          city,
          localTime: formatTimeForTimezone(city.timezone, convertedDate),
          localDate: formatDateForTimezone(city.timezone, convertedDate),
          offset: `UTC${offset >= 0 ? '+' : '-'}${Math.floor(Math.abs(offset) / 60)}${Math.abs(offset) % 60 > 0 ? `:${Math.abs(offset) % 60}` : ''}`,
          isDST: isDSTActiveFlag,
          timeDiff: formatTimeDifference(timeDiff)
        };
      } catch (error) {
        return {
          city,
          localTime: 'Error',
          localDate: 'Error',
          offset: 'N/A',
          isDST: false,
          timeDiff: 'N/A'
        };
      }
    });

    setConversionResults(results);

    // Warnings
    const warnings: Array<{ city: City; warning: string }> = [];
    selectedCities.forEach(({ city }) => {
      const convertedDate = convertTimeBetweenZones(refTimezone, city.timezone, baseDate);
      if (isDSTActive(city.timezone, convertedDate)) {
        warnings.push({ city, warning: 'Daylight Saving Time is active' });
      }
    });
    setDstWarnings(warnings);

    // Meeting planner
    if (selectedCities.length >= 2) {
      const timezones = selectedCities.map(({ city }) => city.timezone);
      const optimalTimes = calculateOptimalMeetingTimes(timezones, 60, 6, 22, 9, 17);
      setMeetingTimes(optimalTimes.slice(0, 4));
    }
  }, [selectedDate, selectedCities, referenceCity]);

  const handleCopyResults = useCallback(() => {
    const refCity = referenceCity || selectedCities[0]?.city;
    if (!refCity) return;

    let text = `Timezone Conversion Results\n`;
    text += `Reference: ${refCity.name}, ${refCity.country}\n`;
    text += `Target Date/Time: ${new Date(selectedDate).toLocaleString()}\n\n`;

    conversionResults.forEach(result => {
      text += `${result.city.name}, ${result.city.country}: ${result.localTime} (${result.localDate}) [${result.offset}]\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }).catch(err => console.error('Failed to copy:', err));
  }, [conversionResults, referenceCity, selectedCities, selectedDate]);

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

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-7 pb-16">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 shadow-xs bg-blue-500/10 border border-blue-500/25">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Multi-Zone Converter · Astronomical Accuracy
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-slate-900 dark:text-white">
            Time Zone Converter
          </h1>
          <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: T.subheading }}>
            Compare hours, calculate relative time differences, and discover overlap windows across global business hubs.
          </p>
        </header>

        {/* Search & Control Panel */}
        <div
          className="rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-xl"
          style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            {/* Search Input */}
            <div className="lg:col-span-6">
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700 dark:text-slate-300">
                Add City to Compare ({selectedCities.length}/10)
              </label>
              <CitySearch onCitySelect={handleAddCity} placeholder="Search city or country to add..." maxResults={8} />
            </div>

            {/* Date & Time Picker */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Target Date &amp; Time
                </label>
                <button
                  type="button"
                  onClick={() => setSelectedDate(new Date().toISOString().slice(0, 16))}
                  className="text-[11px] font-semibold text-blue-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  Reset to Now
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="datetime-local"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DST Warning notice if active */}
        {dstWarnings.length > 0 && (
          <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-300">
            <span className="text-sm">⚠️</span>
            <span>
              <strong>Daylight Saving Time:</strong> Active in {dstWarnings.map(w => w.city.name).join(', ')}.
            </span>
          </div>
        )}

        {/* Selected City Cards */}
        {selectedCities.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Active Timezone Hubs ({selectedCities.length})
              </h2>
              {selectedCities.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Reference:</span>
                  <select
                    value={referenceCity?.id || ''}
                    onChange={(e) => {
                      const found = selectedCities.find(c => c.city.id === e.target.value)?.city;
                      if (found) handleSetReference(found);
                    }}
                    className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 focus:outline-none"
                  >
                    {selectedCities.map(({ city }) => (
                      <option key={city.id} value={city.id}>
                        {city.name} ({city.country})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {selectedCities.map(({ city, id }) => (
                <TimezoneCard
                  key={id}
                  city={city}
                  referenceTimezone={referenceCity?.timezone}
                  onRemove={selectedCities.length > 1 ? handleRemoveCity : undefined}
                />
              ))}
            </div>
          </div>
        )}

        {/* Conversion Results Table */}
        {conversionResults.length > 0 && (
          <div
            className="rounded-2xl overflow-hidden mb-10 backdrop-blur-xl"
            style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
          >
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Conversion Summary
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Target reference: {referenceCity?.name ?? 'Base'} at {new Date(selectedDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyResults}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40 hover:bg-blue-100 transition-all cursor-pointer"
              >
                <span>{copySuccess ? '✓ Copied!' : 'Copy Summary'}</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-4 py-3 font-semibold">City / Country</th>
                    <th className="px-4 py-3 font-semibold">Converted Time</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">UTC Offset</th>
                    <th className="px-4 py-3 font-semibold">Difference</th>
                    <th className="px-4 py-3 font-semibold text-center">DST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {conversionResults.map((res, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {res.city.name} <span className="font-normal text-slate-400 dark:text-slate-500">({res.city.country})</span>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-blue-600 dark:text-sky-400">
                        {res.localTime}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                        {res.localDate}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-500">
                        {res.offset}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        <span className={res.timeDiff.includes('+') ? 'text-emerald-600 dark:text-emerald-400' : res.timeDiff === 'Same time' ? 'text-slate-400' : 'text-amber-600 dark:text-amber-400'}>
                          {res.timeDiff}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {res.isDST ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                            DST
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Optimal Meeting Window suggestions */}
        {meetingTimes.length > 0 && (
          <div
            className="rounded-2xl p-4 sm:p-5 backdrop-blur-xl"
            style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
          >
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
              Recommended Overlapping Meeting Windows
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Hours calculated where participant locations overlap within business waking hours (9 AM – 5 PM).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {meetingTimes.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-xs ${
                    m.allInBusinessHours
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1.5">
                    <span>{m.utcTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold">
                      {m.allInBusinessHours ? '✓ Optimal' : 'Partial'}
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px] opacity-80">
                    {m.localTimes.map((lt, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="truncate max-w-[120px]">{lt.timezone.split('/').pop()?.replace(/_/g, ' ')}</span>
                        <span className="font-mono">{lt.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="text-center text-xs mt-10" style={{ color: T.footerText }}>
          <span>High-precision timezone cross-calculation</span>
          <span className="mx-2">·</span>
          <span>Automatic Daylight Saving Time (DST) detection</span>
        </footer>
      </div>
    </div>
  );
}
