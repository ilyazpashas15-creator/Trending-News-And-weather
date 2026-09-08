'use client';

import React, { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import SimpleWeatherIcon from '../ui/SimpleWeatherIcon';

interface WorldClockProps {
  city: string;
  onDelete?: () => void;
  onSelectCity?: (city: string) => void;
}

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
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 flex items-center justify-between animate-pulse mb-3">
        <div className="flex items-center gap-3 w-1/3">
          <div className="w-8 h-6 rounded-md bg-slate-200 dark:bg-slate-700" />
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-28" />
        </div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-32" />
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-20" />
      </div>
    );
  }

  if (error || !weatherData) {
    return null;
  }

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

  // Calculate local hour to determine day/night status
  const localHour = currentTime ? currentTime.getHours() : 12;
  const isDay = localHour >= 6 && localHour < 19;

  // Time difference relative to user's system clock
  const localOffsetMinutes = -new Date().getTimezoneOffset();
  const cityOffsetMinutes = weatherData.timezone / 60;
  const diffHours = (cityOffsetMinutes - localOffsetMinutes) / 60;
  const diffString = diffHours === 0 ? 'Same time' : diffHours > 0 ? `+${diffHours}h ahead` : `${diffHours}h behind`;

  const condition = weatherData.weather[0]?.main || 'Clear';

  return (
    <div className="group relative mb-3">
      {/* Outer ambient glow on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-40 dark:group-hover:opacity-70 transition duration-300 pointer-events-none" />

      <div className="relative p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-gradient-to-r dark:from-[#11192e]/95 dark:via-[#0e1628]/95 dark:to-[#11192e]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/12 hover:border-purple-400/50 dark:hover:border-purple-400/60 shadow-xs hover:shadow-lg dark:hover:shadow-[0_12px_32px_rgba(99,102,241,0.2)] transition-all duration-300">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          
          {/* Left: Flag Image, City Name & Country Badge */}
          <div 
            onClick={() => onSelectCity?.(weatherData.name)}
            className={`flex items-center gap-3.5 sm:w-5/12 ${onSelectCity ? 'cursor-pointer' : ''}`}
            title={onSelectCity ? `Click to view full weather for ${weatherData.name}` : undefined}
          >
            {/* Real Flag Image */}
            <div className="relative flex-shrink-0 w-8 h-6 rounded-md overflow-hidden shadow-xs border border-slate-300/80 dark:border-white/20 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
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
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 dark:text-white text-base sm:text-lg tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                  {weatherData.name}
                </span>
                {weatherData.sys?.country && (
                  <span className="text-[10px] text-blue-700 dark:text-cyan-300 font-black tracking-wider uppercase bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 px-1.5 py-0.5 rounded-md">
                    {weatherData.sys.country}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full border ${
                  diffHours === 0 
                    ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-500/30' 
                    : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.05] border-slate-200 dark:border-white/10'
                }`}>
                  {diffString}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {isDay ? '☀️ Daytime' : '🌙 Night'}
                </span>
              </div>
            </div>
          </div>

          {/* Center: Live Glowing Digital Clock */}
          <div className="flex flex-col sm:items-center sm:w-4/12">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-transparent dark:bg-gradient-to-r dark:from-cyan-300 dark:via-blue-200 dark:to-white dark:bg-clip-text tracking-tight">
                {formattedTime}
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {formattedDate}
            </span>
          </div>

          {/* Right: Weather Metric & Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-3.5 sm:w-3/12">
            <div 
              onClick={() => onSelectCity?.(weatherData.name)}
              className={`flex items-center gap-2.5 ${onSelectCity ? 'cursor-pointer' : ''}`}
            >
              <div className="w-9 h-9 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <SimpleWeatherIcon condition={condition} size="sm" />
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-slate-900 dark:text-white block leading-tight">
                  {Math.round(weatherData.main.temp)}°C
                </span>
                <span className="text-[11px] font-semibold text-slate-400 capitalize block truncate max-w-[100px]">
                  {weatherData.weather[0]?.description}
                </span>
              </div>
            </div>

            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors opacity-70 group-hover:opacity-100 ml-1"
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

      </div>
    </div>
  );
};

export default WorldClock;
