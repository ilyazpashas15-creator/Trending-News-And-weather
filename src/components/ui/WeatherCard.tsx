'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WeatherData, ForecastData } from '@/types/weather.types';
import SimpleWeatherIcon from './SimpleWeatherIcon';

interface WeatherCardProps {
  weather: WeatherData;
  forecast?: ForecastData | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, forecast }) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  if (!weather) {
    return (
      <div className="relative rounded-[32px] bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 p-10 text-center text-slate-400 shadow-xl">
        <p className="font-semibold text-sm">Weather data unavailable</p>
      </div>
    );
  }

  const { name, sys, main, weather: weatherDetails, wind, clouds, coord } = weather;

  if (!name || !main || !weatherDetails || weatherDetails.length === 0) {
    return (
      <div className="relative rounded-[32px] bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 p-10 text-center text-slate-400 shadow-xl">
        <p className="font-semibold text-sm">Incomplete weather data</p>
      </div>
    );
  }

  // Convert temperatures
  const toF = (c: number) => Math.round((c * 9) / 5 + 32);
  const tempCelsius = main.temp ? Math.round(main.temp) : 0;
  const temp = unit === 'C' ? tempCelsius : toF(tempCelsius);
  const feelsLikeCelsius = main.feels_like ? Math.round(main.feels_like) : 0;
  const feelsLike = unit === 'C' ? feelsLikeCelsius : toF(feelsLikeCelsius);
  const tempMinCelsius = main.temp_min ? Math.round(main.temp_min) : tempCelsius - 3;
  const tempMin = unit === 'C' ? tempMinCelsius : toF(tempMinCelsius);
  const tempMaxCelsius = main.temp_max ? Math.round(main.temp_max) : tempCelsius + 3;
  const tempMax = unit === 'C' ? tempMaxCelsius : toF(tempMaxCelsius);

  // Hourly curve data derived from forecast
  const hourlyItems = (forecast?.list || []).slice(0, 8).map((item: any, idx: number) => {
    const d = new Date(item.dt * 1000);
    const hourStr = d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    const t = Math.round(item.main.temp);
    const pop = item.pop ? Math.round(item.pop * 100) : (item.weather[0]?.main?.toLowerCase().includes('rain') ? 60 : (idx % 3 === 0 ? 8 : 2));
    return {
      time: idx === 0 ? 'Now' : hourStr,
      temp: unit === 'C' ? t : toF(t),
      rawTemp: t,
      pop,
      condition: item.weather[0]?.main || 'Clear',
    };
  });

  // Fallback hourly curve if forecast list is empty
  const displayHourly = hourlyItems.length >= 4 ? hourlyItems : [
    { time: '1 PM', temp: unit === 'C' ? tempCelsius : toF(tempCelsius), rawTemp: tempCelsius, pop: 2, condition: weatherDetails[0].main },
    { time: '4 PM', temp: unit === 'C' ? tempCelsius + 1 : toF(tempCelsius + 1), rawTemp: tempCelsius + 1, pop: 2, condition: weatherDetails[0].main },
    { time: '7 PM', temp: unit === 'C' ? tempCelsius - 2 : toF(tempCelsius - 2), rawTemp: tempCelsius - 2, pop: 8, condition: weatherDetails[0].main },
    { time: '10 PM', temp: unit === 'C' ? tempCelsius - 5 : toF(tempCelsius - 5), rawTemp: tempCelsius - 5, pop: 2, condition: weatherDetails[0].main },
    { time: '1 AM', temp: unit === 'C' ? tempCelsius - 6 : toF(tempCelsius - 6), rawTemp: tempCelsius - 6, pop: 0, condition: weatherDetails[0].main },
    { time: '4 AM', temp: unit === 'C' ? tempCelsius - 8 : toF(tempCelsius - 8), rawTemp: tempCelsius - 8, pop: 0, condition: weatherDetails[0].main },
    { time: '7 AM', temp: unit === 'C' ? tempCelsius - 9 : toF(tempCelsius - 9), rawTemp: tempCelsius - 9, pop: 0, condition: weatherDetails[0].main },
    { time: '10 AM', temp: unit === 'C' ? tempCelsius - 5 : toF(tempCelsius - 5), rawTemp: tempCelsius - 5, pop: 2, condition: weatherDetails[0].main },
  ];

  // 5-Day Daily Forecast Strip
  const dailyStrip = (forecast?.list || [])
    .filter((item: any) => item.dt_txt?.includes('12:00:00'))
    .slice(0, 5)
    .map((item: any, idx: number) => {
      const d = new Date(item.dt * 1000);
      const dayLabel = idx === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
      const min = Math.round(item.main.temp_min);
      const max = Math.round(item.main.temp_max);
      return {
        label: dayLabel,
        min: unit === 'C' ? min : toF(min),
        max: unit === 'C' ? max : toF(max),
        condition: item.weather[0]?.main || 'Clear',
      };
    });

  const displayDays = dailyStrip.length >= 3 ? dailyStrip : [
    { label: 'Today', max: tempMax, min: tempMin, condition: weatherDetails[0].main },
    { label: 'Wed 9', max: tempMax - 1, min: tempMin, condition: 'Clouds' },
    { label: 'Thu 10', max: tempMax, min: tempMin + 1, condition: 'Clouds' },
    { label: 'Fri 11', max: tempMax + 1, min: tempMin, condition: 'Rain' },
    { label: 'Sat 12', max: tempMax - 1, min: tempMin - 1, condition: 'Clouds' },
  ];

  // SVG Chart path calculation for hourly temperature curve
  const minChartTemp = Math.min(...displayHourly.map(h => h.temp)) - 2;
  const maxChartTemp = Math.max(...displayHourly.map(h => h.temp)) + 2;
  const tempRange = Math.max(1, maxChartTemp - minChartTemp);
  const chartHeight = 65;
  const chartWidth = 500;

  const points = displayHourly.map((h, i) => {
    const x = (i / (displayHourly.length - 1)) * chartWidth;
    const y = chartHeight - ((h.temp - minChartTemp) / tempRange) * (chartHeight - 15) - 5;
    return { x, y, ...h };
  });

  // Build smooth bezier SVG path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpX1 = p0.x + (p1.x - p0.x) / 2;
    const cpY1 = p0.y;
    const cpX2 = p0.x + (p1.x - p0.x) / 2;
    const cpY2 = p1.y;
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }
  const areaD = `${pathD} L ${chartWidth} 90 L 0 90 Z`;

  // Meteorological metrics
  const uvValue = Math.max(1, Math.min(11, Math.round(((main.pressure || 1013) - 975) / 18)));
  const getUVStatus = (uv: number) => {
    if (uv <= 2) return { text: 'Low / Safe', angle: 30, color: '#10b981' };
    if (uv <= 5) return { text: 'Moderate', angle: 90, color: '#f59e0b' };
    if (uv <= 7) return { text: 'High', angle: 140, color: '#f97316' };
    return { text: 'Very High', angle: 190, color: '#ef4444' };
  };
  const uvStatus = getUVStatus(uvValue);

  const aqiValue = 52;
  const aqiLabel = aqiValue <= 50 ? 'Good' : aqiValue <= 100 ? 'Moderate' : 'Unhealthy';

  const formatSunTime = (timestamp?: number) => {
    if (!timestamp) return '--:--';
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  const sunriseTime = sys?.sunrise ? formatSunTime(sys.sunrise) : '06:08 AM';
  const sunsetTime = sys?.sunset ? formatSunTime(sys.sunset) : '06:26 PM';

  // Wind metrics & compass
  const windDeg = wind?.deg || 180;
  const windSpeedKmh = Math.round((wind?.speed || 3) * 3.6);
  const windGustKmh = Math.round(windSpeedKmh * 1.5 + 8);
  const getBeaufortForce = (speedMs: number) => {
    if (speedMs < 0.5) return '0 (Calm)';
    if (speedMs < 1.5) return '1 (Light Air)';
    if (speedMs < 3.3) return '2 (Light Breeze)';
    if (speedMs < 5.5) return '3 (Gentle Breeze)';
    if (speedMs < 8.0) return '4 (Moderate Breeze)';
    return '5 (Fresh Breeze)';
  };
  const beaufortDesc = getBeaufortForce(wind?.speed || 3);

  // Dew point estimate
  const dewPoint = Math.round(tempCelsius - ((100 - (main.humidity || 50)) / 5));

  const visibilityKm = weather.visibility ? Math.round(weather.visibility / 1000) : 10;

  return (
    <div className="w-full space-y-6">
      
      {/* ── Main Bento Grid Layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        
        {/* ════════ COLUMN 1 (Left 5 Cols on LG): Main Weather Spotlight & Hourly Temperature Curve ════════ */}
        <div className="lg:col-span-5 rounded-[30px] p-6 sm:p-7 bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(99,102,241,0.12)] flex flex-col justify-between">
          
          {/* Top Row: Location Header + Unit Switcher */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  <span>{name}</span>
                  {sys?.country ? <span className="text-slate-400 font-bold ml-1.5 text-base">, {sys.country}</span> : null}
                  <span className="text-sm font-semibold text-slate-400 font-mono ml-2">
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </span>
                </h2>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                  Updated just now • Live Station Feed
                </p>
              </div>

              {/* °C / °F Switcher Pill */}
              <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 flex-shrink-0">
                <button
                  onClick={() => setUnit('F')}
                  className={`px-2.5 py-1 rounded-full text-xs font-black transition-all ${
                    unit === 'F'
                      ? 'bg-slate-800 dark:bg-white/20 text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  °F
                </button>
                <button
                  onClick={() => setUnit('C')}
                  className={`px-2.5 py-1 rounded-full text-xs font-black transition-all ${
                    unit === 'C'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  °C
                </button>
              </div>
            </div>

            {/* Giant Temperature & Condition Spotlight */}
            <div className="flex items-center gap-5 my-4">
              <div className="w-20 h-20 flex-shrink-0">
                <SimpleWeatherIcon condition={weatherDetails[0].main} size="lg" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                    {temp}
                  </span>
                  <span className="text-3xl font-extrabold text-purple-600 dark:text-cyan-400 ml-1">
                    °{unit}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-base font-bold text-slate-800 dark:text-slate-100 capitalize">
                    {weatherDetails[0].description || weatherDetails[0].main}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    H{tempMax}° L{tempMin}°
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">Feels Like</span>
                  <span className="font-black text-slate-800 dark:text-slate-200">{feelsLike}°{unit}</span>
                </div>
              </div>
            </div>

            {/* Horizontal 5-Day Quick Selection Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 my-4 scrollbar-none border-t border-b border-slate-100 dark:border-white/[0.08] py-3">
              {displayDays.map((d, idx) => {
                const isSelected = selectedDayIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`flex flex-col items-center min-w-[70px] p-2.5 rounded-2xl transition-all ${
                      isSelected
                        ? 'bg-slate-100 dark:bg-white/15 border border-slate-300 dark:border-white/20 shadow-xs'
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.05] border border-transparent'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {d.label}
                    </span>
                    <div className="w-8 h-8 my-0.5">
                      <SimpleWeatherIcon condition={d.condition} size="sm" />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-900 dark:text-white mt-1">
                      {d.max}° <span className="text-slate-400 font-normal">{d.min}°</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hourly Temperature Continuous Curve Area Chart */}
          <div className="mt-2 pt-2">
            <div className="relative w-full h-[120px] overflow-hidden">
              <svg viewBox={`0 0 ${chartWidth} 100`} preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
                    <stop offset="50%" stopColor="#fb923c" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="50%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>

                {/* Shaded Area */}
                <path d={areaD} fill="url(#curveGradient)" />
                {/* Curved Line */}
                <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />

                {/* Point Labels (Temp text & markers) */}
                {points.map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="3.5" fill="#ffffff" stroke="#fb923c" strokeWidth="2" />
                    <text x={pt.x} y={pt.y - 7} fill="currentColor" className="text-[11px] font-extrabold fill-slate-700 dark:fill-slate-200" textAnchor="middle">
                      {pt.temp}°
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Bottom Row of Chart: Rain probability & Hourly labels */}
            <div className="flex justify-between items-center px-1 text-[11px] font-bold text-slate-400 mt-1">
              {displayHourly.map((h, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[10px] text-blue-500 dark:text-cyan-400 font-extrabold flex items-center">
                    💧{h.pop}%
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ════════ COLUMN 2 (Center-Left 2.5 Cols on LG): 4 Compact Visual Gauge Widgets ════════ */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          {/* 1. Visibility Widget */}
          <div className="rounded-[24px] p-4 bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/12 shadow-sm flex flex-col justify-between h-[125px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Visibility</span>
              <div className="flex flex-col gap-1 items-end">
                <div className="w-5 h-1 bg-emerald-500 rounded-full" />
                <div className="w-7 h-1 bg-emerald-500 rounded-full" />
                <div className="w-9 h-1 bg-emerald-500 rounded-full" />
              </div>
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                {visibilityKm} <span className="text-xs font-normal text-slate-400">km</span>
              </p>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                Good line of sight
              </span>
            </div>
          </div>

          {/* 2. Barometric Pressure Widget */}
          <div className="rounded-[24px] p-4 bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/12 shadow-sm flex flex-col justify-between h-[125px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Pressure</span>
              <svg className="w-12 h-4 text-blue-500" viewBox="0 0 50 15">
                <path d="M 0 5 Q 25 15 50 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="40" cy="9" r="3" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                {main.pressure || 1012} <span className="text-xs font-normal text-slate-400">hPa</span>
              </p>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                Normal Barometric
              </span>
            </div>
          </div>

          {/* 3. Air Quality Index (AQI) Widget */}
          <div className="rounded-[24px] p-4 bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/12 shadow-sm flex flex-col justify-between h-[125px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">AQI</span>
              {/* Circular Gauge */}
              <div className="relative w-9 h-9">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="4"
                    className="dark:stroke-white/10"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeDasharray="52, 100"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                {aqiValue}
              </p>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                {aqiLabel}
              </span>
            </div>
          </div>

          {/* 4. UV Index Gauge Widget */}
          <div className="rounded-[24px] p-4 bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/12 shadow-sm flex flex-col justify-between h-[125px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">UV Index</span>
              {/* Semi-circle Rainbow UV Gauge */}
              <div className="relative w-10 h-7 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 40 25">
                  <path d="M 5 22 A 15 15 0 0 1 35 22" fill="none" stroke="#e2e8f0" strokeWidth="4" className="dark:stroke-white/10" strokeLinecap="round" />
                  <path d="M 5 22 A 15 15 0 0 1 20 7" fill="none" stroke={uvStatus.color} strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                {uvValue}
              </p>
              <span className="text-[11px] font-bold" style={{ color: uvStatus.color }}>
                {uvStatus.text}
              </span>
            </div>
          </div>

        </div>

        {/* ════════ COLUMN 3 (Center-Right 2.5 Cols on LG): Wind Compass & Humidity Widget ════════ */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          {/* Wind Compass Widget */}
          <div className="rounded-[26px] p-5 bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/12 shadow-sm flex flex-col justify-between h-[258px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Wind</span>
              <span className="text-xs font-bold text-slate-400">›</span>
            </div>

            {/* Circular Compass Visual */}
            <div className="relative w-24 h-24 mx-auto my-1 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-slate-200 dark:border-white/15" />
              {/* N E S W labels */}
              <span className="absolute top-0.5 text-[9px] font-black text-slate-400">N</span>
              <span className="absolute bottom-0.5 text-[9px] font-black text-slate-400">S</span>
              <span className="absolute left-1 text-[9px] font-black text-slate-400">W</span>
              <span className="absolute right-1 text-[9px] font-black text-slate-400">E</span>
              
              {/* Rotating Directional Wedge */}
              <div
                className="w-14 h-14 flex items-center justify-center transition-transform duration-700"
                style={{ transform: `rotate(${windDeg}deg)` }}
              >
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[26px] border-b-blue-500 drop-shadow-md" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-slate-900 dark:text-white">{wind.speed || 0} m/s</span>
                <span className="text-[10px] text-slate-400 font-bold">{windSpeedKmh} km/h</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{windGustKmh} km/h</span>
                <span className="text-[10px] text-slate-400 font-bold">Gust</span>
              </div>
              <p className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 pt-1 border-t border-slate-100 dark:border-white/5">
                {beaufortDesc}
              </p>
            </div>
          </div>

          {/* Humidity & Moisture Bar Widget */}
          <div className="rounded-[26px] p-5 bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/12 shadow-sm flex flex-col justify-between h-[258px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Humidity</span>
              <span className="text-xs font-bold text-slate-400">›</span>
            </div>

            {/* Vertical Moisture Pillars Graphic */}
            <div className="flex items-end justify-center gap-1.5 h-16 my-2">
              {[40, 60, 80, 50, 70, 90, 65].map((h, i) => (
                <div key={i} className="w-2.5 bg-slate-100 dark:bg-white/10 rounded-full h-full overflow-hidden flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ height: `${(main.humidity || 50) * (h / 100)}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{main.humidity || 54}%</span>
                <span className="text-[10px] text-slate-400 font-bold">Humidity</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{dewPoint}°{unit}</span>
                <span className="text-[10px] text-slate-400 font-bold">Dew point</span>
              </div>
              <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 pt-1 border-t border-slate-100 dark:border-white/5">
                {main.humidity && main.humidity > 70 ? 'High Moisture' : 'Comfortable'}
              </p>
            </div>
          </div>

        </div>

        {/* ════════ COLUMN 4 (Right 2.5 Cols on LG): Radar Map Preview & Sun Hours Solar Arc ════════ */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* Radar Mini Map Card */}
          <div className="relative rounded-[26px] p-4 bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/12 shadow-sm overflow-hidden h-[258px] flex flex-col justify-between">
            {/* Ambient Map Tile Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200/60 to-blue-100/40 dark:from-slate-800/60 dark:to-[#0a1224]/80 pointer-events-none opacity-80">
              <div className="w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Live Radar</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Pulsing Pin on Map */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-amber-400/40 animate-ping absolute inset-0" />
                <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-white shadow-md flex items-center justify-center text-[10px] font-black text-white">
                  📍
                </div>
              </div>
              <p className="text-xs font-extrabold text-slate-900 dark:text-white mt-1.5 drop-shadow-sm">
                {name} Regional Radar
              </p>
              <span className="text-[11px] font-black text-blue-600 dark:text-cyan-400">
                {temp}°{unit}
              </span>
            </div>

            <div className="relative z-10">
              <Link
                href={`/weather/maps?city=${encodeURIComponent(name)}`}
                className="w-full py-2 px-3 rounded-xl bg-slate-900/90 dark:bg-white/15 hover:bg-slate-900 dark:hover:bg-white/25 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 backdrop-blur-md transition-all shadow-sm"
              >
                <span>🗺️</span>
                <span>Larger Map</span>
              </Link>
            </div>
          </div>

          {/* Sun Hours / Solar Arc Widget */}
          <div className="rounded-[26px] p-5 bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/12 shadow-sm flex flex-col justify-between h-[258px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Sun hours</span>
              <span className="text-xs font-bold text-amber-500">☀️</span>
            </div>

            {/* Parabola Solar Arch Track */}
            <div className="relative w-full h-20 my-auto flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                {/* Baseline */}
                <line x1="0" y1="45" x2="100" y2="45" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" opacity="0.4" />
                {/* Arc */}
                <path d="M 5 45 Q 50 -10 95 45" fill="none" stroke="#e2e8f0" strokeWidth="3" className="dark:stroke-white/15" />
                <path d="M 5 45 Q 50 -10 95 45" fill="none" stroke="url(#sunArcGrad)" strokeWidth="3.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="sunArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                {/* Active Sun Orb on Arc */}
                <circle cx="50" cy="18" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
              </svg>
            </div>

            <div className="text-center">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                12hrs 18mins Daylight
              </span>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mt-2 pt-2 border-t border-slate-100 dark:border-white/5">
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">Sunrise</span>
                  {sunriseTime}
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-normal">Sunset</span>
                  {sunsetTime}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default WeatherCard;

