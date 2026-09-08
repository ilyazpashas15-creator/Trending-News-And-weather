'use client';

import React, { useEffect, useState, useMemo } from 'react';
import WeatherCard from '../ui/WeatherCard';
import WeatherForecast from './WeatherForecast';
import WeatherCardSkeleton from '../ui/WeatherCardSkeleton';
import Navbar from '../ui/Navbar';
import WeatherAlertBanner from './WeatherAlertBanner';
import NewsSection from '../ui/NewsSection';
import { useWeather } from '@/hooks/useWeather';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import WorldClock from '@/components/world-clock/WorldClock';

// Preset top 5 major states / megacities per country
const TOP_REGIONAL_CITIES: Record<string, { countryName: string; flag: string; flagCode: string; cities: string[] }> = {
  IN: {
    countryName: 'India',
    flag: '🇮🇳',
    flagCode: 'in',
    cities: ['New Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Kolkata'],
  },
  US: {
    countryName: 'United States',
    flag: '🇺🇸',
    flagCode: 'us',
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
  },
  GB: {
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    flagCode: 'gb',
    cities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'],
  },
  JP: {
    countryName: 'Japan',
    flag: '🇯🇵',
    flagCode: 'jp',
    cities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Sapporo'],
  },
  AU: {
    countryName: 'Australia',
    flag: '🇦🇺',
    flagCode: 'au',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  },
  CA: {
    countryName: 'Canada',
    flag: '🇨🇦',
    flagCode: 'ca',
    cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  },
  DE: {
    countryName: 'Germany',
    flag: '🇩🇪',
    flagCode: 'de',
    cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne'],
  },
  FR: {
    countryName: 'France',
    flag: '🇫🇷',
    flagCode: 'fr',
    cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  },
  AE: {
    countryName: 'United Arab Emirates',
    flag: '🇦🇪',
    flagCode: 'ae',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
  },
  GLOBAL: {
    countryName: 'Global Megacities',
    flag: '🌍',
    flagCode: 'un',
    cities: ['London', 'New York', 'Tokyo', 'Paris', 'Dubai'],
  },
};

