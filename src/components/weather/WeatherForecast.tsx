import React from 'react';
import { ForecastData } from '@/types/weather.types';
import SimpleWeatherIcon from '@/components/ui/SimpleWeatherIcon';

interface WeatherForecastProps {
  forecast: ForecastData | null;
}

const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
  if (!forecast) {
    return <p className="text-gray-600">No forecast data available.</p>;
  }

  const dailyForecasts = forecast.list.filter((item: any) => {
    return item.dt_txt.includes('12:00:00');
  }).slice(0, 5);

  return (
    <div className="bg-[#1a2942] rounded-3xl p-6 sm:p-8 shadow-xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">5-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast: any, index: number) => {
          const date = new Date(forecast.dt * 1000);
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          // Temperature is already in Celsius (API uses units: 'metric')
          const tempMin = Math.round(forecast.main.temp_min);
          const tempMax = Math.round(forecast.main.temp_max);


          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-blue-400 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50 transition-all"
            >
              <p className="font-bold text-white text-xl mb-1">{day}</p>
              <p className="text-sm text-blue-400 mb-4 font-medium">{dateStr}</p>
              <div className="w-16 h-16 mx-auto my-4">
                <SimpleWeatherIcon
                  condition={forecast.weather[0].main}
                  size="md"
                />
              </div>
              <p className="text-3xl font-bold text-white mt-4">{tempMax}°</p>
              <p className="text-xl text-gray-300 mt-1">{tempMin}°</p>
              <p className="text-sm text-gray-300 capitalize mt-3">{forecast.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;
