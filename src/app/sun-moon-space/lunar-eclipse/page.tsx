'use client';

import React, { useState } from 'react';
import {
  Moon,
  Sparkles,
  Eye,
  Globe,
  Calendar,
  Info,
  Clock,
  Camera,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface LunarEclipseItem {
  date: string;
  year: number;
  type: 'Total' | 'Partial' | 'Penumbral';
  visibility: string;
  duration: string;
  nickname: string;
  emoji: string;
  description: string;
  totalityTime: string;
}

const LUNAR_ECLIPSES: LunarEclipseItem[] = [
  {
    date: 'March 3, 2026',
    year: 2026,
    type: 'Total',
    visibility: 'Americas, Europe, Africa, East Asia, Australia, Pacific',
    duration: '3 hrs 27 mins overall',
    totalityTime: '58 mins totality',
    nickname: 'Worm Blood Moon',
    emoji: '🌕',
    description: 'Moon completely enters Earth\'s umbral shadow, glowing vivid copper-red.',
  },
  {
    date: 'August 28, 2026',
    year: 2026,
    type: 'Partial',
    visibility: 'Eastern Americas, Europe, Africa, Middle East',
    duration: '3 hrs 18 mins overall',
    totalityTime: '93% max obscuration',
    nickname: 'Harvest Umbral Eclipse',
    emoji: '🌗',
    description: 'Over 90% of the lunar surface enters the dark umbral core.',
  },
  {
    date: 'February 20, 2027',
    year: 2027,
    type: 'Penumbral',
    visibility: 'Americas, Europe, Africa, Asia',
    duration: '4 hrs 05 mins',
    totalityTime: 'Subtle outer shadow',
    nickname: 'Snow Moon Eclipse',
    emoji: '🌕',
    description: 'Moon passes through outer penumbral haze; subtle dimming on northern limb.',
  },
  {
    date: 'July 18, 2027',
    year: 2027,
    type: 'Penumbral',
    visibility: 'Africa, Southern Europe, South Asia, Australia',
    duration: '3 hrs 40 mins',
    totalityTime: 'Penumbral shadow',
    nickname: 'Buck Moon Eclipse',
    emoji: '🌕',
    description: 'Delicate twilight shading across southern highlands of the Moon.',
  },
  {
    date: 'December 31, 2028',
    year: 2028,
    type: 'Total',
    visibility: 'Asia, Australia, Pacific, Western North America',
    duration: '3 hrs 45 mins overall',
    totalityTime: '1 hr 11 mins totality',
    nickname: 'New Year\'s Blue Blood Moon',
    emoji: '🌕',
    description: 'Rare New Year\'s Eve Total Lunar Eclipse with deep burgundy totality.',
  },
];

const ECLIPSE_STAGES = [
  { code: 'P1', name: 'Penumbral Ingress', desc: 'Outer shadow first touches lunar limb; subtle gradient begins.' },
  { code: 'U1', name: 'Umbral Ingress', desc: 'Dark bite of Earth\'s inner shadow appears on eastern edge.' },
  { code: 'U2', name: 'Totality Ingress', desc: 'Moon completely engulfed in umbra; Blood Moon color blooms.' },
  { code: 'Max', name: 'Greatest Eclipse', desc: 'Moon closest to center of shadow; darkest crimson hue.' },
  { code: 'U3', name: 'Totality Egress', desc: 'First sliver of direct sunlight breaks through western limb.' },
  { code: 'U4', name: 'Umbral Exit', desc: 'Dark inner shadow completely leaves disc.' },
  { code: 'P4', name: 'Penumbral Exit', desc: 'Moon returns to full unoccluded brilliance.' },
];

export default function SunMoonSpaceLunarEclipsePage() {
  const [filter, setFilter] = useState<'All' | 'Total' | 'Partial' | 'Penumbral'>('All');

  const filtered = filter === 'All' ? LUNAR_ECLIPSES : LUNAR_ECLIPSES.filter((e) => e.type === filter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Ambient Blood Moon Red Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-gradient-to-b from-rose-500/10 via-purple-500/5 to-transparent blur-3xl opacity-60 dark:opacity-75" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 mb-2">
              <Moon className="w-3.5 h-3.5" />
              Umbral Shadow & Blood Moon Observatory
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Lunar Eclipse Schedules & Blood Moons
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Chronology of upcoming total, partial, and penumbral lunar eclipses, Rayleigh atmospheric scattering physics, and observation stages.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-1 rounded-2xl shadow-sm">
            {(['All', 'Total', 'Partial', 'Penumbral'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === t
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Rayleigh Scattering & Blood Moon Physics Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-5 sm:p-7 shadow-sm mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                Astrophysical Phenomenon
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                Why Does the Moon Turn Blood-Red During Totality?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                During a total lunar eclipse, the Earth blocks all direct sunlight from reaching the lunar surface. However, sunlight passing through the ring of Earth’s atmosphere undergoes <strong className="text-slate-900 dark:text-white">Rayleigh scattering</strong>: shorter blue wavelengths scatter away, while longer reddish wavelengths bend into the shadow cone.
              </p>
              <p className="text-xs sm:text-sm text-rose-600 dark:text-rose-400 mt-2 font-semibold">
                ✨ An observer standing on the Moon would see a dark Earth rimmed by a glowing red halo containing every sunrise and sunset on the planet simultaneously.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-3">
              <div className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-rose-900 via-red-600 to-amber-600 shadow-[0_0_35px_rgba(225,29,72,0.4)] border border-rose-400/40 flex items-center justify-center">
                <div className="text-4xl select-none">🌕</div>
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">
                Simulated Blood Moon Totality
              </span>
            </div>
          </div>
        </div>

        {/* 5-Column Compact Lunar Eclipse Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 mb-6">
          {filtered.map((item) => (
            <div
              key={item.date}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm hover:border-rose-400 dark:hover:border-rose-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase ${
                      item.type === 'Total'
                        ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                        : item.type === 'Partial'
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
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
                  {item.nickname}
                </div>
                <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-2">
                  {item.totalityTime}
                </div>

                <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <div>
                    <strong className="text-slate-700 dark:text-slate-300">Duration: </strong>
                    <span>{item.duration}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700 dark:text-slate-300">Visible: </strong>
                    <span>{item.visibility}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 text-[10px] text-slate-400 dark:text-slate-500 line-clamp-2">
                {item.description}
              </div>
            </div>
          ))}
        </div>

        {/* 7 Chronological Eclipse Stages Breakdown */}
        <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Anatomy of a Lunar Eclipse (Contact Stages P1 to P4)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
              Standard Contact Codes
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
            {ECLIPSE_STAGES.map((st) => (
              <div
                key={st.code}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5"
              >
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                  {st.code}
                </span>
                <div className="font-bold text-slate-900 dark:text-white mt-1.5 truncate">
                  {st.name}
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-3 leading-tight">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
