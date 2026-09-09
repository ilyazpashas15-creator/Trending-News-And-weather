'use client';

import React, { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { CloudRain, Wind, Droplets, Search, Sparkles, Calendar, Sun, Cloud } from 'lucide-react';

const QUICK_CITIES = ['Bengaluru', 'London', 'New York', 'Tokyo', 'Paris', 'Dubai', 'Sydney'];

export default function FiveDayForecastPage() {
  const [isDark, setIsDark] = useState(true);
  const { forecastData, loading, error, getWeatherByCity } = useWeather();
  const [cityInput, setCityInput] = useState('Bengaluru');
  const [activeCity, setActiveCity] = useState('Bengaluru');

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    getWeatherByCity(activeCity);
  }, [activeCity, getWeatherByCity]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setActiveCity(cityInput.trim());
    }
  };

  // Group 3-hourly forecast by calendar day
  const dailyForecast = React.useMemo(() => {
    if (!forecastData?.list) return [];
    
    // Pick the forecast reading nearest to 12:00 local time for each unique day
    const daysMap = new Map<string, any>();
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toISOString().slice(0, 10);
      if (!daysMap.has(dayKey)) {
        daysMap.set(dayKey, item);
      } else {
        const existing = daysMap.get(dayKey);
        const existingHour = new Date(existing.dt * 1000).getHours();
        const currentHour = date.getHours();
        if (Math.abs(currentHour - 12) < Math.abs(existingHour - 12)) {
          daysMap.set(dayKey, item);
        }
      }
    });

    return Array.from(daysMap.values()).slice(0, 5);
  }, [forecastData]);

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(59,130,246,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(59,130,246,0.08), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    textPrimary: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    inputBg: isDark ? 'rgba(15, 23, 42, 0.9)' : '#ffffff',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(203, 213, 225, 0.9)',
  };

  return (
    <div style={{ background: T.bgPage, minHeight: '100vh' }} className="relative transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: T.ambientOrbs }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-blue-500/10 text-blue-500 border-blue-500/20">
            <CloudRain className="w-3.5 h-3.5" /> Extended Outlook
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            5-Day Weather Forecast
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            High-precision daily forecasts, weather phenomena, and wind conditions for <strong>{activeCity}</strong>.
          </p>
        </div>

        {/* Search Bar & Quick Chips */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search any global city..."
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Search
            </button>
          </form>

          {/* Quick city chips */}
          <div className="flex items-center justify-center flex-wrap gap-1.5">
            {QUICK_CITIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCityInput(c);
                  setActiveCity(c);
                }}
                className="text-xs px-3 py-1 rounded-lg border font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: activeCity === c ? (isDark ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.15)') : (isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff'),
                  borderColor: activeCity === c ? '#3b82f6' : T.cardBorder,
                  color: activeCity === c ? '#3b82f6' : T.textPrimary,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="max-w-md mx-auto mb-6 p-4 rounded-xl border bg-rose-500/10 border-rose-500/20 text-rose-500 text-center text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* 5-Column Grid (lg:grid-cols-5 for Chrome & Edge consistency) */}
        {!loading && dailyForecast.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {dailyForecast.map((item, idx) => {
              const date = new Date(item.dt * 1000);
              const dayName = idx === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
              const dateFormatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const iconCode = item.weather[0]?.icon || '01d';
              const maxTemp = Math.round(item.main.temp_max);
              const minTemp = Math.round(item.main.temp_min);
              const desc = item.weather[0]?.description || 'Clear';

              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl border p-4 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
                  style={{
                    backgroundColor: T.cardBg,
                    borderColor: T.cardBorder,
                    boxShadow: T.cardShadow,
                    minHeight: '230px',
                  }}
                >
                  {/* Top color stripe */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

                  {/* Day header */}
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-sm" style={{ color: idx === 0 ? '#3b82f6' : T.textPrimary }}>
                        {dayName}
                      </span>
                      <span className="text-[11px] font-medium" style={{ color: T.textSecondary }}>
                        {dateFormatted}
                      </span>
                    </div>

                    <div className="flex items-center justify-center my-3">
                      <img
                        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                        alt={desc}
                        className="w-14 h-14 group-hover:scale-110 transition-transform drop-shadow"
                      />
                    </div>

                    <div className="text-center mb-2">
                      <div className="font-mono font-black text-2xl" style={{ color: T.textPrimary }}>
                        {maxTemp}°<span className="text-sm font-semibold opacity-60 ml-1.5">{minTemp}°</span>
                      </div>
                      <p className="text-xs font-semibold capitalize truncate mt-0.5" style={{ color: T.textSecondary }}>
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Wind & Humidity Details */}
                  <div className="pt-2.5 border-t grid grid-cols-2 gap-1 text-[11px] font-medium text-center" style={{ borderColor: T.cardBorder, color: T.textSecondary }}>
                    <div className="flex items-center justify-center gap-1">
                      <Droplets className="w-3 h-3 text-sky-500" />
                      <span>{item.main.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Wind className="w-3 h-3 text-teal-500" />
                      <span>{Math.round(item.wind.speed * 3.6)} km/h</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
