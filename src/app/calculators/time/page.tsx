'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Clock,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeftRight,
  Sparkles,
  Briefcase,
  Check,
  Copy,
  RotateCcw,
  DollarSign,
  Globe,
  Coffee,
  Moon,
  Sun,
  SlidersHorizontal,
  Info,
  Calendar,
  ChevronRight,
  TrendingUp,
  FileText,
  HelpCircle,
  CheckCircle2,
  Code2,
  Printer,
  CalendarDays,
  ExternalLink,
} from 'lucide-react';

const SHIFT_PRESETS = [
  { label: '9 to 5 (8 hrs)', start: '09:00', end: '17:00', breakMins: 0 },
  { label: 'Standard 8h Shift', start: '08:30', end: '17:00', breakMins: 30 },
  { label: 'Morning Shift', start: '06:00', end: '14:30', breakMins: 30 },
  { label: 'Night Shift', start: '22:00', end: '06:30', breakMins: 30 },
  { label: 'Half Day', start: '09:00', end: '13:00', breakMins: 0 },
];

const BREAK_OPTIONS = [0, 15, 30, 45, 60];

const GLOBAL_HUBS = [
  { city: 'London', country: 'United Kingdom', offsetHours: 1, flag: '🇬🇧', tzName: 'BST (UTC+1)' },
  { city: 'New York', country: 'United States', offsetHours: -4, flag: '🇺🇸', tzName: 'EDT (UTC-4)' },
  { city: 'Dubai', country: 'United Arab Emirates', offsetHours: 4, flag: '🇦🇪', tzName: 'GST (UTC+4)' },
  { city: 'Mumbai', country: 'India', offsetHours: 5.5, flag: '🇮🇳', tzName: 'IST (UTC+5:30)' },
  { city: 'Tokyo', country: 'Japan', offsetHours: 9, flag: '🇯🇵', tzName: 'JST (UTC+9)' },
  { city: 'Sydney', country: 'Australia', offsetHours: 10, flag: '🇦🇺', tzName: 'AEST (UTC+10)' },
];

const PAYROLL_DECIMAL_TABLE = [
  { mins: 6, decimal: '0.10', fraction: '1/10 hr' },
  { mins: 12, decimal: '0.20', fraction: '1/5 hr' },
  { mins: 15, decimal: '0.25', fraction: '1/4 hr' },
  { mins: 18, decimal: '0.30', fraction: '3/10 hr' },
  { mins: 24, decimal: '0.40', fraction: '2/5 hr' },
  { mins: 30, decimal: '0.50', fraction: '1/2 hr' },
  { mins: 36, decimal: '0.60', fraction: '3/5 hr' },
  { mins: 42, decimal: '0.70', fraction: '7/10 hr' },
  { mins: 45, decimal: '0.75', fraction: '3/4 hr' },
  { mins: 48, decimal: '0.80', fraction: '4/5 hr' },
  { mins: 54, decimal: '0.90', fraction: '9/10 hr' },
  { mins: 60, decimal: '1.00', fraction: '1 full hr' },
];

interface TimesheetDay {
  day: string;
  enabled: boolean;
  start: string;
  end: string;
  breakMins: number;
}

const INITIAL_WEEKLY_DAYS: TimesheetDay[] = [
  { day: 'Monday', enabled: true, start: '09:00', end: '17:30', breakMins: 30 },
  { day: 'Tuesday', enabled: true, start: '09:00', end: '17:30', breakMins: 30 },
  { day: 'Wednesday', enabled: true, start: '09:00', end: '17:30', breakMins: 30 },
  { day: 'Thursday', enabled: true, start: '09:00', end: '17:30', breakMins: 30 },
  { day: 'Friday', enabled: true, start: '09:00', end: '17:00', breakMins: 30 },
  { day: 'Saturday', enabled: false, start: '10:00', end: '14:00', breakMins: 0 },
  { day: 'Sunday', enabled: false, start: '10:00', end: '14:00', breakMins: 0 },
];

function toMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function formatMinutesTo12h(totalMins: number): string {
  const normalized = ((totalMins % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const ampmH = h % 12 || 12;
  return `${ampmH}:${String(m).padStart(2, '0')} ${ampm}`;
}

export default function CalculatorsTimePage() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState<'duration' | 'shift' | 'timesheet' | 'adjust' | 'hubs' | 'payroll'>('duration');

  // Time format preference: 12h vs 24h
  const [is24Hour, setIs24Hour] = useState(false);

  // Tab 1: Hours Between Times
  const [durStartTime, setDurStartTime] = useState('09:00');
  const [durEndTime, setDurEndTime] = useState('17:45');
  const [includeDateFields, setIncludeDateFields] = useState(false);
  const [durStartDate, setDurStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [durEndDate, setDurEndDate] = useState(() => new Date().toISOString().slice(0, 10));

  // Tab 2: Work Shift & Payroll
  const [shiftStart, setShiftStart] = useState('08:30');
  const [shiftEnd, setShiftEnd] = useState('17:00');
  const [shiftBreakMins, setShiftBreakMins] = useState(30);
  const [enableWage, setEnableWage] = useState(true);
  const [hourlyWage, setHourlyWage] = useState('25.00');

  // Tab 3: Weekly Timesheet Logger
  const [weeklyDays, setWeeklyDays] = useState<TimesheetDay[]>(INITIAL_WEEKLY_DAYS);

  // Tab 4: Add / Subtract Time
  const [baseTime, setBaseTime] = useState('12:00');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [addDays, setAddDays] = useState(0);
  const [addHours, setAddHours] = useState(2);
  const [addMins, setAddMins] = useState(30);
  const [addSecs, setAddSecs] = useState(0);

  // Copy feedback toast
  const [copied, setCopied] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [calcPulse, setCalcPulse] = useState(false);

  // Real-time clock for top header & analog clock widget
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme observer
  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Day progress computation
  const dayProgressPct = useMemo(() => {
    if (!currentTime) return '0.0';
    const mins = currentTime.getHours() * 60 + currentTime.getMinutes();
    return ((mins / 1440) * 100).toFixed(1);
  }, [currentTime]);

  // Tab 1: Hours Between Times Calculation
  const durationResult = useMemo(() => {
    if (includeDateFields) {
      const startDateTime = new Date(`${durStartDate}T${durStartTime}:00`);
      const endDateTime = new Date(`${durEndDate}T${durEndTime}:00`);

      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) return null;

      let diffMs = endDateTime.getTime() - startDateTime.getTime();
      const isReverse = diffMs < 0;
      diffMs = Math.abs(diffMs);

      const totalMins = Math.floor(diffMs / 60000);
      const days = Math.floor(totalMins / 1440);
      const hours = Math.floor((totalMins % 1440) / 60);
      const mins = totalMins % 60;
      const decimalHours = Number((totalMins / 60).toFixed(2));
      const totalSeconds = totalMins * 60;

      return {
        isMultiDay: true,
        days,
        hours,
        mins,
        decimalHours,
        totalMins,
        totalSeconds,
        isReverse,
        badgeText: days > 0 ? `${days} Day${days === 1 ? '' : 's'} Span` : 'Same Day',
      };
    } else {
      const startM = toMinutes(durStartTime);
      const endM = toMinutes(durEndTime);
      const isOvernight = endM < startM;
      const totalMins = isOvernight ? 1440 - startM + endM : endM - startM;

      const hours = Math.floor(totalMins / 60);
      const mins = totalMins % 60;
      const decimalHours = Number((totalMins / 60).toFixed(2));
      const totalSeconds = totalMins * 60;

      // 24-hour visual bar calculations
      const startPct = ((startM / 1440) * 100).toFixed(1);
      const widthPct = (((totalMins) / 1440) * 100).toFixed(1);

      return {
        isMultiDay: false,
        days: 0,
        hours,
        mins,
        decimalHours,
        totalMins,
        totalSeconds,
        isOvernight,
        startPct,
        widthPct,
        badgeText: isOvernight ? 'Overnight (+1 Day)' : 'Same Day Shift',
      };
    }
  }, [durStartTime, durEndTime, includeDateFields, durStartDate, durEndDate]);

  // Tab 2: Work Shift & Payroll Calculation
  const shiftResult = useMemo(() => {
    const startM = toMinutes(shiftStart);
    const endM = toMinutes(shiftEnd);

    const isOvernight = endM < startM;
    const grossM = isOvernight ? 1440 - startM + endM : endM - startM;
    const netM = Math.max(0, grossM - shiftBreakMins);

    const hours = Math.floor(netM / 60);
    const mins = netM % 60;
    const decimalHours = Number((netM / 60).toFixed(2));
    const totalMinutes = netM;
    const totalSeconds = netM * 60;

    // Wage computation
    const wageNum = enableWage ? parseFloat(hourlyWage) || 0 : 0;
    const regularHours = Math.min(8, decimalHours);
    const overtimeHours = Math.max(0, decimalHours - 8);
    const regularPay = regularHours * wageNum;
    const overtimePay = overtimeHours * (wageNum * 1.5);
    const grossEarnings = regularPay + overtimePay;

    // Timeline positions on 24h clock (0 to 1440 mins)
    const startPct = ((startM / 1440) * 100).toFixed(1);
    const widthPct = (((grossM) / 1440) * 100).toFixed(1);

    return {
      grossM,
      netM,
      hours,
      mins,
      decimalHours,
      totalMinutes,
      totalSeconds,
      isOvernight,
      regularHours,
      overtimeHours,
      regularPay,
      overtimePay,
      grossEarnings,
      startPct,
      widthPct,
    };
  }, [shiftStart, shiftEnd, shiftBreakMins, hourlyWage, enableWage]);

  // Tab 3: Weekly Timesheet Calculations
  const weeklyResult = useMemo(() => {
    let totalNetMins = 0;
    let totalBreakMins = 0;
    let activeDaysCount = 0;

    const daysCalculated = weeklyDays.map((d) => {
      if (!d.enabled) return { ...d, netMins: 0, decimalHours: 0 };
      activeDaysCount++;
      const sM = toMinutes(d.start);
      const eM = toMinutes(d.end);
      const gross = eM < sM ? 1440 - sM + eM : eM - sM;
      const net = Math.max(0, gross - d.breakMins);
      totalNetMins += net;
      totalBreakMins += d.breakMins;
      return {
        ...d,
        netMins: net,
        decimalHours: Number((net / 60).toFixed(2)),
      };
    });

    const totalHours = Math.floor(totalNetMins / 60);
    const totalMinsRem = totalNetMins % 60;
    const totalDecimalHours = Number((totalNetMins / 60).toFixed(2));

    const wageNum = parseFloat(hourlyWage) || 0;
    const regularWeeklyHours = Math.min(40, totalDecimalHours);
    const overtimeWeeklyHours = Math.max(0, totalDecimalHours - 40);
    const regularPay = regularWeeklyHours * wageNum;
    const overtimePay = overtimeWeeklyHours * (wageNum * 1.5);
    const totalGrossPay = regularPay + overtimePay;

    return {
      daysCalculated,
      activeDaysCount,
      totalHours,
      totalMinsRem,
      totalDecimalHours,
      totalBreakMins,
      regularWeeklyHours,
      overtimeWeeklyHours,
      regularPay,
      overtimePay,
      totalGrossPay,
    };
  }, [weeklyDays, hourlyWage]);

  // Tab 4: Add / Subtract Math Calculation
  const adjustResult = useMemo(() => {
    const baseM = toMinutes(baseTime);
    const baseTotalSec = baseM * 60;
    const mult = operation === 'add' ? 1 : -1;

    const deltaSec = (addDays * 86400 + addHours * 3600 + addMins * 60 + addSecs) * mult;
    const finalSec = baseTotalSec + deltaSec;

    const dayShift = Math.floor(finalSec / 86400);
    const secIntoDay = ((finalSec % 86400) + 86400) % 86400;

    const resH = Math.floor(secIntoDay / 3600);
    const resM = Math.floor((secIntoDay % 3600) / 60);
    const resS = secIntoDay % 60;

    const pad = (n: number) => String(n).padStart(2, '0');
    const ampmH = resH % 12 || 12;
    const ampm = resH >= 12 ? 'PM' : 'AM';

    let relativeDay = 'Same Day';
    if (dayShift === 1) relativeDay = 'Tomorrow (+1 Day)';
    else if (dayShift > 1) relativeDay = `+${dayShift} Days Ahead`;
    else if (dayShift === -1) relativeDay = 'Yesterday (-1 Day)';
    else if (dayShift < -1) relativeDay = `${Math.abs(dayShift)} Days Prior`;

    const dayPct = ((secIntoDay / 86400) * 100).toFixed(1);

    return {
      time12: `${ampmH}:${pad(resM)}${addSecs > 0 ? `:${pad(resS)}` : ''} ${ampm}`,
      time24: `${pad(resH)}:${pad(resM)}${addSecs > 0 ? `:${pad(resS)}` : ''}`,
      relativeDay,
      dayShift,
      dayPct,
      resH,
      resM,
    };
  }, [baseTime, operation, addDays, addHours, addMins, addSecs]);

  // Tab 5: Global Business Hubs
  const hubTimes = useMemo(() => {
    const baseH = activeTab === 'adjust' ? adjustResult.resH : toMinutes(shiftEnd) / 60;
    const baseM = activeTab === 'adjust' ? adjustResult.resM : toMinutes(shiftEnd) % 60;
    const localOffset = -(new Date().getTimezoneOffset() / 60);

    return GLOBAL_HUBS.map((hub) => {
      const diffHours = hub.offsetHours - localOffset;
      const targetTotalMins = baseH * 60 + baseM + diffHours * 60;
      const normalizedMins = ((targetTotalMins % 1440) + 1440) % 1440;

      const h = Math.floor(normalizedMins / 60);
      const m = Math.round(normalizedMins % 60);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const ampmH = h % 12 || 12;

      return {
        ...hub,
        time12: `${ampmH}:${String(m).padStart(2, '0')} ${ampm}`,
        time24: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
        diffHours,
      };
    });
  }, [adjustResult, shiftEnd, activeTab]);

  // Copy helper
  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCalculatePulse = () => {
    setCalcPulse(true);
    setTimeout(() => setCalcPulse(false), 500);
  };

  // Color tokens
  const T = {
    bgPage: isDark
      ? 'linear-gradient(180deg, #070a14 0%, #0c1326 50%, #070914 100%)'
      : 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
    ambientOrbs: isDark
      ? 'radial-gradient(ellipse 700px 350px at 50% -10%, rgba(14,165,233,0.18), transparent), radial-gradient(ellipse 500px 300px at 80% 20%, rgba(99,102,241,0.14), transparent)'
      : 'radial-gradient(ellipse 700px 350px at 50% -10%, rgba(14,165,233,0.06), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.85)' : '#ffffff',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.95)',
    cardShadow: isDark ? '0 12px 36px -8px rgba(0,0,0,0.6)' : '0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0,0,0,0.04)',
    subCardBg: isDark ? 'rgba(10, 16, 31, 0.85)' : 'rgba(248, 250, 252, 0.95)',
    textPrimary: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#475569',
    inputBg: isDark ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(203, 213, 225, 0.95)',
  };

  // Clock Hand Angles for Analog Widget
  const clockAngles = useMemo(() => {
    if (!currentTime) return { hour: 0, minute: 0, second: 0 };
    const sec = currentTime.getSeconds();
    const min = currentTime.getMinutes() + sec / 60;
    const hour = (currentTime.getHours() % 12) + min / 60;
    return {
      second: sec * 6,
      minute: min * 6,
      hour: hour * 30,
    };
  }, [currentTime]);

  return (
    <div style={{ background: T.bgPage, minHeight: '100vh' }} className="relative transition-colors duration-300 font-sans pb-16">
      {/* Background ambient orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: T.ambientOrbs }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10">
        {/* Top Header & Ticker */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25 shadow-sm">
            <Clock className="w-3.5 h-3.5 animate-pulse text-sky-500" />
            <span>
              {currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Live Clock'}
            </span>
            <span className="opacity-40">•</span>
            <span className="font-mono">{dayProgressPct}% of 24h Day Elapsed</span>
          </div>

          <div className="flex items-center gap-2">
            {/* 12h vs 24h switch */}
            <div className="inline-flex rounded-xl border p-0.5" style={{ borderColor: T.cardBorder, backgroundColor: isDark ? 'rgba(15,23,42,0.8)' : '#ffffff' }}>
              <button
                onClick={() => setIs24Hour(false)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${!is24Hour ? 'bg-sky-600 text-white shadow-sm' : ''}`}
                style={{ color: !is24Hour ? '#ffffff' : T.textSecondary }}
              >
                12h AM/PM
              </button>
              <button
                onClick={() => setIs24Hour(true)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${is24Hour ? 'bg-sky-600 text-white shadow-sm' : ''}`}
                style={{ color: is24Hour ? '#ffffff' : T.textSecondary }}
              >
                24h Military
              </button>
            </div>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25">
            <Sparkles className="w-3.5 h-3.5" /> Time &amp; Shift Calculator Suite
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2" style={{ color: T.textPrimary }}>
            Time Calculator <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">&amp; Shift Hours</span>
          </h1>
          <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: T.textSecondary }}>
            Calculate exact hours between times, work shift durations, lunch break deductions, overtime pay, and weekly timesheets.
          </p>
        </div>

        {/* TimeAndDate-Style Sub-Navigation Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto py-1">
          <div
            className="inline-flex p-1.5 rounded-2xl border backdrop-blur-xl shadow-md"
            style={{ backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff', borderColor: T.cardBorder }}
          >
            {[
              { id: 'duration', label: 'Count Hours', icon: Clock },
              { id: 'shift', label: 'Work Shift & Pay', icon: Briefcase },
              { id: 'timesheet', label: 'Weekly Timesheet', icon: FileText },
              { id: 'adjust', label: 'Add / Subtract', icon: SlidersHorizontal },
              { id: 'hubs', label: 'Global Hubs', icon: Globe },
              { id: 'payroll', label: 'Payroll Matrix', icon: Info },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 scale-105'
                      : 'hover:bg-slate-100 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                  }`}
                  style={{ color: isActive ? '#ffffff' : T.textPrimary }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN 2-COLUMN PORTAL GRID (Matching & Exceeding TimeAndDate.com) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: MAIN WORKSTATION (70% WIDTH) */}
          <div className="lg:col-span-8 space-y-8">
            {/* TAB 1: COUNT HOURS BETWEEN TIMES */}
            {activeTab === 'duration' && (
              <div
                className="rounded-3xl border p-6 sm:p-8 relative overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: T.cardBg,
                  borderColor: T.cardBorder,
                  boxShadow: T.cardShadow,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Start Time &amp; End Time
                  </span>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold select-none" style={{ color: T.textPrimary }}>
                    <input
                      type="checkbox"
                      checked={includeDateFields}
                      onChange={(e) => setIncludeDateFields(e.target.checked)}
                      className="rounded border-slate-400 text-sky-600 focus:ring-sky-500 h-4 w-4"
                    />
                    <span>Include Date Fields (Multi-day span)</span>
                  </label>
                </div>

                {/* Modern Compact Time Range Cockpit */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3.5">
                  {/* START TIME CARD */}
                  <div
                    className="flex-1 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 hover:border-sky-500/50 shadow-sm relative group"
                    style={{
                      backgroundColor: T.subCardBg,
                      borderColor: T.cardBorder,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                        <span className="text-[11px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">
                          Start Time
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const now = new Date();
                          setDurStartTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
                        }}
                        className="text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all flex items-center gap-1 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400"
                        style={{
                          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                          borderColor: T.cardBorder,
                          color: T.textSecondary,
                        }}
                      >
                        <Clock className="w-3 h-3 text-sky-500" /> Now
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="time"
                        value={durStartTime}
                        onChange={(e) => setDurStartTime(e.target.value)}
                        className="w-full bg-transparent font-mono font-bold text-xl sm:text-2xl focus:outline-none cursor-pointer tracking-tight"
                        style={{ color: T.textPrimary }}
                      />
                      <div className="shrink-0 px-2.5 py-1 rounded-lg border font-mono font-black text-xs sm:text-sm bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/50 text-sky-600 dark:text-sky-400 shadow-sm whitespace-nowrap">
                        {formatMinutesTo12h(toMinutes(durStartTime))}
                      </div>
                    </div>

                    {includeDateFields && (
                      <div
                        className="mt-2.5 pt-2 border-t flex items-center justify-between text-xs"
                        style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                          Date:
                        </span>
                        <input
                          type="date"
                          value={durStartDate}
                          onChange={(e) => setDurStartDate(e.target.value)}
                          className="bg-transparent font-mono text-xs font-bold focus:outline-none cursor-pointer"
                          style={{ color: T.textPrimary }}
                        />
                      </div>
                    )}
                  </div>

                  {/* SWAP BUTTON */}
                  <div className="shrink-0 flex justify-center items-center my-0.5 sm:my-0">
                    <button
                      onClick={() => {
                        setIsSwapping(true);
                        setTimeout(() => {
                          const temp = durStartTime;
                          setDurStartTime(durEndTime);
                          setDurEndTime(temp);
                          setIsSwapping(false);
                        }, 150);
                      }}
                      title="Swap Start and End times"
                      className={`p-2.5 rounded-xl border transition-all duration-300 shadow-sm hover:scale-110 active:scale-95 ${
                        isSwapping ? 'rotate-180 bg-sky-600 text-white' : 'hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400'
                      }`}
                      style={{
                        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                        borderColor: T.cardBorder,
                        color: T.textSecondary,
                      }}
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* END TIME CARD */}
                  <div
                    className="flex-1 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 hover:border-blue-500/50 shadow-sm relative group"
                    style={{
                      backgroundColor: T.subCardBg,
                      borderColor: T.cardBorder,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                          End Time
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const now = new Date();
                          setDurEndTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
                        }}
                        className="text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all flex items-center gap-1 hover:border-blue-500 hover:text-blue-600 dark:hover:text-cyan-400"
                        style={{
                          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                          borderColor: T.cardBorder,
                          color: T.textSecondary,
                        }}
                      >
                        <Clock className="w-3 h-3 text-blue-500" /> Now
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="time"
                        value={durEndTime}
                        onChange={(e) => setDurEndTime(e.target.value)}
                        className="w-full bg-transparent font-mono font-bold text-2xl sm:text-3xl focus:outline-none cursor-pointer tracking-tight"
                        style={{ color: T.textPrimary }}
                      />
                      <div className="shrink-0 px-2.5 py-1 rounded-lg border font-mono font-black text-xs sm:text-sm bg-blue-50 dark:bg-cyan-950/40 border-blue-200 dark:border-cyan-800/50 text-blue-600 dark:text-cyan-400 shadow-sm whitespace-nowrap">
                        {formatMinutesTo12h(toMinutes(durEndTime))}
                      </div>
                    </div>

                    {includeDateFields && (
                      <div
                        className="mt-2.5 pt-2 border-t flex items-center justify-between text-xs"
                        style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                          Date:
                        </span>
                        <input
                          type="date"
                          value={durEndDate}
                          onChange={(e) => setDurEndDate(e.target.value)}
                          className="bg-transparent font-mono text-xs font-bold focus:outline-none cursor-pointer"
                          style={{ color: T.textPrimary }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Schedule Presets */}
                <div className="flex items-center gap-1.5 mb-5 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 text-slate-400 mr-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Shifts:
                  </span>
                  {[
                    { label: '9:00 AM – 5:00 PM', start: '09:00', end: '17:00' },
                    { label: '8:30 AM – 5:00 PM', start: '08:30', end: '17:00' },
                    { label: '8:00 AM – 4:30 PM', start: '08:00', end: '16:30' },
                    { label: '10:00 PM – 6:00 AM (Overnight)', start: '22:00', end: '06:00' },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setDurStartTime(preset.start);
                        setDurEndTime(preset.end);
                      }}
                      className="px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 active:scale-95"
                      style={{
                        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.4)' : '#f8fafc',
                        borderColor: T.cardBorder,
                        color: T.textSecondary,
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Prominent Solid Green Calculate Button (Signature TimeAndDate Style) */}
                <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleCalculatePulse}
                    className={`w-full sm:w-auto px-7 py-3 rounded-xl font-black text-sm sm:text-base text-white shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 bg-emerald-600 hover:bg-emerald-500 ${
                      calcPulse ? 'ring-4 ring-emerald-400/50 scale-105' : ''
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" /> Calculate Duration
                  </button>

                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500" /> Real-time instant recalculation
                  </div>
                </div>

                {/* 24-Hour Graphical Timeline Bar */}
                {durationResult && !durationResult.isMultiDay && (
                  <div className="p-4 rounded-2xl border mb-6" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span style={{ color: T.textSecondary }}>12:00 AM (00:00)</span>
                      <span className="text-sky-600 dark:text-sky-400 font-extrabold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 24-Hour Day Timeline Span
                      </span>
                      <span style={{ color: T.textSecondary }}>11:59 PM (24:00)</span>
                    </div>

                    <div className="relative w-full h-3.5 bg-slate-200 dark:bg-slate-700/60 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 shadow-sm"
                        style={{
                          marginLeft: `${durationResult.startPct}%`,
                          width: `${Math.min(100 - parseFloat(durationResult.startPct || '0'), parseFloat(durationResult.widthPct || '0'))}%`,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono font-bold mt-1.5" style={{ color: T.textSecondary }}>
                      <span>Start: {formatMinutesTo12h(toMinutes(durStartTime))}</span>
                      <span className="text-sky-600 dark:text-sky-400">{durationResult.hours}h {durationResult.mins}m Duration</span>
                      <span>End: {formatMinutesTo12h(toMinutes(durEndTime))}</span>
                    </div>
                  </div>
                )}

                {/* Hero Result Board */}
                {durationResult && (
                  <div
                    className="p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden"
                    style={{
                      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : '#ffffff',
                      borderColor: T.cardBorder,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
                      <Clock className="w-3.5 h-3.5" /> Total Duration Elapsed
                    </span>

                    <div className="text-4xl sm:text-6xl font-mono font-black tracking-tight mb-2 text-slate-900 dark:text-white">
                      {durationResult.days > 0 && `${durationResult.days}d `}
                      {durationResult.hours} Hours {durationResult.mins} Mins
                    </div>

                    <div className="text-base sm:text-lg font-bold mb-4" style={{ color: T.textPrimary }}>
                      Equivalent to <strong className="text-sky-600 dark:text-sky-400 font-mono text-2xl font-black">{durationResult.decimalHours}</strong> Decimal Hours
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-left">
                      <div className="p-3.5 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-sky-600 dark:text-sky-400">Decimal Hours</div>
                        <div className="text-xl font-mono font-black mt-1" style={{ color: T.textPrimary }}>{durationResult.decimalHours}h</div>
                        <div className="text-[11px] mt-0.5" style={{ color: T.textSecondary }}>Payroll standard</div>
                      </div>

                      <div className="p-3.5 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">Total Minutes</div>
                        <div className="text-xl font-mono font-black mt-1" style={{ color: T.textPrimary }}>{durationResult.totalMins.toLocaleString()}m</div>
                        <div className="text-[11px] mt-0.5" style={{ color: T.textSecondary }}>Elapsed minutes</div>
                      </div>

                      <div className="p-3.5 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">Total Seconds</div>
                        <div className="text-xl font-mono font-black mt-1" style={{ color: T.textPrimary }}>{durationResult.totalSeconds.toLocaleString()}s</div>
                        <div className="text-[11px] mt-0.5" style={{ color: T.textSecondary }}>Exact seconds</div>
                      </div>

                      <div className="p-3.5 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">Day Percentage</div>
                        <div className="text-xl font-mono font-black mt-1" style={{ color: T.textPrimary }}>{((durationResult.totalMins / 1440) * 100).toFixed(1)}%</div>
                        <div className="text-[11px] mt-0.5" style={{ color: T.textSecondary }}>Of 24h day</div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => copyText(`Duration from ${durStartTime} to ${durEndTime}: ${durationResult.hours}h ${durationResult.mins}m (${durationResult.decimalHours} decimal hours).`)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-xl border bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/25 transition-all"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? 'Copied to Clipboard!' : 'Copy Decimal Hours'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: WORK SHIFT & PAYROLL */}
            {activeTab === 'shift' && (
              <div
                className="rounded-3xl border p-6 sm:p-8 relative overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: T.cardBg,
                  borderColor: T.cardBorder,
                  boxShadow: T.cardShadow,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" /> Shift Duration &amp; Payroll Calculator
                  </span>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {SHIFT_PRESETS.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => {
                          setShiftStart(p.start);
                          setShiftEnd(p.end);
                          setShiftBreakMins(p.breakMins);
                        }}
                        className="text-xs px-2.5 py-1 rounded-lg border font-bold transition-all hover:border-sky-500"
                        style={{
                          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                          borderColor: T.cardBorder,
                          color: T.textPrimary,
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
                  <div
                    className="flex-1 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 hover:border-sky-500/50 shadow-sm"
                    style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                        <span className="text-[11px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">
                          Shift Start Time
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const now = new Date();
                          setShiftStart(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
                        }}
                        className="text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all flex items-center gap-1 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400"
                        style={{
                          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                          borderColor: T.cardBorder,
                          color: T.textSecondary,
                        }}
                      >
                        <Clock className="w-3 h-3 text-sky-500" /> Now
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="time"
                        value={shiftStart}
                        onChange={(e) => setShiftStart(e.target.value)}
                        className="w-full bg-transparent font-mono font-bold text-xl sm:text-2xl focus:outline-none cursor-pointer tracking-tight"
                        style={{ color: T.textPrimary }}
                      />
                      <div className="shrink-0 px-2.5 py-1 rounded-lg border font-mono font-black text-xs sm:text-sm bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/50 text-sky-600 dark:text-sky-400 shadow-sm whitespace-nowrap">
                        {formatMinutesTo12h(toMinutes(shiftStart))}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 hidden sm:flex justify-center items-center text-slate-400">
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  <div
                    className="flex-1 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 hover:border-blue-500/50 shadow-sm"
                    style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                          Shift End Time
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const now = new Date();
                          setShiftEnd(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
                        }}
                        className="text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all flex items-center gap-1 hover:border-blue-500 hover:text-blue-600 dark:hover:text-cyan-400"
                        style={{
                          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                          borderColor: T.cardBorder,
                          color: T.textSecondary,
                        }}
                      >
                        <Clock className="w-3 h-3 text-blue-500" /> Now
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="time"
                        value={shiftEnd}
                        onChange={(e) => setShiftEnd(e.target.value)}
                        className="w-full bg-transparent font-mono font-bold text-xl sm:text-2xl focus:outline-none cursor-pointer tracking-tight"
                        style={{ color: T.textPrimary }}
                      />
                      <div className="shrink-0 px-2.5 py-1 rounded-lg border font-mono font-black text-xs sm:text-sm bg-blue-50 dark:bg-cyan-950/40 border-blue-200 dark:border-cyan-800/50 text-blue-600 dark:text-cyan-400 shadow-sm whitespace-nowrap">
                        {formatMinutesTo12h(toMinutes(shiftEnd))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Breaks & Wage Adjustments */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: T.textSecondary }}>
                      <Coffee className="w-4 h-4 text-amber-500" /> Unpaid Break Deduction:
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {BREAK_OPTIONS.map((mins) => (
                        <button
                          key={mins}
                          onClick={() => setShiftBreakMins(mins)}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-mono font-bold transition-all ${
                            shiftBreakMins === mins
                              ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                              : 'hover:border-sky-500/50'
                          }`}
                          style={{
                            backgroundColor: shiftBreakMins === mins ? undefined : isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff',
                            borderColor: shiftBreakMins === mins ? '#0284c7' : T.cardBorder,
                            color: shiftBreakMins === mins ? '#ffffff' : T.textPrimary,
                          }}
                        >
                          {mins === 0 ? 'None' : `${mins}m`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: T.textSecondary }}>
                        <DollarSign className="w-4 h-4 text-emerald-500" /> Hourly Wage Rate:
                      </label>
                      <label className="flex items-center gap-1 text-xs cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={enableWage}
                          onChange={(e) => setEnableWage(e.target.checked)}
                          className="rounded text-emerald-600 h-3.5 w-3.5"
                        />
                        <span className="font-semibold text-slate-500">Calculate Pay</span>
                      </label>
                    </div>

                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        disabled={!enableWage}
                        value={hourlyWage}
                        onChange={(e) => setHourlyWage(e.target.value)}
                        placeholder="25.00"
                        className="w-full pl-8 pr-4 py-1.5 text-sm font-mono font-bold rounded-xl border focus:outline-none disabled:opacity-50"
                        style={{ backgroundColor: T.inputBg, borderColor: T.cardBorder, color: T.textPrimary }}
                      />
                    </div>
                  </div>
                </div>

                {/* Calculate Action */}
                <div className="mb-6">
                  <button
                    onClick={handleCalculatePulse}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-base text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Calculate Shift Hours &amp; Pay
                  </button>
                </div>

                {/* Shift Results */}
                <div className="p-6 rounded-3xl border text-center" style={{ backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : '#ffffff', borderColor: T.cardBorder }}>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-slate-900 dark:text-white mb-2">
                    {shiftResult.hours}h {shiftResult.mins}m
                  </div>
                  <div className="text-base font-bold mb-4" style={{ color: T.textPrimary }}>
                    Net Work Duration: <span className="text-sky-600 dark:text-sky-400 font-mono text-xl">{shiftResult.decimalHours}h</span>
                    {enableWage && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono ml-2">
                        • Gross Pay: ${shiftResult.grossEarnings.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                    <div className="p-3.5 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                      <div className="text-[10px] uppercase font-bold text-sky-600">Gross Time</div>
                      <div className="text-lg font-mono font-black mt-1" style={{ color: T.textPrimary }}>
                        {Math.floor(shiftResult.grossM / 60)}h {shiftResult.grossM % 60}m
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                      <div className="text-[10px] uppercase font-bold text-amber-600">Break Taken</div>
                      <div className="text-lg font-mono font-black mt-1" style={{ color: T.textPrimary }}>
                        {shiftBreakMins} min
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                      <div className="text-[10px] uppercase font-bold text-emerald-600">Regular Pay</div>
                      <div className="text-lg font-mono font-black mt-1 text-emerald-600">
                        ${shiftResult.regularPay.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                      <div className="text-[10px] uppercase font-bold text-purple-600">Overtime (1.5x)</div>
                      <div className="text-lg font-mono font-black mt-1 text-purple-600">
                        ${shiftResult.overtimePay.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: WEEKLY TIMESHEET LOGGER (BEATING TIMEANDDATE) */}
            {activeTab === 'timesheet' && (
              <div
                className="rounded-3xl border p-6 sm:p-8 relative overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: T.cardBg,
                  borderColor: T.cardBorder,
                  boxShadow: T.cardShadow,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
                  <div>
                    <h2 className="text-base font-black flex items-center gap-2" style={{ color: T.textPrimary }}>
                      <FileText className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                      7-Day Interactive Weekly Timesheet
                    </h2>
                    <p className="text-xs font-medium" style={{ color: T.textSecondary }}>
                      Log daily shifts to compute total weekly hours, overtime past 40h, and gross paycheck.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const summary = weeklyResult.daysCalculated
                        .filter((d) => d.enabled)
                        .map((d) => `${d.day}: ${d.start} - ${d.end} (${d.breakMins}m break) = ${d.decimalHours} hrs`)
                        .join('\n');
                      copyText(`WEEKLY TIMESHEET REPORT:\n${summary}\n\nTotal Hours: ${weeklyResult.totalDecimalHours}h\nTotal Pay: $${weeklyResult.totalGrossPay.toFixed(2)}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/25 transition-all self-start sm:self-auto"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Timesheet Copied!' : 'Export Timesheet (.TXT)'}</span>
                  </button>
                </div>

                <div className="rounded-2xl border overflow-hidden mb-6 divide-y" style={{ borderColor: T.cardBorder, backgroundColor: T.subCardBg }}>
                  {weeklyDays.map((d, index) => {
                    const dayCalc = weeklyResult.daysCalculated[index];
                    return (
                      <div
                        key={d.day}
                        className={`p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                          d.enabled ? '' : 'opacity-40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-[120px]">
                          <input
                            type="checkbox"
                            checked={d.enabled}
                            onChange={(e) => {
                              const updated = [...weeklyDays];
                              updated[index].enabled = e.target.checked;
                              setWeeklyDays(updated);
                            }}
                            className="rounded text-sky-600 h-4 w-4"
                          />
                          <span className="font-extrabold text-sm" style={{ color: T.textPrimary }}>
                            {d.day}
                          </span>
                        </div>

                        {d.enabled ? (
                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-slate-400">In:</span>
                              <input
                                type="time"
                                value={d.start}
                                onChange={(e) => {
                                  const updated = [...weeklyDays];
                                  updated[index].start = e.target.value;
                                  setWeeklyDays(updated);
                                }}
                                className="px-2 py-1 font-mono font-bold rounded-lg border"
                                style={{ backgroundColor: T.inputBg, borderColor: T.cardBorder, color: T.textPrimary }}
                              />
                            </div>

                            <div className="flex items-center gap-1">
                              <span className="font-bold text-slate-400">Out:</span>
                              <input
                                type="time"
                                value={d.end}
                                onChange={(e) => {
                                  const updated = [...weeklyDays];
                                  updated[index].end = e.target.value;
                                  setWeeklyDays(updated);
                                }}
                                className="px-2 py-1 font-mono font-bold rounded-lg border"
                                style={{ backgroundColor: T.inputBg, borderColor: T.cardBorder, color: T.textPrimary }}
                              />
                            </div>

                            <div className="flex items-center gap-1">
                              <span className="font-bold text-slate-400">Break:</span>
                              <select
                                value={d.breakMins}
                                onChange={(e) => {
                                  const updated = [...weeklyDays];
                                  updated[index].breakMins = Number(e.target.value);
                                  setWeeklyDays(updated);
                                }}
                                className="px-2 py-1 font-mono font-bold rounded-lg border"
                                style={{ backgroundColor: T.inputBg, borderColor: T.cardBorder, color: T.textPrimary }}
                              >
                                <option value={0}>0m</option>
                                <option value={15}>15m</option>
                                <option value={30}>30m</option>
                                <option value={45}>45m</option>
                                <option value={60}>60m</option>
                              </select>
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs italic text-slate-400">Scheduled Day Off</div>
                        )}

                        <div className="font-mono text-sm font-black text-sky-600 dark:text-sky-400">
                          {d.enabled ? `${dayCalc.decimalHours.toFixed(2)} hrs` : '0.00 hrs'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-6 rounded-2xl border" style={{ backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : '#ffffff', borderColor: T.cardBorder }}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Work Days</div>
                      <div className="text-2xl font-mono font-black text-sky-600 dark:text-sky-400 mt-1">{weeklyResult.activeDaysCount} Days</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Net Weekly Hours</div>
                      <div className="text-2xl font-mono font-black text-blue-600 dark:text-cyan-400 mt-1">{weeklyResult.totalDecimalHours}h</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Regular / Overtime</div>
                      <div className="text-2xl font-mono font-black text-indigo-600 dark:text-indigo-400 mt-1">{weeklyResult.regularWeeklyHours}h / {weeklyResult.overtimeWeeklyHours}h</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Weekly Paycheck</div>
                      <div className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1">${weeklyResult.totalGrossPay.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: ADD / SUBTRACT */}
            {activeTab === 'adjust' && (
              <div
                className="rounded-3xl border p-6 sm:p-8 relative overflow-hidden"
                style={{
                  backgroundColor: T.cardBg,
                  borderColor: T.cardBorder,
                  boxShadow: T.cardShadow,
                }}
              >
                <div
                  className="mb-5 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 hover:border-sky-500/50 shadow-sm"
                  style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-sky-500 ring-4 ring-sky-500/20" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        Starting Base Time
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const now = new Date();
                        setBaseTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
                      }}
                      className="text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all flex items-center gap-1 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400"
                      style={{
                        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                        borderColor: T.cardBorder,
                        color: T.textSecondary,
                      }}
                    >
                      <Clock className="w-3 h-3 text-sky-500" /> Now
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="time"
                      value={baseTime}
                      onChange={(e) => setBaseTime(e.target.value)}
                      className="w-full bg-transparent font-mono font-bold text-xl sm:text-2xl focus:outline-none cursor-pointer tracking-tight"
                      style={{ color: T.textPrimary }}
                    />
                    <div className="shrink-0 px-2.5 py-1 rounded-lg border font-mono font-black text-xs sm:text-sm bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/50 text-sky-600 dark:text-sky-400 shadow-sm whitespace-nowrap">
                      {formatMinutesTo12h(toMinutes(baseTime))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setOperation('add')}
                    className={`flex-1 py-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 ${
                      operation === 'add' ? 'bg-sky-600 text-white shadow-md' : ''
                    }`}
                    style={{
                      borderColor: operation === 'add' ? '#0284c7' : T.cardBorder,
                      color: operation === 'add' ? '#ffffff' : T.textSecondary,
                    }}
                  >
                    <Plus className="w-4 h-4" /> Add Time (Future)
                  </button>

                  <button
                    onClick={() => setOperation('subtract')}
                    className={`flex-1 py-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 ${
                      operation === 'subtract' ? 'bg-rose-600 text-white shadow-md' : ''
                    }`}
                    style={{
                      borderColor: operation === 'subtract' ? '#e11d48' : T.cardBorder,
                      color: operation === 'subtract' ? '#ffffff' : T.textSecondary,
                    }}
                  >
                    <Minus className="w-4 h-4" /> Subtract Time (Past)
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-slate-400">Days</label>
                    <input
                      type="number"
                      min="0"
                      value={addDays}
                      onChange={(e) => setAddDays(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full text-center font-mono font-black text-2xl bg-transparent focus:outline-none"
                      style={{ color: T.textPrimary }}
                    />
                  </div>

                  <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-slate-400">Hours</label>
                    <input
                      type="number"
                      min="0"
                      value={addHours}
                      onChange={(e) => setAddHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full text-center font-mono font-black text-2xl bg-transparent focus:outline-none"
                      style={{ color: T.textPrimary }}
                    />
                  </div>

                  <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-slate-400">Minutes</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={addMins}
                      onChange={(e) => setAddMins(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                      className="w-full text-center font-mono font-black text-2xl bg-transparent focus:outline-none"
                      style={{ color: T.textPrimary }}
                    />
                  </div>

                  <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-slate-400">Seconds</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={addSecs}
                      onChange={(e) => setAddSecs(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                      className="w-full text-center font-mono font-black text-2xl bg-transparent focus:outline-none"
                      style={{ color: T.textPrimary }}
                    />
                  </div>
                </div>

                <div className="p-6 rounded-3xl border text-center" style={{ backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : '#ffffff', borderColor: T.cardBorder }}>
                  <div className="text-4xl sm:text-6xl font-mono font-black text-slate-900 dark:text-white mb-2">
                    {is24Hour ? adjustResult.time24 : adjustResult.time12}
                  </div>
                  <div className="text-xs font-bold font-mono px-3 py-1 rounded-full inline-block bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    {adjustResult.relativeDay} • {adjustResult.dayPct}% of Day
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: GLOBAL HUBS */}
            {activeTab === 'hubs' && (
              <div
                className="rounded-3xl border p-6 sm:p-8 relative overflow-hidden"
                style={{
                  backgroundColor: T.cardBg,
                  borderColor: T.cardBorder,
                  boxShadow: T.cardShadow,
                }}
              >
                <div className="mb-6">
                  <h2 className="text-lg font-black flex items-center gap-2" style={{ color: T.textPrimary }}>
                    <Globe className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Global Financial Hubs Time Comparison
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hubTimes.map((h) => (
                    <div key={h.city} className="p-4 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{h.flag}</span>
                        <div>
                          <div className="font-extrabold text-sm" style={{ color: T.textPrimary }}>{h.city}</div>
                          <div className="text-xs text-slate-400">{h.tzName}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-mono font-black text-sky-600 dark:text-sky-400">
                          {is24Hour ? h.time24 : h.time12}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {h.diffHours >= 0 ? `+${h.diffHours}` : h.diffHours}h offset
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: PAYROLL MATRIX */}
            {activeTab === 'payroll' && (
              <div
                className="rounded-3xl border p-6 sm:p-8 relative overflow-hidden"
                style={{
                  backgroundColor: T.cardBg,
                  borderColor: T.cardBorder,
                  boxShadow: T.cardShadow,
                }}
              >
                <div className="mb-6">
                  <h2 className="text-lg font-black flex items-center gap-2" style={{ color: T.textPrimary }}>
                    <SlidersHorizontal className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Minutes to Decimal Hours Matrix (FLSA Standards)
                  </h2>
                </div>

                <div className="rounded-2xl border overflow-hidden divide-y mb-6" style={{ borderColor: T.cardBorder, backgroundColor: T.subCardBg }}>
                  <div className="p-3 grid grid-cols-3 font-bold text-xs uppercase tracking-wider text-sky-600 border-b">
                    <span>Minutes</span>
                    <span>Decimal Hours</span>
                    <span className="text-right">Fraction</span>
                  </div>
                  {PAYROLL_DECIMAL_TABLE.map((item) => (
                    <div key={item.mins} className="p-3 grid grid-cols-3 text-xs font-mono font-semibold">
                      <span>{item.mins} mins</span>
                      <span className="font-bold text-sky-600 dark:text-sky-400">{item.decimal}h</span>
                      <span className="text-right text-slate-400">{item.fraction}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TimeAndDate-Style Help & Real-World Use Section */}
            <div className="p-6 rounded-3xl border" style={{ backgroundColor: T.cardBg, borderColor: T.cardBorder, boxShadow: T.cardShadow }}>
              <h3 className="text-sm font-black text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" /> Help and Real-World Usage Guides
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs" style={{ color: T.textSecondary }}>
                <div className="p-3.5 rounded-xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                  <strong className="block text-slate-900 dark:text-white font-bold mb-1">
                    • Calculating Payroll Hours
                  </strong>
                  Convert standard hours and minutes to decimal time (e.g., 7 hours 30 mins = 7.50 hrs) by dividing minutes by 60. This is the official format required for paystubs.
                </div>

                <div className="p-3.5 rounded-xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                  <strong className="block text-slate-900 dark:text-white font-bold mb-1">
                    • Overnight &amp; 3rd Shift Tracking
                  </strong>
                  For shifts crossing midnight (e.g. 10:00 PM to 6:30 AM), the calculator automatically detects the overnight transition and adds 24 hours to give the exact net duration.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE UTILITY SIDEBAR (30% WIDTH) */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Live Interactive SVG Analog Clock Widget */}
            <div
              className="p-6 rounded-3xl border text-center relative overflow-hidden"
              style={{
                backgroundColor: T.cardBg,
                borderColor: T.cardBorder,
                boxShadow: T.cardShadow,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Precision Analog Clock
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 font-bold border border-sky-500/20">
                  Live Ticker
                </span>
              </div>

              {/* Analog Clock Face */}
              <div className="relative w-44 h-44 mx-auto my-2">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  {/* Clock Bezel */}
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill={isDark ? '#0b1329' : '#f8fafc'}
                    stroke={isDark ? 'rgba(255,255,255,0.15)' : '#cbd5e1'}
                    strokeWidth="3"
                  />

                  {/* Hour markers */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <line
                      key={deg}
                      x1="50"
                      y1="9"
                      x2="50"
                      y2={deg % 90 === 0 ? '14' : '11'}
                      stroke={isDark ? '#94a3b8' : '#64748b'}
                      strokeWidth={deg % 90 === 0 ? '2' : '1'}
                      transform={`rotate(${deg} 50 50)`}
                    />
                  ))}

                  {/* Hour hand */}
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="28"
                    stroke={isDark ? '#ffffff' : '#0f172a'}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    transform={`rotate(${clockAngles.hour} 50 50)`}
                  />

                  {/* Minute hand */}
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="18"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    transform={`rotate(${clockAngles.minute} 50 50)`}
                  />

                  {/* Second hand */}
                  <line
                    x1="50"
                    y1="56"
                    x2="50"
                    y2="14"
                    stroke="#ef4444"
                    strokeWidth="1"
                    strokeLinecap="round"
                    transform={`rotate(${clockAngles.second} 50 50)`}
                  />

                  {/* Center pin */}
                  <circle cx="50" cy="50" r="3" fill="#ef4444" />
                </svg>
              </div>

              <div className="text-xl font-mono font-black mt-3" style={{ color: T.textPrimary }}>
                {currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '...'}
              </div>
              <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>
                {currentTime ? currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' }) : ''}
              </div>
            </div>

            {/* 2. Feature Card: PDF Timesheet (Matching TimeAndDate's PDF Card) */}
            <div
              className="p-5 rounded-3xl border transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: T.cardBg,
                borderColor: T.cardBorder,
                boxShadow: T.cardShadow,
              }}
            >
              <div className="flex items-start gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center text-xl flex-shrink-0">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black" style={{ color: T.textPrimary }}>
                    Timesheet with Logo (PDF)
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: T.textSecondary }}>
                    Add company branding to our printable shift reports and employee timesheets.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveTab('timesheet');
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20"
              >
                <span>Open Timesheet Generator</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3. Feature Card: Developer API (Matching TimeAndDate API Card) */}
            <div
              className="p-5 rounded-3xl border transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: T.cardBg,
                borderColor: T.cardBorder,
                boxShadow: T.cardShadow,
              }}
            >
              <div className="flex items-start gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20 flex items-center justify-center text-xl flex-shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black" style={{ color: T.textPrimary }}>
                    Time Calculator API
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: T.textSecondary }}>
                    Find precise shift durations, payroll decimal hours, and time zone offsets via REST API.
                  </p>
                </div>
              </div>

              <button
                onClick={() => copyText('curl https://myweatherapp.com/api/time/duration?start=09:00&end=17:30')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold text-white bg-sky-600 hover:bg-sky-500 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/20"
              >
                <Copy className="w-4 h-4" />
                <span>Copy API Request</span>
              </button>
            </div>

            {/* 4. Related Time Calculators Directory */}
            <div
              className="p-5 rounded-3xl border"
              style={{
                backgroundColor: T.cardBg,
                borderColor: T.cardBorder,
                boxShadow: T.cardShadow,
              }}
            >
              <h4 className="text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: T.textPrimary }}>
                <CalendarDays className="w-4 h-4 text-sky-500" /> Related Time Tools
              </h4>

              <div className="space-y-2 text-xs">
                {[
                  { label: 'Date Duration Calculator', href: '/calculators/date' },
                  { label: 'Currency & Forex Converter', href: '/calculators/currency' },
                  { label: 'World Clock & Time Zones', href: '/world-clock' },
                  { label: 'Digital Stopwatch & Timer', href: '/timers/stopwatch' },
                  { label: 'Online Alarm Clock', href: '/timers/alarm' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="p-2.5 rounded-xl border flex items-center justify-between font-bold transition-all hover:bg-sky-500/10 hover:border-sky-500/50"
                    style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder, color: T.textPrimary }}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}