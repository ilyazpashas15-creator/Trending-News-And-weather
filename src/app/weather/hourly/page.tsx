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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">24-Hour Forecast</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4" style={{ minWidth: `${hourlyData.length * 80}px` }}>
          {hourlyData.map((hour, index) => {
            const date = new Date(hour.dt * 1000);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateString = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

            return (
              <div key={index} className="flex flex-col items-center min-w-[70px]">
                <div className="text-sm text-gray-600">{timeString}</div>
                <div className="text-xs text-gray-500 mt-1">{dateString}</div>
                <img 
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} 
                  alt={hour.weather[0].description}
                  className="w-10 h-10 my-2"
                />
                <div className="text-lg font-semibold text-gray-800">{Math.round(hour.temp)}°</div>
                <div className="text-xs text-gray-500 mt-1">{Math.round(hour.humidity)}%</div>
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <h2 className="text-xl font-bold text-gray-800 p-6 pb-4">24-Hour Forecast Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weather
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Temp
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feels Like
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Humidity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Wind
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hourlyData.map((hour, index) => {
              const date = new Date(hour.dt * 1000);
              const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              return (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {timeString}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <img 
                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
                        alt={hour.weather[0].description}
                        className="w-8 h-8 mr-2"
                      />
                      <span>{hour.weather[0].description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.round(hour.temp)}°C
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.round(hour.feels_like)}°C
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {hour.humidity}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center border-2 border-blue-300 p-4 rounded-lg">Hourly Forecast</h1>
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
        <div className="space-y-6">
          <HourlyForecastChart forecastList={hourlyForecast as any} />
          <HourlyForecastTable forecastList={hourlyForecast as any} />
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
