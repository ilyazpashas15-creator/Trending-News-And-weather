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
    <div className="min-h-screen transition-all duration-500 bg-[#1a2942] p-3 sm:p-4 md:p-6 relative overflow-hidden">

      {/* Removed City Background Overlay for cleaner look */}


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

          <div className="flex flex-col md:flex-row items-baseline justify-between mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2C3E50] dark:text-gray-100">Weather Forecast</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 md:mt-0">Local time and weather worldwide</p>
          </div>

          {/* Tab-like navigation for Weather Tool */}
          <div className="flex gap-1 mb-6">
            <button className="px-6 py-3 bg-[#2a3f5f] font-bold text-white rounded-t-lg border-t-2 border-blue-500">Weather</button>
            <button 
              onClick={() => window.location.href = '/weather/5day'}
              className="px-6 py-3 bg-[#1a2942] text-blue-400 hover:bg-[#2a3f5f] rounded-t-lg font-medium cursor-pointer transition-colors"
            >
              Forecast
            </button>
            <button 
              onClick={() => window.location.href = '/weather/maps'}
              className="px-6 py-3 bg-[#1a2942] text-blue-400 hover:bg-[#2a3f5f] rounded-t-lg font-medium cursor-pointer transition-colors"
            >
              Maps
            </button>
          </div>

          <div className="bg-[#2a3f5f] rounded-lg p-6 shadow-sm border border-gray-700 mb-8">
            <div className="bg-[#1a2942] p-4 -m-6 mb-6 border-b border-gray-700">
              <h3 className="font-bold text-white">Current Weather Conditions</h3>
            </div>

            <div className="mb-8 max-w-xl mx-auto">
              <label className="block text-sm font-bold text-white mb-2 text-center">Add locations:</label>
              <div className="main-search-area w-full">
                <form className="relative flex items-center w-full" role="search" onSubmit={(e) => { e.preventDefault(); const formData = new FormData(e.currentTarget); const city = formData.get('q') as string; handleAddCity(city); e.currentTarget.reset(); }}>
                  <input
                    type="search"
                    placeholder="e.g. New York, Bengaluru, Tokyo..."
                    className="w-full p-3 pl-10 border border-gray-600 rounded-lg shadow-inner bg-[#1a2942] text-white text-base focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
                    name="q"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button type="submit" className="absolute right-2 top-1.5 bottom-1.5 bg-[#529214] hover:bg-[#437a0f] text-white px-5 rounded-md font-bold transition-colors text-sm">
                    Add
                  </button>
                </form>

                <div className="mt-2 text-center">
                  <button
                    onClick={handleCurrentLocationWeather}
                    className="text-sm text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Use Current Location
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="weather-container">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-6">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}
            
            {loading ? (
              <>
                <WeatherCardSkeleton />
                <div className="neumorphism-card p-4 sm:p-6 mt-2 animate-pulse">
                  <div className="h-8 bg-purple-200 rounded w-40 mb-4"></div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="neumorphism-card-light rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                        <div className="h-4 bg-purple-200 rounded w-16 mx-auto mb-2"></div>
                        <div className="h-4 bg-purple-200 rounded w-12 mx-auto mb-2"></div>
                        <div className="bg-purple-200 rounded-full w-8 h-8 mx-auto my-1 sm:my-2"></div>
                        <div className="h-5 bg-purple-200 rounded w-8 mx-auto mb-1"></div>
                        <div className="h-4 bg-purple-200 rounded w-6 mx-auto"></div>
                        <div className="h-3 bg-purple-200 rounded w-20 mx-auto mt-2"></div>
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

                <div className="my-8">
                  <h2 className="text-xl font-bold text-white mb-4">My Cities (Personal World Clock)</h2>
                  <div className="bg-[#2a3f5f] rounded-lg shadow-sm border border-gray-700 flex flex-col">
                    {/* Table Header */}
                    <div className="flex items-center justify-between py-2 px-4 bg-[#1a2942] border-b border-gray-700 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <div className="w-1/3">Location</div>
                      <div className="w-1/3 text-center">Local Time</div>
                      <div className="w-1/3 text-right">Weather</div>
                    </div>

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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
