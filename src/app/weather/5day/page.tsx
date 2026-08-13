'use client';

import React, { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { ForecastData } from '@/types/weather.types';

interface DailyForecastCardProps {
  forecast: any; // Using 'any' as the forecast data structure is complex
}

const DailyForecastCard: React.FC<DailyForecastCardProps> = ({ forecast }) => {
  const date = new Date(forecast.dt * 1000);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-15 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative glass-card glass-card-hover rounded-2xl p-6 text-center hover:border-purple-400/50">
        <h3 className="font-extrabold text-xl text-gradient-soft mb-1">{day}</h3>
        <p className="text-sm text-blue-300 mb-4">{dateString}</p>
        <div className="my-4 flex justify-center">
          <img 
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
            alt={forecast.weather[0].description}
            className="w-16 h-16 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <p className="text-3xl font-bold text-gradient-soft mt-4">{Math.round(forecast.main.temp_max)}°</p>
        <p className="text-xl text-slate-400 mt-1">{Math.round(forecast.main.temp_min)}°</p>
        <p className="text-sm text-slate-300 capitalize mt-3">{forecast.weather[0].description}</p>
      </div>
    </div>
  );
};

export default function FiveDayForecastPage() {
  const { forecastData, loading, error, getWeatherByCity } = useWeather();
  const [city, setCity] = useState<string>('Bengaluru'); // Default city

  useEffect(() => {
    getWeatherByCity(city);
  }, [city, getWeatherByCity]);

  // Group forecast data by day (since the API returns 3-hourly data)
  const dailyForecast = forecastData?.list
    // Filter to get one entry per day (around midday)
    .filter((item, index) => {
      const date = new Date(item.dt * 1000);
      return date.getUTCHours() === 12; // Around midday
    })
    .slice(0, 5) || [];

  return (
    <div className="container mx-auto p-4 md:p-6 relative z-10">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-extrabold text-gradient section-heading text-center py-4 page-enter">5-Day Forecast</h1>
      </div>
      
      <div className="mb-6 page-enter" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="flex-grow">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter a city name"
              className="w-full p-3 glass-input rounded-xl shadow-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  getWeatherByCity(city);
                }
              }}
            />
          </div>
          <button
            onClick={() => getWeatherByCity(city)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white rounded-xl glow-btn transition-colors font-semibold"
          >
            Update Forecast
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-200 px-4 py-3 rounded-2xl relative mb-6 backdrop-blur-md" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {forecastData && !loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {dailyForecast.map((day, index) => (
            <DailyForecastCard key={index} forecast={day} />
          ))}
        </div>
      )}

      {!loading && !error && !forecastData && (
        <div className="bg-amber-500/10 border border-amber-500/40 text-amber-200 px-4 py-3 rounded-2xl relative backdrop-blur-md" role="alert">
          <strong className="font-bold">No Data Available! </strong>
          <span className="block sm:inline">Please try searching for a valid city.</span>
        </div>
      )}
    </div>
  );
}
