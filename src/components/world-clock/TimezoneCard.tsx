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

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate time data
  const timeString = formatTimeForTimezone(city.timezone, currentTime);
  const dateString = formatDateForTimezone(city.timezone, currentTime);
  const timezoneAbbr = getTimezoneAbbreviation(city.timezone, currentTime);
  const offsetMinutes = getTimezoneOffset(city.timezone, currentTime);
  const isDST = isDSTActive(city.timezone, currentTime);
  
  // Calculate time difference from reference
  const timeDiff = useCallback(() => {
    try {
      const refOffset = getTimezoneOffset(referenceTimezone, currentTime);
      const cityOffset = getTimezoneOffset(city.timezone, currentTime);
      const diff = (cityOffset - refOffset) / 60;
      return diff;
    } catch (error) {
      console.error('Error calculating time difference:', error);
      return 0;
    }
  }, [city.timezone, referenceTimezone, currentTime]);

  const diff = timeDiff();
  const relativeDescription = getRelativeTimeDescription(referenceTimezone, city.timezone, currentTime);
  const formattedDiff = formatTimeDifference(diff);

  // Format offset for display
  const formatOffsetDisplay = (offsetMinutes: number): string => {
    const hours = Math.floor(Math.abs(offsetMinutes) / 60);
    const minutes = Math.abs(offsetMinutes) % 60;
    const sign = offsetMinutes >= 0 ? '+' : '-';
    return `UTC${sign}${hours}${minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : ''}`;
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl 
        bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80
        backdrop-blur-xl border border-slate-600/30
        shadow-lg hover:shadow-2xl
        transition-all duration-300 ease-out
        ${isHovered ? 'transform -translate-y-1 scale-[1.02]' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background on hover */}
      <div 
        className={`
          absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10
          transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Glassmorphism shine effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="relative p-5">
        {/* Header: City Name & Remove Button */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white truncate">
              {city.name}
            </h3>
            <p className="text-sm text-slate-400 truncate">
              {city.country}
            </p>
          </div>
          
          {/* Remove Button */}
          {onRemove && (
            <button
              onClick={() => onRemove(city.id)}
              className="ml-2 p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              aria-label={`Remove ${city.name}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}
        </div>

        {/* Time Display */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white tracking-tight">
              {timeString}
            </span>
            <span className="text-lg font-medium text-blue-400">
              {timezoneAbbr}
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {dateString}
          </p>
        </div>

        {/* Offset & DST Info */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* UTC Offset Badge */}
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50">
            {formatOffsetDisplay(offsetMinutes)}
          </span>

          {/* DST Indicator */}
          {isDST && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
              DST Active
            </span>
          )}
        </div>

        {/* Time Difference from Reference */}
        <div className="pt-3 border-t border-slate-600/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {diff === 0 ? 'Same timezone' : relativeDescription}
            </span>
            <span className={`
              text-sm font-semibold
              ${diff === 0 ? 'text-slate-400' : diff > 0 ? 'text-green-400' : 'text-orange-400'}
            `}>
              {formattedDiff}
            </span>
          </div>
        </div>

        {/* Region Badge (bottom right) */}
        <div className="absolute bottom-3 right-3">
          <span className="text-[10px] uppercase tracking-wider text-slate-600 font-medium">
            {city.region}
          </span>
        </div>
      </div>
    </div>
  );
}
