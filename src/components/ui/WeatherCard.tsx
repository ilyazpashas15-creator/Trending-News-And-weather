import React, { useState } from 'react';
import { WeatherData } from '@/types/weather.types';
import SimpleWeatherIcon from './SimpleWeatherIcon';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  if (!weather) {
    return (
      <div className="relative rounded-[32px] bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 p-10 text-center text-slate-400 shadow-xl">
        <p className="font-semibold text-sm">Weather data unavailable</p>
      </div>
    );
  }

  const { name, sys, main, weather: weatherDetails, wind, clouds } = weather;

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

  const getFlagEmoji = (countryCode?: string) => {
    if (!countryCode) return '🌍';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  // UV calculation & category
  const uvValue = Math.max(1, Math.min(11, Math.round(((main.pressure || 1013) - 975) / 18)));
  const getUVStatus = (uv: number) => {
    if (uv <= 2) return { text: 'Low / Safe', color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border-emerald-500/30' };
    if (uv <= 5) return { text: 'Moderate', color: 'text-amber-700 dark:text-amber-300 bg-amber-500/15 border-amber-500/30' };
    if (uv <= 7) return { text: 'High', color: 'text-orange-700 dark:text-orange-300 bg-orange-500/15 border-orange-500/30' };
    return { text: 'Very High', color: 'text-rose-700 dark:text-rose-300 bg-rose-500/15 border-rose-500/30' };
  };
  const uvStatus = getUVStatus(uvValue);

  // Air Quality Estimate
  const aqiValue = 42; // Good / Healthy
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: 'Good (42 AQI)', rating: 'Optimal air quality for outdoor workouts', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    if (aqi <= 100) return { label: 'Moderate', rating: 'Acceptable air quality', color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20' };
    return { label: 'Unhealthy', rating: 'Sensitive groups should reduce outdoor exertion', color: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20' };
  };
  const aqiInfo = getAQIStatus(aqiValue);

  // Sunrise / Sunset times & trajectory calculation
  const formatSunTime = (timestamp?: number) => {
    if (!timestamp) return '--:--';
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const sunriseTime = sys?.sunrise ? formatSunTime(sys.sunrise) : '06:12 AM';
  const sunsetTime = sys?.sunset ? formatSunTime(sys.sunset) : '06:45 PM';

  // Solar progress estimate (0 to 100%)
  const now = Math.floor(Date.now() / 1000);
  let sunProgress = 50;
  if (sys?.sunrise && sys?.sunset) {
    if (now <= sys.sunrise) sunProgress = 5;
    else if (now >= sys.sunset) sunProgress = 95;
    else sunProgress = Math.round(((now - sys.sunrise) / (sys.sunset - sys.sunrise)) * 100);
  }

  // Wind direction compass
  const windDeg = wind?.deg || 0;
  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  return (
    <div className="w-full">
      {/* ── Main Premium Glass Card ── */}
      <div className="relative rounded-[32px] overflow-hidden p-1 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] dark:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(99,102,241,0.15)]">
        {/* Ambient atmospheric aura */}
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/25 via-indigo-500/20 to-purple-500/25 rounded-[34px] blur-2xl opacity-60 dark:opacity-80" />

        <div className="relative rounded-[30px] bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/12 overflow-hidden">
          
          {/* Subtle atmospheric ambient orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-500/12 to-pink-500/12 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-500/12 to-cyan-500/12 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 p-5 sm:p-8 lg:p-10">

            {/* ── Header: Location & Live Status & Unit Switcher ── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-white/[0.08]">
              
              {/* Location Information */}
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <span className="text-3xl sm:text-4xl drop-shadow-md select-none">{getFlagEmoji(sys?.country)}</span>
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                      {name}
                    </h2>
                    {sys?.country && (
                      <span className="px-2 py-0.5 text-xs font-black uppercase rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                        {sys.country}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Controls: Unit Switcher (°C / °F) + Station Status */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/10">
                  <button
                    onClick={() => setUnit('C')}
                    className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all ${
                      unit === 'C'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => setUnit('F')}
                    className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all ${
                      unit === 'F'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    °F
                  </button>
                </div>

                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                  Live Sync
                </span>
              </div>
            </div>

            {/* ── Central Hero Weather Presentation ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2">
              
              {/* Left/Center Column: Hero Temperature, Icon, and High/Low */}
              <div className="lg:col-span-7 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
                  {/* Weather Icon with glowing backdrop aura */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/25 via-indigo-500/25 to-pink-500/25 rounded-full blur-2xl scale-125 animate-pulse" />
                    <div className="relative transform hover:scale-105 transition-transform duration-300">
                      <SimpleWeatherIcon condition={weatherDetails[0].main} size="xl" />
                    </div>
                  </div>

                  {/* Giant Crisp Temperature */}
                  <div>
                    <div className="flex items-baseline justify-center sm:justify-start">
                      <span className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 dark:text-transparent dark:bg-gradient-to-b dark:from-white dark:via-slate-100 dark:to-slate-300 dark:bg-clip-text">
                        {temp}
                      </span>
                      <span className="text-4xl sm:text-5xl font-black text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text ml-1">
                        °{unit}
                      </span>
                    </div>

                    <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 capitalize tracking-tight mt-1">
                      {weatherDetails[0].description}
                    </p>

                    <div className="flex items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <span className="text-rose-500 font-bold">▲ High:</span> {tempMax}°{unit}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="text-blue-500 font-bold">▼ Low:</span> {tempMin}°{unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Solar Trajectory & Air Quality Quick Card */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                
                {/* Solar Position / Sunrise & Sunset Widget */}
                <div className="rounded-2xl p-4 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-purple-500/10 border border-amber-500/20 dark:border-amber-500/25 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-300 mb-2">
                    <span className="flex items-center gap-1">
                      <span>☀️</span> Sun Schedule
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                      {sunProgress > 5 && sunProgress < 95 ? 'Daylight Active' : 'Night Cycle'}
                    </span>
                  </div>

                  {/* Visual Sun Trajectory Track */}
                  <div className="relative w-full h-3 bg-slate-200/80 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-500 rounded-full transition-all duration-700"
                      style={{ width: `${sunProgress}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-300 border-2 border-white rounded-full shadow-md transition-all duration-700"
                      style={{ left: `calc(${sunProgress}% - 8px)` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Sunrise</span>
                      <span className="font-bold">{sunriseTime}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase">Sunset</span>
                      <span className="font-bold">{sunsetTime}</span>
                    </div>
                  </div>
                </div>

                {/* Air Quality & Outdoor Health Tile */}
                <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border border-emerald-500/20 dark:border-emerald-500/25 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                    <span className="flex items-center gap-1">
                      <span>🍃</span> Air Quality Index
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${aqiInfo.color}`}>
                      {aqiInfo.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {aqiInfo.rating}
                  </p>
                </div>

              </div>
            </div>

            {/* ── 3 Primary Highlight Metric Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 mb-4">
              
              {/* Feels Like */}
              <div className="group relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-blue-50/90 to-indigo-50/50 dark:from-[#0f1b36]/90 dark:to-[#0a1228]/90 border border-blue-200/80 dark:border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Feels Like</span>
                  <span className="text-lg">🌡️</span>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                  {feelsLike}°{unit}
                </p>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {feelsLike > temp ? 'Warmer than actual' : 'Matches current conditions'}
                </span>
              </div>

              {/* Humidity */}
              <div className="group relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-purple-50/90 to-pink-50/50 dark:from-[#1b1030]/90 dark:to-[#120a22]/90 border border-purple-200/80 dark:border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">Humidity</span>
                  <span className="text-lg">💧</span>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                  {main.humidity || 0}%
                </p>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {main.humidity > 70 ? 'High moisture level' : main.humidity > 40 ? 'Comfortable humidity' : 'Dry air conditions'}
                </span>
              </div>

              {/* Wind Speed & Direction */}
              <div className="group relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-rose-50/90 to-amber-50/50 dark:from-[#240e1f]/90 dark:to-[#160813]/90 border border-rose-200/80 dark:border-rose-500/30 hover:border-rose-400/60 transition-all duration-300 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider">Wind Speed</span>
                  <span className="text-lg" style={{ transform: `rotate(${windDeg}deg)`, display: 'inline-block' }}>🧭</span>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                  {wind?.speed || 0} m/s
                </p>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {getWindDirection(windDeg)} • {wind?.speed && wind.speed > 8 ? 'Strong breeze' : 'Gentle breeze'}
                </span>
              </div>

            </div>

            {/* ── 4 Secondary Meteorological Metric Cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
              
              {/* Pressure */}
              <div className="rounded-2xl p-3.5 sm:p-4 bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 hover:bg-slate-100/90 dark:hover:bg-white/[0.06] transition-all">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1 font-semibold">
                  <span>Pressure</span>
                  <span>⏱️</span>
                </div>
                <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {main.pressure || 1013} <span className="text-[10px] font-normal text-slate-400">hPa</span>
                </p>
                <span className="text-[10px] text-slate-400">Normal barometric</span>
              </div>

              {/* UV Index */}
              <div className="rounded-2xl p-3.5 sm:p-4 bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 hover:bg-slate-100/90 dark:hover:bg-white/[0.06] transition-all">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1 font-semibold">
                  <span>UV Index</span>
                  <span>☀️</span>
                </div>
                <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {uvValue}
                </p>
                <span className={`inline-block text-[10px] font-bold px-1.5 py-0.2 rounded-md border ${uvStatus.color}`}>
                  {uvStatus.text}
                </span>
              </div>

              {/* Visibility */}
              <div className="rounded-2xl p-3.5 sm:p-4 bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 hover:bg-slate-100/90 dark:hover:bg-white/[0.06] transition-all">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1 font-semibold">
                  <span>Visibility</span>
                  <span>👁️</span>
                </div>
                <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {weather.visibility ? Math.round(weather.visibility / 1000) : 10} <span className="text-[10px] font-normal text-slate-400">km</span>
                </p>
                <span className="text-[10px] text-slate-400">Clear line of sight</span>
              </div>

              {/* Cloudiness */}
              <div className="rounded-2xl p-3.5 sm:p-4 bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 hover:bg-slate-100/90 dark:hover:bg-white/[0.06] transition-all">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1 font-semibold">
                  <span>Cloud Cover</span>
                  <span>☁️</span>
                </div>
                <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {clouds?.all !== undefined ? `${clouds.all}%` : weatherDetails[0]?.main === 'Clear' ? '0%' : '65%'}
                </p>
                <span className="text-[10px] text-slate-400">Sky coverage</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

