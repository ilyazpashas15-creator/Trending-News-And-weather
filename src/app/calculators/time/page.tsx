'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Plus, Minus, ArrowRight, Sparkles, Briefcase, Check, Copy } from 'lucide-react';

export default function CalculatorsTimePage() {
  const [isDark, setIsDark] = useState(true);
  const [mode, setMode] = useState<'difference' | 'adjust'>('difference');

  // Difference Mode
  const [timeStart, setTimeStart] = useState('09:00');
  const [timeEnd, setTimeEnd] = useState('17:30');

  // Adjust Mode
  const [baseTime, setBaseTime] = useState('12:00');
  const [addH, setAddH] = useState(2);
  const [addM, setAddM] = useState(30);
  const [operation, setOperation] = useState<'add' | 'sub'>('add');

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const toMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  const diffResult = React.useMemo(() => {
    const startM = toMinutes(timeStart);
    const endM = toMinutes(timeEnd);
    let diff = endM - startM;
    if (diff < 0) diff += 24 * 60; // Cross midnight

    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    const decimalHours = (diff / 60).toFixed(2);
    const totalSeconds = diff * 60;

    return { hours, mins, decimalHours, totalMinutes: diff, totalSeconds };
  }, [timeStart, timeEnd]);

  const adjustResult = React.useMemo(() => {
    const baseM = toMinutes(baseTime);
    const adjustM = (addH * 60 + addM) * (operation === 'add' ? 1 : -1);
    let finalM = (baseM + adjustM) % (24 * 60);
    if (finalM < 0) finalM += 24 * 60;

    const h = Math.floor(finalM / 60);
    const m = finalM % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    const ampmH = h % 12 || 12;
    const ampm = h >= 12 ? 'PM' : 'AM';

    return {
      time24: `${pad(h)}:${pad(m)}`,
      time12: `${pad(ampmH)}:${pad(m)} ${ampm}`,
    };
  }, [baseTime, addH, addM, operation]);

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(14,165,233,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(14,165,233,0.08), transparent)',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-sky-500/10 text-sky-500 border-sky-500/20">
            <Clock className="w-3.5 h-3.5" /> Timesheets & Hour Totals
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Time Calculator
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Calculate elapsed hours, minutes, and decimal times for work shifts, travel, or scheduling.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex p-1 rounded-xl border backdrop-blur-md"
            style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
          >
            <button
              onClick={() => setMode('difference')}
              className="px-5 py-2 rounded-lg text-xs font-bold transition-all"
              style={{
                backgroundColor: mode === 'difference' ? '#0ea5e9' : 'transparent',
                color: mode === 'difference' ? '#ffffff' : T.textSecondary,
              }}
            >
              Time Difference (Work Shift)
            </button>
            <button
              onClick={() => setMode('adjust')}
              className="px-5 py-2 rounded-lg text-xs font-bold transition-all"
              style={{
                backgroundColor: mode === 'adjust' ? '#0ea5e9' : 'transparent',
                color: mode === 'adjust' ? '#ffffff' : T.textSecondary,
              }}
            >
              Add / Subtract Hours
            </button>
          </div>
        </div>

        {/* Mode 1: Difference */}
        {mode === 'difference' && (
          <div
            className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl mb-8 relative overflow-hidden"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                  Start Time
                </label>
                <input
                  type="time"
                  aria-label="Start Time"
                  value={timeStart}
                  onChange={(e) => setTimeStart(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                  End Time
                </label>
                <input
                  type="time"
                  aria-label="End Time"
                  value={timeEnd}
                  onChange={(e) => setTimeEnd(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>
            </div>

            {/* Shift Breakdown Display */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                borderColor: T.cardBorder,
              }}
            >
              <div className="text-center mb-6">
                <div className="text-xs uppercase font-bold text-sky-500 tracking-wider mb-1">Total Duration</div>
                <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight" style={{ color: T.textPrimary }}>
                  {diffResult.hours}h {diffResult.mins}m
                </div>
                <p className="text-xs font-semibold mt-1" style={{ color: T.textSecondary }}>
                  Equivalent to <strong style={{ color: '#0ea5e9' }}>{diffResult.decimalHours} decimal hours</strong> (ideal for payroll)
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div
                  className="p-3.5 rounded-xl border text-center"
                  style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                >
                  <div className="text-2xl font-mono font-bold text-sky-500">{diffResult.decimalHours}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Decimal Hours</div>
                </div>

                <div
                  className="p-3.5 rounded-xl border text-center"
                  style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                >
                  <div className="text-2xl font-mono font-bold text-sky-500">{diffResult.totalMinutes}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Total Minutes</div>
                </div>

                <div
                  className="p-3.5 rounded-xl border text-center"
                  style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder }}
                >
                  <div className="text-2xl font-mono font-bold text-sky-500">{diffResult.totalSeconds.toLocaleString()}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: T.textSecondary }}>Total Seconds</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mode 2: Adjust Time */}
        {mode === 'adjust' && (
          <div
            className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl mb-8 relative overflow-hidden"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-500 to-emerald-500" />

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
                Initial Time
              </label>
              <input
                type="time"
                aria-label="Initial Time"
                value={baseTime}
                onChange={(e) => setBaseTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setOperation('add')}
                className="flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                style={{
                  backgroundColor: operation === 'add' ? (isDark ? 'rgba(14,165,233,0.2)' : 'rgba(14,165,233,0.15)') : (isDark ? 'rgba(30,41,59,0.5)' : '#ffffff'),
                  borderColor: operation === 'add' ? '#0ea5e9' : T.cardBorder,
                  color: operation === 'add' ? '#0ea5e9' : T.textSecondary,
                }}
              >
                <Plus className="w-4 h-4" /> Add Time
              </button>
              <button
                onClick={() => setOperation('sub')}
                className="flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                style={{
                  backgroundColor: operation === 'sub' ? (isDark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.15)') : (isDark ? 'rgba(30,41,59,0.5)' : '#ffffff'),
                  borderColor: operation === 'sub' ? '#ef4444' : T.cardBorder,
                  color: operation === 'sub' ? '#ef4444' : T.textSecondary,
                }}
              >
                <Minus className="w-4 h-4" /> Subtract Time
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: T.textSecondary }}>Hours</label>
                <input
                  type="number"
                  min="0"
                  value={addH}
                  onChange={(e) => setAddH(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center font-mono font-bold py-2.5 rounded-xl border text-base"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: T.textSecondary }}>Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={addM}
                  onChange={(e) => setAddM(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-full text-center font-mono font-bold py-2.5 rounded-xl border text-base"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>
            </div>

            <div
              className="p-6 rounded-2xl border text-center"
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                borderColor: T.cardBorder,
              }}
            >
              <div className="text-xs uppercase font-bold text-sky-500 tracking-wider mb-1">
                Resulting Time
              </div>
              <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight mb-1" style={{ color: T.textPrimary }}>
                {adjustResult.time12}
              </div>
              <div className="text-xs font-mono font-semibold" style={{ color: T.textSecondary }}>
                24-Hour Military: {adjustResult.time24}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}