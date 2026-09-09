'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Minus, ArrowRight, Sparkles, Clock, Check, Copy } from 'lucide-react';

export default function CalculatorsDatePage() {
  const [isDark, setIsDark] = useState(true);
  const [mode, setMode] = useState<'difference' | 'add'>('difference');

  // Difference Mode
  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });

  // Add / Subtract Mode
  const [baseDate, setBaseDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [addYears, setAddYears] = useState(0);
  const [addMonths, setAddMonths] = useState(1);
  const [addDays, setAddDays] = useState(0);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Compute Difference
  const diffResult = React.useMemo(() => {
    if (!startDate || !endDate) return null;
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;

    const diffMs = e.getTime() - s.getTime();
    const totalDays = Math.round(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;
    const months = Math.floor(totalDays / 30.4375);
    const years = (totalDays / 365.25).toFixed(1);

    return {
      totalDays,
      weeks,
      remDays,
      months,
      years,
      isFuture: diffMs >= 0,
    };
  }, [startDate, endDate]);

  // Compute Add/Subtract
  const addResult = React.useMemo(() => {
    if (!baseDate) return null;
    const d = new Date(baseDate);
    if (isNaN(d.getTime())) return null;

    const mult = operation === 'add' ? 1 : -1;
    d.setFullYear(d.getFullYear() + addYears * mult);
    d.setMonth(d.getMonth() + addMonths * mult);
    d.setDate(d.getDate() + addDays * mult);

    return {
      formatted: d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      iso: d.toISOString().slice(0, 10),
    };
  }, [baseDate, addYears, addMonths, addDays, operation]);

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(139,92,246,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(139,92,246,0.08), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    textPrimary: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    inputBg: isDark ? 'rgba(15, 23, 42, 0.9)' : '#ffffff',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(203, 213, 225, 0.9)',
  };

  return (
    <div style={{ background: T.bgPage, minHeight: '100vh' }} className="relative transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: T.ambientOrbs }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-purple-500/10 text-purple-500 border-purple-500/20">
            <Calendar className="w-3.5 h-3.5" /> Date & Calendar Math
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Date Calculator
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Calculate the exact span between dates, or add/subtract days, months, and years.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex p-1 rounded-xl border backdrop-blur-md"
            style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
          >
            <button
              onClick={() => setMode('difference')}
              className="px-5 py-2 rounded-lg text-xs font-bold transition-all"
              style={{
                backgroundColor: mode === 'difference' ? '#8b5cf6' : 'transparent',
                color: mode === 'difference' ? '#ffffff' : T.textSecondary,
              }}
            >
              Difference Between Dates
            </button>
            <button
              onClick={() => setMode('add')}
              className="px-5 py-2 rounded-lg text-xs font-bold transition-all"
              style={{
                backgroundColor: mode === 'add' ? '#8b5cf6' : 'transparent',
                color: mode === 'add' ? '#ffffff' : T.textSecondary,
              }}
            >
              Add or Subtract Days
            </button>
          </div>
        </div>

        {/* Mode 1: Difference Calculator */}
        {mode === 'difference' && (
          <div
            className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl mb-8 relative overflow-hidden"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                  Start Date
                </label>
                <input
                  type="date"
                  aria-label="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                  End Date
                </label>
                <input
                  type="date"
                  aria-label="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>
            </div>

            {/* Results Grid */}
            {diffResult && (
              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                  borderColor: T.cardBorder,
                }}
              >
                <div className="text-center mb-6">
                  <div className="text-xs uppercase font-bold text-purple-500 tracking-wider mb-1">
                    Total Elapsed Duration
                  </div>
                  <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight" style={{ color: T.textPrimary }}>
                    {diffResult.totalDays.toLocaleString()} Days
                  </div>
                  <p className="text-xs font-semibold mt-1" style={{ color: T.textSecondary }}>
                    {diffResult.isFuture ? 'From start to end' : 'End date occurs before start date'}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div
                    className="p-3.5 rounded-xl border text-center"
                    style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                  >
                    <div className="text-2xl font-mono font-bold text-purple-500">{diffResult.weeks}</div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Weeks</div>
                    {diffResult.remDays > 0 && (
                      <div className="text-[11px] font-medium opacity-75" style={{ color: T.textSecondary }}>+ {diffResult.remDays}d</div>
                    )}
                  </div>

                  <div
                    className="p-3.5 rounded-xl border text-center"
                    style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                  >
                    <div className="text-2xl font-mono font-bold text-purple-500">{diffResult.months}</div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Months</div>
                  </div>

                  <div
                    className="p-3.5 rounded-xl border text-center"
                    style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                  >
                    <div className="text-2xl font-mono font-bold text-purple-500">{diffResult.years}</div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Years</div>
                  </div>

                  <div
                    className="p-3.5 rounded-xl border text-center"
                    style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                  >
                    <div className="text-2xl font-mono font-bold text-purple-500">{(diffResult.totalDays * 24).toLocaleString()}</div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Hours</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mode 2: Add or Subtract */}
        {mode === 'add' && (
          <div
            className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl mb-8 relative overflow-hidden"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500" />

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                Starting Date
              </label>
              <input
                type="date"
                aria-label="Starting Date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>

            {/* Operation Toggle & Amount */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setOperation('add')}
                className="flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                style={{
                  backgroundColor: operation === 'add' ? (isDark ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.15)') : (isDark ? 'rgba(30,41,59,0.5)' : '#ffffff'),
                  borderColor: operation === 'add' ? '#8b5cf6' : T.cardBorder,
                  color: operation === 'add' ? '#8b5cf6' : T.textSecondary,
                }}
              >
                <Plus className="w-4 h-4" /> Add to Date
              </button>
              <button
                onClick={() => setOperation('subtract')}
                className="flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                style={{
                  backgroundColor: operation === 'subtract' ? (isDark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.15)') : (isDark ? 'rgba(30,41,59,0.5)' : '#ffffff'),
                  borderColor: operation === 'subtract' ? '#ef4444' : T.cardBorder,
                  color: operation === 'subtract' ? '#ef4444' : T.textSecondary,
                }}
              >
                <Minus className="w-4 h-4" /> Subtract from Date
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: T.textSecondary }}>Years</label>
                <input
                  type="number"
                  min="0"
                  value={addYears}
                  onChange={(e) => setAddYears(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center font-mono font-bold py-2.5 rounded-xl border text-base"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: T.textSecondary }}>Months</label>
                <input
                  type="number"
                  min="0"
                  value={addMonths}
                  onChange={(e) => setAddMonths(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center font-mono font-bold py-2.5 rounded-xl border text-base"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: T.textSecondary }}>Days</label>
                <input
                  type="number"
                  min="0"
                  value={addDays}
                  onChange={(e) => setAddDays(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center font-mono font-bold py-2.5 rounded-xl border text-base"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>
            </div>

            {addResult && (
              <div
                className="p-6 rounded-2xl border text-center"
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                  borderColor: T.cardBorder,
                }}
              >
                <div className="text-xs uppercase font-bold text-purple-500 tracking-wider mb-1">
                  Target Calculated Date
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1" style={{ color: T.textPrimary }}>
                  {addResult.formatted}
                </div>
                <div className="text-xs font-mono font-semibold" style={{ color: T.textSecondary }}>
                  ISO: {addResult.iso}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}