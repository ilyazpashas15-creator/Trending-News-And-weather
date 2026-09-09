'use client';

import React, { useState, useEffect } from 'react';
import {
  Sun,
  Sparkles,
  ShieldAlert,
  Globe,
  Calendar,
  Compass,
  Clock,
  MapPin,
  Eye,
  CheckCircle,
} from 'lucide-react';

interface EclipseItem {
  date: string;
  year: number;
  type: 'Total' | 'Annular' | 'Hybrid';
  visibility: string;
  totalityDuration: string;
  path: string;
  emoji: string;
  highlights: string;
}

const SOLAR_ECLIPSES: EclipseItem[] = [
  {
    date: 'August 12, 2026',
    year: 2026,
    type: 'Total',
    visibility: 'Arctic, Greenland, Iceland, Northern Spain',
    totalityDuration: '2m 18s',
    path: 'Scoresby Sound ➔ Reykjavik ➔ Mallorca / Ibiza',
    emoji: '🌑',
    highlights: 'First total solar eclipse in mainland Europe since 1999.',
  },
  {
    date: 'February 6, 2027',
    year: 2027,
    type: 'Annular',
    visibility: 'Chile, Argentina, Atlantic Ocean, West Africa',
    totalityDuration: '7m 51s',
    path: 'Patagonia ➔ South Atlantic ➔ Côte d\'Ivoire',
    emoji: '💍',
    highlights: 'Classic "Ring of Fire" with extraordinary 7+ minute duration.',
  },
  {
    date: 'August 2, 2027',
    year: 2027,
    type: 'Total',
    visibility: 'Southern Spain, North Africa, Middle East (Luxor)',
    totalityDuration: '6m 23s',
    path: 'Strait of Gibraltar ➔ Egypt (Valley of the Kings) ➔ Saudi Arabia',
    emoji: '🌑',
    highlights: 'Longest totality of the 21st century (over 6 minutes of darkness).',
  },
  {
    date: 'July 22, 2028',
    year: 2028,
    type: 'Total',
    visibility: 'Australia (Kimberley, Sydney Harbour), New Zealand',
    totalityDuration: '5m 10s',
    path: 'Northwest Australia ➔ Sydney CBD ➔ Dunedin',
    emoji: '🌑',
    highlights: 'Totality directly sweeps across Sydney Harbour Bridge and Opera House.',
  },
  {
    date: 'November 25, 2030',
    year: 2030,
    type: 'Total',
    visibility: 'Namibia, Botswana, South Africa, Australia',
    totalityDuration: '3m 44s',
    path: 'Kalahari Desert ➔ Durban ➔ South Australia',
    emoji: '🌑',
    highlights: 'Spectacular wildlife safari eclipse across Southern African game reserves.',
  },
];

export default function SunMoonSpaceSolarEclipsePage() {
  const [filter, setFilter] = useState<'All' | 'Total' | 'Annular'>('All');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Live countdown to August 12, 2026 Total Eclipse
  useEffect(() => {
    const target = new Date('2026-08-12T17:47:00Z').getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const filtered = filter === 'All' ? SOLAR_ECLIPSES : SOLAR_ECLIPSES.filter((e) => e.type === filter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Ambient Solar Corona Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent blur-3xl opacity-60 dark:opacity-75" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-2">
              <Sun className="w-3.5 h-3.5" />
              Solar Corona & Umbra Observatory
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Solar Eclipse Schedules & Totality Paths
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Chronology of upcoming total, annular, and hybrid solar eclipses, duration coordinates, and certified eye safety guidelines.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-1 rounded-2xl shadow-sm">
            {(['All', 'Total', 'Annular'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === t
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Next Total Solar Eclipse Countdown Hero */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-5 sm:p-7 shadow-sm mb-6 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Next Major Celestial Event
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                August 12, 2026: Total Solar Eclipse
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-lg">
                The Moon's umbra shadow will race across the Arctic, Iceland, and Northern Spain. Maximum totality will reach 2 minutes 18 seconds.
              </p>
            </div>

            {/* Countdown Clock (4 Ticking Digital Pills) */}
            <div className="flex items-center gap-2 sm:gap-3" suppressHydrationWarning>
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 text-center min-w-[70px]">
                <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
                  {countdown.days}
                </div>
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Days</div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 text-center min-w-[70px]">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {countdown.hours}
                </div>
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Hours</div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 text-center min-w-[70px]">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {countdown.minutes}
                </div>
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Mins</div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 text-center min-w-[70px]">
                <div className="text-xl sm:text-2xl font-black text-orange-600 dark:text-orange-400">
                  {countdown.seconds}
                </div>
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Secs</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Column Compact Eclipse Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 mb-6">
          {filtered.map((item) => (
            <div
              key={item.date}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm hover:border-amber-400 dark:hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase ${
                      item.type === 'Total'
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <div className="text-sm font-extrabold text-slate-900 dark:text-white mb-0.5">
                  {item.date}
                </div>
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">
                  Totality: {item.totalityDuration}
                </div>

                <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <div>
                    <strong className="text-slate-700 dark:text-slate-300">Path: </strong>
                    <span>{item.path}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700 dark:text-slate-300">Visibility: </strong>
                    <span>{item.visibility}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 text-[10px] text-slate-400 dark:text-slate-500 line-clamp-2">
                {item.highlights}
              </div>
            </div>
          ))}
        </div>

        {/* ISO 12312-2 Certified Eye Safety & Observation Guide */}
        <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Certified Solar Viewing Safety (ISO 12312-2 Standard)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Essential Precautions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Certified Solar Glasses
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Always verify ISO 12312-2 certification on eclipse glasses. Regular sunglasses or polarized filters do not block damaging infrared and UV radiation.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Cameras & Telescopes
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Never look through unfiltered binoculars or cameras. Solar filters must be mounted on the front aperture lens, not behind the eyepiece.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Totality Window
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Glasses may only be briefly removed during 100% totality when the solar disk is completely occluded by the Moon. Replace glasses before the first ray of sunlight emerges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
