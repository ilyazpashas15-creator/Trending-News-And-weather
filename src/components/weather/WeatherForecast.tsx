import React from 'react';
import { ForecastData } from '@/types/weather.types';
import SimpleWeatherIcon from '@/components/ui/SimpleWeatherIcon';

interface WeatherForecastProps {
  forecast: ForecastData | null;
}

const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
  if (!forecast) {
    return <p className="text-slate-500">No forecast data available.</p>;
  }

  const dailyForecasts = forecast.list.filter((item: any) => {
    return item.dt_txt.includes('12:00:00');
  }).slice(0, 5);

  return (
    <div className="relative rounded-3xl p-6 sm:p-8 page-enter">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl hero-glow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl hero-glow" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Enhanced Title */}
      <div className="relative z-10 mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center relative inline-block w-full">
          <span className="text-gradient drop-shadow-lg">
            5-Day Forecast
          </span>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_12px_rgba(167,139,250,0.6)]"></div>
        </h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 relative z-10">
        {dailyForecasts.map((forecast: any, index: number) => {
          const date = new Date(forecast.dt * 1000);
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const tempMin = Math.round(forecast.main.temp_min);
          const tempMax = Math.round(forecast.main.temp_max);

          return (
            <div key={index} className="group relative">
              {/* Glowing border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-15 group-hover:opacity-40 transition duration-300"></div>
              
              {/* Card content */}
              <div className="relative glass-card glass-card-hover rounded-2xl p-6 text-center hover:border-purple-400/50">
                <p className="font-extrabold text-gradient-soft text-xl mb-1">{day}</p>
                <p className="text-sm text-purple-300 mb-4 font-medium">{dateStr}</p>
                <div className="w-16 h-16 mx-auto my-4 transform group-hover:scale-110 transition-transform duration-300">
                  <SimpleWeatherIcon
                    condition={forecast.weather[0].main}
                    size="md"
                  />
                </div>
                <p className="text-3xl font-extrabold text-gradient-soft mt-4">{tempMax}°</p>
                <p className="text-xl text-slate-400 mt-1">{tempMin}°</p>
                <p className="text-sm text-slate-300 capitalize mt-3 opacity-80 group-hover:opacity-100 transition-opacity">{forecast.weather[0].description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;
