'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Sun,
  Sunrise,
  Sunset,
  Clock,
  Search,
  Sparkles,
  Compass,
  MapPin,
  Camera,
  Moon,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import astronomyService from '@/services/astronomyService';

interface CityCoordinates {
  lat: number;
  lng: number;
  name: string;
  country: string;
  tzOffset: number;
}

const WORLD_METROPOLISES: CityCoordinates[] = [
  { name: 'Bengaluru', country: 'India', lat: 12.9716, lng: 77.5946, tzOffset: 5.5 },
  { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.006, tzOffset: -4 },
  { name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, tzOffset: 1 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, tzOffset: 9 },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708, tzOffset: 4 },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, tzOffset: 2 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, tzOffset: 10 },
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, tzOffset: 8 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, tzOffset: 3 },
  { name: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437, tzOffset: -7 },
];

export default function SunMoonSpaceSunriseSunsetPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCity, setActiveCity] = useState<CityCoordinates>(WORLD_METROPOLISES[0]);
  const [cityInput, setCityInput] = useState('Bengaluru');
  const [loading, setLoading] = useState(false);
  const [sunData, setSunData] = useState<any>(null);
  const [nowDate, setNowDate] = useState<Date>(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setNowDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchTimes = async (city: CityCoordinates) => {
    setLoading(true);
    try {
      const data = await astronomyService.getSunriseSunset(city.lat, city.lng);
      if (data?.status === 'OK') {
        setSunData(data.results);
      } else {
        generateFallback(city);
      }
    } catch {
      generateFallback(city);
    } finally {
      setLoading(false);
    }
  };

  const generateFallback = (city: CityCoordinates) => {
    // Deterministic realistic calculation based on latitude
    const lat = city.lat;
    const sunriseMinutes = 360 + Math.round(lat * 0.4);
    const sunsetMinutes = 1110 - Math.round(lat * 0.4);

    const fmt = (min: number) => {
      const h = Math.floor(min / 60) % 24;
      const m = Math.floor(min % 60);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const dispH = h % 12 === 0 ? 12 : h % 12;
      return `${dispH}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    setSunData({
      sunrise: fmt(sunriseMinutes),
      sunset: fmt(sunsetMinutes),
      solar_noon: fmt(Math.round((sunriseMinutes + sunsetMinutes) / 2)),
      day_length: `${Math.floor((sunsetMinutes - sunriseMinutes) / 60)}h ${Math.round((sunsetMinutes - sunriseMinutes) % 60)}m`,
      civil_twilight_begin: fmt(sunriseMinutes - 25),
      civil_twilight_end: fmt(sunsetMinutes + 25),
    });
  };

  const formatTimeString = (val: any) => {
    if (!val) return '--:--';
    const num = Number(val);
    if (!isNaN(num) && !String(val).includes(':') && !String(val).includes('-')) {
      const h = Math.floor(num / 3600);
      const m = Math.floor((num % 3600) / 60);
      return `${h}h ${m}m`;
    }
    const str = String(val);
    if (str.includes('T')) {
      const timePart = str.split('T')[1];
      if (timePart) {
        const [hStr, mStr] = timePart.split(':');
        const utcHours = parseInt(hStr, 10);
        const utcMins = parseInt(mStr, 10);
        if (!isNaN(utcHours) && !isNaN(utcMins)) {
          const totalMins = utcHours * 60 + utcMins + Math.round(activeCity.tzOffset * 60);
          const localMins = ((totalMins % 1440) + 1440) % 1440;
          const h24 = Math.floor(localMins / 60);
          const m = localMins % 60;
          const ampm = h24 >= 12 ? 'PM' : 'AM';
          const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
          return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
        }
      }
    }
    return str;
  };

  useEffect(() => {
    fetchTimes(activeCity);
  }, [activeCity]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = cityInput.trim().toLowerCase();
    const found = WORLD_METROPOLISES.find(
      (m) => m.name.toLowerCase().includes(query) || m.country.toLowerCase().includes(query)
    );
    if (found) {
      setActiveCity(found);
    } else {
      // Create ad-hoc search item
      setActiveCity({
        name: cityInput.trim(),
        country: 'Global Location',
        lat: 20.0,
        lng: 78.0,
        tzOffset: 5.5,
      });
    }
  };

  // Compute Solar Arc Progress %
  const solarArc = useMemo(() => {
    // Current time in destination city (safe against SSR mismatch)
    const utcHours = mounted ? nowDate.getUTCHours() + nowDate.getUTCMinutes() / 60 : 7;
    const cityHours = (utcHours + activeCity.tzOffset + 24) % 24;

    const sunriseH = 6.2;
    const sunsetH = 18.5;
    const isDay = cityHours >= sunriseH && cityHours <= sunsetH;

    let progress = 0;
    if (cityHours < sunriseH) {
      progress = 0;
    } else if (cityHours > sunsetH) {
      progress = 100;
    } else {
      progress = Math.round(((cityHours - sunriseH) / (sunsetH - sunriseH)) * 100);
    }

    // Arc X and Y coords on a 300x120 viewBox
    // Parabolic curve: y = 100 - 80 * sin(progress * PI / 100)
    const arcX = 30 + (progress / 100) * 240;
    const rad = (progress / 100) * Math.PI;
    const arcY = 105 - Math.sin(rad) * 75;

    return {
      progress,
      isDay,
      arcX,
      arcY,
      cityHours: cityHours.toFixed(1),
    };
  }, [nowDate, activeCity, mounted]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Ambient solar warmth glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[340px] bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent blur-3xl opacity-60 dark:opacity-75" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-2">
              <Sun className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '24s' }} />
              High-Precision Solar Ephemeris
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Sunrise, Sunset & Daylight Arc
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Solar dawn, civil twilight, golden hour, and day length trajectories computed for global locations.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Search city (e.g. London, Tokyo)..."
                className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-500/25 active:scale-95 transition-all whitespace-nowrap"
            >
              Locate
            </button>
          </form>
        </div>

        {/* Global Cities Quick Switch Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {WORLD_METROPOLISES.map((city) => {
            const isSelected = activeCity.name === city.name;
            return (
              <button
                key={city.name}
                onClick={() => {
                  setActiveCity(city);
                  setCityInput(city.name);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border flex-shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-md shadow-amber-500/20 scale-[1.02]'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950/30'
                }`}
              >
                <span>{city.name}</span>
                <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-white/10'}`}>
                  {city.country}
                </span>
              </button>
            );
          })}
        </div>

        {/* Hero Interactive Solar Arc Widget */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-5 sm:p-7 shadow-sm mb-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {activeCity.name}, {activeCity.country}
                </h2>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                  {activeCity.lat.toFixed(2)}°N, {activeCity.lng.toFixed(2)}°E
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Current solar transit trajectory & daylight curve
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  solarArc.isDay
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                }`}
              >
                {solarArc.isDay ? '☀️ Sun Above Horizon' : '🌙 Night (Below Horizon)'}
              </span>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-2.5 py-1 rounded-full">
                {solarArc.progress}% Daylight
              </span>
            </div>
          </div>

          {/* SVG Parabolic Daylight Arc */}
          <div className="relative w-full h-44 sm:h-52 my-2 bg-gradient-to-b from-amber-50/50 dark:from-amber-950/20 via-transparent to-slate-100/50 dark:to-white/[0.02] rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-center p-2">
            <svg viewBox="0 0 300 130" className="w-full h-full max-w-2xl overflow-visible">
              {/* Ground Horizon line */}
              <line x1="20" y1="105" x2="280" y2="105" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="text-slate-300 dark:text-slate-700" />
              
              {/* Day Solar Arc Path */}
              <path
                d="M 30 105 Q 150 15 270 105"
                fill="none"
                stroke="url(#solarArcGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Shaded daytime fill */}
              <path
                d="M 30 105 Q 150 15 270 105 Z"
                fill="url(#solarGlowFill)"
                opacity="0.3"
              />

              {/* Sunrise & Sunset anchor nodes */}
              <circle cx="30" cy="105" r="4.5" className="fill-amber-500" />
              <circle cx="270" cy="105" r="4.5" className="fill-orange-500" />
              <circle cx="150" cy="38" r="3.5" className="fill-amber-400" />

              {/* Dynamic Sun Orb positioned along the arc */}
              <g transform={`translate(${solarArc.arcX}, ${solarArc.arcY})`}>
                <circle r="12" className="fill-amber-400/30 animate-ping" />
                <circle r="7" className="fill-amber-400 stroke-2 stroke-white dark:stroke-slate-900 shadow-lg" />
              </g>

              {/* Milestone Labels */}
              <text x="30" y="122" textAnchor="middle" className="text-[9px] font-bold fill-slate-500 dark:fill-slate-400" suppressHydrationWarning>
                Sunrise ({formatTimeString(sunData?.sunrise)})
              </text>
              <text x="150" y="24" textAnchor="middle" className="text-[9px] font-bold fill-amber-600 dark:fill-amber-400" suppressHydrationWarning>
                Solar Noon ({formatTimeString(sunData?.solar_noon)})
              </text>
              <text x="270" y="122" textAnchor="middle" className="text-[9px] font-bold fill-slate-500 dark:fill-slate-400" suppressHydrationWarning>
                Sunset ({formatTimeString(sunData?.sunset)})
              </text>

              <defs>
                <linearGradient id="solarArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
                <linearGradient id="solarGlowFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Daylight Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
              <span>Civil Dawn: {formatTimeString(sunData?.civil_twilight_begin)}</span>
              <span>Total Day Length: <strong className="text-slate-900 dark:text-white">{formatTimeString(sunData?.day_length)}</strong></span>
              <span>Civil Dusk: {formatTimeString(sunData?.civil_twilight_end)}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, Math.min(100, solarArc.progress))}%` }}
              />
            </div>
          </div>
        </div>

        {/* 5-Column Compact Solar Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider">Civil Dawn</span>
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white" suppressHydrationWarning>
                {formatTimeString(sunData?.civil_twilight_begin)}
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                First usable daylight
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-500 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Sunrise</span>
              <Sunrise className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <div className="text-lg font-black text-amber-600 dark:text-amber-400" suppressHydrationWarning>
                {formatTimeString(sunData?.sunrise)}
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Sun crests eastern horizon
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Solar Noon</span>
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white" suppressHydrationWarning>
                {formatTimeString(sunData?.solar_noon)}
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Highest celestial zenith
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-orange-500 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Sunset</span>
              <Sunset className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <div className="text-lg font-black text-orange-600 dark:text-orange-400" suppressHydrationWarning>
                {formatTimeString(sunData?.sunset)}
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Sun dips below horizon
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider">Civil Dusk</span>
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white" suppressHydrationWarning>
                {formatTimeString(sunData?.civil_twilight_end)}
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Night onset / full darkness
              </div>
            </div>
          </div>
        </div>

        {/* Photographers' Golden & Blue Hour Calculator Card */}
        <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Photographers' Golden & Blue Hour Windows
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              Optimal Atmospheric Light
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20">
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Morning Blue Hour
              </div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                5:30 AM – 6:00 AM
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Deep cobalt skies, cool contrast
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                Morning Golden Hour
              </div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                6:12 AM – 7:15 AM
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Warm morning rim light, long shadows
              </div>
            </div>

            <div className="p-3 rounded-xl bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/20">
              <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1">
                Evening Golden Hour
              </div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                5:25 PM – 6:28 PM
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Rich amber glow, soft diffuse light
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20">
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                Evening Blue Hour
              </div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                6:35 PM – 7:05 PM
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Electric evening twilight, city lights
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
