'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Moon,
  Sparkles,
  Orbit,
  Calendar,
  Compass,
  Info,
  ChevronRight,
  Clock,
  ArrowRight,
  Eye,
} from 'lucide-react';
import astronomyService from '@/services/astronomyService';

interface LunarPhaseItem {
  id: string;
  name: string;
  illumination: number; // 0 to 100
  phaseAngle: string;
  emoji: string;
  description: string;
  shadingType: 'new' | 'wax_cresc' | 'first_q' | 'wax_gibb' | 'full' | 'wan_gibb' | 'third_q' | 'wan_cresc';
}

const LUNAR_PHASES: LunarPhaseItem[] = [
  { id: 'new', name: 'New Moon', illumination: 0, phaseAngle: '0°', emoji: '🌑', description: 'Moon between Earth and Sun; disc completely dark.', shadingType: 'new' },
  { id: 'wax_cresc', name: 'Waxing Crescent', illumination: 22, phaseAngle: '45°', emoji: '🌒', description: 'Silver sliver visible in western evening sky after dusk.', shadingType: 'wax_cresc' },
  { id: 'first_q', name: 'First Quarter', illumination: 50, phaseAngle: '90°', emoji: '🌓', description: 'Right half illuminated; high overhead at sunset.', shadingType: 'first_q' },
  { id: 'wax_gibb', name: 'Waxing Gibbous', illumination: 88, phaseAngle: '135°', emoji: '🌔', description: 'More than half lit, expanding toward full illumination.', shadingType: 'wax_gibb' },
  { id: 'full', name: 'Full Moon', illumination: 100, phaseAngle: '180°', emoji: '🌕', description: 'Opposite Sun; rises at sunset and shines all night.', shadingType: 'full' },
  { id: 'wan_gibb', name: 'Waning Gibbous', illumination: 84, phaseAngle: '225°', emoji: '🌖', description: 'Shrinking illumination; rises later in evening.', shadingType: 'wan_gibb' },
  { id: 'third_q', name: 'Third Quarter', illumination: 50, phaseAngle: '270°', emoji: '🌗', description: 'Left half illuminated; rises near midnight.', shadingType: 'third_q' },
  { id: 'wan_cresc', name: 'Waning Crescent', illumination: 18, phaseAngle: '315°', emoji: '🌘', description: 'Delicate sliver in predawn eastern twilight.', shadingType: 'wan_cresc' },
];

const ALMANAC_2026 = [
  { month: 'Jan', name: 'Wolf Moon', date: 'Jan 03, 2026', type: 'Micro Full Moon', dist: '405,100 km' },
  { month: 'Feb', name: 'Snow Moon', date: 'Feb 01, 2026', type: 'Standard Full', dist: '394,200 km' },
  { month: 'Mar', name: 'Worm Blood Moon', date: 'Mar 03, 2026', type: 'Total Eclipse', dist: '381,600 km' },
  { month: 'Apr', name: 'Pink Moon', date: 'Apr 02, 2026', type: 'Standard Full', dist: '372,400 km' },
  { month: 'May', name: 'Flower Moon', date: 'May 01, 2026', type: 'Supermoon', dist: '362,100 km' },
  { month: 'Jun', name: 'Strawberry Moon', date: 'May 31, 2026', type: 'Supermoon', dist: '358,800 km' },
  { month: 'Jul', name: 'Buck Moon', date: 'Jun 29, 2026', type: 'Supermoon', dist: '361,500 km' },
  { month: 'Aug', name: 'Sturgeon Moon', date: 'Jul 29, 2026', type: 'Partial Eclipse', dist: '370,200 km' },
  { month: 'Sep', name: 'Harvest Moon', date: 'Aug 28, 2026', type: 'Standard Full', dist: '382,900 km' },
  { month: 'Oct', name: 'Hunter\'s Moon', date: 'Sep 26, 2026', type: 'Standard Full', dist: '395,400 km' },
  { month: 'Nov', name: 'Beaver Moon', date: 'Oct 26, 2026', type: 'Micro Full Moon', dist: '404,800 km' },
  { month: 'Dec', name: 'Cold Moon', date: 'Nov 24, 2026', type: 'Standard Full', dist: '398,100 km' },
];

export default function SunMoonSpaceMoonPhasesPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<LunarPhaseItem>(LUNAR_PHASES[3]); // Waxing Gibbous default
  const [moonTelemetry, setMoonTelemetry] = useState({
    phaseName: 'Waxing Gibbous',
    illumination: 88,
    ageDays: 11.2,
    distanceKm: 384400,
    nextFullDate: 'Sep 26, 2026',
    daysToFull: 14,
  });

  useEffect(() => {
    setMounted(true);
    const load = async () => {
      try {
        const data = await astronomyService.getCurrentMoonPhase();
        if (data) {
          const rawIllum = Number(data.illumination);
          const illumPct = rawIllum > 1 ? Math.min(100, Math.round(rawIllum)) : Math.min(100, Math.round(rawIllum * 100));

          let fullMoonStr = 'Sep 26, 2026';
          if (data.next_full_moon) {
            try {
              const d = new Date(data.next_full_moon);
              if (!isNaN(d.getTime())) {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                fullMoonStr = `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
              }
            } catch {}
          }

          setMoonTelemetry((prev) => ({
            ...prev,
            phaseName: data.phase || prev.phaseName,
            illumination: isNaN(illumPct) ? prev.illumination : illumPct,
            ageDays: typeof data.days_since_new === 'number' ? Number(data.days_since_new.toFixed(1)) : prev.ageDays,
            nextFullDate: fullMoonStr,
          }));
        }
      } catch {}
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Subtle Lunar Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl opacity-60 dark:opacity-75" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-2">
              <Moon className="w-3.5 h-3.5" />
              Lunar Ephemeris & Illumination Lab
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Moon Phases & Lunar Cycle
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Real-time lunar terminator physics, surface illumination percentage, synodic cycle, and full moon almanac.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-3 rounded-2xl shadow-sm self-start sm:self-auto">
            <span className="text-2xl">🌔</span>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
                Current State
              </div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white" suppressHydrationWarning>
                {moonTelemetry.phaseName} ({moonTelemetry.illumination}%)
              </div>
            </div>
          </div>
        </div>

        {/* 5-Column Lunar Telemetry Deck */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Active Phase
            </span>
            <div>
              <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 truncate" suppressHydrationWarning>
                {moonTelemetry.phaseName}
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Waxing towards full
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Illumination
            </span>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white" suppressHydrationWarning>
                {moonTelemetry.illumination}%
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Reflected sunlight
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Moon Age
            </span>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white" suppressHydrationWarning>
                {moonTelemetry.ageDays} Days
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Of 29.53d synodic cycle
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Earth Distance
            </span>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white" suppressHydrationWarning>
                {(moonTelemetry.distanceKm / 1000).toFixed(1)}k km
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Mean orbital distance
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Next Full Moon
            </span>
            <div>
              <div className="text-base font-extrabold text-amber-600 dark:text-amber-400 truncate" suppressHydrationWarning>
                {moonTelemetry.nextFullDate}
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Harvest Moon peak
              </div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Realistic Moon Renderer */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-5 sm:p-7 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left: Shaded Moon Orb Graphics */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-2 sm:p-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-2 border-slate-200/60 dark:border-white/20 bg-slate-900">
                {/* Moon Texture Base */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle at 35% 35%, #e2e8f0 0%, #cbd5e1 45%, #94a3b8 70%, #475569 100%)',
                  }}
                />

                {/* Simulated Maria (Dark basalt plains) */}
                <div className="absolute w-16 h-12 rounded-full bg-slate-600/30 blur-[3px] top-10 left-12" />
                <div className="absolute w-20 h-16 rounded-full bg-slate-600/25 blur-[4px] top-16 left-20" />
                <div className="absolute w-14 h-14 rounded-full bg-slate-600/30 blur-[3px] bottom-12 left-14" />
                <div className="absolute w-8 h-8 rounded-full bg-slate-700/30 blur-[2px] top-28 left-28" />

                {/* Tycho Crater Ray System (Bright spot with radial rays) */}
                <div className="absolute w-4 h-4 rounded-full bg-white/70 bottom-8 left-24 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

                {/* Shading Terminator Mask based on selected phase */}
                {selectedPhase.id === 'new' && (
                  <div className="absolute inset-0 rounded-full bg-slate-950/90" />
                )}
                {selectedPhase.id === 'wax_cresc' && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-slate-950/80 to-slate-950/95" style={{ transform: 'rotate(15deg)' }} />
                )}
                {selectedPhase.id === 'first_q' && (
                  <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-slate-950/85" />
                )}
                {selectedPhase.id === 'wax_gibb' && (
                  <div className="absolute top-0 bottom-0 left-0 w-[18%] bg-slate-950/75 blur-[2px]" />
                )}
                {selectedPhase.id === 'full' && null}
                {selectedPhase.id === 'wan_gibb' && (
                  <div className="absolute top-0 bottom-0 right-0 w-[18%] bg-slate-950/75 blur-[2px]" />
                )}
                {selectedPhase.id === 'third_q' && (
                  <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-slate-950/85" />
                )}
                {selectedPhase.id === 'wan_cresc' && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-l from-transparent via-slate-950/80 to-slate-950/95" style={{ transform: 'rotate(-15deg)' }} />
                )}

                {/* Ambient Sphere Rim Lighting */}
                <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_25px_rgba(0,0,0,0.8),inset_5px_5px_15px_rgba(255,255,255,0.4)] pointer-events-none" />
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Phase Angle: {selectedPhase.phaseAngle}
                </span>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {selectedPhase.name}
                </div>
              </div>
            </div>

            {/* Right: Selected Phase Technical Breakdown */}
            <div className="md:col-span-7 w-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{selectedPhase.emoji}</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedPhase.name} Laboratory
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {selectedPhase.description} The lunar terminator line reveals high topographic contrast along crater rims and mountain ridges due to low-angle sunlight.
                </p>

                {/* Illumination Gauge */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 mb-4">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Surface Illumination</span>
                    <span className="text-blue-600 dark:text-blue-400">{selectedPhase.illumination}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${selectedPhase.illumination}%` }}
                    />
                  </div>
                </div>

                {/* Quick Observer Tips */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/5">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                      Best Observation
                    </span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                      Binoculars (10x50) on terminator
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/5">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                      Tidal Influence
                    </span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                      {selectedPhase.illumination > 70 ? 'Spring Tides (Maximum)' : 'Neap Tides (Moderate)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8-Phase Interactive Scrubber Strip */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-500" />
              8 Stages of the Synodic Month
            </h3>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Click any phase to inspect
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {LUNAR_PHASES.map((p) => {
              const isSelected = selectedPhase.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPhase(p)}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-blue-500/15 border-blue-500 text-blue-600 dark:text-blue-400 shadow-sm scale-105'
                      : 'bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <span className="text-[11px] font-bold truncate max-w-full">{p.name}</span>
                  <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded">
                    {p.illumination}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2026 Full Moon Almanac */}
        <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                2026 Full Moon Almanac & Folklore Calendar
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 self-start sm:self-auto">
              12 Annual Cycles
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {ALMANAC_2026.map((item) => (
              <div
                key={item.month}
                className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                  <span>{item.month}</span>
                  <span className={`px-1 rounded ${item.type.includes('Super') ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : ''}`}>
                    {item.type.includes('Super') ? 'Super' : item.type.includes('Eclipse') ? 'Eclipse' : 'Full'}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {item.name}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.date}
                </div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-1">
                  {item.dist}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
