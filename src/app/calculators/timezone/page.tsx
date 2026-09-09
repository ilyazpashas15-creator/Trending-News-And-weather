'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Globe, ArrowLeftRight, Clock, Sun, Moon, Briefcase, Sparkles } from 'lucide-react';
import { getAllTimeZones } from '@/utils/timezones';

export default function CalculatorsTimezonePage() {
  const [isDark, setIsDark] = useState(true);
  const allTimezones = useMemo(() => getAllTimeZones(), []);

  const [fromTz, setFromTz] = useState('America/New_York');
  const [toTz, setToTz] = useState('Europe/London');
  const [timeStr, setTimeStr] = useState('14:00'); // 2:00 PM

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const handleSwap = () => {
    setFromTz(toTz);
    setToTz(fromTz);
  };

  type ConversionResult =
    | {
        success: true;
        toFormatted: string;
        diffHours: number;
        diffMins: number;
        isAhead: boolean;
        isOverlap: boolean;
        isFromWork: boolean;
        isToWork: boolean;
      }
    | { success: false };

  const conversion: ConversionResult = useMemo(() => {
    try {
      const now = new Date();
      const [h, m] = timeStr.split(':').map(Number);
      
      // Construct a date with this time today in fromTz
      const dateInFrom = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        h,
        m
      );

      const toTimeObj = new Date(dateInFrom.toLocaleString('en-US', { timeZone: toTz }));
      const fromTimeObj = new Date(dateInFrom.toLocaleString('en-US', { timeZone: fromTz }));
      const utcObj = new Date(dateInFrom.toLocaleString('en-US', { timeZone: 'UTC' }));

      const diffMin = Math.round((toTimeObj.getTime() - fromTimeObj.getTime()) / (1000 * 60));
      const diffHours = Math.floor(Math.abs(diffMin) / 60);
      const diffMins = Math.abs(diffMin) % 60;
      const isAhead = diffMin >= 0;

      // Format times
      const toFormatted = toTimeObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      const toHour24 = toTimeObj.getHours();
      const fromHour24 = fromTimeObj.getHours();

      // Check if working hours (09:00 - 18:00)
      const isFromWork = fromHour24 >= 9 && fromHour24 <= 18;
      const isToWork = toHour24 >= 9 && toHour24 <= 18;
      const isOverlap = isFromWork && isToWork;

      return {
        success: true,
        toFormatted,
        diffHours,
        diffMins,
        isAhead,
        isOverlap,
        isFromWork,
        isToWork,
      };
    } catch {
      return { success: false };
    }
  }, [fromTz, toTz, timeStr]);

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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-blue-500/10 text-blue-500 border-blue-500/20">
            <Globe className="w-3.5 h-3.5" /> Offset & Overlap Calculator
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Time Zone Calculator
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Calculate hourly offsets between regions and find common business working windows.
          </p>
        </div>

        {/* Converter Card */}
        <div
          className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl mb-8 relative overflow-hidden"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          {/* Time Picker */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
              Select Source Time
            </label>
            <input
              type="time"
              aria-label="Source Time"
              value={timeStr}
              onChange={(e) => setTimeStr(e.target.value)}
              className="w-full sm:w-48 px-4 py-3 rounded-xl border font-mono font-bold text-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 items-center mb-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                From Region
              </label>
              <select
                aria-label="From Region"
                value={fromTz}
                onChange={(e) => setFromTz(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              >
                {allTimezones.map((tz) => (
                  <option key={`from-${tz}`} value={tz}>{tz.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center pt-2 sm:pt-6">
              <button
                onClick={handleSwap}
                title="Swap timezones"
                className="p-3 rounded-xl border bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                To Region
              </label>
              <select
                aria-label="To Region"
                value={toTz}
                onChange={(e) => setToTz(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              >
                {allTimezones.map((tz) => (
                  <option key={`to-${tz}`} value={tz}>{tz.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Display */}
          {conversion.success && (
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                borderColor: T.cardBorder,
              }}
            >
              <div className="text-center mb-6">
                <div className="text-xs uppercase font-bold text-blue-500 tracking-wider mb-1">
                  Destination Equivalent Time
                </div>
                <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight" style={{ color: T.textPrimary }}>
                  {conversion.toFormatted}
                </div>
                <div className="text-xs font-semibold mt-2" style={{ color: T.textSecondary }}>
                  Difference: <strong>{conversion.isAhead ? '+' : '-'}{conversion.diffHours}h {(conversion.diffMins || 0) > 0 ? `${conversion.diffMins}m` : ''}</strong> {conversion.isAhead ? 'ahead' : 'behind'}
                </div>
              </div>

              {/* Business Overlap status */}
              <div
                className="p-4 rounded-xl border flex items-center justify-between text-xs font-semibold"
                style={{
                  backgroundColor: conversion.isOverlap ? 'rgba(16,185,129,0.1)' : (isDark ? 'rgba(30,41,59,0.6)' : '#ffffff'),
                  borderColor: conversion.isOverlap ? '#10b981' : T.cardBorder,
                  color: conversion.isOverlap ? '#10b981' : T.textSecondary,
                }}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>
                    {conversion.isOverlap
                      ? 'Optimal Meeting Time: Both locations are in standard business hours (9 AM - 6 PM).'
                      : 'Outside Standard Overlap: One or both locations are outside standard business hours.'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
