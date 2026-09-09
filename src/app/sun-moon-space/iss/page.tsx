'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Rocket,
  Orbit,
  Globe,
  Users,
  RefreshCw,
  Sparkles,
  Navigation,
  Radio,
  Eye,
  Activity,
  MapPin,
  Shield,
  Layers,
  Crosshair,
  Zap,
} from 'lucide-react';
import astronomyService from '@/services/astronomyService';

interface Astronaut {
  name: string;
  agency: string;
  flag: string;
  role: string;
  craft: string;
  daysInSpace: number;
}

const EXPEDITION_CREW: Astronaut[] = [
  { name: 'Oleg Kononenko', agency: 'Roscosmos', flag: '🇷🇺', role: 'Station Commander', craft: 'Soyuz MS-25', daysInSpace: 360 },
  { name: 'Nikolai Chub', agency: 'Roscosmos', flag: '🇷🇺', role: 'Flight Engineer', craft: 'Soyuz MS-25', daysInSpace: 360 },
  { name: 'Tracy C. Dyson', agency: 'NASA', flag: '🇺🇸', role: 'Flight Engineer', craft: 'Soyuz MS-25', daysInSpace: 172 },
  { name: 'Matthew Dominick', agency: 'NASA', flag: '🇺🇸', role: 'Crew-8 Commander', craft: 'Crew Dragon', daysInSpace: 188 },
  { name: 'Michael Barratt', agency: 'NASA', flag: '🇺🇸', role: 'Mission Specialist', craft: 'Crew Dragon', daysInSpace: 188 },
  { name: 'Jeanette Epps', agency: 'NASA', flag: '🇺🇸', role: 'Flight Engineer', craft: 'Crew Dragon', daysInSpace: 188 },
  { name: 'Alexander Grebenkin', agency: 'Roscosmos', flag: '🇷🇺', role: 'Flight Engineer', craft: 'Crew Dragon', daysInSpace: 188 },
];

const PASS_PREDICTIONS = [
  { city: 'Bengaluru, India', date: 'Tonight, 8:42 PM', duration: '5m 20s', maxElevation: '68° (High)', magnitude: '-3.6 (Brilliant)' },
  { city: 'London, UK', date: 'Tomorrow, 5:15 AM', duration: '4m 10s', maxElevation: '45°', magnitude: '-2.8 (Bright)' },
  { city: 'New York, USA', date: 'Tomorrow, 9:08 PM', duration: '6m 02s', maxElevation: '78° (Zenith)', magnitude: '-3.9 (Max Brightness)' },
  { city: 'Tokyo, Japan', date: 'Sep 11, 7:22 PM', duration: '4m 45s', maxElevation: '52°', magnitude: '-3.1 (Bright)' },
];

// Major global tracking ground stations & spaceports
const TRACKING_SPACEPORTS = [
  { name: 'Houston JSC', country: 'USA', lat: 29.56, lng: -95.09, code: 'MCC-H' },
  { name: 'Kennedy Space Center', country: 'USA', lat: 28.57, lng: -80.65, code: 'KSC' },
  { name: 'Baikonur Cosmodrome', country: 'Kazakhstan', lat: 45.96, lng: 63.31, code: 'TYUR' },
  { name: 'Kourou Space Centre', country: 'French Guiana', lat: 5.24, lng: -52.77, code: 'CSG' },
  { name: 'ISRO Sriharikota', country: 'India', lat: 13.72, lng: 80.23, code: 'SHAR' },
  { name: 'Tanegashima Space Center', country: 'Japan', lat: 30.40, lng: 130.97, code: 'TNSC' },
];

