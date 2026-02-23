'use client';

import { useState, useEffect } from 'react';
import { fetchWeatherByCity } from '@/services/weatherService';
import { WeatherData } from '@/types/weather.types';

interface CityTime {
  id: string;
  name: string;
  country: string;
  timezone: string;
  weather?: WeatherData;
}

const PopularCitiesPage = () => {
  const [cities, setCities] = useState<CityTime[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityTime[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Define popular cities with timezone information
  useEffect(() => {
    const initialCities: CityTime[] = [
      { id: 'new-york', name: 'New York', country: 'USA', timezone: 'America/New_York' },
      { id: 'london', name: 'London', country: 'UK', timezone: 'Europe/London' },
      { id: 'tokyo', name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' },
      { id: 'sydney', name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney' },
      { id: 'dubai', name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai' },
      { id: 'singapore', name: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore' },
      { id: 'paris', name: 'Paris', country: 'France', timezone: 'Europe/Paris' },
      { id: 'hong-kong', name: 'Hong Kong', country: 'China', timezone: 'Asia/Hong_Kong' },
      { id: 'los-angeles', name: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles' },
      { id: 'toronto', name: 'Toronto', country: 'Canada', timezone: 'America/Toronto' },
      { id: 'berlin', name: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin' },
      { id: 'mumbai', name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata' },
      { id: 'shanghai', name: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai' },
      { id: 'sao-paulo', name: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo' },
      { id: 'moscow', name: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow' },
    ];
    
    setCities(initialCities);
    setFilteredCities(initialCities);
    
    // Fetch weather data for each city
    const fetchWeatherForCities = async () => {
      const updatedCities = await Promise.all(initialCities.map(async (city) => {
        try {
          const weather = await fetchWeatherByCity(city.name);
          return { ...city, weather };
        } catch (error) {
          console.error(`Error fetching weather for ${city.name}:`, error);
          return city;
        }
      }));
      
      setCities(updatedCities);
      setFilteredCities(updatedCities);
    };
    
    fetchWeatherForCities();
  }, []);

  // Filter cities based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCities(cities);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = cities.filter(city => 
        city.name.toLowerCase().includes(term) || 
        city.country.toLowerCase().includes(term)
      );
      setFilteredCities(filtered);
    }
  }, [searchTerm, cities]);

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

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-center border-2 border-blue-300 p-4 rounded-lg">Popular Cities</h1>
      </div>
      <p className="mb-4 text-center">View time in popular cities around the world.</p>
      
      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search cities..."
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Grid of city cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCities.map((city, index) => {
          // Define different color gradients for variety
          const gradients = [
            'from-blue-400 to-cyan-600',
            'from-teal-400 to-blue-600',
            'from-purple-400 to-pink-600',
            'from-indigo-400 to-purple-600',
            'from-cyan-400 to-blue-500',
            'from-emerald-400 to-teal-600',
            'from-amber-400 to-orange-600',
            'from-rose-400 to-pink-600',
            'from-violet-400 to-purple-500',
            'from-green-400 to-emerald-600',
            'from-fuchsia-400 to-purple-600',
            'from-sky-400 to-blue-600',
            'from-lime-400 to-green-600',
            'from-red-400 to-rose-600',
            'from-orange-400 to-amber-600',
          ];
          
          const gradient = gradients[index % gradients.length];
          
          return (
          <div 
            key={city.id} 
            className={`bg-gradient-to-br ${gradient} rounded-xl shadow-lg shadow-blue-500/30 p-5 hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-lg`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white">{city.name}</h3>
                <p className="text-blue-100">{city.country}</p>
              </div>
              {city.weather && (
                <div className="text-right">
                  <div className="text-2xl text-white">{city.weather.main.temp}°C</div>
                  <img 
                    src={`https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`} 
                    alt={city.weather.weather[0].description}
                    className="w-10 h-10 ml-auto"
                  />
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <div className="text-2xl font-mono font-bold text-white">
                {formatTimeForTimezone(city.timezone)}
              </div>
              <div className="text-blue-100 text-sm mt-1">
                {formatDateForTimezone(city.timezone)}
              </div>
              <div className="text-blue-100 text-sm mt-1">
                {city.timezone} ({getUTCOffset(city.timezone)})
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default PopularCitiesPage;