'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Printer, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function CustomCalendar() {
  const [isDark, setIsDark] = useState(true);

  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const stats = useMemo(() => {
    if (!startDate || !endDate) return null;
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;

    const start = s < e ? s : e;
    const end = s < e ? e : s;

    let totalDays = 0;
    let businessDays = 0;
    let weekendDays = 0;

    const current = new Date(start);
    while (current <= end) {
      totalDays++;
      const day = current.getDay();
      if (day === 0 || day === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return {
      totalDays,
      businessDays,
      weekendDays,
      weeks: (totalDays / 7).toFixed(1),
    };
  }, [startDate, endDate]);

  const setPreset = (days: number) => {
    const now = new Date();
    const target = new Date();
    target.setDate(now.getDate() + days);
    setStartDate(now.toISOString().slice(0, 10));
    setEndDate(target.toISOString().slice(0, 10));
  };

  const handlePrint = () => {
    window.print();
  };

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(59,130,246,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(59,130,246,0.08), transparent)',
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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-blue-500/10 text-blue-500 border-blue-500/20">
            <Calendar className="w-3.5 h-3.5" /> Printable Custom Range
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Custom Calendar
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Generate custom date-range schedules and print ready-to-use calendar periods.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {[
            { label: 'Next 14 Days', days: 14 },
            { label: 'Next 30 Days', days: 30 },
            { label: 'Next 60 Days', days: 60 },
            { label: 'Next Quarter (90d)', days: 90 },
            { label: '6 Months (180d)', days: 180 },
          ].map((p) => (
            <button
              key={p.label}
              onClick={() => setPreset(p.days)}
              className="text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff',
                borderColor: T.cardBorder,
                color: T.textPrimary,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Inputs Card */}
        <div
          className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl mb-8 relative overflow-hidden"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                Range Start Date
              </label>
              <input
                type="date"
                aria-label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border font-bold text-sm"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                Range End Date
              </label>
              <input
                type="date"
                aria-label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border font-bold text-sm"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>
          </div>

          {stats && (
            <div
              className="p-6 rounded-2xl border mb-6"
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                borderColor: T.cardBorder,
              }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-mono font-bold text-blue-500">{stats.totalDays}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Total Days</div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-bold text-emerald-500">{stats.businessDays}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Business Days</div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-bold text-indigo-500">{stats.weekendDays}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Weekend Days</div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-bold text-purple-500">{stats.weeks}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Weeks</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:scale-105 transition-all"
            >
              <Printer className="w-4 h-4" /> Print Custom Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}