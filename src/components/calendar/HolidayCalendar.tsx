'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Globe, Filter, Search, Calendar, Tag } from 'lucide-react';
import { holidays2026, getCountries, type Holiday } from '@/data/holidaysData';

export default function HolidayCalendar() {
  const [isDark, setIsDark] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const countries = useMemo(() => ['All', ...getCountries()], []);
  const types = ['All', 'national', 'religious', 'festival', 'observance'];

  const filtered = useMemo(() => {
    return holidays2026.filter((h) => {
      const matchCountry = selectedCountry === 'All' || h.country === selectedCountry;
      const matchType = selectedType === 'All' || h.type === selectedType;
      const matchSearch = !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.country.toLowerCase().includes(search.toLowerCase());
      return matchCountry && matchType && matchSearch;
    }).sort((a, b) => a.date.localeCompare(b.date));
  }, [selectedCountry, selectedType, search]);

  const groupedByMonth = useMemo(() => {
    const groups: { [key: string]: Holiday[] } = {};
    filtered.forEach((h) => {
      const monthName = new Date(h.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (!groups[monthName]) groups[monthName] = [];
      groups[monthName].push(h);
    });
    return groups;
  }, [filtered]);

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(245,158,11,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(245,158,11,0.08), transparent)',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-amber-500/10 text-amber-500 border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> World Holidays & Observances 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Holiday Calendar
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Explore official public holidays, religious festivities, and cultural events worldwide.
          </p>
        </div>

        {/* Toolbar: Search + Country & Type Filters */}
        <div
          className="rounded-2xl border p-5 mb-8 backdrop-blur-xl space-y-4"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative sm:col-span-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search holidays..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs focus:outline-none"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>

            <div>
              <select
                aria-label="Filter by Country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? '🌐 All Countries' : `📍 ${c}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                aria-label="Filter by Category"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none capitalize"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    Category: {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grouped Holidays By Month */}
        {Object.keys(groupedByMonth).length === 0 ? (
          <div className="text-center py-16 text-sm" style={{ color: T.textSecondary }}>
            No holidays matched your criteria.
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByMonth).map(([monthTitle, items]) => (
              <div key={monthTitle}>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: T.textPrimary }}>
                  <Calendar className="w-4 h-4 text-amber-500" /> {monthTitle} ({items.length})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {items.map((h, hIdx) => {
                    const d = new Date(h.date);
                    const dayFormatted = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });

                    return (
                      <div
                        key={hIdx}
                        className="rounded-2xl border p-4 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between relative overflow-hidden"
                        style={{
                          backgroundColor: T.cardBg,
                          borderColor: T.cardBorder,
                          boxShadow: T.cardShadow,
                          minHeight: '115px',
                        }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />

                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-mono font-bold text-amber-500">
                              {dayFormatted}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500">
                              {h.type}
                            </span>
                          </div>

                          <h3 className="font-bold text-sm" style={{ color: T.textPrimary }}>
                            {h.name}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t" style={{ borderColor: T.cardBorder, color: T.textSecondary }}>
                          <span>{h.country}</span>
                          <span className="font-mono text-[11px]">{h.date}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
