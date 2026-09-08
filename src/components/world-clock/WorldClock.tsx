'use client';

import React, { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import SimpleWeatherIcon from '../ui/SimpleWeatherIcon';

interface WorldClockProps {
  city: string;
  onDelete?: () => void;
  onSelectCity?: (city: string) => void;
}

// State / Region mapping for major cities
const CITY_STATE_MAP: Record<string, string> = {
  'new delhi': 'National Capital Region',
  'delhi': 'National Capital Region',
  'mumbai': 'Maharashtra',
  'bengaluru': 'Karnataka',
  'bangalore': 'Karnataka',
  'hyderabad': 'Telangana',
  'kolkata': 'West Bengal',
  'chennai': 'Tamil Nadu',
  'ahmedabad': 'Gujarat',
  'pune': 'Maharashtra',
  'jaipur': 'Rajasthan',
  'new york': 'New York State',
  'los angeles': 'California',
  'chicago': 'Illinois',
  'houston': 'Texas',
  'miami': 'Florida',
  'san francisco': 'California',
  'london': 'Greater London',
  'manchester': 'Greater Manchester',
  'birmingham': 'West Midlands',
  'edinburgh': 'Scotland',
  'glasgow': 'Scotland',
  'tokyo': 'Tokyo Metropolis',
  'osaka': 'Kansai Region',
  'kyoto': 'Kansai Region',
  'yokohama': 'Kanagawa',
  'sapporo': 'Hokkaido',
  'sydney': 'New South Wales',
  'melbourne': 'Victoria',
  'brisbane': 'Queensland',
  'perth': 'Western Australia',
  'toronto': 'Ontario',
  'vancouver': 'British Columbia',
  'montreal': 'Quebec',
  'calgary': 'Alberta',
  'ottawa': 'Ontario',
  'dubai': 'Emirate of Dubai',
  'abu dhabi': 'Emirate of Abu Dhabi',
  'sharjah': 'Emirate of Sharjah',
  'paris': 'Île-de-France',
  'marseille': 'Provence-Alpes-Côte d\'Azur',
  'lyon': 'Auvergne-Rhône-Alpes',
  'berlin': 'Berlin State',
  'munich': 'Bavaria',
  'frankfurt': 'Hesse',
  'hamburg': 'Hamburg State',
  'singapore': 'Central Region',
};

const WorldClock: React.FC<WorldClockProps> = ({ city, onDelete, onSelectCity }) => {
  const { weatherData, loading, error, getWeatherByCity } = useWeather();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    getWeatherByCity(city);
  }, [city, getWeatherByCity]);

  useEffect(() => {
    if (!weatherData) return;

    const updateTime = () => {
      const utc = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
      const localTime = new Date(utc + (weatherData.timezone * 1000));
      setCurrentTime(localTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [weatherData]);

  if (loading) {
    return (
      <div className="rounded-3xl p-6 bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 animate-pulse flex flex-col justify-between h-[220px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-6 rounded-md bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-28" />
          </div>
          <div className="w-16 h-5 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl w-3/4 my-auto" />
        <div className="flex justify-between items-center pt-3 border-t border-slate-200/50 dark:border-white/5">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-20" />
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-24" />
        </div>
      </div>
    );
  }

  if (error || !weatherData) {
    return null;
  }

  const cityNameLower = (weatherData.name || city).toLowerCase();
  const stateName = CITY_STATE_MAP[cityNameLower] || weatherData.sys?.country || 'Region';
  const countryCode = weatherData.sys?.country?.toLowerCase() || 'un';
  const flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;

  const formattedTime = currentTime?.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = currentTime?.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const localHour = currentTime ? currentTime.getHours() : 12;
  const isDay = localHour >= 6 && localHour < 19;

  // Time difference relative to user's local clock
  const localOffsetMinutes = -new Date().getTimezoneOffset();
  const cityOffsetMinutes = weatherData.timezone / 60;
  const diffHours = (cityOffsetMinutes - localOffsetMinutes) / 60;
  const diffString = diffHours === 0 ? 'Same time' : diffHours > 0 ? `+${diffHours}h ahead` : `${diffHours}h behind`;

  const condition = weatherData.weather[0]?.main || 'Clear';
  const temp = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind?.speed || 0;

  // Atmospheric card theme color accents
  const getAtmosphericGlow = () => {
    const c = condition.toLowerCase();
    if (c.includes('clear') || c.includes('sun')) {
      return isDay 
        ? 'from-amber-500/15 via-orange-500/10 to-blue-500/10' 
        : 'from-indigo-500/15 via-purple-500/10 to-slate-900/10';
    }
    if (c.includes('rain') || c.includes('drizzle')) {
      return 'from-blue-600/15 via-cyan-500/10 to-indigo-500/10';
    }
    if (c.includes('thunderstorm')) {
      return 'from-purple-600/15 via-amber-500/10 to-slate-900/10';
    }
    return 'from-blue-500/10 via-purple-500/10 to-pink-500/10';
  };

  return (
    <div className="group relative">
      {/* Outer ambient glow on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-[28px] blur opacity-10 group-hover:opacity-60 transition duration-500 pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <div className={`relative rounded-[26px] bg-gradient-to-br ${getAtmosphericGlow()} bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/12 p-5 sm:p-6 shadow-md hover:shadow-2xl dark:hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}>
        
        {/* Top Card Row: Flag, City, State & Action Buttons */}
        <div className="flex items-start justify-between gap-3 mb-4">
          
          <div 
            onClick={() => onSelectCity?.(weatherData.name)}
            className={`flex items-center gap-3 ${onSelectCity ? 'cursor-pointer' : ''}`}
            title={onSelectCity ? `Click to inspect ${weatherData.name} live weather` : undefined}
          >
            {/* National Flag Badge */}
            <div className="relative flex-shrink-0 w-9 h-7 rounded-lg overflow-hidden shadow-sm border border-slate-300/80 dark:border-white/20 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <img
                src={flagUrl}
                alt={`${weatherData.sys?.country || 'Country'} flag`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors leading-tight">
                  {weatherData.name}
                </h3>
                {weatherData.sys?.country && (
                  <span className="text-[10px] text-blue-700 dark:text-cyan-300 font-black uppercase bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 px-1.5 py-0.2 rounded">
                    {weatherData.sys.country}
                  </span>
                )}
              </div>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate max-w-[170px]">
                {stateName}
              </p>
            </div>
          </div>

          {/* Top Right: Offset Tag & Close */}
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
              diffHours === 0 
                ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-500/30' 
                : 'text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-500/30'
            }`}>
              {diffString}
            </span>

            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors opacity-60 group-hover:opacity-100"
                title={`Remove ${weatherData.name}`}
                aria-label={`Remove ${weatherData.name}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

        </div>

        {/* Central Card Row: Glowing Digital Clock & Date */}
        <div className="my-2 p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-2xl sm:text-3xl font-black text-slate-900 dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:via-blue-100 dark:to-cyan-200 dark:bg-clip-text tracking-tight">
                {formattedTime}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {formattedDate}
              </div>
            </div>

            <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-white/10 shadow-xs">
              {isDay ? '☀️ Daytime' : '🌙 Night'}
            </span>
          </div>
        </div>

        {/* Bottom Card Row: Meteorological Stats & Action Bar */}
        <div className="pt-3 border-t border-slate-200/70 dark:border-white/[0.08] flex items-center justify-between gap-2">
          
          {/* Weather condition & big temp */}
          <div 
            onClick={() => onSelectCity?.(weatherData.name)}
            className={`flex items-center gap-2.5 ${onSelectCity ? 'cursor-pointer' : ''}`}
          >
            <div className="w-10 h-10 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <SimpleWeatherIcon condition={condition} size="md" />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900 dark:text-white leading-none block">
                {temp}°C
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 capitalize block truncate max-w-[130px]">
                {weatherData.weather[0]?.description}
              </span>
            </div>
          </div>

          {/* Quick Metrics (Humidity & Wind) */}
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10">
              💧 {humidity}%
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10">
              💨 {windSpeed}m/s
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WorldClock;
