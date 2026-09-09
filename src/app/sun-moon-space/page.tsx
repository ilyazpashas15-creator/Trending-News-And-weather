'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sun,
  Moon,
  Sparkles,
  Orbit,
  Rocket,
  Compass,
  Eye,
  ArrowRight,
  Clock,
  Globe,
  Radio,
  Star,
  Activity,
} from 'lucide-react';

interface CelestialTool {
  title: string;
  description: string;
  icon: string;
  href: string;
  accent: string;
  badge: string;
  badgeColor: string;
  statLabel: string;
  statValue: string;
}

const TOOLS: CelestialTool[] = [
  {
    title: 'Sunrise & Sunset',
    description: 'Solar dawn, civil twilight, golden hour & daylight arc across global capitals.',
    icon: '🌅',
    href: '/sun-moon-space/sunrise-sunset',
    accent: 'from-amber-500 to-orange-500',
    badge: 'Solar Arc',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    statLabel: 'Day Length',
    statValue: '12h 21m',
  },
  {
    title: 'Moon Phases',
    description: 'Current lunar illumination %, crater terminator curve & upcoming full moon.',
    icon: '🌙',
    href: '/sun-moon-space/moon-phases',
    accent: 'from-blue-500 to-indigo-500',
    badge: 'Waxing Gibbous',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    statLabel: 'Illumination',
    statValue: '88.4%',
  },
  {
    title: 'ISS Live Tracker',
    description: 'Real-time orbital tracking, ground track, velocity, and astronauts in space.',
    icon: '🛰️',
    href: '/sun-moon-space/iss',
    accent: 'from-cyan-500 to-blue-600',
    badge: 'Live 51.6° Orbit',
    badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    statLabel: 'Velocity',
    statValue: '27,580 km/h',
  },
  {
    title: 'Planet Positions',
    description: 'Orbital distances, dimensions, celestial bodies, and satellite counts.',
    icon: '🪐',
    href: '/sun-moon-space/planets',
    accent: 'from-purple-500 to-pink-500',
    badge: '8 Major Bodies',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    statLabel: 'Visible Tonight',
    statValue: 'Venus & Jupiter',
  },
  {
    title: 'NASA APOD',
    description: 'High-definition Astronomy Picture of the Day curated by astrophysicists.',
    icon: '🌌',
    href: '/sun-moon-space/nasa-apod',
    accent: 'from-indigo-500 to-violet-600',
    badge: 'Daily Archive',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    statLabel: 'Resolution',
    statValue: 'Ultra HD 4K',
  },
  {
    title: 'Solar Eclipse',
    description: 'Path of totality charts, annular rings, and upcoming global solar eclipses.',
    icon: '🌑',
    href: '/sun-moon-space/solar-eclipse',
    accent: 'from-yellow-500 to-amber-600',
    badge: 'Next: Aug 2026',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    statLabel: 'Totality Peak',
    statValue: '2m 18s',
  },
  {
    title: 'Lunar Eclipse',
    description: 'Blood Moon timelines, penumbral vs partial eclipse tracks, and visibility zones.',
    icon: '🌕',
    href: '/sun-moon-space/lunar-eclipse',
    accent: 'from-rose-500 to-purple-600',
    badge: 'Blood Moon',
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    statLabel: 'Next Total',
    statValue: 'March 2026',
  },
];

const TONIGHT_OBJECTS = [
  { name: 'Venus', type: 'Planet', mag: '-4.2', direction: 'West at Dusk', best: 'Sunset + 45m', color: 'text-amber-400' },
  { name: 'Jupiter', type: 'Planet', mag: '-2.4', direction: 'South-East', best: 'Midnight', color: 'text-orange-400' },
  { name: 'Mars', type: 'Planet', mag: '-0.8', direction: 'East', best: '2:30 AM', color: 'text-rose-400' },
  { name: 'Saturn', type: 'Planet', mag: '+0.7', direction: 'South-West', best: 'Early Evening', color: 'text-yellow-400' },
  { name: 'Pleiades (M45)', type: 'Open Cluster', mag: '+1.6', direction: 'East', best: '10:00 PM', color: 'text-cyan-400' },
];

export default function SunMoonSpacePage() {
  const [mounted, setMounted] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Subtle Cosmic Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl opacity-60 dark:opacity-80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
              <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '16s' }} />
              Astrophysics & Planetary Observatory
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Sun, Moon & Space Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              High-precision solar ephemeris, real-time lunar illumination, ISS telemetry, planetary orbits, and NASA deep space discoveries.
            </p>
          </div>

          {/* Observatory Status Pill */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-3 rounded-2xl shadow-sm self-start sm:self-auto">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-base shadow-md shadow-indigo-500/20">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                Observatory Feed
              </div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5" suppressHydrationWarning>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                {mounted ? utcTime : '--:--:-- UTC'}
              </div>
            </div>
          </div>
        </div>

        {/* Live Cosmic Telemetry Cards (Compact 4-Column Deck) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-7">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-lg flex-shrink-0">
              ☀️
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">
                Solar Cycle 25
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                Solar Maximum Peak
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-lg flex-shrink-0">
              🌔
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">
                Lunar Illumination
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                88.4% Waxing
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center text-lg flex-shrink-0">
              🛰️
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">
                ISS Space Station
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                418 km • 27,580 km/h
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-lg flex-shrink-0">
              🌑
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">
                Upcoming Eclipse
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                Total Solar • Aug 2026
              </div>
            </div>
          </div>
        </div>

        {/* 7 Interactive Space Tools (Compact Modern Grid) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Observatory Modules
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              7 Astronomical Instruments
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {TOOLS.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group relative rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-500/40 flex flex-col justify-between overflow-hidden"
              >
                {/* Top accent border */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.accent} opacity-75 group-hover:opacity-100 transition-opacity`} />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                      {tool.icon}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                      {tool.statLabel}:
                    </span>{' '}
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      {tool.statValue}
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center text-slate-500 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stargazing Tonight & Naked-Eye Planets Guide (Compact 5-Col Table / Cards) */}
        <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Visible Celestial Bodies Tonight
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 self-start sm:self-auto">
              Clear Stargazing Window
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {TONIGHT_OBJECTS.map((obj) => (
              <div
                key={obj.name}
                className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`font-extrabold text-xs ${obj.color}`}>{obj.name}</span>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 bg-slate-200/60 dark:bg-white/10 px-1.5 py-0.5 rounded">
                    Mag {obj.mag}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 truncate">
                  {obj.direction}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5">
                  Best: {obj.best}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
