'use client';

import React, { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import SimpleWeatherIcon from '../ui/SimpleWeatherIcon';

interface WorldClockProps {
  city: string;
  onDelete?: () => void;
}

const WorldClock: React.FC<WorldClockProps> = ({ city, onDelete }) => {
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

  const getFlagEmoji = (countryCode?: string) => {
    if (!countryCode) return '🌍';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  if (loading) {
    return (
      <div className="p-4 rounded-2xl bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 flex items-center justify-between animate-pulse mb-3">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/3" />
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/4" />
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/5" />
      </div>
    );
  }

  if (error || !weatherData) {
    return null;
  }

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

  // Calculate hours offset relative to local machine
  const localOffsetMinutes = -new Date().getTimezoneOffset();
  const cityOffsetMinutes = weatherData.timezone / 60;
  const diffHours = (cityOffsetMinutes - localOffsetMinutes) / 60;
  const diffString = diffHours === 0 ? 'Same time' : diffHours > 0 ? `+${diffHours}h ahead` : `${diffHours}h behind`;

  const condition = weatherData.weather[0]?.main || 'Clear';

  return (
    <div className="group relative mb-3">
      {/* Glow highlight */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-300 pointer-events-none" />

      <div className="relative p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-gradient-to-r dark:from-[#11192e]/90 dark:via-[#0e1628]/90 dark:to-[#11192e]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 hover:border-purple-400/50 dark:hover:border-purple-400/50 shadow-xs hover:shadow-md transition-all duration-300">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Left: Flag & City */}
          <div className="flex items-center gap-3 sm:w-1/3">
            <span className="text-3xl drop-shadow-sm select-none">{getFlagEmoji(weatherData.sys?.country)}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">
                  {weatherData.name}
                </span>
                {weatherData.sys?.country && (
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 font-extrabold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 px-1.5 py-0.5 rounded">
                    {weatherData.sys.country}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                {diffString}
              </span>
            </div>
          </div>

          {/* Center: Live Digital Clock */}
          <div className="flex flex-col sm:items-center sm:w-1/3">
            <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-transparent dark:bg-gradient-to-r dark:from-cyan-300 dark:via-blue-200 dark:to-white dark:bg-clip-text tracking-tight">
              {formattedTime}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {formattedDate}
            </span>
          </div>

          {/* Right: Weather & Quick Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-3 sm:w-1/3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center">
                <SimpleWeatherIcon condition={condition} size="sm" />
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {Math.round(weatherData.main.temp)}°C
                </span>
                <span className="text-[11px] font-semibold text-slate-400 block capitalize">
                  {weatherData.weather[0]?.description}
                </span>
              </div>
            </div>

            {onDelete && (
              <button
                onClick={onDelete}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors opacity-70 group-hover:opacity-100 ml-2"
                title="Remove city"
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
