'use client';

import React, { useState } from 'react';
import {
  Orbit,
  Sparkles,
  Globe,
  Compass,
  ArrowRight,
  Eye,
  Thermometer,
  RotateCw,
  Moon,
  Info,
} from 'lucide-react';

interface Planet {
  name: string;
  symbol: string;
  type: 'Terrestrial' | 'Gas Giant' | 'Ice Giant';
  distanceAu: number;
  distanceKm: string;
  diameterKm: string;
  orbitDays: string;
  dayLength: string;
  moons: number;
  tempRange: string;
  gravity: string;
  atmosphere: string;
  hasRings: boolean;
  notableMoons: string;
  colorGradient: string;
  visibleTonight: boolean;
  viewingTip: string;
}

const PLANETS: Planet[] = [
  {
    name: 'Mercury',
    symbol: '☿',
    type: 'Terrestrial',
    distanceAu: 0.39,
    distanceKm: '57.9M km',
    diameterKm: '4,879 km',
    orbitDays: '88 days',
    dayLength: '59 Earth days',
    moons: 0,
    tempRange: '-180°C to +430°C',
    gravity: '0.38 g',
    atmosphere: 'Trace (Oxygen, Sodium, Hydrogen)',
    hasRings: false,
    notableMoons: 'None',
    colorGradient: 'from-slate-400 via-stone-500 to-zinc-600',
    visibleTonight: false,
    viewingTip: 'Low on western horizon right after sunset',
  },
  {
    name: 'Venus',
    symbol: '♀',
    type: 'Terrestrial',
    distanceAu: 0.72,
    distanceKm: '108.2M km',
    diameterKm: '12,104 km',
    orbitDays: '225 days',
    dayLength: '243 Earth days (retrograde)',
    moons: 0,
    tempRange: '+465°C constant',
    gravity: '0.90 g',
    atmosphere: '96% Carbon Dioxide, sulfuric acid clouds',
    hasRings: false,
    notableMoons: 'None',
    colorGradient: 'from-amber-300 via-orange-400 to-amber-600',
    visibleTonight: true,
    viewingTip: 'Bright "Evening Star" (Mag -4.2) in west at dusk',
  },
  {
    name: 'Earth',
    symbol: '♁',
    type: 'Terrestrial',
    distanceAu: 1.0,
    distanceKm: '149.6M km (1 AU)',
    diameterKm: '12,742 km',
    orbitDays: '365.25 days',
    dayLength: '24 hours',
    moons: 1,
    tempRange: '-89°C to +57°C',
    gravity: '1.00 g (9.8 m/s²)',
    atmosphere: '78% Nitrogen, 21% Oxygen, 1% Argon',
    hasRings: false,
    notableMoons: 'The Moon (Luna)',
    colorGradient: 'from-blue-400 via-cyan-500 to-emerald-600',
    visibleTonight: false,
    viewingTip: 'Our cosmic home oasis',
  },
  {
    name: 'Mars',
    symbol: '♂',
    type: 'Terrestrial',
    distanceAu: 1.52,
    distanceKm: '227.9M km',
    diameterKm: '6,779 km',
    orbitDays: '687 days',
    dayLength: '24h 37m',
    moons: 2,
    tempRange: '-140°C to +20°C',
    gravity: '0.38 g',
    atmosphere: '95% Carbon Dioxide, 2.6% Nitrogen',
    hasRings: false,
    notableMoons: 'Phobos & Deimos',
    colorGradient: 'from-rose-400 via-red-500 to-amber-700',
    visibleTonight: true,
    viewingTip: 'Reddish orb rising in East at midnight',
  },
  {
    name: 'Jupiter',
    symbol: '♃',
    type: 'Gas Giant',
    distanceAu: 5.2,
    distanceKm: '778.5M km',
    diameterKm: '139,820 km',
    orbitDays: '11.86 years',
    dayLength: '9h 56m',
    moons: 95,
    tempRange: '-110°C (cloud tops)',
    gravity: '2.53 g',
    atmosphere: '90% Hydrogen, 10% Helium',
    hasRings: true,
    notableMoons: 'Io, Europa, Ganymede, Callisto',
    colorGradient: 'from-amber-200 via-orange-300 to-amber-700',
    visibleTonight: true,
    viewingTip: 'Blazing bright in south; 4 Galilean moons visible in binoculars',
  },
  {
    name: 'Saturn',
    symbol: '♄',
    type: 'Gas Giant',
    distanceAu: 9.58,
    distanceKm: '1.43B km',
    diameterKm: '116,460 km',
    orbitDays: '29.45 years',
    dayLength: '10h 33m',
    moons: 146,
    tempRange: '-140°C',
    gravity: '1.06 g',
    atmosphere: '96% Hydrogen, 3% Helium',
    hasRings: true,
    notableMoons: 'Titan, Enceladus, Mimas',
    colorGradient: 'from-yellow-200 via-amber-300 to-yellow-600',
    visibleTonight: true,
    viewingTip: 'Iconic ring system clearly visible in small 60mm telescope',
  },
  {
    name: 'Uranus',
    symbol: '♅',
    type: 'Ice Giant',
    distanceAu: 19.2,
    distanceKm: '2.87B km',
    diameterKm: '50,724 km',
    orbitDays: '84.0 years',
    dayLength: '17h 14m (retrograde, 98° tilt)',
    moons: 28,
    tempRange: '-224°C',
    gravity: '0.89 g',
    atmosphere: '83% Hydrogen, 15% Helium, 2% Methane',
    hasRings: true,
    notableMoons: 'Titania, Oberon, Miranda',
    colorGradient: 'from-cyan-300 via-teal-400 to-cyan-700',
    visibleTonight: false,
    viewingTip: 'Faint cyan disc; requires binoculars or star chart',
  },
  {
    name: 'Neptune',
    symbol: '♆',
    type: 'Ice Giant',
    distanceAu: 30.05,
    distanceKm: '4.50B km',
    diameterKm: '49,244 km',
    orbitDays: '164.8 years',
    dayLength: '16h 06m',
    moons: 16,
    tempRange: '-218°C',
    gravity: '1.14 g',
    atmosphere: '80% Hydrogen, 19% Helium, 1.5% Methane',
    hasRings: true,
    notableMoons: 'Triton (retrograde cryovolcanoes)',
    colorGradient: 'from-blue-500 via-indigo-600 to-blue-900',
    visibleTonight: false,
    viewingTip: 'Deep azure blue orb; requires telescope with 150x magnification',
  },
];

