'use client';

import React, { useEffect, useState } from 'react';
import WeatherCard from '../ui/WeatherCard';
import WeatherForecast from './WeatherForecast';
import WeatherCardSkeleton from '../ui/WeatherCardSkeleton';
import Navbar from '../ui/Navbar';
import SiteHeader from '../ui/SiteHeader';
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
      {/* Neural lattice background */}
      <div className="neural-lattice"></div>
      
      {/* Ambient drifting orbs */}
      <div className="ambient-orbs"></div>

      {/* Background weather report elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {weatherData && (
          <>
            {/* Main weather icon */}
            <div className="absolute top-[10%] right-[5%] sm:right-[10%] opacity-[0.08] sm:opacity-[0.1]">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                className="w-24 h-24 sm:w-32 md:w-48 md:h-48"
              />
            </div>

            {/* Temperature indicator */}
            <div className="absolute bottom-[5%] left-[5%] sm:bottom-[10%] sm:left-[10%] opacity-[0.1] sm:opacity-[0.12]">
              <div className="text-sm sm:text-2xl md:text-3xl lg:text-4xl">
                {/* The main.temp is in Kelvin, so convert to Celsius */}
                {weatherData.main.temp > 20 ? '🌡️' : '❄️'}
                <span className="ml-1 text-xs sm:text-lg md:text-xl lg:text-2xl">
                  {Math.round(weatherData.main.temp)}°C
                </span>
              </div>
            </div>

            {/* Humidity indicator */}
            <div className="absolute top-[10%] sm:top-[15%] right-[20%] sm:right-[30%] opacity-[0.08] sm:opacity-[0.1]">
              <div className="text-sm sm:text-xl md:text-2xl">💧
                <span className="ml-1 text-xs sm:text-sm md:text-lg opacity-[0.12] sm:opacity-[0.15]">
                  {weatherData.main.humidity}%
                </span>
              </div>
            </div>

            {/* Wind speed indicator */}
            <div className="absolute bottom-[10%] sm:bottom-[15%] right-[5%] sm:right-[10%] opacity-[0.08] sm:opacity-[0.1]">
              <div className="text-sm sm:text-2xl md:text-3xl">💨
                <span className="ml-1 text-xs sm:text-sm md:text-lg">
                  {(weatherData.wind.speed * 3.6).toFixed(0)} km/h
                </span>
              </div>
            </div>

            {/* Large temperature in background */}
            <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.05] sm:opacity-[0.08] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
              {/* Temperature is already in Celsius */}
              {Math.round(weatherData.main.temp)}°
            </div>
          </>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-20 main-content">

        {/* Navigation Bar - Using the fixed Navbar component */}
        <Navbar />
        <SiteHeader />

        <div className="max-w-6xl mx-auto py-8">

          <div className="flex flex-col md:flex-row items-baseline justify-between mb-6 pb-2 page-enter">
            <div className="relative inline-block">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gradient drop-shadow-lg tracking-tight section-heading">
                Weather Forecast
              </h1>
            </div>
            <p className="text-slate-400 text-sm mt-2 md:mt-0 font-medium">Local time and weather worldwide</p>
          </div>

          {/* Simplified Tab Navigation */}
          <div className="flex gap-2 mb-6 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 w-fit page-enter">
            <button className="tab-pill active px-5 py-2.5 text-sm font-semibold rounded-xl">
              Weather
            </button>
            <button 
              onClick={() => window.location.href = '/weather/5day'}
              className="tab-pill px-5 py-2.5 text-sm font-medium rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Forecast
            </button>
            <button 
              onClick={() => window.location.href = '/weather/maps'}
              className="tab-pill px-5 py-2.5 text-sm font-medium rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Maps
            </button>
          </div>

          {/* Compact Search Box - Minimal Design */}
          <div className="mb-6 page-enter" style={{ animationDelay: '0.1s' }}>
            <div className="max-w-md mx-auto">
              <form className="relative flex items-center group" role="search" onSubmit={(e) => { e.preventDefault(); const formData = new FormData(e.currentTarget); const city = formData.get('q') as string; handleAddCity(city); e.currentTarget.reset(); }}>
                {/* Subtle glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-md blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                
                <input
                  type="search"
                  placeholder="Search for weather, news, tools..."
                  className="relative w-full px-3 py-2 pl-8 glass-input text-sm rounded-l-md focus:outline-none transition-all"
                  name="q"
                />
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button type="submit" className="relative px-5 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white text-sm font-semibold rounded-r-md glow-btn">
                  Add
                </button>
              </form>
              
              <button
                onClick={handleCurrentLocationWeather}
                className="mt-2 text-xs text-blue-300 hover:text-blue-200 transition-colors flex items-center gap-1 mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Use Current Location
              </button>
            </div>
          </div>

          <div className="weather-container">
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

                <div className="my-8 page-enter" style={{ animationDelay: '0.3s' }}>
                  <div className="relative inline-block mb-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gradient section-heading drop-shadow-lg">
                      My Cities (Personal World Clock)
                    </h2>
                  </div>
                  
                  <div className="relative rounded-3xl overflow-hidden">
                    {/* Glowing border effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-lg opacity-40"></div>
                    
                    {/* Glass card container */}
                    <div className="relative glass-card rounded-3xl shadow-2xl overflow-hidden">
                      {/* Ambient background glow inside */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                      </div>
                      
                      {/* Table Header */}
                      <div className="relative z-10 flex items-center justify-between py-4 px-6 bg-white/[0.03] backdrop-blur-sm border-b border-white/10">
                        <div className="w-1/3 text-xs font-bold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text uppercase tracking-wider">Location</div>
                        <div className="w-1/3 text-center text-xs font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text uppercase tracking-wider">Local Time</div>
                        <div className="w-1/3 text-right text-xs font-bold text-transparent bg-gradient-to-r from-pink-300 to-blue-300 bg-clip-text uppercase tracking-wider">Weather</div>
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
