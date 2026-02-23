'use client';

import { useState, useEffect } from 'react';
import { fetchWeatherByCity } from '@/services/weatherService';
import { WeatherData } from '@/types/weather.types';

interface SavedCity {
  id: string;
  name: string;
  country: string;
  timezone: string;
  weather?: WeatherData;
}

export default function WorldClockMyLocationsPage() {
  const [savedCities, setSavedCities] = useState<SavedCity[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Load saved cities from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedWorldClockCities');
    if (saved) {
      const parsedCities: SavedCity[] = JSON.parse(saved);
      setSavedCities(parsedCities);
      
      // Fetch weather for all saved cities
      const fetchWeatherForSavedCities = async () => {
        const updatedCities = await Promise.all(parsedCities.map(async (city) => {
          try {
            const weather = await fetchWeatherByCity(city.name);
            return { ...city, weather };
          } catch (error) {
            console.error(`Error fetching weather for ${city.name}:`, error);
            return city;
          }
        }));
        setSavedCities(updatedCities);
      };
      
      fetchWeatherForSavedCities();
    }
  }, []);

  // Update time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Format time for a specific timezone using Intl API
  const formatTimeForTimezone = (timezone: string): string => {
    return currentTime.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Format date for a specific timezone using Intl API
  const formatDateForTimezone = (timezone: string): string => {
    return currentTime.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Remove a city from saved locations
  const removeCity = (id: string) => {
    const updatedCities = savedCities.filter(city => city.id !== id);
    setSavedCities(updatedCities);
    localStorage.setItem('savedWorldClockCities', JSON.stringify(updatedCities));
  };

  // Get UTC offset for a specific timezone
  const getUTCOffset = (timezone: string): string => {
    const utcDate = new Date(currentTime.toLocaleString('en-US', { timeZone: 'UTC' }));
    const localDate = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone }));
    const offsetMinutes = (localDate.getTime() - utcDate.getTime()) / (1000 * 60);
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetMins = Math.abs(offsetMinutes) % 60;
    const sign = offsetMinutes >= 0 ? '+' : '-';

    if (offsetMins === 0) {
      return `UTC${sign}${offsetHours}`;
    } else {
      return `UTC${sign}${offsetHours}:${offsetMins.toString().padStart(2, '0')}`;
    }
  };

  if (savedCities.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-center border-2 border-blue-300 p-4 rounded-lg">My Locations</h1>
        </div>
        <p className="mb-4 text-center">View time in your saved locations.</p>
        
        <div className="mt-8 text-center p-8 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">No saved locations yet</h2>
          <p className="text-gray-600 mb-4">
            Add cities to your list from the "Add New City" page to see their time here.
          </p>
          <a 
            href="/world-clock/add-city" 
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add New City
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-center border-2 border-blue-300 p-4 rounded-lg">My Locations</h1>
      </div>
      <p className="mb-4 text-center">View time in your saved locations.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {savedCities.map((city) => (
          <div 
            key={city.id} 
            className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 relative"
          >
            <button
              onClick={() => removeCity(city.id)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
              aria-label={`Remove ${city.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{city.name}</h3>
                <p className="text-gray-600">{city.country}</p>
              </div>
              {city.weather && (
                <div className="text-right">
                  <div className="text-2xl">{city.weather.main.temp}°C</div>
                  <img 
                    src={`https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`} 
                    alt={city.weather.weather[0].description}
                    className="w-10 h-10 ml-auto"
                  />
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <div className="text-2xl font-mono font-bold text-blue-600">
                {formatTimeForTimezone(city.timezone)}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {formatDateForTimezone(city.timezone)}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {city.timezone} ({getUTCOffset(city.timezone)})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}