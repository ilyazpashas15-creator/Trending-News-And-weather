import React from 'react';
import { ForecastData } from '@/types/weather.types';
import SimpleWeatherIcon from '@/components/ui/SimpleWeatherIcon';

interface WeatherForecastProps {
  forecast: ForecastData | null;
}

const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return null;
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
        {dailyForecasts.map((forecastItem: any, index: number) => {
          const date = new Date(forecastItem.dt * 1000);
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const tempMin = Math.round(forecastItem.main.temp_min);
          const tempMax = Math.round(forecastItem.main.temp_max);

          return (
            <div key={index} className="group relative">
              {/* Glowing border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-15 dark:opacity-40 group-hover:opacity-40 dark:group-hover:opacity-90 transition duration-300"></div>
              
              {/* Card content */}
              <div className="relative bg-white/95 dark:bg-gradient-to-b dark:from-[#10192e]/90 dark:via-[#0c1322]/90 dark:to-[#070b14]/90 backdrop-blur-xl rounded-2xl p-5 sm:p-6 text-center border border-slate-200/90 dark:border-white/12 hover:border-purple-400/50 dark:hover:border-purple-400/60 shadow-md dark:shadow-[0_12px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] dark:hover:shadow-[0_20px_45px_rgba(168,85,247,0.3),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300">
                <p className="font-extrabold text-slate-900 dark:text-white text-xl mb-1">{day}</p>
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200/70 dark:border-purple-500/40">
                    {dateStr}
                  </span>
                </div>
                <div className="w-16 h-16 mx-auto my-3 transform group-hover:scale-110 transition-transform duration-300">
                  <SimpleWeatherIcon
                    condition={forecastItem.weather[0].main}
                    size="md"
                  />
                </div>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:via-slate-100 dark:to-blue-200 dark:bg-clip-text mt-3 dark:drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">{tempMax}°</p>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-semibold mt-0.5">{tempMin}°</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 capitalize mt-2 font-medium opacity-90 group-hover:opacity-100 transition-opacity">{forecastItem.weather[0].description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;
