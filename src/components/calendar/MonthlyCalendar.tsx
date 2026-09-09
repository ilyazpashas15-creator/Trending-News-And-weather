'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, Filter, Search, Tag } from 'lucide-react';
import { getHolidaysForDate, holidays2026, type Holiday } from '@/data/holidaysData';

interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  dateStr: string;
  holidays: Holiday[];
}

export default function MonthlyCalendar() {
  const [isDark, setIsDark] = useState(true);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const goToPrev = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNext = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Generate calendar grid cells
  const calendarDays = useMemo(() => {
    const days: DayInfo[] = [];
    const today = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');

    // Previous month padding
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dateStr = `${prevYear}-${pad(prevMonth + 1)}-${pad(d)}`;
      days.push({
        day: d,
        isCurrentMonth: false,
        isToday: false,
        dateStr,
        holidays: getHolidaysForDate(dateStr),
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${pad(month + 1)}-${pad(d)}`;
      const isToday =
        today.getDate() === d &&
        today.getMonth() === month &&
        today.getFullYear() === year;

      days.push({
        day: d,
        isCurrentMonth: true,
        isToday,
        dateStr,
        holidays: getHolidaysForDate(dateStr),
      });
    }

    // Next month padding (to fill 35 or 42 grid cells)
    const remaining = 35 - days.length >= 0 ? 35 - days.length : 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dateStr = `${nextYear}-${pad(nextMonth + 1)}-${pad(d)}`;
      days.push({
        day: d,
        isCurrentMonth: false,
        isToday: false,
        dateStr,
        holidays: getHolidaysForDate(dateStr),
      });
    }

    return days;
  }, [year, month, firstDayOfMonth, daysInMonth, daysInPrevMonth]);

  // All holidays in the current month
  const monthHolidays = useMemo(() => {
    return calendarDays
      .filter((d) => d.isCurrentMonth && d.holidays.length > 0)
      .flatMap((d) => d.holidays.map((h) => ({ ...h, dayNumber: d.day })))
      .filter((h) => !searchFilter || h.name.toLowerCase().includes(searchFilter.toLowerCase()));
  }, [calendarDays, searchFilter]);

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(59,130,246,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(59,130,246,0.08), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    textPrimary: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    cellBg: isDark ? 'rgba(30, 41, 59, 0.4)' : '#ffffff',
    cellOtherBg: isDark ? 'rgba(15, 23, 42, 0.3)' : '#f8fafc',
    cellBorder: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(226, 232, 240, 0.8)',
    inputBg: isDark ? 'rgba(15, 23, 42, 0.9)' : '#ffffff',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(203, 213, 225, 0.9)',
  };

  return (
    <div style={{ background: T.bgPage, minHeight: '100vh' }} className="relative transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: T.ambientOrbs }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-blue-500/10 text-blue-500 border-blue-500/20">
            <CalendarIcon className="w-3.5 h-3.5" /> Interactive Monthly View
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Monthly Calendar
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Navigate months, inspect global holidays, and track festivals in a modern grid.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div
          className="rounded-2xl border p-4 mb-6 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrev}
              aria-label="Previous Month"
              className="p-2.5 rounded-xl border hover:scale-105 active:scale-95 transition-all"
              style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder, color: T.textPrimary }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight min-w-[200px] text-center" style={{ color: T.textPrimary }}>
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={goToNext}
              aria-label="Next Month"
              className="p-2.5 rounded-xl border hover:scale-105 active:scale-95 transition-all"
              style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder, color: T.textPrimary }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="px-4 py-2 rounded-xl text-xs font-bold border transition-all hover:scale-105"
              style={{
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                borderColor: '#3b82f6',
                color: '#3b82f6',
              }}
            >
              Today
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Grid + Holidays Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid (3 Cols) */}
          <div
            className="lg:col-span-3 rounded-3xl border p-4 sm:p-6 backdrop-blur-xl relative overflow-hidden"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1.5 mb-2">
              {dayNames.map((d, idx) => (
                <div
                  key={d}
                  className="text-center font-bold text-xs py-2 rounded-lg"
                  style={{
                    color: idx === 0 ? '#ef4444' : idx === 6 ? '#3b82f6' : T.textSecondary,
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Grid Days */}
            <div className="grid grid-cols-7 gap-1.5">
              {calendarDays.map((d, idx) => {
                const isSelected = selectedDay?.dateStr === d.dateStr;
                const hasHoliday = d.holidays.length > 0;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDay(d)}
                    className="min-h-[85px] sm:min-h-[100px] p-2 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-150 hover:scale-[1.02]"
                    style={{
                      backgroundColor: d.isToday
                        ? isDark ? 'rgba(59, 130, 246, 0.25)' : 'rgba(239, 246, 255, 0.95)'
                        : d.isCurrentMonth ? T.cellBg : T.cellOtherBg,
                      borderColor: d.isToday ? '#3b82f6' : isSelected ? '#8b5cf6' : T.cellBorder,
                      opacity: d.isCurrentMonth ? 1 : 0.4,
                      boxShadow: d.isToday ? '0 0 15px rgba(59, 130, 246, 0.25)' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                          d.isToday ? 'bg-blue-600 text-white' : ''
                        }`}
                        style={{ color: d.isToday ? '#ffffff' : T.textPrimary }}
                      >
                        {d.day}
                      </span>
                      {hasHoliday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      )}
                    </div>

                    {/* Holiday Mini Badges */}
                    <div className="space-y-1 overflow-hidden mt-1">
                      {d.holidays.slice(0, 2).map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="text-[10px] font-semibold truncate px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500"
                          title={h.name}
                        >
                          {h.name}
                        </div>
                      ))}
                      {d.holidays.length > 2 && (
                        <div className="text-[9px] font-bold text-slate-400 pl-1">
                          +{d.holidays.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Month Holidays & Events Panel (1 Col) */}
          <div
            className="rounded-3xl border p-5 backdrop-blur-xl flex flex-col"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: T.textPrimary }}>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Month Holidays
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500">
                {monthHolidays.length}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter holidays..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs focus:outline-none"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>

            {/* Scrollable Holiday List */}
            <div className="divide-y overflow-y-auto max-h-[500px] pr-1 space-y-1" style={{ borderColor: T.cardBorder }}>
              {monthHolidays.length === 0 ? (
                <div className="py-8 text-center text-xs" style={{ color: T.textSecondary }}>
                  No holidays recorded for this month.
                </div>
              ) : (
                monthHolidays.map((h, idx) => (
                  <div key={idx} className="pt-2.5 pb-2 transition-colors hover:bg-slate-500/5 rounded-lg px-2">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-xs truncate" style={{ color: T.textPrimary }}>
                        {h.name}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-blue-500 shrink-0">
                        Day {h.dayNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]" style={{ color: T.textSecondary }}>
                      <span>{h.country}</span>
                      <span>•</span>
                      <span className="capitalize">{h.type}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
