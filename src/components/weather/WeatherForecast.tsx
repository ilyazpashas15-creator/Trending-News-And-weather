import React from 'react';
import { ForecastData } from '@/types/weather.types';
import SimpleWeatherIcon from '@/components/ui/SimpleWeatherIcon';

interface WeatherForecastProps {
  forecast: ForecastData | null;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return null;
  }

  // Filter 12:00 PM forecasts for each day (up to 5 days)
  const dailyForecasts = forecast.list.filter((item: any) => {
    return item.dt_txt.includes('12:00:00');
  }).slice(0, 5);

  // Calculate global min and max temp across the 5 days to normalize temperature range bars
  let globalMin = 100;
  let globalMax = -100;
  dailyForecasts.forEach((item: any) => {
    const min = Math.round(item.main.temp_min);
    const max = Math.round(item.main.temp_max);
    if (min < globalMin) globalMin = min;
    if (max > globalMax) globalMax = max;
  });
  if (globalMax === globalMin) {
    globalMax += 5;
    globalMin -= 5;
  }

  return (
    <div className="relative rounded-[32px] p-1 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] dark:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(99,102,241,0.12)]">
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-[34px] blur-2xl opacity-60 dark:opacity-80" />

      <div className="relative rounded-[30px] bg-white/95 dark:bg-[#0c1326]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/12 p-6 sm:p-8 lg:p-10 overflow-hidden">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-white/[0.08] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📅</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                5-Day Meteorological Outlook
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Extended temperature trends, daily extremes, and atmospheric conditions
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
            Synoptic Analysis
          </span>
        </div>

        {/* 5 Day Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {dailyForecasts.map((forecastItem: any, index: number) => {
            const date = new Date(forecastItem.dt * 1000);
            const isToday = index === 0;
            const dayName = isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const tempMin = Math.round(forecastItem.main.temp_min);
            const tempMax = Math.round(forecastItem.main.temp_max);
            const condition = forecastItem.weather[0]?.main || 'Clouds';
            const description = forecastItem.weather[0]?.description || '';
            const humidity = forecastItem.main?.humidity || 50;
            const pop = forecastItem.pop ? Math.round(forecastItem.pop * 100) : (condition.toLowerCase().includes('rain') ? 60 : 10);

            // Compute percentage range for the visual min/max bar
            const barLeft = Math.max(0, Math.min(100, Math.round(((tempMin - globalMin) / (globalMax - globalMin)) * 100)));
            const barRight = Math.max(barLeft + 10, Math.min(100, Math.round(((tempMax - globalMin) / (globalMax - globalMin)) * 100)));

            return (
              <div
                key={index}
                className="group relative rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-slate-50/90 to-white/70 dark:from-[#11192e]/90 dark:via-[#0e1628]/90 dark:to-[#0a1020]/90 border border-slate-200/80 dark:border-white/10 hover:border-purple-400/50 dark:hover:border-purple-400/60 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Header: Day & Date Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className={`text-base font-extrabold ${isToday ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'}`}>
                      {dayName}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 block">
                      {dateStr}
                    </span>
                  </div>

                  {pop > 20 && (
                    <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-500/30">
                      💧 {pop}%
                    </span>
                  )}
                </div>

                {/* Weather Icon & Condition */}
                <div className="flex flex-col items-center justify-center my-3 text-center">
                  <div className="w-14 h-14 transform group-hover:scale-110 transition-transform duration-300">
                    <SimpleWeatherIcon condition={condition} size="md" />
                  </div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 capitalize mt-2 line-clamp-1">
                    {description || condition}
                  </p>
                </div>

                {/* Temperature High / Low Display */}
                <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      {tempMax}°
                    </span>
                    <span className="text-sm font-semibold text-slate-400">
                      / {tempMin}°
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-slate-400">
                    💨 {Math.round(forecastItem.wind?.speed || 3)}m/s
                  </span>
                </div>

                {/* Visual Min/Max Range Bar */}
                <div className="mt-2.5">
                  <div className="relative w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 bg-gradient-to-r from-blue-400 via-amber-400 to-rose-500 rounded-full"
                      style={{
                        left: `${barLeft}%`,
                        width: `${Math.max(15, barRight - barLeft)}%`,
                      }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default WeatherForecast;
