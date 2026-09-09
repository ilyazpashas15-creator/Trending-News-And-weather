'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Dumbbell, Zap, Flame, Volume2, Sparkles, RefreshCw } from 'lucide-react';

interface Preset {
  name: string;
  work: number; // in seconds
  rest: number;
  rounds: number;
}

const INTERVAL_PRESETS: Preset[] = [
  { name: 'Tabata', work: 20, rest: 10, rounds: 8 },
  { name: 'HIIT Express', work: 45, rest: 15, rounds: 10 },
  { name: 'Pomodoro', work: 1500, rest: 300, rounds: 4 },
  { name: 'Boxing Round', work: 180, rest: 60, rounds: 5 },
  { name: 'Quick 30/30', work: 30, rest: 30, rounds: 6 },
];

export default function TimersIntervalPage() {
  const [isDark, setIsDark] = useState(true);
  
  // Settings
  const [workSecs, setWorkSecs] = useState(20);
  const [restSecs, setRestSecs] = useState(10);
  const [totalRounds, setTotalRounds] = useState(8);

  // Runtime State
  const [currentRound, setCurrentRound] = useState(1);
  const [isWork, setIsWork] = useState(true);
  const [remainingSecs, setRemainingSecs] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const playTone = (freq: number, count = 1) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      for (let i = 0; i < count; i++) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = freq;
        const start = audioCtx.currentTime + i * 0.15;
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.12);
      }
    } catch {}
  };

  useEffect(() => {
    if (isRunning && !isFinished) {
      timerRef.current = setInterval(() => {
        setRemainingSecs((prev) => {
          if (prev <= 1) {
            // Phase switch
            if (isWork) {
              if (currentRound >= totalRounds) {
                // Completed all rounds
                setIsRunning(false);
                setIsFinished(true);
                playTone(880, 3); // Finish fanfare
                return 0;
              } else {
                // Switch to Rest
                setIsWork(false);
                playTone(440, 2); // Rest beep
                return restSecs;
              }
            } else {
              // Switch to Work
              setIsWork(true);
              setCurrentRound((r) => r + 1);
              playTone(700, 1); // Work beep
              return workSecs;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isFinished, isWork, currentRound, totalRounds, workSecs, restSecs, soundEnabled]);

  const handleStart = () => {
    if (isFinished || (remainingSecs === 0 && !isRunning)) {
      setIsFinished(false);
      setCurrentRound(1);
      setIsWork(true);
      setRemainingSecs(workSecs);
    }
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setCurrentRound(1);
    setIsWork(true);
    setRemainingSecs(workSecs);
  };

  const applyPreset = (p: Preset) => {
    setIsRunning(false);
    setIsFinished(false);
    setWorkSecs(p.work);
    setRestSecs(p.rest);
    setTotalRounds(p.rounds);
    setCurrentRound(1);
    setIsWork(true);
    setRemainingSecs(p.work);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(m)}:${pad(s)}`;
  };

  // Phase color accents
  const phaseColor = isFinished ? '#06b6d4' : isWork ? '#10b981' : '#f59e0b';
  const phaseLabel = isFinished ? 'Workout Complete! 🎉' : isWork ? 'WORK INTERVAL' : 'REST INTERVAL';

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(16,185,129,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(16,185,129,0.08), transparent)',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            <Flame className="w-3.5 h-3.5" /> HIIT & Tabata Workouts
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Interval Timer
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            High-intensity interval training, Tabata circuits, and customizable work/rest rounds.
          </p>
        </div>

        {/* Presets Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {INTERVAL_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: workSecs === p.work && restSecs === p.rest ? (isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)') : (isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff'),
                borderColor: workSecs === p.work && restSecs === p.rest ? '#10b981' : T.cardBorder,
                color: workSecs === p.work && restSecs === p.rest ? '#10b981' : T.textPrimary,
              }}
            >
              {p.name} ({p.work}s/{p.rest}s x{p.rounds})
            </button>
          ))}
        </div>

        {/* Main Display Card */}
        <div
          className="rounded-3xl border p-6 sm:p-10 backdrop-blur-xl mb-8 text-center relative overflow-hidden flex flex-col items-center"
          style={{
            backgroundColor: T.cardBg,
            borderColor: phaseColor,
            boxShadow: `0 0 30px ${phaseColor}25`,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: phaseColor }} />

          {/* Round Indicator Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full border"
              style={{
                backgroundColor: `${phaseColor}20`,
                borderColor: phaseColor,
                color: phaseColor,
              }}
            >
              {phaseLabel}
            </span>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full border"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#f1f5f9',
                borderColor: T.cardBorder,
                color: T.textPrimary,
              }}
            >
              Round {currentRound} of {totalRounds}
            </span>
          </div>

          {/* Digital Timer Face */}
          <div
            className="font-mono font-black text-6xl sm:text-8xl tracking-tight my-4"
            style={{ color: phaseColor }}
          >
            {formatTime(remainingSecs)}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border mb-6 transition-all"
            style={{
              backgroundColor: soundEnabled ? (isDark ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.15)') : (isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff'),
              borderColor: soundEnabled ? '#10b981' : T.cardBorder,
              color: soundEnabled ? '#10b981' : T.textSecondary,
            }}
          >
            <Volume2 className="w-3.5 h-3.5" /> {soundEnabled ? 'Audio Chimes Enabled' : 'Sound Muted'}
          </button>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Play className="w-4 h-4 fill-white" />
                {isFinished ? 'Restart' : remainingSecs === workSecs && currentRound === 1 ? 'Start Workout' : 'Resume'}
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

        {/* Custom Interval Settings Card */}
        <div
          className="rounded-2xl border p-6 backdrop-blur-xl"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <h2 className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: T.textSecondary }}>
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Custom Interval Setup
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: T.textSecondary }}>
                Work Duration (Secs)
              </label>
              <input
                type="number"
                min="5"
                max="3600"
                value={workSecs}
                onChange={(e) => {
                  const val = Math.max(5, parseInt(e.target.value) || 5);
                  setWorkSecs(val);
                  if (!isRunning && isWork) setRemainingSecs(val);
                }}
                className="w-full text-center font-mono font-bold py-2.5 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: T.textSecondary }}>
                Rest Duration (Secs)
              </label>
              <input
                type="number"
                min="0"
                max="3600"
                value={restSecs}
                onChange={(e) => {
                  const val = Math.max(0, parseInt(e.target.value) || 0);
                  setRestSecs(val);
                  if (!isRunning && !isWork) setRemainingSecs(val);
                }}
                className="w-full text-center font-mono font-bold py-2.5 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: T.textSecondary }}>
                Total Rounds
              </label>
              <input
                type="number"
                min="1"
                max="99"
                value={totalRounds}
                onChange={(e) => setTotalRounds(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
                className="w-full text-center font-mono font-bold py-2.5 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
