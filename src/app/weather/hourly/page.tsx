'use client';

import React, { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { Clock, Search, Droplets, Wind, Compass, Sparkles } from 'lucide-react';

const QUICK_CITIES = ['Bengaluru', 'London', 'New York', 'Tokyo', 'Paris', 'Dubai', 'Sydney'];

export default function HourlyWeatherPage() {
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

  const hourlyList = React.useMemo(() => {
    if (!forecastData?.list) return [];
    return forecastData.list.slice(0, 12); // Next 12 3-hour blocks (36 hours)
  }, [forecastData]);

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(14,165,233,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(14,165,233,0.08), transparent)',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-sky-500/10 text-sky-500 border-sky-500/20">
            <Clock className="w-3.5 h-3.5" /> Hour-by-Hour Timeline
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Hourly Weather Forecast
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Detailed breakdown of conditions, temperature trajectory, and wind gusts for <strong>{activeCity}</strong>.
          </p>
        </div>

        {/* Search Toolbar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search any global city..."
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-700 text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Search
            </button>
          </form>

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
                  backgroundColor: activeCity === c ? (isDark ? 'rgba(14,165,233,0.2)' : 'rgba(14,165,233,0.15)') : (isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff'),
                  borderColor: activeCity === c ? '#0ea5e9' : T.cardBorder,
                  color: activeCity === c ? '#0ea5e9' : T.textPrimary,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Scrollable Hourly Strip */}
        {!loading && hourlyList.length > 0 && (
          <div
            className="rounded-3xl border p-6 backdrop-blur-xl mb-8 relative overflow-hidden"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                Next 36-Hour Conditions
              </h2>
              <span className="text-xs font-semibold" style={{ color: T.textSecondary }}>
                ← Scroll horizontally →
              </span>
            </div>

            <div className="overflow-x-auto pb-3">
              <div className="flex gap-3 min-w-max">
                {hourlyList.map((item, idx) => {
                  const date = new Date(item.dt * 1000);
                  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
                  const dateStr = date.toLocaleDateString('en-US', { weekday: 'short' });
                  const iconCode = item.weather[0]?.icon || '01d';
                  const temp = Math.round(item.main.temp);
                  const desc = item.weather[0]?.description || 'Clear';

                  return (
                    <div
                      key={idx}
                      className="w-28 p-3.5 rounded-2xl border text-center transition-all hover:-translate-y-1 flex flex-col justify-between"
                      style={{
                        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                        borderColor: T.cardBorder,
                        minHeight: '180px',
                      }}
                    >
                      <div>
                        <div className="font-bold text-xs" style={{ color: T.textPrimary }}>
                          {timeStr}
                        </div>
                        <div className="text-[10px] font-medium" style={{ color: T.textSecondary }}>
                          {dateStr}
                        </div>

                        <img
                          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                          alt={desc}
                          className="w-10 h-10 mx-auto my-1 drop-shadow"
                        />

                        <div className="font-mono font-black text-xl mb-1" style={{ color: T.textPrimary }}>
                          {temp}°
                        </div>
                        <div className="text-[10px] font-medium capitalize truncate" style={{ color: T.textSecondary }}>
                          {desc}
                        </div>
                      </div>

                      <div className="pt-2 border-t mt-2 flex items-center justify-around text-[10px] font-semibold" style={{ borderColor: T.cardBorder, color: T.textSecondary }}>
                        <div className="flex items-center gap-0.5">
                          <Droplets className="w-2.5 h-2.5 text-sky-500" />
                          <span>{item.main.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <Wind className="w-2.5 h-2.5 text-teal-500" />
                          <span>{Math.round(item.wind.speed * 3.6)}k</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
