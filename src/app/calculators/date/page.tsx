'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeftRight,
  Check,
  Copy,
  RotateCcw,
  CalendarDays,
  CalendarRange,
  Hourglass,
  Sun,
  Moon,
  Star,
  Bookmark,
  ChevronRight,
  Info,
} from 'lucide-react';

// Helper: Zodiac Sign
function getZodiacSign(month: number, day: number): { name: string; symbol: string } {
  // month is 1-indexed (1 to 12)
  const dates = [
    { name: 'Capricorn', symbol: '♑', m: 1, d: 19 },
    { name: 'Aquarius', symbol: '♒', m: 2, d: 18 },
    { name: 'Pisces', symbol: '♓', m: 3, d: 20 },
    { name: 'Aries', symbol: '♈', m: 4, d: 19 },
    { name: 'Taurus', symbol: '♉', m: 5, d: 20 },
    { name: 'Gemini', symbol: '♊', m: 6, d: 20 },
    { name: 'Cancer', symbol: '♋', m: 7, d: 22 },
    { name: 'Leo', symbol: '♌', m: 8, d: 22 },
    { name: 'Virgo', symbol: '♍', m: 9, d: 22 },
    { name: 'Libra', symbol: '♎', m: 10, d: 22 },
    { name: 'Scorpio', symbol: '♏', m: 11, d: 21 },
    { name: 'Sagittarius', symbol: '♐', m: 12, d: 21 },
  ];
  for (const z of dates) {
    if (month === z.m && day <= z.d) return z;
    if (month === z.m - 1 && day > (dates[dates.indexOf(z) - 1]?.d || 0)) return z;
  }
  return { name: 'Capricorn', symbol: '♑' };
}

// Helper: Day of Year
function getDayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Helper: ISO Week Number
function getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

// Helper: Leap Year
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Helper: Season
function getSeason(month: number): string {
  if (month >= 3 && month <= 5) return 'Spring';
  if (month >= 6 && month <= 8) return 'Summer';
  if (month >= 9 && month <= 11) return 'Autumn';
  return 'Winter';
}