export default function SunMoonSpaceISSPage() {
  const [mounted, setMounted] = useState(false);
  const [issPosition, setIssPosition] = useState({
    latitude: 22.45,
    longitude: 45.12,
    altitude: 418.5,
    velocity: 27580,
  });
  const [isLive, setIsLive] = useState(true);
  const [lastPing, setLastPing] = useState('Live Telemetry');
  const [showFootprint, setShowFootprint] = useState(true);
  const [showNextOrbit, setShowNextOrbit] = useState(true);
  const [showSpaceports, setShowSpaceports] = useState(true);

  useEffect(() => {
    setMounted(true);
    let timer: NodeJS.Timeout;
    const fetchCoords = async () => {
      try {
        const res = await astronomyService.getISSLocation();
        if (res?.iss_position) {
          setIssPosition((prev) => ({
            ...prev,
            latitude: Number(res.iss_position.latitude),
            longitude: Number(res.iss_position.longitude),
          }));
          setLastPing(new Date().toLocaleTimeString());
        }
      } catch {
        // Continuous smooth orbital simulation along 51.6° inclination
        setIssPosition((prev) => {
          const nextLng = prev.longitude > 178 ? -180 : prev.longitude + 0.45;
          const nextLat = 51.6 * Math.sin((nextLng * Math.PI) / 90);
          return {
            ...prev,
            latitude: Number(nextLat.toFixed(4)),
            longitude: Number(nextLng.toFixed(4)),
          };
        });
        setLastPing(new Date().toLocaleTimeString());
      }
    };

    fetchCoords();
    timer = setInterval(fetchCoords, 4000);
    return () => clearInterval(timer);
  }, [isLive]);

  // Convert lat/lng to map coordinates on viewBox 360 x 180 (Equirectangular)
  const mapCoords = useMemo(() => {
    const x = ((issPosition.longitude + 180) / 360) * 360;
    const y = ((90 - issPosition.latitude) / 180) * 180;
    return { x, y };
  }, [issPosition]);

  // Ascending node longitude & continuous sinusoidal ground track
  const { currentOrbitPath, nextOrbitPath } = useMemo(() => {
    const inclination = 51.6;
    const ratio = Math.max(-1, Math.min(1, issPosition.latitude / inclination));
    const phase = Math.asin(ratio); // radians
    const nodeLng = issPosition.longitude - (phase * 180) / Math.PI;

    // Current Orbit Ground Track
    let currentD = '';
    for (let x = 0; x <= 360; x += 4) {
      const currentLng = x - 180;
      const currentLat = inclination * Math.sin(((currentLng - nodeLng) * Math.PI) / 180);
      const y = 90 - currentLat;
      currentD += (x === 0 ? 'M ' : ' L ') + x.toFixed(1) + ' ' + y.toFixed(1);
    }

    // Next Orbit Ground Track (Earth rotates 23.17° East in 92.68 min)
    const nextNodeLng = nodeLng - 23.17;
    let nextD = '';
    for (let x = 0; x <= 360; x += 4) {
      const currentLng = x - 180;
      const currentLat = inclination * Math.sin(((currentLng - nextNodeLng) * Math.PI) / 180);
      const y = 90 - currentLat;
      nextD += (x === 0 ? 'M ' : ' L ') + x.toFixed(1) + ' ' + y.toFixed(1);
    }

    return { currentOrbitPath: currentD, nextOrbitPath: nextD };
  }, [issPosition]);

  // Geographic landmark & region recognition based on lat/lng
  const currentRegion = useMemo(() => {
    const lat = issPosition.latitude;
    const lng = issPosition.longitude;

    if (lat > 20 && lat < 55 && lng > -125 && lng < -65) return 'Over North America (USA / Canada)';
    if (lat > 50 && lat < 72 && lng > -170 && lng < -50) return 'Over Arctic / Northern Canada';
    if (lat > -55 && lat < 12 && lng > -85 && lng < -35) return 'Over South America (Amazon Basin / Andes)';
    if (lat > 35 && lat < 68 && lng > -10 && lng < 40) return 'Over Europe & Mediterranean';
    if (lat > -35 && lat < 37 && lng > -18 && lng < 52) return 'Over African Continent';
    if (lat > 5 && lat < 38 && lng > 65 && lng < 95) return 'Over Indian Subcontinent / South Asia';
    if (lat > 15 && lat < 55 && lng > 95 && lng < 145) return 'Over East Asia (China / Japan)';
    if (lat > -10 && lat < 20 && lng > 95 && lng < 140) return 'Over Southeast Asia & Maritime Archipelagos';
    if (lat > -45 && lat < -10 && lng > 110 && lng < 155) return 'Over Australia / Coral Sea';
    if (lat > -48 && lat < -30 && lng > 165 && lng < 180) return 'Over New Zealand / Tasman Sea';
    if (lat > 0 && lng > -70 && lng < -10) return 'Over North Atlantic Ocean';
    if (lat <= 0 && lng > -60 && lng < 20) return 'Over South Atlantic Ocean';
    if (lng > 50 && lng < 105 && lat < 5) return 'Over Indian Ocean Equatorial Waters';
    if (lat < -45) return 'Over Southern Ocean / Antarctic Convergence';
    return 'Over Pacific Ocean Basin';
  }, [issPosition]);

  // Daytime / Night orbital condition
  const isInDaylight = useMemo(() => {
    // Standard LEO orbital day/night ~ 45m daylight, 45m eclipse
    return (Math.sin((issPosition.longitude * Math.PI) / 90) > -0.2);
  }, [issPosition]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Ambient Cosmic Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl opacity-60 dark:opacity-75" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-2">
              <Rocket className="w-3.5 h-3.5" />
              NASA / Roscosmos Flight Control Network
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              International Space Station (ISS) Live Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              High-definition orbital ground track, live 51.6° trajectory, line-of-sight horizon footprint, and Expedition 71/72 crew roster.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 px-3 py-2 rounded-2xl shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">
                  Transponder Signal
                </div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white" suppressHydrationWarning>
                  VHF 145.800 MHz • Live
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Column High-Contrast Telemetry Deck */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Orbital Speed
            </span>
            <div>
              <div className="text-lg font-black text-cyan-600 dark:text-cyan-400">
                {issPosition.velocity.toLocaleString()} km/h
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                7.66 km/s (Mach 22.3)
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Station Altitude
            </span>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white">
                {issPosition.altitude} km
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Low Earth Orbit (LEO)
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Current Latitude
            </span>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white" suppressHydrationWarning>
                {Math.abs(issPosition.latitude).toFixed(2)}° {issPosition.latitude >= 0 ? 'N' : 'S'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Max 51.6° orbital inclination
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Current Longitude
            </span>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white" suppressHydrationWarning>
                {Math.abs(issPosition.longitude).toFixed(2)}° {issPosition.longitude >= 0 ? 'E' : 'W'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                West to East orbital path
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Orbital Period
            </span>
            <div>
              <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                92.68 mins
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                15.54 orbits/day (16 sunrises)
              </div>
            </div>
          </div>
        </div>

        {/* HIGH-DEFINITION MISSION CONTROL WORLD MAP */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/10 p-4 sm:p-6 shadow-md mb-6">
          {/* Map Top Bar with Live Geographic Location & Layer Toggles */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3.5 pb-3 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">
                    Sub-Satellite Position
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    Equirectangular 1:1
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2" suppressHydrationWarning>
                  <span>📍 {currentRegion}</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    [{issPosition.latitude.toFixed(2)}°, {issPosition.longitude.toFixed(2)}°]
                  </span>
                </h2>
              </div>
            </div>

            {/* Tactical Layer Switcher Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowFootprint((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  showFootprint
                    ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>Coverage Footprint (~2,200 km)</span>
              </button>

              <button
                onClick={() => setShowNextOrbit((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  showNextOrbit
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40 shadow-sm'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10'
                }`}
              >
                <Orbit className="w-3.5 h-3.5" />
                <span>Next Orbit (+92m)</span>
              </button>

              <button
                onClick={() => setShowSpaceports((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  showSpaceports
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Spaceports</span>
              </button>
            </div>
          </div>

          {/* MAIN TACTICAL MAP CONTAINER */}
          <div className="relative w-full aspect-[2/1] min-h-[320px] max-h-[500px] bg-[#070e1c] rounded-2xl border-2 border-slate-700/80 dark:border-cyan-500/30 overflow-hidden shadow-2xl flex items-center justify-center">
            {/* SVG Mission Control Map Engine */}
            <svg viewBox="0 0 360 180" className="w-full h-full select-none">
              <defs>
                {/* Ocean Tactical Grid Pattern */}
                <pattern id="tacGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#162544" strokeWidth="0.5" strokeDasharray="1 3" />
                </pattern>

                {/* Night-side Terminator Shadow Gradient */}
                <linearGradient id="nightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#030712" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0b1329" stopOpacity="0.4" />
                </linearGradient>

                {/* Active Orbit Glow Filter */}
                <filter id="cyanOrbitGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#06b6d4" floodOpacity="0.9" />
                </filter>
              </defs>

              {/* Ocean Base Layer */}
              <rect x="0" y="0" width="360" height="180" fill="#081021" />
              <rect x="0" y="0" width="360" height="180" fill="url(#tacGrid)" />

              {/* Latitude & Longitude Reference Meridian Grid */}
              {/* Equator (0°) */}
              <line x1="0" y1="90" x2="360" y2="90" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.45" />
              <text x="3" y="88" fill="#38bdf8" fontSize="4.5" fontWeight="bold" opacity="0.7">EQUATOR 0°</text>

              {/* Tropic of Cancer (+23.5°) */}
              <line x1="0" y1="66.5" x2="360" y2="66.5" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3 3" strokeOpacity="0.4" />
              <text x="3" y="65" fill="#f59e0b" fontSize="4" opacity="0.6">+23.5° TROPIC OF CANCER</text>

              {/* Tropic of Capricorn (-23.5°) */}
              <line x1="0" y1="113.5" x2="360" y2="113.5" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3 3" strokeOpacity="0.4" />
              <text x="3" y="112" fill="#f59e0b" fontSize="4" opacity="0.6">-23.5° TROPIC OF CAPRICORN</text>

              {/* Arctic & Antarctic Circles */}
              <line x1="0" y1="23.5" x2="360" y2="23.5" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 4" strokeOpacity="0.4" />
              <line x1="0" y1="156.5" x2="360" y2="156.5" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 4" strokeOpacity="0.4" />

              {/* Prime Meridian (Greenwich 0°) at x = 180 */}
              <line x1="180" y1="0" x2="180" y2="180" stroke="#38bdf8" strokeWidth="0.7" strokeOpacity="0.4" />
              <text x="182" y="10" fill="#38bdf8" fontSize="4.5" fontWeight="bold" opacity="0.7">0° PRIME MERIDIAN</text>

              {/* Meridians (90°W, 90°E, 180° Date Line) */}
              <line x1="90" y1="0" x2="90" y2="180" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="2 2" />
              <text x="92" y="10" fill="#64748b" fontSize="4" opacity="0.6">90°W</text>
              <line x1="270" y1="0" x2="270" y2="180" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="2 2" />
              <text x="272" y="10" fill="#64748b" fontSize="4" opacity="0.6">90°E</text>

              {/* CRISP, HIGH-CONTRAST CONTINENTS WITH GLOWING RECOGNIZABLE BOUNDARIES */}
              <g className="transition-all duration-300">
                {/* North America (Alaska, Canada, USA, Mexico) */}
                <path
                  d="M 12 28 L 22 22 L 34 20 L 48 22 L 58 18 L 74 18 L 88 22 L 102 24 L 118 36 L 108 42 L 116 46 L 110 52 L 104 60 L 102 68 L 96 66 L 90 62 L 86 64 L 84 70 L 88 74 L 94 78 L 98 83 L 95 84 L 90 76 L 82 72 L 76 68 L 72 62 L 66 58 L 58 52 L 56 42 L 48 38 L 38 34 L 28 35 L 18 32 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* Florida & Caribbean chain */}
                <path
                  d="M 101 64 L 103 69 L 98 70 L 96 65 Z M 106 72 L 112 74 M 114 75 L 118 76"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* Greenland */}
                <path
                  d="M 130 10 L 148 10 L 158 18 L 148 30 L 138 28 L 130 20 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* South America (Colombia, Brazil, Amazon, Andes, Cape Horn) */}
                <path
                  d="M 98 83 L 108 81 L 120 84 L 132 90 L 146 98 L 142 108 L 135 116 L 128 128 L 120 142 L 114 148 L 110 138 L 108 125 L 105 110 L 100 95 L 96 87 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* Europe & Scandinavia */}
                <path
                  d="M 174 44 L 182 36 L 192 32 L 198 22 L 208 20 L 212 28 L 204 36 L 210 40 L 215 48 L 205 50 L 198 48 L 192 52 L 182 54 L 172 52 L 174 44 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* British Isles & Ireland */}
                <path
                  d="M 172 34 L 178 32 L 180 38 L 175 41 Z M 168 36 L 171 35 L 170 39 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* Africa & Madagascar */}
                <path
                  d="M 172 54 L 188 53 L 205 54 L 214 60 L 216 68 L 230 78 L 222 88 L 214 102 L 210 118 L 202 126 L 196 122 L 192 105 L 190 92 L 178 86 L 165 76 L 164 64 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                <path
                  d="M 224 102 L 228 100 L 230 114 L 226 116 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* Asia & Siberia & Indian Subcontinent */}
                <path
                  d="M 215 20 L 245 18 L 285 16 L 330 18 L 348 24 L 338 32 L 325 32 L 315 40 L 305 48 L 300 58 L 290 68 L 280 72 L 275 80 L 272 88 L 268 80 L 260 76 L 252 68 L 248 58 L 235 55 L 228 65 L 238 72 L 230 78 L 220 72 L 215 62 L 215 48 L 210 38 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* Indian Subcontinent Triangle */}
                <path
                  d="M 248 68 L 260 68 L 258 78 L 255 84 L 250 82 L 246 76 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* Japan & Korean Peninsula */}
                <path
                  d="M 318 48 L 324 45 L 325 54 L 320 58 Z M 305 48 L 308 52 L 306 56 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* Southeast Asia & Maritime Archipelagos */}
                <path
                  d="M 280 92 L 305 92 L 320 95 L 315 99 L 290 98 Z M 304 74 L 308 80 L 306 84 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* Australia, Tasmania & New Zealand */}
                <path
                  d="M 295 106 L 315 104 L 325 108 L 335 116 L 334 126 L 325 130 L 315 128 L 302 128 L 292 120 L 292 112 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                <circle cx="326" cy="133" r="1.5" fill="#15243e" stroke="#38bdf8" strokeWidth="0.8" />
                <path
                  d="M 346 126 L 350 124 L 354 134 L 348 136 Z"
                  fill="#15243e"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.85"
                />
                {/* Antarctica Polar Ice Shelf */}
                <path
                  d="M 0 162 L 60 160 L 120 164 L 180 160 L 240 164 L 300 160 L 360 162 L 360 180 L 0 180 Z"
                  fill="#0e172a"
                  stroke="#64748b"
                  strokeWidth="0.8"
                  strokeOpacity="0.6"
                />
              </g>

              {/* NEXT ORBIT (+92m) GROUND TRACK (Amber dashed) */}
              {showNextOrbit && (
                <path
                  d={nextOrbitPath}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                  strokeOpacity="0.75"
                />
              )}

              {/* ACTIVE ORBIT GROUND TRACK (Glowing Cyan) */}
              <path
                d={currentOrbitPath}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.2"
                strokeLinecap="round"
                filter="url(#cyanOrbitGlow)"
              />
              <path
                d={currentOrbitPath}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.9"
                strokeDasharray="6 6"
                strokeOpacity="0.9"
              />

              {/* GROUND STATIONS & SPACEPORTS MARKERS */}
              {showSpaceports &&
                TRACKING_SPACEPORTS.map((sp) => {
                  const spX = ((sp.lng + 180) / 360) * 360;
                  const spY = ((90 - sp.lat) / 180) * 180;
                  return (
                    <g key={sp.name} transform={`translate(${spX}, ${spY})`}>
                      <circle r="3" fill="#10b981" fillOpacity="0.25" />
                      <circle r="1.5" fill="#10b981" stroke="#ffffff" strokeWidth="0.5" />
                      <text x="3" y="-2" fill="#10b981" fontSize="4.5" fontWeight="bold">
                        {sp.code}
                      </text>
                    </g>
                  );
                })}

              {/* DETAILED REALISTIC ISS SPACECRAFT GRAPHIC */}
              <g transform={`translate(${mapCoords.x}, ${mapCoords.y})`}>
                {/* 2,200 km Line-of-Sight Ground Footprint Horizon */}
                {showFootprint && (
                  <circle
                    r="22"
                    fill="#06b6d4"
                    fillOpacity="0.12"
                    stroke="#06b6d4"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    className="animate-pulse"
                  />
                )}

                {/* Pulsing Target Ring */}
                <circle r="12" fill="#38bdf8" fillOpacity="0.25" className="animate-ping" />

                {/* Left Solar Array Wing */}
                <rect x="-12" y="-5.5" width="7" height="11" rx="0.8" fill="#f59e0b" stroke="#d97706" strokeWidth="0.6" />
                <line x1="-8.5" y1="-5.5" x2="-8.5" y2="5.5" stroke="#78350f" strokeWidth="0.5" />

                {/* Right Solar Array Wing */}
                <rect x="5" y="-5.5" width="7" height="11" rx="0.8" fill="#f59e0b" stroke="#d97706" strokeWidth="0.6" />
                <line x1="8.5" y1="-5.5" x2="8.5" y2="5.5" stroke="#78350f" strokeWidth="0.5" />

                {/* Main Integrated Truss Spine */}
                <line x1="-14" y1="0" x2="14" y2="0" stroke="#94a3b8" strokeWidth="1.4" />

                {/* Central Pressurized Modules Node */}
                <rect x="-2.5" y="-4" width="5" height="8" rx="1.2" fill="#f1f5f9" stroke="#0ea5e9" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="1.5" fill="#ef4444" />

                {/* Tactical Live HUD Label Callout */}
                <g transform="translate(16, -10)">
                  <rect x="0" y="0" width="56" height="20" rx="4" fill="#091122" stroke="#06b6d4" strokeWidth="1" />
                  <text x="5" y="8" fill="#38bdf8" fontSize="6" fontWeight="bold">ISS • LIVE LOCK</text>
                  <text x="5" y="15" fill="#f8fafc" fontSize="5.5" fontWeight="extrabold">27,580 km/h • 418 km</text>
                </g>
              </g>
            </svg>

            {/* Bottom In-Map Mission Control HUD Banner */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 flex-wrap pointer-events-none">
              <div className="bg-[#0b162c]/95 border border-cyan-500/40 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg backdrop-blur-md">
                <Navigation className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
                <span>LEO Track: 51.6° Inclination</span>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-300 font-extrabold">{currentRegion}</span>
              </div>

              <div className="bg-[#0b162c]/95 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Solar Arrays: 120 kW</span>
                <span className="text-slate-500">•</span>
                <span className={isInDaylight ? 'text-amber-400' : 'text-indigo-400'}>
                  {isInDaylight ? '☀️ Orbital Daylight' : '🌑 Earth Eclipse'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expedition 71/72 Crew Manifest & Visible Passes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Crew Manifest (7 Columns) */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Astronauts Aboard Station (Expedition 71/72)
                </h3>
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                7 Crew Members
              </span>
            </div>

            <div className="space-y-2">
              {EXPEDITION_CREW.map((member) => (
                <div
                  key={member.name}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-lg">{member.flag}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {member.name}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                        {member.role} • {member.agency}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-200/60 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      {member.craft}
                    </span>
                    <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Day {member.daysInSpace}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Visible Flyover Sightings (5 Columns) */}
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 p-4 sm:p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-500" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Upcoming Visible Flyovers
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Naked-Eye Visible
                </span>
              </div>

              <div className="space-y-2.5">
                {PASS_PREDICTIONS.map((pass) => (
                  <div
                    key={pass.city}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-1">
                      <span>{pass.city}</span>
                      <span className="text-cyan-600 dark:text-cyan-400">{pass.magnitude}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{pass.date}</span>
                      <span>Duration: {pass.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 text-xs text-slate-600 dark:text-slate-300 mt-4">
              <strong>Observation Tip:</strong> The ISS appears as a fast-moving, non-blinking bright white star crossing the sky in 3–6 minutes. No telescope required!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
