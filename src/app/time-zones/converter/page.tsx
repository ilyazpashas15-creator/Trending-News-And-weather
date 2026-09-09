'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getAllTimeZones } from '@/utils/timezones';
import { ArrowLeftRight, Clock, Globe, Sparkles, Calendar, Check, Copy } from 'lucide-react';

const PRESETS = [
  { label: 'NY to London', from: 'America/New_York', to: 'Europe/London' },
  { label: 'London to Tokyo', from: 'Europe/London', to: 'Asia/Tokyo' },
  { label: 'SF to Sydney', from: 'America/Los_Angeles', to: 'Australia/Sydney' },
  { label: 'Dubai to Singapore', from: 'Asia/Dubai', to: 'Asia/Singapore' },
  { label: 'Paris to New York', from: 'Europe/Paris', to: 'America/New_York' },
  { label: 'UTC to Local', from: 'UTC', to: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York' }
];

export default function TimeZonesConverterPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const timeZones = useMemo(() => getAllTimeZones(), []);
  const [sourceTimezone, setSourceTimezone] = useState<string>('America/New_York');
  const [targetTimezone, setTargetTimezone] = useState<string>('Europe/London');
  const [sourceTime, setSourceTime] = useState<string>(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  });

  const handleSwap = () => {
    setSourceTimezone(targetTimezone);
    setTargetTimezone(sourceTimezone);
  };

  const handleSetNow = () => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    setSourceTime(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`);
  };

  type TimezoneConversion =
    | {
        success: true;
        fromTimeStr: string;
        fromDateStr: string;
        toTimeStr: string;
        toDateStr: string;
        diffHours: number;
        remMinutes: number;
        ahead: boolean;
        diffMinutes: number;
      }
    | {
        success: false;
        fromTimeStr?: undefined;
        fromDateStr?: undefined;
        toTimeStr?: undefined;
        toDateStr?: undefined;
        diffHours?: undefined;
        remMinutes?: undefined;
        ahead?: undefined;
        diffMinutes?: undefined;
      };

  // Safe formatting computation
  const conversion: TimezoneConversion = useMemo(() => {
    try {
      const sourceDate = new Date(sourceTime);
      if (isNaN(sourceDate.getTime())) throw new Error('Invalid date');

      const targetDateStr = sourceDate.toLocaleString('en-US', { timeZone: targetTimezone });
      const targetDate = new Date(targetDateStr);

      const fromTimeStr = sourceDate.toLocaleTimeString('en-US', {
        timeZone: sourceTimezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const fromDateStr = sourceDate.toLocaleDateString('en-US', {
        timeZone: sourceTimezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const toTimeStr = targetDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const toDateStr = targetDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      // Calculate time difference accurately
      const now = new Date();
      const sDate = new Date(now.toLocaleString('en-US', { timeZone: sourceTimezone }));
      const tDate = new Date(now.toLocaleString('en-US', { timeZone: targetTimezone }));
      const diffMinutes = Math.round((tDate.getTime() - sDate.getTime()) / (1000 * 60));
      const diffHours = Math.floor(Math.abs(diffMinutes) / 60);
      const remMinutes = Math.abs(diffMinutes) % 60;
      const ahead = diffMinutes >= 0;

      return {
        success: true,
        fromTimeStr,
        fromDateStr,
        toTimeStr,
        toDateStr,
        diffHours,
        remMinutes,
        ahead,
        diffMinutes
      };
    } catch {
      return { success: false };
    }
  }, [sourceTime, sourceTimezone, targetTimezone]);

  const copyConversion = () => {
    if (!conversion.success) return;
    const text = `${conversion.fromTimeStr} (${sourceTimezone.replace(/_/g, ' ')}) = ${conversion.toTimeStr} (${targetTimezone.replace(/_/g, ' ')}) on ${conversion.toDateStr}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(59,130,246,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(59,130,246,0.1), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.9)',
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

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-blue-500/10 text-blue-500 border-blue-500/20">
            <Globe className="w-3.5 h-3.5" /> Precise Time Conversion
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Time Zone Converter
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-xl mx-auto" style={{ color: T.textSecondary }}>
            Instantly translate times across any global location, account for daylight saving changes, and calculate exact offsets.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider mr-1" style={{ color: T.textSecondary }}>
            Popular:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setSourceTimezone(p.from);
                setTargetTimezone(p.to);
              }}
              className="text-xs px-3 py-1.5 rounded-lg border font-medium transition-all duration-200 hover:scale-105 active:scale-95"
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

        {/* Main Conversion Control Card */}
        <div
          className="rounded-2xl border p-6 sm:p-8 backdrop-blur-xl mb-8"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 sm:gap-6 items-center">
            {/* From Selector */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                <span>From Timezone</span>
                <span className="text-blue-500 font-normal normal-case">Source</span>
              </label>
              <select
                aria-label="From Timezone"
                value={sourceTimezone}
                onChange={(e) => setSourceTimezone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer"
                style={{
                  backgroundColor: T.inputBg,
                  borderColor: T.inputBorder,
                  color: T.textPrimary,
                }}
              >
                {timeZones.map((tz) => (
                  <option key={`src-${tz}`} value={tz}>
                    {tz.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center pt-2 sm:pt-6">
              <button
                onClick={handleSwap}
                title="Swap source and target timezones"
                className="p-3 rounded-xl border bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            {/* To Selector */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                <span>To Timezone</span>
                <span className="text-indigo-500 font-normal normal-case">Target</span>
              </label>
              <select
                aria-label="To Timezone"
                value={targetTimezone}
                onChange={(e) => setTargetTimezone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer"
                style={{
                  backgroundColor: T.inputBg,
                  borderColor: T.inputBorder,
                  color: T.textPrimary,
                }}
              >
                {timeZones.map((tz) => (
                  <option key={`tgt-${tz}`} value={tz}>
                    {tz.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time Input Row */}
          <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row items-center gap-4" style={{ borderColor: T.cardBorder }}>
            <div className="w-full sm:flex-1 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                Select Source Date & Time
              </label>
              <input
                type="datetime-local"
                aria-label="Source Date and Time"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={{
                  backgroundColor: T.inputBg,
                  borderColor: T.inputBorder,
                  color: T.textPrimary,
                }}
              />
            </div>
            <div className="flex gap-2 self-end sm:self-auto sm:mt-6 w-full sm:w-auto">
              <button
                onClick={handleSetNow}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border text-xs font-bold transition-all hover:border-blue-500/40"
                style={{
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                  borderColor: T.inputBorder,
                  color: T.textPrimary,
                }}
              >
                Set to Current Time
              </button>
            </div>
          </div>
        </div>

        {/* Results Card */}
        {conversion.success && (
          <div
            className="rounded-2xl border p-6 sm:p-8 backdrop-blur-xl overflow-hidden relative"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold flex items-center gap-2" style={{ color: T.textPrimary }}>
                <Clock className="w-4 h-4 text-blue-500" /> Converted Result
              </h2>
              <button
                onClick={copyConversion}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                  borderColor: T.cardBorder,
                  color: copied ? '#10b981' : T.textPrimary,
                }}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Result'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin Display */}
              <div
                className="p-5 rounded-xl border relative"
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(241, 245, 249, 0.8)',
                  borderColor: T.cardBorder,
                }}
              >
                <div className="text-xs uppercase font-bold text-blue-500 tracking-wider mb-1">Source Time</div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1" style={{ color: T.textPrimary }} suppressHydrationWarning>
                  {conversion.fromTimeStr}
                </div>
                <div className="text-xs sm:text-sm font-medium mb-2" style={{ color: T.textSecondary }} suppressHydrationWarning>
                  {conversion.fromDateStr}
                </div>
                <div className="text-xs font-semibold inline-block px-2.5 py-1 rounded-md bg-blue-500/15 text-blue-500">
                  {sourceTimezone.replace(/_/g, ' ')}
                </div>
              </div>

              {/* Destination Display */}
              <div
                className="p-5 rounded-xl border relative"
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(241, 245, 249, 0.8)',
                  borderColor: T.cardBorder,
                }}
              >
                <div className="text-xs uppercase font-bold text-indigo-500 tracking-wider mb-1">Target Time</div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 text-indigo-500" suppressHydrationWarning>
                  {conversion.toTimeStr}
                </div>
                <div className="text-xs sm:text-sm font-medium mb-2" style={{ color: T.textSecondary }} suppressHydrationWarning>
                  {conversion.toDateStr}
                </div>
                <div className="text-xs font-semibold inline-block px-2.5 py-1 rounded-md bg-indigo-500/15 text-indigo-500">
                  {targetTimezone.replace(/_/g, ' ')}
                </div>
              </div>
            </div>

            {/* Difference Banner */}
            <div
              className="mt-6 p-4 rounded-xl border text-center font-medium text-sm flex items-center justify-center gap-2"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(248, 250, 252, 0.9)',
                borderColor: T.cardBorder,
                color: T.textPrimary,
              }}
            >
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>
                <strong>{targetTimezone.replace(/_/g, ' ')}</strong> is{' '}
                <strong className={conversion.ahead ? 'text-emerald-500' : 'text-rose-500'}>
                  {conversion.ahead ? '+' : '-'}
                  {conversion.diffHours}h {(conversion.remMinutes || 0) > 0 ? `${conversion.remMinutes}m` : ''}
                </strong>{' '}
                {conversion.ahead ? 'ahead of' : 'behind'} {sourceTimezone.replace(/_/g, ' ')}.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}