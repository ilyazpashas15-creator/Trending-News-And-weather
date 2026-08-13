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
    <div className="relative group mb-3">
      {/* Glowing border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-purple-400/30 shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-300">
        {/* Mobile Layout (< 640px) */}
        <div className="sm:hidden py-4 px-4 group-hover:scale-[1.01] transition-transform duration-300">
          {/* Top row: Flag, City and Delete button */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">{getFlagEmoji(weatherData.sys.country)}</span>
              <div className="flex flex-col">
                <span className="font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent text-base">{weatherData.name}</span>
                <span className="text-xs text-blue-400 font-semibold tracking-wide">{weatherData.sys.country}</span>
              </div>
            </div>
            {onDelete && (
              <button 
                onClick={onDelete} 
                className="text-gray-400 hover:text-red-400 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Bottom row: Time and Weather */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-mono font-extrabold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{formattedTime}</span>
              <span className="text-xs text-gray-400 font-medium mt-1">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">{getWeatherIcon(weatherData.weather[0].icon)}</span>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">{Math.round(weatherData.main.temp)}°C</span>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Layout (>= 640px) */}
        <div className="hidden sm:flex items-center justify-between py-5 px-6 group-hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-3 w-1/3">
            <span className="text-3xl group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">{getFlagEmoji(weatherData.sys.country)}</span>
            <div className="flex flex-col">
              <span className="font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent hover:from-blue-200 hover:to-purple-200 cursor-pointer text-lg transition-all">{weatherData.name}</span>
              <span className="text-xs text-blue-400 font-semibold tracking-wide">{weatherData.sys.country}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-1/3 justify-center">
            <span className="text-3xl font-mono font-extrabold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-purple-200 transition-all tracking-tight">{formattedTime}</span>
            <span className="text-xs text-gray-400 font-medium">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-4 w-1/3 justify-end">
            <div className="flex items-center gap-3">
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">{getWeatherIcon(weatherData.weather[0].icon)}</span>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">{Math.round(weatherData.main.temp)}°C</span>
            </div>
            {onDelete && (
              <button 
                onClick={onDelete} 
                className="text-gray-500 hover:text-red-400 hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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
