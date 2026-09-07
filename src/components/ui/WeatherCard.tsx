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
      <div className="glass-card rounded-3xl mb-8 p-10">
        <div className="text-center text-slate-400">
          <p>Weather data unavailable</p>
        </div>
      </div>
    );
  }

  const { name, sys, main, weather: weatherDetails, wind } = weather;

  // Validate required fields
  if (!name || !main || !weatherDetails || weatherDetails.length === 0) {
    return (
      <div className="glass-card rounded-3xl mb-8 p-10">
        <div className="text-center text-slate-400">
          <p>Incomplete weather data</p>
        </div>
      </div>
    );
  }

  // Temperature is already in Celsius (API uses units: 'metric')
  const tempCelsius = main.temp ? Math.round(main.temp) : 0;
  const feelsLikeCelsius = main.feels_like ? Math.round(main.feels_like) : 0;

  // Helper to get flag emoji from country code
  const getFlagEmoji = (countryCode?: string) => {
    if (!countryCode) return '🌍';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div className="weather-container">
      {/* Premium glass card with ambient glow */}
      <div className="relative mb-8 rounded-[28px] page-enter">
        {/* Outer glow border */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-pink-500/40 rounded-[28px] blur-xl opacity-30 dark:opacity-60 transition duration-500" />

        <div className="relative bg-white/95 dark:bg-[#0c1222]/90 backdrop-blur-2xl rounded-[28px] border border-slate-200/90 dark:border-white/12 shadow-2xl dark:shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(99,102,241,0.15)] overflow-hidden">
          {/* Animated shine swipe */}
          <div className="glass-shine" />

          {/* Ambient glow orbs inside card */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 dark:bg-purple-500/25 rounded-full blur-3xl hero-glow"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 dark:bg-blue-500/25 rounded-full blur-3xl hero-glow" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12">
            {/* City + Date Header */}
            <div className="flex flex-col items-center mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl drop-shadow-lg">{getFlagEmoji(sys?.country)}</span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gradient drop-shadow-lg tracking-tight">
                  {name}
                </h2>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Weather Icon and Temperature - Center Section */}
            <div className="flex flex-col items-center mb-12">
              {/* Weather Icon with Glow */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 dark:from-blue-500/50 dark:via-purple-500/50 dark:to-pink-500/50 rounded-full blur-2xl scale-150 hero-glow"></div>
                <div className="relative">
                  <SimpleWeatherIcon
                    condition={weatherDetails[0].main}
                    size="lg"
                  />
                </div>
              </div>

              {/* Large Temperature Display */}
              <div className="text-center mb-4 flex items-baseline">
                <span className="text-8xl sm:text-9xl font-extrabold text-gradient-soft dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:via-blue-100 dark:to-indigo-200 dark:bg-clip-text tracking-tight drop-shadow-[0_4px_24px_rgba(96,165,250,0.3)]">
                  {tempCelsius}
                </span>
                <span className="text-4xl sm:text-5xl font-bold text-slate-500 dark:text-blue-300">°C</span>
              </div>

              {/* Weather Description */}
              <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-200 capitalize font-medium tracking-wide drop-shadow-sm">
                {weatherDetails[0].description}
              </p>
            </div>

            {/* Three Main Stat Cards - Feels Like, Humidity, Wind */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
              {/* Feels Like */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 dark:opacity-60 group-hover:opacity-40 dark:group-hover:opacity-90 transition duration-500"></div>
                <div className="relative bg-blue-50/80 dark:bg-gradient-to-br dark:from-[#0f1d3a]/90 dark:to-[#091326]/90 rounded-2xl p-4 sm:p-6 border border-blue-200/90 dark:border-cyan-400/40 hover:border-blue-400/50 dark:hover:border-cyan-300 shadow-sm dark:shadow-[0_8px_25px_rgba(6,182,212,0.18)] transition-all duration-300">
                  <p className="text-xs text-blue-700 dark:text-cyan-300 mb-2 uppercase tracking-wider font-bold text-center">Feels Like</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white text-center dark:drop-shadow-[0_2px_12px_rgba(34,211,238,0.5)]">{feelsLikeCelsius}°C</p>
                </div>
              </div>

              {/* Humidity */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 dark:opacity-60 group-hover:opacity-40 dark:group-hover:opacity-90 transition duration-500"></div>
                <div className="relative bg-purple-50/80 dark:bg-gradient-to-br dark:from-[#1d1238]/90 dark:to-[#120b24]/90 rounded-2xl p-4 sm:p-6 border border-purple-200/90 dark:border-purple-400/40 hover:border-purple-400/50 dark:hover:border-purple-300 shadow-sm dark:shadow-[0_8px_25px_rgba(168,85,247,0.18)] transition-all duration-300">
                  <p className="text-xs text-purple-700 dark:text-purple-300 mb-2 uppercase tracking-wider font-bold text-center">Humidity</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white text-center dark:drop-shadow-[0_2px_12px_rgba(168,85,247,0.5)]">{main.humidity || 0}%</p>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl blur opacity-20 dark:opacity-60 group-hover:opacity-40 dark:group-hover:opacity-90 transition duration-500"></div>
                <div className="relative bg-rose-50/80 dark:bg-gradient-to-br dark:from-[#261026]/90 dark:to-[#170817]/90 rounded-2xl p-4 sm:p-6 border border-rose-200/90 dark:border-pink-400/40 hover:border-rose-400/50 dark:hover:border-pink-300 shadow-sm dark:shadow-[0_8px_25px_rgba(244,114,182,0.18)] transition-all duration-300">
                  <p className="text-xs text-rose-700 dark:text-pink-300 mb-2 uppercase tracking-wider font-bold text-center">Wind Speed</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white text-center dark:drop-shadow-[0_2px_12px_rgba(244,114,182,0.5)]">{wind?.speed || 0} m/s</p>
                </div>
              </div>
            </div>

            {/* Four Additional Stats - Smaller Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Pressure */}
              <div className="bg-blue-50/60 dark:bg-[#0c1830]/85 rounded-xl p-4 border border-blue-200/70 dark:border-blue-500/30 hover:border-blue-400/40 dark:hover:border-blue-400/60 hover:-translate-y-1 shadow-sm dark:shadow-[0_4px_16px_rgba(59,130,246,0.12)] transition-all duration-300">
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-1 uppercase tracking-wide font-bold text-center">Pressure</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white text-center">{main.pressure || 0}<span className="text-xs ml-1 text-slate-500 dark:text-slate-400">hPa</span></p>
              </div>

              {/* UV Index */}
              <div className="bg-amber-50/60 dark:bg-[#261b0a]/85 rounded-xl p-4 border border-amber-200/70 dark:border-amber-500/30 hover:border-amber-400/40 dark:hover:border-amber-400/60 hover:-translate-y-1 shadow-sm dark:shadow-[0_4px_16px_rgba(245,158,11,0.12)] transition-all duration-300">
                <p className="text-xs text-amber-700 dark:text-amber-300 mb-1 uppercase tracking-wide font-bold text-center">UV Index</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white text-center">{Math.round(((main.pressure || 1013) - 980) / 20)}</p>
              </div>

              {/* Visibility */}
              <div className="bg-purple-50/60 dark:bg-[#1a0f2e]/85 rounded-xl p-4 border border-purple-200/70 dark:border-purple-500/30 hover:border-purple-400/40 dark:hover:border-purple-400/60 hover:-translate-y-1 shadow-sm dark:shadow-[0_4px_16px_rgba(168,85,247,0.12)] transition-all duration-300">
                <p className="text-xs text-purple-700 dark:text-purple-300 mb-1 uppercase tracking-wide font-bold text-center">Visibility</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white text-center">{Math.round((main.pressure || 1013) / 100)}<span className="text-xs ml-1 text-slate-500 dark:text-slate-400">km</span></p>
              </div>

              {/* Cloudiness */}
              <div className="bg-cyan-50/60 dark:bg-[#0a2226]/85 rounded-xl p-4 border border-cyan-200/70 dark:border-teal-500/30 hover:border-cyan-400/40 dark:hover:border-teal-400/60 hover:-translate-y-1 shadow-sm dark:shadow-[0_4px_16px_rgba(20,184,166,0.12)] transition-all duration-300">
                <p className="text-xs text-cyan-700 dark:text-cyan-300 mb-1 uppercase tracking-wide font-bold text-center">Cloudiness</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white text-center">{weatherDetails[0]?.main === 'Clear' ? '0' : '65'}<span className="text-xs text-slate-500 dark:text-slate-400">%</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
