import React from 'react';
import { WeatherData } from '@/types/weather.types';
import SimpleWeatherIcon from './SimpleWeatherIcon';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  // Input validation
  if (!weather) {
    return (
      <div className="weather-card mb-8">
        <div className="text-center text-gray-500">
          <p>Weather data unavailable</p>
        </div>
      </div>
    );
  }

  const { name, main, weather: weatherDetails, wind } = weather;

  // Validate required fields
  if (!name || !main || !weatherDetails || weatherDetails.length === 0) {
    return (
      <div className="weather-card mb-8">
        <div className="text-center text-gray-500">
          <p>Incomplete weather data</p>
        </div>
      </div>
    );
  }

  // Temperature is already in Celsius (API uses units: 'metric')
  const tempCelsius = main.temp ? Math.round(main.temp) : 0;
  const feelsLikeCelsius = main.feels_like ? Math.round(main.feels_like) : 0;

  return (
    <div className="weather-container">
      <div className="mb-8">
        {/* Top Section - Dark Navy Background */}
        <div className="bg-[#1a2942] py-8 px-4">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-4">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>

            {/* Large weather icon and temperature */}
            <div className="flex flex-col items-center my-4">
              <SimpleWeatherIcon
                condition={weatherDetails[0].main}
                size="lg"
              />
              <p className="text-8xl sm:text-9xl font-bold text-white mt-4">{tempCelsius}
                <span className="text-3xl">°C</span>
              </p>
              <p className="text-2xl text-gray-400 capitalize mt-4">{weatherDetails[0].description}</p>
            </div>
          </div>
        </div>

        {/* Middle Section - Feels Like, Humidity, Wind Speed */}
        <div className="bg-[#0d1929] py-6 px-4">
          <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-400 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/60 hover:scale-105 hover:border-yellow-300 transition-all duration-300 cursor-pointer">
              <p className="text-xs text-blue-400 mb-2 font-semibold uppercase tracking-wide text-center">Feels Like</p>
              <p className="text-2xl sm:text-3xl font-bold text-white text-center hover:text-blue-400 transition-colors">{feelsLikeCelsius}°C</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-400 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/60 hover:scale-105 hover:border-yellow-300 transition-all duration-300 cursor-pointer">
              <p className="text-xs text-blue-400 mb-2 font-semibold uppercase tracking-wide text-center">Humidity</p>
              <p className="text-2xl sm:text-3xl font-bold text-white text-center hover:text-blue-400 transition-colors">{main.humidity || 0}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-400 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/60 hover:scale-105 hover:border-yellow-300 transition-all duration-300 cursor-pointer">
              <p className="text-xs text-blue-400 mb-2 font-semibold uppercase tracking-wide text-center">Wind Speed</p>
              <p className="text-2xl sm:text-3xl font-bold text-white text-center hover:text-blue-400 transition-colors">{wind?.speed || 0} m/s</p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Details */}
        <div className="bg-[#0a1420] py-6 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-400 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/60 hover:scale-105 hover:border-yellow-300 transition-all duration-300 cursor-pointer">
              <p className="text-xs text-blue-400 mb-2 font-semibold uppercase tracking-wide text-center">Pressure</p>
              <p className="text-xl sm:text-2xl font-bold text-white text-center hover:text-blue-400 transition-colors">{main.pressure || 0} hPa</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-400 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/60 hover:scale-105 hover:border-yellow-300 transition-all duration-300 cursor-pointer">
              <p className="text-xs text-blue-400 mb-2 font-semibold uppercase tracking-wide text-center">UV Index</p>
              <p className="text-xl sm:text-2xl font-bold text-white text-center hover:text-blue-400 transition-colors">{Math.round(((main.pressure || 1013) - 980) / 20)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-400 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/60 hover:scale-105 hover:border-yellow-300 transition-all duration-300 cursor-pointer">
              <p className="text-xs text-blue-400 mb-2 font-semibold uppercase tracking-wide text-center">Visibility</p>
              <p className="text-xl sm:text-2xl font-bold text-white text-center hover:text-blue-400 transition-colors">{Math.round((main.pressure || 1013) / 100)} km</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-400 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/60 hover:scale-105 hover:border-yellow-300 transition-all duration-300 cursor-pointer">
              <p className="text-xs text-blue-400 mb-2 font-semibold uppercase tracking-wide text-center">Cloudiness</p>
              <p className="text-xl sm:text-2xl font-bold text-white text-center hover:text-blue-400 transition-colors">{weatherDetails[0]?.main === 'Clear' ? '0%' : '65%'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
