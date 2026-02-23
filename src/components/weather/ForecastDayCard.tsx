import React from 'react';
import { ForecastItem } from '@/types/weather.types';

interface ForecastDayCardProps {
  forecast: ForecastItem;
}

const ForecastDayCard = ({ forecast }: ForecastDayCardProps) => {
  // Format the date to show day of week
  const date = new Date(forecast.dt * 1000);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Temperature is already in Celsius (API uses units: 'metric')
  const tempCelsius = Math.round(forecast.main.temp);
  const feelsLikeCelsius = Math.round(forecast.main.feels_like);
  const humidity = forecast.main.humidity;
  const windSpeed = Math.round(forecast.wind.speed * 3.6); // Convert from m/s to km/h

  // Get weather icon
  const iconCode = forecast.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border-2 border-blue-400 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50 transition-all">
      <div className="text-sm font-semibold text-white">{dayOfWeek}</div>
      <div className="text-xs text-blue-400 mb-3 font-medium">{monthDay}</div>
      
      <div className="flex justify-center mb-3">
        <img 
          src={iconUrl} 
          alt={forecast.weather[0].description} 
          className="w-14 h-14"
        />
      </div>
      
      <div className="text-2xl font-bold text-white mb-1">{tempCelsius}°</div>
      <div className="text-xs text-gray-300 mb-3">{feelsLikeCelsius}°</div>
      
      {/* Weather Description */}
      <p className="text-xs text-gray-300 capitalize font-medium">{forecast.weather[0].description}</p>
    </div>
  );
};

export default ForecastDayCard;
