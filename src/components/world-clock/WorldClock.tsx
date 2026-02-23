'use client';

import React, { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { WeatherData } from '@/types/weather.types';

interface WorldClockProps {
  city: string;
  onDelete?: () => void; // Allow deleting rows
}

const WorldClock: React.FC<WorldClockProps> = ({ city, onDelete }) => {
  const { weatherData, loading, error, getWeatherByCity } = useWeather();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    getWeatherByCity(city);
  }, [city, getWeatherByCity]);

  useEffect(() => {
    if (!weatherData) return;

    // Calculate local time based on timezone offset
    const updateTime = () => {
      const utc = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
      const localTime = new Date(utc + (weatherData.timezone * 1000));
      setCurrentTime(localTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [weatherData]);

  // Helper to get flag emoji from country code
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return '☀️';
    if (iconCode.includes('02')) return '🌤️';
    if (iconCode.includes('03') || iconCode.includes('04')) return '☁️';
    if (iconCode.includes('09') || iconCode.includes('10')) return '🌧️';
    if (iconCode.includes('11')) return '⛈️';
    if (iconCode.includes('13')) return '❄️';
    if (iconCode.includes('50')) return '🌫️';
    return '🌤️';
  };

  if (loading) {
    return (
      <div className="py-4 px-4 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
      </div>
    );
  }

  if (error || !weatherData) {
    // Don't render broken rows, or render error state
    return null;
    // OR: return <div className="p-4 text-red-500">Error loading {city}</div>
  }

  const formattedTime = currentTime?.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const formattedDate = currentTime?.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl mb-3 border-2 border-blue-400 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/60 hover:scale-[1.02] transition-all duration-300 group">
      <div className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-3 w-1/3">
          <span className="text-2xl group-hover:scale-110 transition-transform">{getFlagEmoji(weatherData.sys.country)}</span>
          <div className="flex flex-col">
            <span className="font-bold text-blue-400 hover:text-blue-300 cursor-pointer text-lg transition-colors">{weatherData.name}</span>
            <span className="text-xs text-blue-400 font-medium">{weatherData.sys.country}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-baseline gap-2 w-1/3 justify-center">
          <span className="text-2xl font-mono font-bold text-white group-hover:text-blue-400 transition-colors">{formattedTime}</span>
          <span className="text-xs text-gray-300 hidden sm:inline">{formattedDate}</span>
        </div>

        <div className="flex items-center gap-4 w-1/3 justify-end">
          <div className="flex items-center gap-2">
            <span className="text-2xl group-hover:scale-125 transition-transform">{getWeatherIcon(weatherData.weather[0].icon)}</span>
            <span className="text-lg font-bold text-white">{Math.round(weatherData.main.temp)}°C</span>
          </div>
          {onDelete && (
            <button 
              onClick={onDelete} 
              className="text-gray-400 hover:text-red-400 hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorldClock;