const WeatherPage = () => {
  const { weatherData, forecastData, loading, error, getWeatherByCity, getCurrentLocationWeather } = useWeather();
  const [animationClass, setAnimationClass] = useState('');
  const { addToast } = useToast();
  const { user, logout, isAuthenticated } = useAuth();

  // Active region tab
  const [activeRegion, setActiveRegion] = useState<string>('IN');
  const [myCities, setMyCities] = useState<string[]>(TOP_REGIONAL_CITIES.IN.cities);
  const [newCityInput, setNewCityInput] = useState('');

  // Auto-detect user's country from timezone on initial mount
  useEffect(() => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      let detectedCode = 'IN';

      if (timeZone.includes('Calcutta') || timeZone.includes('Kolkata') || timeZone.includes('Asia/Colombo')) {
        detectedCode = 'IN';
      } else if (timeZone.startsWith('America/') || timeZone.includes('US/')) {
        detectedCode = 'US';
      } else if (timeZone.includes('London') || timeZone.includes('Europe/Belfast')) {
        detectedCode = 'GB';
      } else if (timeZone.includes('Tokyo')) {
        detectedCode = 'JP';
      } else if (timeZone.includes('Australia/') || timeZone.includes('Sydney') || timeZone.includes('Melbourne')) {
        detectedCode = 'AU';
      } else if (timeZone.includes('Toronto') || timeZone.includes('Vancouver') || timeZone.includes('Montreal')) {
        detectedCode = 'CA';
      } else if (timeZone.includes('Berlin') || timeZone.includes('Frankfurt')) {
        detectedCode = 'DE';
      } else if (timeZone.includes('Paris')) {
        detectedCode = 'FR';
      } else if (timeZone.includes('Dubai')) {
        detectedCode = 'AE';
      } else {
        detectedCode = 'GLOBAL';
      }

      if (TOP_REGIONAL_CITIES[detectedCode]) {
        setActiveRegion(detectedCode);
        setMyCities(TOP_REGIONAL_CITIES[detectedCode].cities);
      }
    } catch (e) {
      console.error('Timezone detection error:', e);
    }
  }, []);

  // When weather data is fetched and has a country code, sync region if user hasn't manually altered
  useEffect(() => {
    if (weatherData?.sys?.country) {
      const code = weatherData.sys.country.toUpperCase();
      if (TOP_REGIONAL_CITIES[code] && activeRegion !== code) {
        setActiveRegion(code);
        setMyCities(TOP_REGIONAL_CITIES[code].cities);
      }
    }
  }, [weatherData?.sys?.country]);

  const handleRegionSwitch = (regionCode: string) => {
    setActiveRegion(regionCode);
    if (TOP_REGIONAL_CITIES[regionCode]) {
      setMyCities(TOP_REGIONAL_CITIES[regionCode].cities);
    }
  };

  const handleAddCity = (city: string) => {
    const trimmed = city.trim();
    if (!trimmed) return;

    // Update main weather view
    handleCityChange(trimmed);

    // Add to list if not exists
    if (!myCities.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      setMyCities(prev => [trimmed, ...prev]);
    }
    setNewCityInput('');
  };

  const removeCity = (cityToRemove: string) => {
    setMyCities(prev => prev.filter(city => city !== cityToRemove));
  };

  useEffect(() => {
    if (error) {
      addToast(error, 'error');
    }
  }, [error, addToast]);

  useEffect(() => {
    getWeatherByCity('Bangalore, IN');
  }, []);

  // Function to handle city change with flip animation
  const handleCityChange = async (city: string) => {
    try {
      setAnimationClass('flip-out');
      setTimeout(async () => {
        await getWeatherByCity(city);
        setAnimationClass('flip-in');
        setTimeout(() => {
          setAnimationClass('');
        }, 500);
      }, 500);
    } catch (err) {
      console.error('City change error:', err);
      setAnimationClass('');
    }
  };

  const handleCurrentLocationWeather = async () => {
    try {
      setAnimationClass('flip-out');
      setTimeout(async () => {
        await getCurrentLocationWeather();
        setAnimationClass('flip-in');
        setTimeout(() => {
          setAnimationClass('');
        }, 500);
      }, 500);
    } catch (err) {
      console.error('Current location weather error:', err);
      setAnimationClass('');
    }
  };

  const currentRegionMeta = TOP_REGIONAL_CITIES[activeRegion] || TOP_REGIONAL_CITIES.GLOBAL;

  return (
    <div className="min-h-screen transition-all duration-500 p-3 sm:p-4 md:p-6 relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-20 main-content">

        {/* Navigation Bar */}
        <Navbar />

        <div className="max-w-6xl mx-auto py-6 sm:py-8">

          {/* Header Title & Section Overview */}
          <div className="flex flex-col md:flex-row items-center md:items-baseline justify-between mb-6 pb-2 gap-3 text-center md:text-left page-enter">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                Weather <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Forecast & Radar</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1.5 font-medium">
                Live radar, localized alerts, and real-time meteorological conditions worldwide
              </p>
            </div>

            {/* GPS Location Button */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleCurrentLocationWeather}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-500/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all shadow-xs hover:scale-105 active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                📍 Use My Location
              </button>
            </div>
          </div>

          {/* Unified Tab Navigation & Hero Search Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-4 page-enter">
            {/* Segmented Tab Navigation */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200/70 dark:bg-white/[0.04] border border-slate-300/70 dark:border-white/[0.08] backdrop-blur-xl shadow-xs overflow-x-auto scrollbar-none">
              <button className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-purple-500/25 whitespace-nowrap">
                🌡️ Live Weather
              </button>
              <button 
                onClick={() => window.location.href = '/weather/5day'}
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all whitespace-nowrap"
              >
                📅 5-Day Forecast
              </button>
              <button 
                onClick={() => window.location.href = '/weather/maps'}
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all whitespace-nowrap"
              >
                🗺️ Radar Maps
              </button>
              <button 
                onClick={() => window.location.href = '/weather/hourly'}
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all whitespace-nowrap"
              >
                ⏱️ Hourly
              </button>
            </div>

            {/* Glowing Hero Search Bar */}
            <div className="w-full lg:max-w-md">
              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  const formData = new FormData(e.currentTarget); 
                  const city = formData.get('q') as string; 
                  if (city?.trim()) {
                    handleAddCity(city.trim()); 
                    e.currentTarget.reset(); 
                  }
                }}
                className="relative flex items-center group" 
                role="search"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-300 pointer-events-none" />
                <div className="relative w-full flex items-center">
                  <input
                    type="search"
                    name="q"
                    placeholder="Search any city or location..."
                    className="w-full px-4 py-2.5 pl-10 pr-24 text-xs sm:text-sm rounded-full bg-white/95 dark:bg-[#0c1324]/90 border border-slate-200/90 dark:border-white/15 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-slate-900 dark:text-white placeholder-slate-400 backdrop-blur-md transition-all shadow-sm"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <button
                    type="submit"
                    className="absolute right-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white rounded-full text-xs font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Popular City Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none page-enter">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
              <span>🔥</span> Quick Cities:
            </span>
            {['Bengaluru', 'New York', 'London', 'Tokyo', 'Paris', 'Dubai', 'Singapore', 'Sydney'].map((c) => (
              <button
                key={c}
                onClick={() => handleAddCity(c)}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:border-purple-500/50 hover:text-purple-600 dark:hover:text-cyan-300 transition-all flex-shrink-0 shadow-xs hover:scale-105 active:scale-95"
              >
                {c}
              </button>
            ))}
          </div>

          <div className="weather-container">
            {/* Location-based smart weather alerts */}
            <WeatherAlertBanner weather={weatherData} />

            {error && (
              <div className="relative mb-6 rounded-2xl overflow-hidden page-enter">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-40"></div>
                <div className="relative bg-red-500/10 border border-red-500/40 text-red-200 px-6 py-4 rounded-2xl backdrop-blur-md">
                  <p className="font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Error
                  </p>
                  <p className="mt-1">{error}</p>
                </div>
              </div>
            )}
            
            {loading ? (
              <>
                <WeatherCardSkeleton />
                <div className="glass-card p-4 sm:p-6 mt-2 animate-pulse rounded-2xl">
                  <div className="h-8 bg-white/10 rounded w-40 mb-4"></div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                        <div className="h-4 bg-white/10 rounded w-16 mx-auto mb-2"></div>
                        <div className="h-4 bg-white/10 rounded w-12 mx-auto mb-2"></div>
                        <div className="bg-white/10 rounded-full w-8 h-8 mx-auto my-1 sm:my-2"></div>
                        <div className="h-5 bg-white/10 rounded w-8 mx-auto mb-1"></div>
                        <div className="h-4 bg-white/10 rounded w-6 mx-auto"></div>
                        <div className="h-3 bg-white/10 rounded w-20 mx-auto mt-2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className={`transition-all duration-500 ${animationClass}`}>
                <div className="w-full">
                  {weatherData && <WeatherCard weather={weatherData} />}
                </div>

                <div className="mt-8">
                  <WeatherForecast forecast={forecastData} />
                </div>

                {/* Trending News Section on Home Dashboard */}
                <div className="my-10">
                  <NewsSection defaultCategory="general" showTitle={true} />
                </div>

                {/* ── My Cities (Personal World Clock & Top Regional States) ── */}
                <div className="my-8 page-enter" style={{ animationDelay: '0.3s' }}>
                  
                  {/* Luxury Glass Card Outer Container */}
                  <div className="relative rounded-[32px] p-1 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] dark:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(99,102,241,0.12)]">
                    {/* Glowing outer aura */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-[34px] blur-2xl opacity-60 dark:opacity-80" />

                    <div className="relative rounded-[30px] bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/12 p-6 sm:p-8 lg:p-10 overflow-hidden">
                      
                      {/* Section Top Header: Title & Region Indicator */}
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-white/[0.08] gap-4">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">🌐</span>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                              My Cities <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">(Top {currentRegionMeta.countryName} States & Clocks)</span>
                            </h2>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                            Live synchronized local time, time offsets, and weather across top regional states and global megacities
                          </p>
                        </div>

                        {/* Quick Add City Input */}
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (newCityInput.trim()) {
                              handleAddCity(newCityInput);
                            }
                          }}
                          className="flex items-center gap-2 w-full lg:w-auto"
                        >
                          <input
                            type="text"
                            value={newCityInput}
                            onChange={(e) => setNewCityInput(e.target.value)}
                            placeholder="Add any city..."
                            className="px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 text-xs font-extrabold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xs hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                          >
                            + Add City
                          </button>
                        </form>
                      </div>

                      {/* Region Selector Pills */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-5 scrollbar-none">
                        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex-shrink-0">
                          📍 Country Preset:
                        </span>
                        {Object.entries(TOP_REGIONAL_CITIES).map(([code, data]) => {
                          const isActive = activeRegion === code;
                          return (
                            <button
                              key={code}
                              onClick={() => handleRegionSwitch(code)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex-shrink-0 ${
                                isActive
                                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-purple-500/20 scale-105'
                                  : 'bg-slate-100/80 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:border-purple-400/50'
                              }`}
                            >
                              <span>{data.flag}</span>
                              <span>{data.countryName}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Table Column Headers - Desktop */}
                      <div className="hidden sm:flex items-center justify-between py-3 px-5 mb-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        <div className="w-5/12">Location & State</div>
                        <div className="w-4/12 text-center">Local Synchronized Time</div>
                        <div className="w-3/12 text-right">Atmospheric Condition</div>
                      </div>

                      {/* Clock rows list */}
                      <div className="space-y-1">
                        {myCities.map((city, index) => (
                          <WorldClock
                            key={`${city}-${index}`}
                            city={city}
                            onDelete={() => removeCity(city)}
                            onSelectCity={(selected) => handleCityChange(selected)}
                          />
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
