'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, Hourglass, Plus, Sparkles, Volume2 } from 'lucide-react';

const PRESETS = [
  { label: '1 Min', seconds: 60 },
  { label: '3 Min (Tea)', seconds: 180 },
  { label: '5 Min (Quick)', seconds: 300 },
  { label: '10 Min', seconds: 600 },
  { label: '15 Min (Break)', seconds: 900 },
  { label: '25 Min (Focus)', seconds: 1500 },
  { label: '45 Min', seconds: 2700 },
  { label: '60 Min', seconds: 3600 },
];

export default function TimersCountdownPage() {
  const [isDark, setIsDark] = useState(true);
  const [totalSeconds, setTotalSeconds] = useState(300); // default 5m
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Custom inputs
  const [inputH, setInputH] = useState(0);
  const [inputM, setInputM] = useState(5);
  const [inputS, setInputS] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.12 + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + idx * 0.12);
        osc.stop(audioCtx.currentTime + idx * 0.12 + 0.35);
      });
    } catch {}
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setIsFinished(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, soundEnabled]);

  const handleStart = () => {
    if (remainingSeconds === 0) {
      setRemainingSeconds(totalSeconds > 0 ? totalSeconds : 60);
    }
    setIsFinished(false);
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setRemainingSeconds(totalSeconds);
  };

  const handleApplyCustom = () => {
    const s = inputH * 3600 + inputM * 60 + inputS;
    if (s <= 0) return;
    setIsRunning(false);
    setIsFinished(false);
    setTotalSeconds(s);
    setRemainingSeconds(s);
  };

  const setPreset = (seconds: number) => {
    setIsRunning(false);
    setIsFinished(false);
    setTotalSeconds(seconds);
    setRemainingSeconds(seconds);
    setInputH(Math.floor(seconds / 3600));
    setInputM(Math.floor((seconds % 3600) / 60));
    setInputS(seconds % 60);
  };

  const addTime = (secs: number) => {
    setRemainingSeconds((prev) => prev + secs);
    setTotalSeconds((prev) => prev + secs);
  };

  const formatParts = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return { h: pad(h), m: pad(m), s: pad(s), showH: h > 0 };
  };

  const parts = formatParts(remainingSeconds);
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(99,102,241,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(99,102,241,0.08), transparent)',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
            <Hourglass className="w-3.5 h-3.5" /> Radial & Digital Countdown
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Countdown Timer
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Stay focused with custom duration timers, instant presets, and chime completion alerts.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => setPreset(p.seconds)}
              className="text-xs px-3 py-1.5 rounded-lg border font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: totalSeconds === p.seconds && !isFinished ? (isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)') : (isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff'),
                borderColor: totalSeconds === p.seconds ? '#6366f1' : T.cardBorder,
                color: totalSeconds === p.seconds ? '#6366f1' : T.textPrimary,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Main Countdown Display Card */}
        <div
          className="rounded-3xl border p-6 sm:p-10 backdrop-blur-xl mb-8 text-center relative overflow-hidden flex flex-col items-center"
          style={{
            backgroundColor: T.cardBg,
            borderColor: isFinished ? '#ef4444' : T.cardBorder,
            boxShadow: isFinished ? '0 0 30px rgba(239, 68, 68, 0.25)' : T.cardShadow,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Radial Progress Ring */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center my-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
              <circle
                cx="120"
                cy="120"
                r={radius}
                stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="120"
                cy="120"
                r={radius}
                stroke={isFinished ? '#ef4444' : '#6366f1'}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out, stroke 0.3s ease' }}
              />
            </svg>

            {/* Centered Digital Counter */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div
                className="font-mono font-black tracking-tight"
                style={{
                  fontSize: parts.showH ? '2rem' : '2.75rem',
                  color: isFinished ? '#ef4444' : T.textPrimary,
                }}
              >
                {parts.showH && <span>{parts.h}:</span>}
                <span>{parts.m}</span>:<span>{parts.s}</span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: T.textSecondary }}>
                {isFinished ? 'Time is Up!' : isRunning ? 'Remaining' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Quick Boost Action Chips */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => addTime(60)}
              className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition-all hover:scale-105"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                borderColor: T.cardBorder,
                color: T.textPrimary,
              }}
            >
              <Plus className="w-3 h-3" /> 1 Min
            </button>
            <button
              onClick={() => addTime(300)}
              className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition-all hover:scale-105"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                borderColor: T.cardBorder,
                color: T.textPrimary,
              }}
            >
              <Plus className="w-3 h-3" /> 5 Min
            </button>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition-all hover:scale-105"
              style={{
                backgroundColor: soundEnabled ? (isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)') : (isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff'),
                borderColor: soundEnabled ? '#6366f1' : T.cardBorder,
                color: soundEnabled ? '#6366f1' : T.textSecondary,
              }}
            >
              <Volume2 className="w-3 h-3" /> {soundEnabled ? 'Chime ON' : 'Muted'}
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Play className="w-4 h-4 fill-white" />
                {remainingSeconds === totalSeconds ? 'Start' : 'Resume'}
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Pause className="w-4 h-4 fill-white" />
                Pause
              </button>
            )}

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm border transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                borderColor: T.cardBorder,
                color: T.textPrimary,
              }}
            >
              <RotateCcw className="w-4 h-4 text-rose-500" />
              Reset
            </button>
          </div>
        </div>

        {/* Custom Duration Setter Card */}
        <div
          className="rounded-2xl border p-6 backdrop-blur-xl"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <h2 className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: T.textSecondary }}>
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Set Custom Duration
          </h2>
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-4">
            <div>
              <label className="block text-[11px] font-semibold text-center mb-1" style={{ color: T.textSecondary }}>Hours</label>
              <input
                type="number"
                min="0"
                max="23"
                value={inputH}
                onChange={(e) => setInputH(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-center font-mono font-bold py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-center mb-1" style={{ color: T.textSecondary }}>Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={inputM}
                onChange={(e) => setInputM(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="w-full text-center font-mono font-bold py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-center mb-1" style={{ color: T.textSecondary }}>Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                value={inputS}
                onChange={(e) => setInputS(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="w-full text-center font-mono font-bold py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handleApplyCustom}
              className="px-6 py-2 rounded-xl text-xs font-bold border transition-all hover:border-indigo-500 hover:text-indigo-500"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                borderColor: T.cardBorder,
                color: T.textPrimary,
              }}
            >
              Apply Custom Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
