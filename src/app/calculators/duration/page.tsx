'use client';

import React, { useState, useEffect } from 'react';
import { Hourglass, Calendar, Clock, Sparkles, Check, Copy } from 'lucide-react';

export default function CalculatorsDurationPage() {
  const [isDark, setIsDark] = useState(true);

  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endDate, setEndDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().slice(0, 10);
  });
  const [endTime, setEndTime] = useState<string>('18:00');

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const result = React.useMemo(() => {
    try {
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

      const diffMs = Math.abs(end.getTime() - start.getTime());
      const isPast = end < start;

      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);
      const weeks = Math.floor(totalDays / 7);
      const remDays = totalDays % 7;
      const remHours = totalHours % 24;
      const remMinutes = totalMinutes % 60;

      return {
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,
        diffMs,
        weeks,
        remDays,
        remHours,
        remMinutes,
        isPast,
      };
    } catch {
      return null;
    }
  }, [startDate, startTime, endDate, endTime]);

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(168,85,247,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(168,85,247,0.08), transparent)',
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
            <Hourglass className="w-3.5 h-3.5" /> Granular Timestamp Span
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Duration Calculator
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Calculate the exact time difference down to the minute and second between two date-time moments.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl mb-8 relative overflow-hidden"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Start Datetime */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                Start Date & Time
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  aria-label="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl border text-sm font-semibold"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
                <input
                  type="time"
                  aria-label="Start Time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-28 px-3 py-2.5 rounded-xl border font-mono font-bold text-sm"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>
            </div>

            {/* End Datetime */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                End Date & Time
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  aria-label="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl border text-sm font-semibold"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
                <input
                  type="time"
                  aria-label="End Time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-28 px-3 py-2.5 rounded-xl border font-mono font-bold text-sm"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>
            </div>
          </div>

          {/* Results Display */}
          {result && (
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                borderColor: T.cardBorder,
              }}
            >
              <div className="text-center mb-6">
                <div className="text-xs uppercase font-bold text-purple-500 tracking-wider mb-1">
                  Compound Duration
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
                  {result.totalDays}d {result.remHours}h {result.remMinutes}m
                </div>
                <p className="text-xs font-semibold mt-1" style={{ color: T.textSecondary }}>
                  {result.weeks > 0 ? `${result.weeks} weeks and ${result.remDays} days` : `${result.totalDays} total days`}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div
                  className="p-3.5 rounded-xl border text-center"
                  style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                >
                  <div className="text-2xl font-mono font-bold text-purple-500">{result.totalDays}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Total Days</div>
                </div>

                <div
                  className="p-3.5 rounded-xl border text-center"
                  style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                >
                  <div className="text-2xl font-mono font-bold text-purple-500">{result.totalHours.toLocaleString()}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Total Hours</div>
                </div>

                <div
                  className="p-3.5 rounded-xl border text-center"
                  style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                >
                  <div className="text-2xl font-mono font-bold text-purple-500">{result.totalMinutes.toLocaleString()}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Minutes</div>
                </div>

                <div
                  className="p-3.5 rounded-xl border text-center"
                  style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                >
                  <div className="text-2xl font-mono font-bold text-purple-500">{result.totalSeconds.toLocaleString()}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Seconds</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}