export default function SunMoonSpacePlanetsPage() {
  const [filter, setFilter] = useState<'All' | 'Terrestrial' | 'Gas Giant' | 'Ice Giant'>('All');
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(PLANETS[4]); // Jupiter default

  const filteredPlanets = filter === 'All' ? PLANETS : PLANETS.filter((p) => p.type === filter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Ambient Cosmic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent blur-3xl opacity-60 dark:opacity-75" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-2">
              <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '24s' }} />
              Solar System Planetary Ephemeris
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Planetary Directory & Positions
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Orbital mechanics, astronomical dimensions, satellite systems, and naked-eye observation guides across all 8 major planets.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-1 rounded-2xl shadow-sm">
            {(['All', 'Terrestrial', 'Gas Giant', 'Ice Giant'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Planet Inspector Banner */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-5 sm:p-7 shadow-sm mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Planet Sphere Graphic */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-3">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center">
                {/* Simulated Rings for Saturn/Uranus */}
                {selectedPlanet.hasRings && (
                  <div className="absolute w-56 h-16 sm:w-64 sm:h-20 rounded-full border-4 border-amber-300/40 dark:border-amber-400/30 rotate-[25deg] shadow-[0_0_15px_rgba(251,191,36,0.3)] pointer-events-none" />
                )}

                {/* Shaded Planet Disc */}
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-tr ${selectedPlanet.colorGradient} shadow-2xl relative overflow-hidden border border-white/20`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/70" />
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">{selectedPlanet.symbol}</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {selectedPlanet.name}
                  </h2>
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  {selectedPlanet.type}
                </span>
              </div>
            </div>

            {/* Right: Planet Deep Specs (5-Column Metric Deck) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Atmosphere: <span className="text-slate-800 dark:text-slate-200">{selectedPlanet.atmosphere}</span>
                  </div>
                  {selectedPlanet.visibleTonight && (
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Visible Tonight
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                    <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">Distance</div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{selectedPlanet.distanceAu} AU</div>
                    <div className="text-[10px] text-slate-400">{selectedPlanet.distanceKm}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                    <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">Diameter</div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{selectedPlanet.diameterKm}</div>
                    <div className="text-[10px] text-slate-400">Equatorial</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                    <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">Orbit Period</div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{selectedPlanet.orbitDays}</div>
                    <div className="text-[10px] text-slate-400">1 Solar Year</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                    <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">Moons Count</div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{selectedPlanet.moons} Moons</div>
                    <div className="text-[10px] text-slate-400 truncate">{selectedPlanet.notableMoons}</div>
                  </div>
                </div>

                {/* Observer Note */}
                <div className="p-3 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20 flex items-start gap-2">
                  <Eye className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">Stargazer Observation Guide: </span>
                    <span className="text-slate-600 dark:text-slate-300">{selectedPlanet.viewingTip}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact 4-Column Planetary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredPlanets.map((p) => {
            const isSelected = selectedPlanet.name === p.name;
            return (
              <div
                key={p.name}
                onClick={() => setSelectedPlanet(p)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-500/10 border-purple-500 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${p.colorGradient} shadow-sm`} />
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">{p.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded">
                      {p.distanceAu} AU
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Diameter:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{p.diameterKm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orbit:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{p.orbitDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Moons:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{p.moons}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">
                    {p.type}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Inspect ➔
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
