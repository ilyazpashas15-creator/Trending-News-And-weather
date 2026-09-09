'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, Flag, Timer, Trophy, ArrowDown, ArrowUp, Copy, Check } from 'lucide-react';

interface LapRecord {
  lapNumber: number;
  lapTimeMs: number;
  totalTimeMs: number;
}

export default function TimersStopwatchPage() {
  const [isDark, setIsDark] = useState(true);
  const [time, setTime] = useState(0); // in ms
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<LapRecord[]>([]);
  const [copied, setCopied] = useState(false);
  
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const formatParts = (milliseconds: number) => {
    const totalSecs = Math.floor(milliseconds / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    const pad = (n: number) => String(n).padStart(2, '0');
    return {
      hours: pad(hrs),
      minutes: pad(mins),
      seconds: pad(secs),
      ms: pad(ms),
    };
  };

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      const tick = () => {
        const now = performance.now();
        setTime(accumulatedRef.current + (now - startTimeRef.current));
        animFrameRef.current = requestAnimationFrame(tick);
      };
      animFrameRef.current = requestAnimationFrame(tick);
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      accumulatedRef.current = time;
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    accumulatedRef.current = 0;
    setLaps([]);
  };

  const handleLap = () => {
    const lastLapTotal = laps.length > 0 ? laps[0].totalTimeMs : 0;
    const currentLapTime = time - lastLapTotal;
    const newLap: LapRecord = {
      lapNumber: laps.length + 1,
      lapTimeMs: currentLapTime,
      totalTimeMs: time,
    };
    setLaps((prev) => [newLap, ...prev]);
  };

  const lapStats = useMemo(() => {
    if (laps.length < 2) return { fastestId: null, slowestId: null };
    let minTime = Infinity;
    let maxTime = -Infinity;
    let minNum = -1;
    let maxNum = -1;
    laps.forEach((l) => {
      if (l.lapTimeMs < minTime) {
        minTime = l.lapTimeMs;
        minNum = l.lapNumber;
      }
      if (l.lapTimeMs > maxTime) {
        maxTime = l.lapTimeMs;
        maxNum = l.lapNumber;
      }
    });
    return { fastestId: minNum, slowestId: maxNum };
  }, [laps]);

  const copyLaps = () => {
    if (laps.length === 0) return;
    const text = laps
      .map(
        (l) =>
          `Lap ${l.lapNumber}: ${formatDisplay(l.lapTimeMs)} (Total: ${formatDisplay(l.totalTimeMs)})`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDisplay = (ms: number) => {
    const p = formatParts(ms);
    return `${p.hours !== '00' ? `${p.hours}:` : ''}${p.minutes}:${p.seconds}.${p.ms}`;
  };

  const currentParts = formatParts(time);

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(16,185,129,0.15), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(16,185,129,0.08), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    textPrimary: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    displayBg: isDark ? '#020617' : '#f1f5f9',
    displayBorder: isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.4)',
  };

  return (
    <div style={{ background: T.bgPage, minHeight: '100vh' }} className="relative transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: T.ambientOrbs }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            <Timer className="w-3.5 h-3.5" /> Millisecond Precision
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Stopwatch
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Measure elapsed time, record split laps, and analyze best & worst split performances.
          </p>
        </div>

        {/* Stopwatch Main Display Card */}
        <div
          className="rounded-3xl border p-6 sm:p-10 backdrop-blur-xl mb-8 text-center relative overflow-hidden"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

          {/* Large Digital Clock Face */}
          <div
            className="inline-flex items-baseline justify-center font-mono font-black tracking-tight px-6 py-6 sm:py-8 rounded-2xl border shadow-inner my-2 w-full max-w-lg"
            style={{
              backgroundColor: T.displayBg,
              borderColor: T.displayBorder,
              color: isDark ? '#34d399' : '#059669',
            }}
          >
            {currentParts.hours !== '00' && (
              <>
                <span className="text-4xl sm:text-6xl">{currentParts.hours}</span>
                <span className="text-2xl sm:text-4xl opacity-50 px-1">:</span>
              </>
            )}
            <span className="text-4xl sm:text-6xl">{currentParts.minutes}</span>
            <span className="text-2xl sm:text-4xl opacity-50 px-1">:</span>
            <span className="text-4xl sm:text-6xl">{currentParts.seconds}</span>
            <span className="text-2xl sm:text-4xl opacity-50 px-1">.</span>
            <span className="text-2xl sm:text-4xl opacity-80">{currentParts.ms}</span>
          </div>

          {/* Quick Info Bar */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs font-semibold" style={{ color: T.textSecondary }}>
            <span>Laps Recorded: <strong style={{ color: T.textPrimary }}>{laps.length}</strong></span>
            {laps.length > 0 && (
              <span>Last Split: <strong style={{ color: T.textPrimary }}>{formatDisplay(laps[0].lapTimeMs)}</strong></span>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Play className="w-4 h-4 fill-white" />
                {time === 0 ? 'Start' : 'Resume'}
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
              onClick={handleLap}
              disabled={!isRunning}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm border transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none hover:scale-105 active:scale-95"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                borderColor: T.cardBorder,
                color: T.textPrimary,
              }}
            >
              <Flag className="w-4 h-4 text-emerald-500" />
              Lap Split
            </button>

            <button
              onClick={handleReset}
              disabled={time === 0 && !isRunning}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm border transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none hover:scale-105 active:scale-95"
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

        {/* Laps List Table */}
        {laps.length > 0 && (
          <div
            className="rounded-2xl border p-6 backdrop-blur-xl overflow-hidden"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: T.textPrimary }}>
                  Recorded Laps ({laps.length})
                </h2>
              </div>
              <button
                onClick={copyLaps}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                  borderColor: T.cardBorder,
                  color: copied ? '#10b981' : T.textPrimary,
                }}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy All'}
              </button>
            </div>

            <div className="divide-y max-h-72 overflow-y-auto pr-1" style={{ borderColor: T.cardBorder }}>
              {laps.map((lap) => {
                const isFastest = lap.lapNumber === lapStats.fastestId;
                const isSlowest = lap.lapNumber === lapStats.slowestId;

                return (
                  <div
                    key={lap.lapNumber}
                    className="py-3 px-3 flex items-center justify-between text-sm transition-colors rounded-lg hover:bg-slate-500/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 font-mono text-xs font-bold" style={{ color: T.textSecondary }}>
                        #{lap.lapNumber}
                      </span>
                      {isFastest && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500">
                          <ArrowDown className="w-2.5 h-2.5" /> Best Lap
                        </span>
                      )}
                      {isSlowest && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-500">
                          <ArrowUp className="w-2.5 h-2.5" /> Slowest
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-6 font-mono font-semibold">
                      <span className={isFastest ? 'text-emerald-500' : isSlowest ? 'text-rose-500' : ''} style={{ color: !isFastest && !isSlowest ? T.textPrimary : undefined }}>
                        +{formatDisplay(lap.lapTimeMs)}
                      </span>
                      <span className="text-xs" style={{ color: T.textSecondary }}>
                        {formatDisplay(lap.totalTimeMs)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
