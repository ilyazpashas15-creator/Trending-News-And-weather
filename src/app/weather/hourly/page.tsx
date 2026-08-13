'use client';

import React, { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { WeatherData, ForecastData } from '@/types/weather.types';

// Define a type for hourly forecast data
interface HourlyForecastData {
  dt: number; // Unix timestamp
  temp: number; // Temperature
  feels_like: number; // Feels like temperature
  humidity: number; // Humidity percentage
  wind_speed: number; // Wind speed in m/s
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  dt_txt: string; // Date and time string
}

interface HourlyForecastProps {
  forecastList: HourlyForecastData[];
}

const HourlyForecastChart: React.FC<HourlyForecastProps> = ({ forecastList }) => {
  // Limit to 24 hours of forecast
  const hourlyData = forecastList.slice(0, 24);

  return (
    <div className="glass-card rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gradient mb-4">24-Hour Forecast</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4" style={{ minWidth: `${hourlyData.length * 80}px` }}>
          {hourlyData.map((hour, index) => {
            const date = new Date(hour.dt * 1000);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateString = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

            return (
              <div key={index} className="flex flex-col items-center min-w-[70px] group">
                <div className="text-sm text-slate-300">{timeString}</div>
                <div className="text-xs text-slate-400 mt-1">{dateString}</div>
                <img 
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} 
                  alt={hour.weather[0].description}
                  className="w-10 h-10 my-2 group-hover:scale-125 transition-transform duration-300"
                />
                <div className="text-lg font-semibold text-gradient-soft">{Math.round(hour.temp)}°</div>
                <div className="text-xs text-slate-400 mt-1">{Math.round(hour.humidity)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const HourlyForecastTable: React.FC<HourlyForecastProps> = ({ forecastList }) => {
  // Limit to 24 hours of forecast
  const hourlyData = forecastList.slice(0, 24);

  return (
    <div className="glass-card rounded-xl shadow-md overflow-hidden">
      <h2 className="text-xl font-bold text-gradient p-6 pb-4">24-Hour Forecast Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/[0.03]">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Weather
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Temp
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Feels Like
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Humidity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Wind
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {hourlyData.map((hour, index) => {
              const date = new Date(hour.dt * 1000);
              const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              return (
                <tr key={index} className={index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                    {timeString}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                    <div className="flex items-center">
                      <img 
                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
                        alt={hour.weather[0].description}
                        className="w-8 h-8 mr-2"
                      />
                      <span className="capitalize">{hour.weather[0].description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                    {Math.round(hour.temp)}°C
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                    {Math.round(hour.feels_like)}°C
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                    {hour.humidity}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                    {(hour.wind_speed * 3.6).toFixed(1)} km/h
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function HourlyForecastPage() {
  const { forecastData, loading, error, getWeatherByCity } = useWeather();
  const [city, setCity] = useState<string>('Bengaluru'); // Default city

  useEffect(() => {
    getWeatherByCity(city);
  }, [city, getWeatherByCity]);

  // Group forecast data by hour for the next 24 hours
  const hourlyForecast = forecastData?.list || [];

  return (
    <div className="container mx-auto p-4 md:p-6 relative z-10">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-extrabold text-gradient section-heading text-center py-4 page-enter">Hourly Forecast</h1>
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
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white rounded-xl glow-btn font-semibold transition-colors"
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
        <div className="space-y-6">
          <HourlyForecastChart forecastList={hourlyForecast as any} />
          <HourlyForecastTable forecastList={hourlyForecast as any} />
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