function parseYMD(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function CalculatorsDatePage() {
  const [isDark, setIsDark] = useState(true);
  const [mode, setMode] = useState<'difference' | 'add' | 'milestones' | 'matrix'>('difference');

  // Mode 1: Difference
  const [startDate, setStartDate] = useState<string>(() => toYMD(new Date()));
  const [endDate, setEndDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return toYMD(d);
  });
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState(false);

  // Mode 2: Add / Subtract
  const [baseDate, setBaseDate] = useState<string>(() => toYMD(new Date()));
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [addYears, setAddYears] = useState(0);
  const [addMonths, setAddMonths] = useState(1);
  const [addWeeks, setAddWeeks] = useState(0);
  const [addDays, setAddDays] = useState(15);
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);

  // Mode 3: Custom Milestone
  const [customEventName, setCustomEventName] = useState('New Year 2027');
  const [customEventDate, setCustomEventDate] = useState('2027-01-01');

  // Copy Feedback
  const [copied, setCopied] = useState(false);

  // Today Metadata
  const today = useMemo(() => new Date(), []);
  const todayYMD = useMemo(() => toYMD(today), [today]);
  const todayDayOfYear = useMemo(() => getDayOfYear(today), [today]);
  const daysInCurrentYear = useMemo(() => (isLeapYear(today.getFullYear()) ? 366 : 365), [today]);
  const yearProgressPct = useMemo(
    () => ((todayDayOfYear / daysInCurrentYear) * 100).toFixed(1),
    [todayDayOfYear, daysInCurrentYear]
  );

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Swap dates
  const handleSwapDates = () => {
    setIsSwapping(true);
    setTimeout(() => {
      const temp = startDate;
      setStartDate(endDate);
      setEndDate(temp);
      setIsSwapping(false);
    }, 200);
  };

  // Quick Preset Handlers for Difference
  const setPresetRange = (type: '7d' | '30d' | '90d' | 'monthEnd' | 'yearEnd' | 'ytd') => {
    const now = new Date();
    const start = new Date(now);
    let end = new Date(now);

    if (type === '7d') {
      end.setDate(now.getDate() + 7);
      setStartDate(toYMD(start));
      setEndDate(toYMD(end));
    } else if (type === '30d') {
      end.setDate(now.getDate() + 30);
      setStartDate(toYMD(start));
      setEndDate(toYMD(end));
    } else if (type === '90d') {
      end.setDate(now.getDate() + 90);
      setStartDate(toYMD(start));
      setEndDate(toYMD(end));
    } else if (type === 'monthEnd') {
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      setStartDate(toYMD(start));
      setEndDate(toYMD(end));
    } else if (type === 'yearEnd') {
      end = new Date(now.getFullYear(), 11, 31);
      setStartDate(toYMD(start));
      setEndDate(toYMD(end));
    } else if (type === 'ytd') {
      const ytdStart = new Date(now.getFullYear(), 0, 1);
      setStartDate(toYMD(ytdStart));
      setEndDate(toYMD(now));
    }
  };

  // Difference Calculation
  const diffResult = useMemo(() => {
    if (!startDate || !endDate) return null;
    const sRaw = parseYMD(startDate);
    const eRaw = parseYMD(endDate);
    if (isNaN(sRaw.getTime()) || isNaN(eRaw.getTime())) return null;

    const isFuture = eRaw.getTime() >= sRaw.getTime();
    const [earlyDate, lateDate] = isFuture ? [sRaw, eRaw] : [eRaw, sRaw];

    // Total days calculation
    const oneDay = 1000 * 60 * 60 * 24;
    let totalDays = Math.round((lateDate.getTime() - earlyDate.getTime()) / oneDay);
    if (includeEndDate) {
      totalDays += 1;
    }

    // Exact Years, Months, Days breakdown
    let years = lateDate.getFullYear() - earlyDate.getFullYear();
    let months = lateDate.getMonth() - earlyDate.getMonth();
    let days = lateDate.getDate() - earlyDate.getDate();

    if (includeEndDate) {
      days += 1;
    }

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(lateDate.getFullYear(), lateDate.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Business Days vs Weekend Days
    let businessDays = 0;
    let weekendDays = 0;
    const cur = new Date(earlyDate);
    const endBound = new Date(lateDate);
    if (includeEndDate) {
      endBound.setDate(endBound.getDate() + 1);
    }

    // Cap loop to prevent freeze on astronomical date ranges
    const maxDaysToLoop = Math.min(totalDays + 2, 20000);
    for (let i = 0; i < maxDaysToLoop && cur < endBound; i++) {
      const dow = cur.getDay();
      if (dow === 0 || dow === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;
    const totalHours = totalDays * 24;
    const totalMinutes = totalDays * 1440;
    const totalSeconds = totalDays * 86400;
    const yearPercentage = ((totalDays / 365.25) * 100).toFixed(1);

    // Timeline progress if today is between
    let timelineProgress: number | null = null;
    const nowTime = today.getTime();
    if (nowTime >= earlyDate.getTime() && nowTime <= lateDate.getTime()) {
      const totalSpan = lateDate.getTime() - earlyDate.getTime();
      timelineProgress = totalSpan > 0 ? Math.min(100, Math.max(0, ((nowTime - earlyDate.getTime()) / totalSpan) * 100)) : 100;
    }

    return {
      totalDays,
      years,
      months,
      days,
      weeks,
      remDays,
      businessDays,
      weekendDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      yearPercentage,
      isFuture,
      earlyFormatted: earlyDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      lateFormatted: lateDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      timelineProgress,
    };
  }, [startDate, endDate, includeEndDate, today]);

  // Add/Subtract Calculation
  const addResult = useMemo(() => {
    if (!baseDate) return null;
    const d = parseYMD(baseDate);
    if (isNaN(d.getTime())) return null;

    const mult = operation === 'add' ? 1 : -1;
    const totalDaysToAdd = addWeeks * 7 + addDays;

    if (businessDaysOnly) {
      // Step day-by-day for business days
      d.setFullYear(d.getFullYear() + addYears * mult);
      d.setMonth(d.getMonth() + addMonths * mult);

      let remaining = totalDaysToAdd;
      while (remaining > 0) {
        d.setDate(d.getDate() + 1 * mult);
        const dow = d.getDay();
        if (dow !== 0 && dow !== 6) {
          remaining--;
        }
      }
    } else {
      d.setFullYear(d.getFullYear() + addYears * mult);
      d.setMonth(d.getMonth() + addMonths * mult);
      d.setDate(d.getDate() + totalDaysToAdd * mult);
    }

    const dayOfYear = getDayOfYear(d);
    const weekNum = getWeekNumber(d);
    const zodiac = getZodiacSign(d.getMonth() + 1, d.getDate());
    const season = getSeason(d.getMonth() + 1);

    // Relative days from today
    const diffFromToday = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    let relativeText = 'Today';
    if (diffFromToday > 0) relativeText = `In ${diffFromToday} day${diffFromToday === 1 ? '' : 's'}`;
    if (diffFromToday < 0) relativeText = `${Math.abs(diffFromToday)} day${Math.abs(diffFromToday) === 1 ? '' : 's'} ago`;

    return {
      formatted: d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      iso: toYMD(d),
      dayOfWeek: d.toLocaleDateString('en-US', { weekday: 'long' }),
      dayOfYear,
      weekNum,
      zodiac,
      season,
      isLeap: isLeapYear(d.getFullYear()),
      relativeText,
      diffFromToday,
    };
  }, [baseDate, operation, addYears, addMonths, addWeeks, addDays, businessDaysOnly, today]);

  // Milestone Countdowns Data
  const milestones = useMemo(() => {
    const curYear = today.getFullYear();
    const list = [
      { name: 'Halloween', date: `${curYear}-10-31`, icon: '🎃' },
      { name: 'Christmas Day', date: `${curYear}-12-25`, icon: '🎄' },
      { name: 'New Year 2027', date: `${curYear + 1}-01-01`, icon: '✨' },
      { name: 'Valentine’s Day', date: `${curYear + 1}-02-14`, icon: '💖' },
      { name: 'Spring Equinox', date: `${curYear + 1}-03-20`, icon: '🌸' },
      { name: 'Summer Solstice', date: `${curYear + 1}-06-21`, icon: '☀️' },
    ];

    return list.map((item) => {
      const target = parseYMD(item.date);
      const diffMs = target.getTime() - today.getTime();
      const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return {
        ...item,
        daysRemaining: days,
        isPast: days < 0,
        formatted: target.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      };
    });
  }, [today]);

  // Custom Event Milestone
  const customMilestone = useMemo(() => {
    if (!customEventDate) return null;
    const target = parseYMD(customEventDate);
    if (isNaN(target.getTime())) return null;
    const diffMs = target.getTime() - today.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return {
      name: customEventName || 'Custom Event',
      date: customEventDate,
      daysRemaining: days,
      isPast: days < 0,
      formatted: target.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
    };
  }, [customEventName, customEventDate, today]);

  // Interval Reference Matrix (+7d, +14d, +30d, +60d, +90d, +180d, +365d)
  const intervalMatrix = useMemo(() => {
    const intervals = [
      { label: '+7 Days (1 Week)', days: 7 },
      { label: '+14 Days (2 Weeks)', days: 14 },
      { label: '+30 Days (~1 Month)', days: 30 },
      { label: '+60 Days (~2 Months)', days: 60 },
      { label: '+90 Days (1 Quarter)', days: 90 },
      { label: '+180 Days (Half Year)', days: 180 },
      { label: '+365 Days (1 Full Year)', days: 365 },
    ];

    return intervals.map((inv) => {
      const d = new Date(today);
      d.setDate(d.getDate() + inv.days);
      return {
        ...inv,
        dateFormatted: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        dayOfWeek: d.toLocaleDateString('en-US', { weekday: 'long' }),
        iso: toYMD(d),
      };
    });
  }, [today]);

  // Copy result text
  const copyDifference = () => {
    if (!diffResult) return;
    const text = `Duration between ${startDate} and ${endDate}: ${diffResult.totalDays} Days (${diffResult.years}y, ${diffResult.months}m, ${diffResult.days}d). Business days: ${diffResult.businessDays}.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAddResult = () => {
    if (!addResult) return;
    const text = `Date calculation from ${baseDate}: ${operation === 'add' ? '+' : '-'}${addYears}y ${addMonths}m ${addWeeks}w ${addDays}d = ${addResult.formatted} (${addResult.iso}).`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Color tokens
  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #070913 0%, #0d1222 50%, #080a14 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #ffffff 100%)',
    ambientOrbs: isDark
      ? 'radial-gradient(ellipse 700px 350px at 50% -10%, rgba(139,92,246,0.18), transparent), radial-gradient(ellipse 500px 300px at 80% 20%, rgba(6,182,212,0.12), transparent)'
      : 'radial-gradient(ellipse 700px 350px at 50% -10%, rgba(139,92,246,0.08), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 12px 36px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 10px 25px -5px rgba(15, 23, 42, 0.06)',
    subCardBg: isDark ? 'rgba(10, 16, 31, 0.8)' : 'rgba(248, 250, 252, 0.95)',
    textPrimary: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    inputBg: isDark ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(203, 213, 225, 0.9)',
  };

  return (
    <div style={{ background: T.bgPage, minHeight: '100vh' }} className="relative transition-colors duration-300 font-sans pb-16">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: T.ambientOrbs }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* Top Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md bg-purple-500/10 text-purple-400 border-purple-500/25 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Today: {today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="opacity-40">•</span>
            <span className="font-mono">Day {todayDayOfYear} of {daysInCurrentYear} ({yearProgressPct}%)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setStartDate(todayYMD);
                const d = new Date();
                d.setDate(d.getDate() + 30);
                setEndDate(toYMD(d));
                setBaseDate(todayYMD);
              }}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff',
                borderColor: T.cardBorder,
                color: T.textPrimary,
              }}
              title="Reset to current date"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
              <span>Reset to Today</span>
            </button>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3" style={{ color: T.textPrimary }}>
            Date Calculator <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">&amp; Duration</span>
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: T.textSecondary }}>
            Calculate exact duration between dates, add or subtract calendar and business days, and explore live milestone countdowns.
          </p>
        </div>

        {/* Main Mode Tabs */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex p-1.5 rounded-2xl border backdrop-blur-xl shadow-lg"
            style={{ backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#f1f5f9', borderColor: T.cardBorder }}
          >
            {[
              { id: 'difference', label: 'Date Duration & Difference', icon: CalendarRange },
              { id: 'add', label: 'Add / Subtract Days', icon: CalendarDays },
              { id: 'milestones', label: 'Milestone Countdowns', icon: Hourglass },
              { id: 'matrix', label: 'Common Intervals', icon: Bookmark },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMode(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 scale-105'
                      : 'hover:bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                  style={{ color: isActive ? '#ffffff' : T.textPrimary }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MODE 1: DATE DURATION & DIFFERENCE */}
        {mode === 'difference' && (
          <div
            className="rounded-3xl border backdrop-blur-2xl p-6 sm:p-8 mb-10 relative overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />

            {/* Quick Presets Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider mr-1 flex items-center gap-1" style={{ color: T.textSecondary }}>
                  <Sparkles className="w-3 h-3 text-purple-400" /> Presets:
                </span>
                {[
                  { label: '+7 Days', type: '7d' },
                  { label: '+30 Days', type: '30d' },
                  { label: '+90 Days', type: '90d' },
                  { label: 'Month End', type: 'monthEnd' },
                  { label: 'Year End', type: 'yearEnd' },
                  { label: 'YTD', type: 'ytd' },
                ].map((preset) => (
                  <button
                    key={preset.type}
                    onClick={() => setPresetRange(preset.type as any)}
                    className="text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all hover:scale-105 active:scale-95 hover:border-purple-500 hover:text-purple-400"
                    style={{
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                      borderColor: T.cardBorder,
                      color: T.textPrimary,
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Include End Date checkbox */}
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold select-none" style={{ color: T.textPrimary }}>
                <input
                  type="checkbox"
                  checked={includeEndDate}
                  onChange={(e) => setIncludeEndDate(e.target.checked)}
                  className="rounded border-slate-700 text-purple-600 focus:ring-purple-500 h-4 w-4"
                />
                <span>Include End Date (+1 day)</span>
              </label>
            </div>

            {/* Dual Date Input Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 items-center mb-8">
              {/* START DATE CARD */}
              <div
                className="p-5 rounded-2xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-purple-500/50"
                style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    Start Date
                  </span>
                  <button
                    onClick={() => setStartDate(todayYMD)}
                    className="text-[11px] text-purple-400 hover:underline font-semibold"
                  >
                    Set to Today
                  </button>
                </div>

                <input
                  type="date"
                  aria-label="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-transparent font-mono font-bold text-xl sm:text-2xl focus:outline-none"
                  style={{ color: T.textPrimary }}
                />

                <div className="mt-3 pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                  <span style={{ color: T.textSecondary }}>
                    {parseYMD(startDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="font-mono text-purple-400 font-semibold">
                    Day {getDayOfYear(parseYMD(startDate))}
                  </span>
                </div>
              </div>

              {/* SWAP CONNECTOR */}
              <div className="flex justify-center my-2 lg:my-0">
                <button
                  onClick={handleSwapDates}
                  title="Swap dates"
                  className={`p-3.5 rounded-2xl border bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-110 active:scale-95 transition-all duration-300 ${
                    isSwapping ? 'rotate-180' : ''
                  }`}
                >
                  <ArrowLeftRight className="w-5 h-5" />
                </button>
              </div>

              {/* END DATE CARD */}
              <div
                className="p-5 rounded-2xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-purple-500/50"
                style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                    End Date
                  </span>
                  <button
                    onClick={() => setEndDate(todayYMD)}
                    className="text-[11px] text-pink-400 hover:underline font-semibold"
                  >
                    Set to Today
                  </button>
                </div>

                <input
                  type="date"
                  aria-label="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-transparent font-mono font-bold text-xl sm:text-2xl focus:outline-none"
                  style={{ color: T.textPrimary }}
                />

                <div className="mt-3 pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                  <span style={{ color: T.textSecondary }}>
                    {parseYMD(endDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="font-mono text-pink-400 font-semibold">
                    Day {getDayOfYear(parseYMD(endDate))}
                  </span>
                </div>
              </div>
            </div>

            {/* HERO DURATION RESULT CARD */}
            {diffResult && (
              <div
                className="p-6 sm:p-8 rounded-3xl border relative overflow-hidden"
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                  borderColor: T.cardBorder,
                }}
              >
                <div className="text-center mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
                    <Clock className="w-3.5 h-3.5" /> Total Calendar Duration
                  </span>

                  {/* Primary Highlight */}
                  <div className="text-4xl sm:text-6xl font-mono font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                    {diffResult.totalDays.toLocaleString()} Days
                  </div>

                  {/* Granular Breakdown */}
                  <div className="text-base sm:text-lg font-semibold" style={{ color: T.textPrimary }}>
                    {diffResult.years > 0 && `${diffResult.years} Year${diffResult.years === 1 ? '' : 's'}, `}
                    {diffResult.months > 0 && `${diffResult.months} Month${diffResult.months === 1 ? '' : 's'}, `}
                    {diffResult.days} Day{diffResult.days === 1 ? '' : 's'}
                  </div>

                  <p className="text-xs font-medium mt-1" style={{ color: T.textSecondary }}>
                    From {diffResult.earlyFormatted} to {diffResult.lateFormatted}
                    {includeEndDate && ' (Inclusive of final date)'}
                  </p>
                </div>

                {/* Progress Timeline between Dates */}
                {diffResult.timelineProgress !== null && (
                  <div className="mb-6 p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span style={{ color: T.textSecondary }}>{diffResult.earlyFormatted}</span>
                      <span className="font-bold text-purple-400">Today: {diffResult.timelineProgress.toFixed(0)}% Elapsed</span>
                      <span style={{ color: T.textSecondary }}>{diffResult.lateFormatted}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-700/40 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                        style={{ width: `${diffResult.timelineProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Granular Units Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {/* Business Days */}
                  <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Working Days</div>
                    <div className="text-xl sm:text-2xl font-mono font-black mt-1" style={{ color: T.textPrimary }}>
                      {diffResult.businessDays.toLocaleString()}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: T.textSecondary }}>Mon–Fri (Excl. weekends)</div>
                  </div>

                  {/* Weekend Days */}
                  <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-pink-400">Weekend Days</div>
                    <div className="text-xl sm:text-2xl font-mono font-black mt-1" style={{ color: T.textPrimary }}>
                      {diffResult.weekendDays.toLocaleString()}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: T.textSecondary }}>Saturdays &amp; Sundays</div>
                  </div>

                  {/* Weeks & Remainder */}
                  <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-purple-400">Weeks &amp; Days</div>
                    <div className="text-xl sm:text-2xl font-mono font-black mt-1" style={{ color: T.textPrimary }}>
                      {diffResult.weeks}w {diffResult.remDays}d
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: T.textSecondary }}>{(diffResult.totalDays / 7).toFixed(1)} Total Weeks</div>
                  </div>

                  {/* Year Percentage */}
                  <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">Year Elapsed</div>
                    <div className="text-xl sm:text-2xl font-mono font-black mt-1" style={{ color: T.textPrimary }}>
                      {diffResult.yearPercentage}%
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: T.textSecondary }}>Of 365.25 day year</div>
                  </div>
                </div>

                {/* Sub-units (Hours, Minutes, Seconds) */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl border text-center" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.textSecondary }}>Total Hours</div>
                    <div className="text-sm sm:text-base font-mono font-bold text-purple-400">{diffResult.totalHours.toLocaleString()} hrs</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.textSecondary }}>Total Minutes</div>
                    <div className="text-sm sm:text-base font-mono font-bold text-pink-400">{diffResult.totalMinutes.toLocaleString()} min</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.textSecondary }}>Total Seconds</div>
                    <div className="text-sm sm:text-base font-mono font-bold text-cyan-400">{diffResult.totalSeconds.toLocaleString()} sec</div>
                  </div>
                </div>

                {/* Copy Action Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={copyDifference}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-5 py-2.5 rounded-xl border bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Summary Copied to Clipboard!' : 'Copy Detailed Breakdown'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: ADD OR SUBTRACT DAYS */}
        {mode === 'add' && (
          <div
            className="rounded-3xl border backdrop-blur-2xl p-6 sm:p-8 mb-10 relative overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500" />

            {/* Starting Date Card */}
            <div className="mb-6 p-5 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Starting Reference Date
                </label>
                <button
                  onClick={() => setBaseDate(todayYMD)}
                  className="text-[11px] text-purple-400 hover:underline font-semibold"
                >
                  Set to Today
                </button>
              </div>

              <input
                type="date"
                aria-label="Starting Date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full bg-transparent font-mono font-bold text-xl sm:text-2xl focus:outline-none"
                style={{ color: T.textPrimary }}
              />

              <div className="mt-2 text-xs" style={{ color: T.textSecondary }}>
                {parseYMD(baseDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            {/* Operation Selector */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setOperation('add')}
                className={`flex-1 py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                  operation === 'add' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/25 scale-[1.02]' : 'hover:bg-white/5'
                }`}
                style={{
                  borderColor: operation === 'add' ? '#8b5cf6' : T.cardBorder,
                  color: operation === 'add' ? '#ffffff' : T.textSecondary,
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Add to Date (Future)</span>
              </button>

              <button
                onClick={() => setOperation('subtract')}
                className={`flex-1 py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                  operation === 'subtract' ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-pink-500/25 scale-[1.02]' : 'hover:bg-white/5'
                }`}
                style={{
                  borderColor: operation === 'subtract' ? '#ec4899' : T.cardBorder,
                  color: operation === 'subtract' ? '#ffffff' : T.textSecondary,
                }}
              >
                <Minus className="w-4 h-4" />
                <span>Subtract from Date (Past)</span>
              </button>
            </div>

            {/* Granular Time Inputs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                  Years
                </label>
                <input
                  type="number"
                  min="0"
                  value={addYears}
                  onChange={(e) => setAddYears(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center font-mono font-black text-2xl bg-transparent focus:outline-none"
                  style={{ color: T.textPrimary }}
                />
              </div>

              <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                  Months
                </label>
                <input
                  type="number"
                  min="0"
                  value={addMonths}
                  onChange={(e) => setAddMonths(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center font-mono font-black text-2xl bg-transparent focus:outline-none"
                  style={{ color: T.textPrimary }}
                />
              </div>

              <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                  Weeks
                </label>
                <input
                  type="number"
                  min="0"
                  value={addWeeks}
                  onChange={(e) => setAddWeeks(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center font-mono font-black text-2xl bg-transparent focus:outline-none"
                  style={{ color: T.textPrimary }}
                />
              </div>

              <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                  Days
                </label>
                <input
                  type="number"
                  min="0"
                  value={addDays}
                  onChange={(e) => setAddDays(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center font-mono font-black text-2xl bg-transparent focus:outline-none"
                  style={{ color: T.textPrimary }}
                />
              </div>
            </div>

            {/* Business days only toggle & quick presets */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold select-none" style={{ color: T.textPrimary }}>
                <input
                  type="checkbox"
                  checked={businessDaysOnly}
                  onChange={(e) => setBusinessDaysOnly(e.target.checked)}
                  className="rounded border-slate-700 text-purple-600 focus:ring-purple-500 h-4 w-4"
                />
                <span>Count Business Days Only (Skip weekends)</span>
              </label>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider mr-1" style={{ color: T.textSecondary }}>
                  Quick:
                </span>
                {[
                  { label: '+7d', w: 1, d: 0 },
                  { label: '+14d', w: 2, d: 0 },
                  { label: '+30d', w: 0, d: 30 },
                  { label: '+90d', w: 0, d: 90 },
                  { label: '+1 Year', w: 0, d: 365 },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setAddYears(0);
                      setAddMonths(0);
                      setAddWeeks(item.w);
                      setAddDays(item.d);
                    }}
                    className="text-xs px-2.5 py-1 rounded-lg border font-mono font-semibold transition-all hover:scale-105 active:scale-95 hover:border-purple-500"
                    style={{
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff',
                      borderColor: T.cardBorder,
                      color: T.textPrimary,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Target Date Output */}
            {addResult && (
              <div
                className="p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden"
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                  borderColor: T.cardBorder,
                }}
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
                  <Calendar className="w-3.5 h-3.5" /> Resulting Calculated Date
                </div>

                <div className="text-3xl sm:text-5xl font-black tracking-tight mb-2" style={{ color: T.textPrimary }}>
                  {addResult.formatted}
                </div>

                <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold mb-6">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/25">
                    {addResult.iso}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                    {addResult.relativeText}
                  </span>
                </div>

                {/* Astronomical & Calendar Insights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  <div className="p-3.5 rounded-xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.textSecondary }}>Day of Year</div>
                    <div className="text-base font-mono font-bold text-purple-400 mt-0.5">Day {addResult.dayOfYear}</div>
                  </div>
                  <div className="p-3.5 rounded-xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.textSecondary }}>ISO Week Number</div>
                    <div className="text-base font-mono font-bold text-indigo-400 mt-0.5">Week {addResult.weekNum}</div>
                  </div>
                  <div className="p-3.5 rounded-xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.textSecondary }}>Season &amp; Weather</div>
                    <div className="text-base font-bold text-pink-400 mt-0.5">{addResult.season}</div>
                  </div>
                  <div className="p-3.5 rounded-xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.textSecondary }}>Zodiac Constellation</div>
                    <div className="text-base font-bold text-cyan-400 mt-0.5">{addResult.zodiac.symbol} {addResult.zodiac.name}</div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={copyAddResult}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-5 py-2.5 rounded-xl border bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Result Copied!' : 'Copy Result'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 3: MILESTONE & EVENT COUNTDOWNS */}
        {mode === 'milestones' && (
          <div
            className="rounded-3xl border backdrop-blur-2xl p-6 sm:p-8 mb-10 relative overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-black flex items-center gap-2" style={{ color: T.textPrimary }}>
                  <Hourglass className="w-5 h-5 text-purple-400" />
                  Upcoming Global &amp; Seasonal Milestones
                </h2>
                <p className="text-xs mt-0.5" style={{ color: T.textSecondary }}>
                  Real-time ticker countdowns to key international events and solstices.
                </p>
              </div>
            </div>

            {/* Milestones Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {milestones.map((m) => (
                <div
                  key={m.name}
                  onClick={() => {
                    setStartDate(todayYMD);
                    setEndDate(m.date);
                    setMode('difference');
                  }}
                  className="p-5 rounded-2xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 flex flex-col justify-between"
                  style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{m.icon}</div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {m.daysRemaining} days left
                    </span>
                  </div>

                  <div>
                    <div className="font-extrabold text-base" style={{ color: T.textPrimary }}>
                      {m.name}
                    </div>
                    <div className="text-xs mt-1" style={{ color: T.textSecondary }}>
                      {m.formatted}
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t flex items-center justify-between text-[11px] font-semibold text-purple-400" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                    <span>Calculate exact duration</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Event Countdown Creator */}
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
              <h3 className="text-sm font-extrabold mb-3 flex items-center gap-2" style={{ color: T.textPrimary }}>
                <Star className="w-4 h-4 text-pink-400" />
                Custom Event Countdown
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: T.textSecondary }}>
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={customEventName}
                    onChange={(e) => setCustomEventName(e.target.value)}
                    placeholder="e.g. My Birthday, Vacation, Product Launch"
                    className="w-full px-4 py-2.5 rounded-xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    style={{ backgroundColor: T.inputBg, borderColor: T.cardBorder, color: T.textPrimary }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: T.textSecondary }}>
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={customEventDate}
                    onChange={(e) => setCustomEventDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    style={{ backgroundColor: T.inputBg, borderColor: T.cardBorder, color: T.textPrimary }}
                  />
                </div>
              </div>

              {customMilestone && (
                <div className="p-4 rounded-xl border text-center bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent" style={{ borderColor: T.cardBorder }}>
                  <div className="text-2xl sm:text-3xl font-mono font-black text-purple-400 mb-1">
                    {customMilestone.daysRemaining >= 0 ? `${customMilestone.daysRemaining} Days Until` : `${Math.abs(customMilestone.daysRemaining)} Days Since`}
                  </div>
                  <div className="text-sm font-bold" style={{ color: T.textPrimary }}>
                    {customMilestone.name} ({customMilestone.formatted})
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODE 4: COMMON INTERVALS MATRIX */}
        {mode === 'matrix' && (
          <div
            className="rounded-3xl border backdrop-blur-2xl p-6 sm:p-8 mb-10 relative overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />

            <div className="mb-6">
              <h2 className="text-lg font-black flex items-center gap-2" style={{ color: T.textPrimary }}>
                <Bookmark className="w-5 h-5 text-purple-400" />
                Standard Date Intervals from Today
              </h2>
              <p className="text-xs mt-0.5" style={{ color: T.textSecondary }}>
                Quick look-up table showing future dates from today ({today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}).
              </p>
            </div>

            <div className="rounded-2xl border overflow-hidden divide-y mb-8" style={{ borderColor: T.cardBorder, backgroundColor: T.subCardBg }}>
              {intervalMatrix.map((item) => (
                <div
                  key={item.label}
                  onClick={() => {
                    setStartDate(todayYMD);
                    setEndDate(item.iso);
                    setMode('difference');
                  }}
                  className="p-4 flex items-center justify-between cursor-pointer transition-all hover:bg-purple-500/10"
                >
                  <div>
                    <div className="font-extrabold text-sm" style={{ color: T.textPrimary }}>
                      {item.label}
                    </div>
                    <div className="text-xs font-medium" style={{ color: T.textSecondary }}>
                      {item.dayOfWeek}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-sm text-purple-400">
                      {item.dateFormatted}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.iso}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Leap Year & Gregorian Rules Info Card */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
                <Info className="w-4 h-4" /> Gregorian Calendar Math Facts
              </h3>
              <ul className="text-xs space-y-1.5 leading-relaxed" style={{ color: T.textSecondary }}>
                <li>• <strong>Leap Years:</strong> A year is a leap year if divisible by 4, except century years which must be divisible by 400. Next leap year is {isLeapYear(today.getFullYear()) ? today.getFullYear() : '2028'}.</li>
                <li>• <strong>Average Month Length:</strong> Exactly 30.4375 days across a full 4-year leap cycle.</li>
                <li>• <strong>Solar Year:</strong> 365.2422 mean solar days (approx 365 days, 5 hours, 48 minutes, 46 seconds).</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}