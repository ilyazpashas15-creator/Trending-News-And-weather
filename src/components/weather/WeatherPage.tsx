'use client';

import React, { useEffect, useState } from 'react';
import WeatherCard from '../ui/WeatherCard';
import WeatherForecast from './WeatherForecast';
import WeatherCardSkeleton from '../ui/WeatherCardSkeleton';
import Navbar from '../ui/Navbar';
import SiteHeader from '../ui/SiteHeader';
import WeatherAlertBanner from './WeatherAlertBanner';
import NewsSection from '../ui/NewsSection';
import { useWeather } from '@/hooks/useWeather';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import WorldClock from '@/components/world-clock/WorldClock';

const WeatherPage = () => {
  const { weatherData, forecastData, loading, error, getWeatherByCity, getCurrentLocationWeather } = useWeather();
  const [animationClass, setAnimationClass] = useState('');
  const { addToast } = useToast();
  const { user, logout, isAuthenticated } = useAuth();
  const [myCities, setMyCities] = useState<string[]>(['New York', 'Bengaluru', 'Tokyo', 'Bangalore']);

  const handleAddCity = (city: string) => {
    // Update the main view
    handleCityChange(city);

    // Add to list if not exists
    if (!myCities.includes(city) && !myCities.some(c => c.toLowerCase() === city.toLowerCase())) {
      setMyCities(prev => [city, ...prev]);
    }
  };

  const removeCity = (cityToRemove: string) => {
    setMyCities(prev => prev.filter(city => city !== cityToRemove));
  };

  // Function to map weather icon codes to emoji icons
  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01d') || iconCode.includes('01n')) return '☀️'; // Clear
    if (iconCode.includes('02d') || iconCode.includes('02n')) return '🌤️'; // Few clouds
    if (iconCode.includes('03d') || iconCode.includes('03n')) return '☁️'; // Scattered clouds
    if (iconCode.includes('04d') || iconCode.includes('04n')) return '☁️'; // Broken clouds
    if (iconCode.includes('09d') || iconCode.includes('09n')) return '🌧️'; // Shower rain
    if (iconCode.includes('10d') || iconCode.includes('10n')) return '🌦️'; // Rain
    if (iconCode.includes('11d') || iconCode.includes('11n')) return '⛈️'; // Thunderstorm
    if (iconCode.includes('13d') || iconCode.includes('13n')) return '❄️'; // Snow
    if (iconCode.includes('50d') || iconCode.includes('50n')) return '🌫️'; // Mist
    return '🌤️'; // Default
  };

  // Function to determine background based on weather condition
  const getWeatherBackground = () => {
    if (!weatherData || !weatherData.weather) {
      // Default background
      return "bg-gradient-to-br from-blue-50 to-cyan-100";
    }

    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    const isDayTime = weatherData.weather[0].icon.endsWith('d'); // Check if it's daytime

    // Temperature is already in Celsius (API uses units: 'metric')
    const tempCelsius = Math.round(weatherData.main.temp);

    // Map weather conditions to specific gradients
    if (weatherCondition.includes('clear') || weatherCondition.includes('sunny')) {
      return isDayTime ? "bg-clear-sky" : "bg-clear-night"; // Clear night for evening/night
    } else if (weatherCondition.includes('cloud')) {
      return "bg-cloudy";
    } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
      return "bg-rainy";
    } else if (weatherCondition.includes('snow')) {
      return "bg-snowy";
    } else if (weatherCondition.includes('thunderstorm')) {
      return "bg-thunderstorm";
    } else if (weatherCondition.includes('fog') || weatherCondition.includes('mist')) {
      return "bg-foggy";
    } else if (tempCelsius > 30) {
      return "bg-hot";
    } else if (tempCelsius < 0) {
      return "bg-cold";
    } else {
      return "bg-gradient-to-br from-blue-50 to-cyan-100";
    }
  };

  // Function to determine city skyline based on city name
  const getCitySkyline = () => {
    if (!weatherData || !weatherData.name) {
      return "/images/site.jpeg"; // Default
    }

    const city = weatherData.name.toLowerCase();

    // Map city names to their respective skyline images
    // For now, returning the same placeholder - in a real app, you'd have actual city images
    switch (city) {
      case 'new york':
        return "/images/site.jpeg"; // Would be a skyline of New York
      case 'london':
        return "/images/site.jpeg"; // Would be a skyline of London
      case 'tokyo':
        return "/images/site.jpeg"; // Would be a skyline of Tokyo
      case 'paris':
        return "/images/site.jpeg"; // Would be a skyline of Paris
      case 'bangalore':
      case 'bengaluru':
        return "/images/site.jpeg"; // Would be a skyline of Bangalore
      default:
        return "/images/site.jpeg"; // Default city skyline
    }
  };

  useEffect(() => {
    if (error) {
      addToast(error, 'error');
    }
  }, [error, addToast]);

  useEffect(() => {
    // Get weather for a default city on initial load
    console.log('WeatherPage mounted, fetching Bangalore weather...');
    getWeatherByCity('Bangalore, IN');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once on mount

  // Function to handle city change with flip animation (Task1.md Step 3)
  const handleCityChange = async (city: string) => {
    try {
      // Step B (Animate Out): Apply flipOut class to the main weather display container
      setAnimationClass('flip-out');

      // Wait for the flipOut animation to finish (0.5 seconds)
      setTimeout(async () => {
        // Step C (Wait & Swap): Update the city name, temperature, icons, and background gradient with the new data
        await getWeatherByCity(city);

        // Step D (Animate In): Replace the flipOut class with the flipIn class
        setAnimationClass('flip-in');

        // Step E (Clean Up): Remove the flipIn class once the animation completes
        setTimeout(() => {
          setAnimationClass(''); // Clear the animation class after it completes
        }, 500); // Match the animation duration
      }, 500); // Wait for the duration of the flipOut animation
    } catch (err) {
      console.error('City change error:', err);
      setAnimationClass(''); // Clear the animation in case of error
    }
  };

  // Function to handle getting current location weather with flip animation
  const handleCurrentLocationWeather = async () => {
    try {
      // Step B (Animate Out): Apply flipOut class to the main weather display container
      setAnimationClass('flip-out');

      // Wait for the flipOut animation to finish (0.5 seconds)
      setTimeout(async () => {
        // Step C (Wait & Swap): Update the weather data by calling the original function
        await getCurrentLocationWeather();

        // Step D (Animate In): Replace flipOut class with flipIn class
        setAnimationClass('flip-in');

        // Step E (Clean Up): Remove the flipIn class once the animation completes
        setTimeout(() => {
          setAnimationClass(''); // Clear the animation class after it completes
        }, 500); // Match the animation duration
      }, 500); // Wait for the duration of the flipOut animation
    } catch (err) {
      console.error('Current location weather error:', err);
      setAnimationClass(''); // Clear the animation in case of error
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Optionally add a success toast here
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

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
            {/* Location-based smart weather alerts (Step 05 of Task1.md) */}
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

                <div className="my-8 page-enter" style={{ animationDelay: '0.3s' }}>
                  <div className="relative inline-block mb-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gradient section-heading drop-shadow-lg">
                      My Cities (Personal World Clock)
                    </h2>
                  </div>
                  
                  <div className="relative rounded-3xl overflow-hidden">
                    {/* Glowing border effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-lg opacity-20 dark:opacity-40"></div>
                    
                    {/* Glass card container */}
                    <div className="relative bg-white/95 dark:bg-gradient-to-b dark:from-[#0d1527]/90 dark:to-[#070c18]/95 backdrop-blur-2xl rounded-3xl border border-slate-200/90 dark:border-white/12 shadow-lg dark:shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(99,102,241,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden">
                      {/* Ambient background glow inside */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl"></div>
                      </div>
                      
                      {/* Table Header - Hidden on mobile */}
                      <div className="hidden sm:flex relative z-10 items-center justify-between py-4 px-6 bg-slate-100/80 dark:bg-white/[0.05] backdrop-blur-sm border-b border-slate-200 dark:border-white/10">
                        <div className="w-1/3 text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Location</div>
                        <div className="w-1/3 text-center text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">Local Time</div>
                        <div className="w-1/3 text-right text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">Weather</div>
                      </div>

                      {/* Clock rows */}
                      <div className="relative z-10 p-4">
                        {myCities.map((city, index) => (
                          <WorldClock
                            key={`${city}-${index}`}
                            city={city}
                            onDelete={() => removeCity(city)}
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
