'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { City } from '../../utils/cityDatabase';
import {
  formatTimeForTimezone,
  formatDateForTimezone,
  getTimezoneAbbreviation,
  getTimezoneOffset,
  isDSTActive,
  getRelativeTimeDescription,
  formatTimeDifference
} from '../../services/timezoneService';

interface TimezoneCardProps {
  city: City;
  referenceTimezone?: string;
  onRemove?: (cityId: string) => void;
  className?: string;
}

export default function TimezoneCard({
  city,
  referenceTimezone = 'UTC',
  onRemove,
  className = ''
}: TimezoneCardProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = formatTimeForTimezone(city.timezone, currentTime);
  const dateString = formatDateForTimezone(city.timezone, currentTime);
  const timezoneAbbr = getTimezoneAbbreviation(city.timezone, currentTime);
  const offsetMinutes = getTimezoneOffset(city.timezone, currentTime);
  const isDST = isDSTActive(city.timezone, currentTime);

  const timeDiff = useCallback(() => {
    try {
      const refOffset = getTimezoneOffset(referenceTimezone, currentTime);
      const cityOffset = getTimezoneOffset(city.timezone, currentTime);
      return (cityOffset - refOffset) / 60;
    } catch {
      return 0;
    }
  }, [city.timezone, referenceTimezone, currentTime]);

  const diff = timeDiff();
  const relativeDescription = getRelativeTimeDescription(referenceTimezone, city.timezone, currentTime);
  const formattedDiff = formatTimeDifference(diff);

  const formatOffsetDisplay = (mins: number): string => {
    const hours = Math.floor(Math.abs(mins) / 60);
    const minutes = Math.abs(mins) % 60;
    const sign = mins >= 0 ? '+' : '-';
    return `UTC${sign}${hours}${minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : ''}`;
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl 
        bg-white dark:bg-slate-900/90
        border border-slate-200/90 dark:border-white/10
        shadow-sm hover:shadow-xl
        transition-all duration-300 ease-out
        ${isHovered ? 'transform -translate-y-1 scale-[1.01]' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 opacity-70 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative p-4 sm:p-5">
        {/* Header: City & Remove */}
        <div className="flex items-start justify-between mb-2.5">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {city.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {city.country}
            </p>
          </div>

          {onRemove && (
            <button
              onClick={() => onRemove(city.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
              aria-label={`Remove ${city.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Time Display */}
        <div className="my-2.5">
          <div className="flex items-baseline gap-1.5">
            <span suppressHydrationWarning className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
              {mounted ? timeString : '--:--:--'}
            </span>
            <span className="text-xs font-semibold text-blue-600 dark:text-sky-400 uppercase tracking-wider">
              {timezoneAbbr}
            </span>
          </div>
          <p suppressHydrationWarning className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {mounted ? dateString : '---'}
          </p>
        </div>

        {/* Offset & DST Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span
            suppressHydrationWarning
            className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
          >
            {formatOffsetDisplay(offsetMinutes)}
          </span>

          {isDST && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1 animate-pulse" />
              DST Active
            </span>
          )}
        </div>

        {/* Time Difference from Reference */}
        <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            {diff === 0 ? 'Reference Zone' : relativeDescription}
          </span>
          <span className={`font-semibold text-xs ${
            diff === 0 
              ? 'text-slate-400 dark:text-slate-500' 
              : diff > 0 
                ? 'text-emerald-600 dark:text-emerald-400' 
                : 'text-amber-600 dark:text-amber-400'
          }`}>
            {formattedDiff}
          </span>
        </div>
      </div>
    </div>
  );
}
