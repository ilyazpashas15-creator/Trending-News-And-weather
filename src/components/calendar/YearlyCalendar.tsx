'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Printer } from 'lucide-react';

interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export default function YearlyCalendar() {
  const [isDark, setIsDark] = useState(true);
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateMonthGrid = (year: number, monthIndex: number) => {
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const calendarDays: DayInfo[] = [];

    // Empty cells before month starts
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push({ day: 0, isCurrentMonth: false, isToday: false });
    }

    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        monthIndex === today.getMonth() &&
        year === today.getFullYear();

      calendarDays.push({
        day,
        isCurrentMonth: true,
        isToday,
      });
    }

    return calendarDays;
  };

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(59,130,246,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(59,130,246,0.08), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    textPrimary: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
  };

  return (
    <div style={{ background: T.bgPage, minHeight: '100vh' }} className="relative transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: T.ambientOrbs }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-blue-500/10 text-blue-500 border-blue-500/20">
            <Calendar className="w-3.5 h-3.5" /> Full Year Overview
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Yearly Calendar - {currentYear}
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Complete 12-month calendar grid with day breakdowns and leap-year accounting.
          </p>
        </div>

        {/* Year Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setCurrentYear((y) => y - 1)}
            className="px-4 py-2 rounded-xl border text-xs font-bold hover:scale-105 active:scale-95 transition-all"
            style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder, color: T.textPrimary }}
          >
            ← {currentYear - 1}
          </button>
          <button
            onClick={() => setCurrentYear(new Date().getFullYear())}
            className="px-5 py-2 rounded-xl text-xs font-bold border transition-all"
            style={{
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
              borderColor: '#3b82f6',
              color: '#3b82f6',
            }}
          >
            Current Year
          </button>
          <button
            onClick={() => setCurrentYear((y) => y + 1)}
            className="px-4 py-2 rounded-xl border text-xs font-bold hover:scale-105 active:scale-95 transition-all"
            style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder, color: T.textPrimary }}
          >
            {currentYear + 1} →
          </button>
        </div>

        {/* 12 Months Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {monthNames.map((mName, mIdx) => {
            const grid = generateMonthGrid(currentYear, mIdx);

            return (
              <div
                key={mName}
                className="rounded-2xl border p-4 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: T.cardBg,
                  borderColor: T.cardBorder,
                  boxShadow: T.cardShadow,
                }}
              >
                <h2 className="font-extrabold text-sm text-center mb-3 text-blue-500">
                  {mName}
                </h2>

                <div className="grid grid-cols-7 gap-1 text-[11px] font-bold text-center mb-1.5" style={{ color: T.textSecondary }}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, dIdx) => (
                    <div key={dIdx} className={dIdx === 0 ? 'text-rose-500' : dIdx === 6 ? 'text-blue-500' : ''}>
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-xs">
                  {grid.map((d, dIdx) => {
                    if (!d.isCurrentMonth) {
                      return <div key={dIdx} className="h-6" />;
                    }

                    return (
                      <div
                        key={dIdx}
                        className={`h-6 flex items-center justify-center rounded-md font-semibold transition-colors ${
                          d.isToday
                            ? 'bg-blue-600 text-white font-black'
                            : 'hover:bg-blue-500/10'
                        }`}
                        style={{ color: d.isToday ? '#ffffff' : T.textPrimary }}
                      >
                        {d.day}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}