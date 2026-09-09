'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, Plus, Trash2, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export default function CalculatorsBusinessPage() {
  const [isDark, setIsDark] = useState(true);

  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });

  const [workDaysMode, setWorkDaysMode] = useState<'mon_fri' | 'mon_sat'>('mon_fri');
  const [holidays, setHolidays] = useState<string[]>([
    '2026-01-01', // New Year
    '2026-07-04', // Independence Day
    '2026-12-25', // Christmas
  ]);
  const [newHoliday, setNewHoliday] = useState('');

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const handleAddHoliday = () => {
    if (!newHoliday || holidays.includes(newHoliday)) return;
    setHolidays((prev) => [...prev, newHoliday].sort());
    setNewHoliday('');
  };

  const handleRemoveHoliday = (h: string) => {
    setHolidays((prev) => prev.filter((d) => d !== h));
  };

  const result = React.useMemo(() => {
    if (!startDate || !endDate) return null;
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;

    const start = s < e ? s : e;
    const end = s < e ? e : s;

    let current = new Date(start);
    let totalCalendarDays = 0;
    let businessDays = 0;
    let weekendDays = 0;
    let holidayDays = 0;

    while (current <= end) {
      totalCalendarDays++;
      const day = current.getDay(); // 0 is Sun, 6 is Sat
      const isWeekend = workDaysMode === 'mon_fri' ? day === 0 || day === 6 : day === 0;

      const dateStr = current.toISOString().slice(0, 10);
      const isHoliday = holidays.includes(dateStr);

      if (isWeekend) {
        weekendDays++;
      } else if (isHoliday) {
        holidayDays++;
      } else {
        businessDays++;
      }

      current.setDate(current.getDate() + 1);
    }

    const workingHours = businessDays * 8; // 8 hours/day

    return {
      totalCalendarDays,
      businessDays,
      weekendDays,
      holidayDays,
      workingHours,
    };
  }, [startDate, endDate, workDaysMode, holidays]);

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(20,184,166,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(20,184,166,0.08), transparent)',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-teal-500/10 text-teal-500 border-teal-500/20">
            <Building2 className="w-3.5 h-3.5" /> Work Days & Shift Scheduling
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Business Days Calculator
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Compute net working days between dates excluding weekends and public holidays.
          </p>
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
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                Start Date
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
                End Date
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

          {/* Work week options */}
          <div className="mb-6">
            <span className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
              Standard Work Schedule
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => setWorkDaysMode('mon_fri')}
                className="flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all"
                style={{
                  backgroundColor: workDaysMode === 'mon_fri' ? (isDark ? 'rgba(20,184,166,0.2)' : 'rgba(20,184,166,0.15)') : (isDark ? 'rgba(30,41,59,0.5)' : '#ffffff'),
                  borderColor: workDaysMode === 'mon_fri' ? '#14b8a6' : T.cardBorder,
                  color: workDaysMode === 'mon_fri' ? '#14b8a6' : T.textSecondary,
                }}
              >
                5-Day Week (Mon - Fri)
              </button>
              <button
                onClick={() => setWorkDaysMode('mon_sat')}
                className="flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all"
                style={{
                  backgroundColor: workDaysMode === 'mon_sat' ? (isDark ? 'rgba(20,184,166,0.2)' : 'rgba(20,184,166,0.15)') : (isDark ? 'rgba(30,41,59,0.5)' : '#ffffff'),
                  borderColor: workDaysMode === 'mon_sat' ? '#14b8a6' : T.cardBorder,
                  color: workDaysMode === 'mon_sat' ? '#14b8a6' : T.textSecondary,
                }}
              >
                6-Day Week (Mon - Sat)
              </button>
            </div>
          </div>

          {/* Holidays Adder */}
          <div className="mb-6 pt-4 border-t" style={{ borderColor: T.cardBorder }}>
            <span className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
              Custom Excluded Holidays ({holidays.length})
            </span>
            <div className="flex gap-2 mb-3">
              <input
                type="date"
                aria-label="Add Holiday Date"
                value={newHoliday}
                onChange={(e) => setNewHoliday(e.target.value)}
                className="px-3 py-2 rounded-xl border text-xs font-semibold"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
              <button
                onClick={handleAddHoliday}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Exclude Holiday
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {holidays.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium"
                  style={{ backgroundColor: isDark ? 'rgba(30,41,59,0.6)' : '#ffffff', borderColor: T.cardBorder, color: T.textPrimary }}
                >
                  {h}
                  <button onClick={() => handleRemoveHoliday(h)} className="text-rose-500 hover:opacity-75">
                    ×
                  </button>
                </span>
              ))}
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
                <div className="text-xs uppercase font-bold text-teal-500 tracking-wider mb-1">
                  Net Business Working Days
                </div>
                <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight" style={{ color: T.textPrimary }}>
                  {result.businessDays} Days
                </div>
                <p className="text-xs font-semibold mt-1" style={{ color: T.textSecondary }}>
                  Total of <strong>{result.workingHours} billable hours</strong> (based on 8 hrs/day)
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div
                  className="p-3.5 rounded-xl border text-center"
                  style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                >
                  <div className="text-2xl font-mono font-bold text-teal-500">{result.businessDays}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Working Days</div>
                </div>

                <div
                  className="p-3.5 rounded-xl border text-center"
                  style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                >
                  <div className="text-2xl font-mono font-bold text-teal-500">{result.weekendDays}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Weekend Days</div>
                </div>

                <div
                  className="p-3.5 rounded-xl border text-center"
                  style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                >
                  <div className="text-2xl font-mono font-bold text-teal-500">{result.holidayDays}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Holidays Off</div>
                </div>

                <div
                  className="p-3.5 rounded-xl border text-center"
                  style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                >
                  <div className="text-2xl font-mono font-bold text-teal-500">{result.totalCalendarDays}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Calendar Days</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}