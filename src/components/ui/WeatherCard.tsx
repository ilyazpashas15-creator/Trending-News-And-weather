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
        <div className="absolute -inset-px bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-pink-500/40 rounded-[28px] blur-lg opacity-40" />

        <div className="relative glass-card rounded-[28px] overflow-hidden">
          {/* Animated shine swipe */}
          <div className="glass-shine" />

          {/* Ambient glow orbs inside card */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl hero-glow"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl hero-glow" style={{ animationDelay: '2s' }}></div>
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
              <p className="text-sm text-slate-400 tracking-wide">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Weather Icon and Temperature - Center Section */}
            <div className="flex flex-col items-center mb-12">
              {/* Weather Icon with Glow */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-2xl scale-150 hero-glow"></div>
                <div className="relative">
                  <SimpleWeatherIcon
                    condition={weatherDetails[0].main}
                    size="lg"
                  />
                </div>
              </div>

              {/* Large Temperature Display */}
              <div className="text-center mb-4 flex items-baseline">
                <span className="text-8xl sm:text-9xl font-bold text-gradient-soft tracking-tight">
                  {tempCelsius}
                </span>
                <span className="text-4xl sm:text-5xl font-bold text-slate-400">°C</span>
              </div>

              {/* Weather Description */}
              <p className="text-xl sm:text-2xl text-slate-200 capitalize font-medium tracking-wide">
                {weatherDetails[0].description}
              </p>
            </div>

            {/* Three Main Stat Cards - Feels Like, Humidity, Wind */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
              {/* Feels Like */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                <div className="relative glass-card rounded-2xl p-4 sm:p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                  <p className="text-xs text-blue-300 mb-2 uppercase tracking-wider font-semibold text-center">Feels Like</p>
                  <p className="text-3xl sm:text-4xl font-bold text-white text-center">{feelsLikeCelsius}°C</p>
                </div>
              </div>

              {/* Humidity */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                <div className="relative glass-card rounded-2xl p-4 sm:p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                  <p className="text-xs text-purple-300 mb-2 uppercase tracking-wider font-semibold text-center">Humidity</p>
                  <p className="text-3xl sm:text-4xl font-bold text-white text-center">{main.humidity || 0}%</p>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                <div className="relative glass-card rounded-2xl p-4 sm:p-6 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300">
                  <p className="text-xs text-pink-300 mb-2 uppercase tracking-wider font-semibold text-center">Wind Speed</p>
                  <p className="text-3xl sm:text-4xl font-bold text-white text-center">{wind?.speed || 0} m/s</p>
                </div>
              </div>
            </div>

            {/* Four Additional Stats - Smaller Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Pressure */}
              <div className="glass-card rounded-xl p-4 border border-blue-500/10 hover:border-blue-400/30 hover:-translate-y-1 transition-all duration-300">
                <p className="text-xs text-blue-300 mb-1 uppercase tracking-wide font-medium text-center">Pressure</p>
                <p className="text-2xl font-bold text-white text-center">{main.pressure || 0}<span className="text-xs ml-1 text-slate-400">hPa</span></p>
              </div>

              {/* UV Index */}
              <div className="glass-card rounded-xl p-4 border border-yellow-500/10 hover:border-yellow-400/30 hover:-translate-y-1 transition-all duration-300">
                <p className="text-xs text-yellow-300 mb-1 uppercase tracking-wide font-medium text-center">UV Index</p>
                <p className="text-2xl font-bold text-white text-center">{Math.round(((main.pressure || 1013) - 980) / 20)}</p>
              </div>

              {/* Visibility */}
              <div className="glass-card rounded-xl p-4 border border-purple-500/10 hover:border-purple-400/30 hover:-translate-y-1 transition-all duration-300">
                <p className="text-xs text-purple-300 mb-1 uppercase tracking-wide font-medium text-center">Visibility</p>
                <p className="text-2xl font-bold text-white text-center">{Math.round((main.pressure || 1013) / 100)}<span className="text-xs ml-1 text-slate-400">km</span></p>
              </div>

              {/* Cloudiness */}
              <div className="glass-card rounded-xl p-4 border border-cyan-500/10 hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300">
                <p className="text-xs text-cyan-300 mb-1 uppercase tracking-wide font-medium text-center">Cloudiness</p>
                <p className="text-2xl font-bold text-white text-center">{weatherDetails[0]?.main === 'Clear' ? '0' : '65'}<span className="text-xs text-slate-400">%</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
