'use client';

import React, { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { ForecastData } from '@/types/weather.types';

interface CompactForecastCardProps {
  forecast: any; // Using 'any' as the forecast data structure is complex
}

const CompactForecastCard: React.FC<CompactForecastCardProps> = ({ forecast }) => {
  const date = new Date(forecast.dt * 1000);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow">
      <div className="text-center">
        <h3 className="font-medium text-gray-800">{day}</h3>
        <p className="text-xs text-gray-500 mb-2">{dateString}</p>
        <div className="flex justify-center mb-2">
          <img 
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
            alt={forecast.weather[0].description}
            className="w-8 h-8"
          />
        </div>
        <p className="text-xs text-gray-600 capitalize mb-2">{forecast.weather[0].description}</p>
        <div className="flex justify-center space-x-2">
          <span className="font-semibold text-orange-600 text-sm">{Math.round(forecast.main.temp_max)}°</span>
          <span className="text-gray-500 text-xs line-through">{Math.round(forecast.main.temp_min)}°</span>
        </div>
      </div>
    </div>
  );
};

export default function TenDayForecastPage() {
  const { forecastData, loading, error, getWeatherByCity } = useWeather();
  const [city, setCity] = useState<string>('Bengaluru'); // Default city

  useEffect(() => {
    getWeatherByCity(city);
  }, [city, getWeatherByCity]);

  // Group forecast data by day (since the API returns 3-hourly data)
  // Note: Free OpenWeather API only provides 5 days of forecast data
  const dailyForecast = forecastData?.list
    // Filter to get one entry per day (around midday)
    .filter((item, index) => {
      const date = new Date(item.dt * 1000);
      return date.getUTCHours() === 12; // Around midday
    })
    .slice(0, 5) || []; // API limitation: only 5 days available

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center border-2 border-blue-300 p-4 rounded-lg">10-Day Forecast</h1>
      </div>

      {/* API Limitation Notice */}
      <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-lg">
        <p className="text-sm">
          <strong>Note:</strong> The free OpenWeather API provides 5-day forecast data. 
          For extended 10-day forecasts, a premium API subscription would be required.
          Showing available 5-day forecast below.
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter a city name"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  getWeatherByCity(city);
                }
              }}
            />
          </div>
          <button
            onClick={() => getWeatherByCity(city)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Update Forecast
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {forecastData && !loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {dailyForecast.map((day, index) => (
            <CompactForecastCard key={index} forecast={day} />
          ))}
        </div>
      )}

      {!loading && !error && !forecastData && (
        <div className="bg-yellow-100 border border-blue-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">No Data Available! </strong>
          <span className="block sm:inline">Please try searching for a valid city.</span>
        </div>
      )}
    </div>
  );
}
