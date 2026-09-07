'use client';

import React, { useState } from 'react';
import { WeatherData } from '@/types/weather.types';

interface WeatherAlertBannerProps {
  weather: WeatherData | null;
}

interface AlertInfo {
  type: 'danger' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  advice: string;
  badge: string;
}

const WeatherAlertBanner: React.FC<WeatherAlertBannerProps> = ({ weather }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!weather || !weather.main || !weather.weather || isDismissed) {
    return null;
  }

  const temp = Math.round(weather.main.temp);
  const condition = weather.weather[0]?.main?.toLowerCase() || '';
  const windSpeed = weather.wind?.speed || 0;
  const cityName = weather.name || 'Your location';

  let alert: AlertInfo | null = null;

  if (temp >= 35) {
    alert = {
      type: 'danger',
      title: `Excessive Heat Warning for ${cityName}`,
      message: `Current temperature is ${temp}°C. Prolonged exposure can cause heat exhaustion.`,
      advice: 'Stay hydrated, seek air-conditioned environments, and avoid strenuous outdoor exercise.',
      badge: 'Heat Alert',
    };
  } else if (temp <= 0) {
    alert = {
      type: 'danger',
      title: `Freeze Advisory for ${cityName}`,
      message: `Freezing conditions detected at ${temp}°C. Watch for icy surfaces and black ice.`,
      advice: 'Dress in thermal layers and keep pets indoors.',
      badge: 'Freeze Warning',
    };
  } else if (condition.includes('thunderstorm')) {
    alert = {
      type: 'danger',
      title: `Severe Thunderstorm Alert in ${cityName}`,
      message: 'Active electrical storms detected in your vicinity.',
      advice: 'Seek indoor shelter immediately and avoid open fields or tall trees.',
      badge: 'Storm Warning',
    };
  } else if (condition.includes('rain') || condition.includes('drizzle')) {
    alert = {
      type: 'info',
      title: `Precipitation Advisory for ${cityName}`,
      message: `Rain detected (${weather.weather[0]?.description}). Wet pavement may reduce traction.`,
      advice: 'Carry an umbrella and allow extra commute time.',
      badge: 'Rain Alert',
    };
  } else if (windSpeed >= 12) {
    alert = {
      type: 'warning',
      title: `High Wind Alert in ${cityName}`,
      message: `Wind gusts recorded up to ${(windSpeed * 3.6).toFixed(0)} km/h.`,
      advice: 'Secure loose outdoor items and exercise caution while driving high-profile vehicles.',
      badge: 'Wind Advisory',
    };
  } else if (temp >= 18 && temp <= 26 && (condition.includes('clear') || condition.includes('cloud'))) {
    alert = {
      type: 'success',
      title: `Optimal Weather in ${cityName}`,
      message: `Pleasant ${temp}°C with mild breezes. Exceptional outdoor conditions!`,
      advice: 'Great time for walking, outdoor sports, or relaxing in nature.',
      badge: 'Good Conditions',
    };
  }

  if (!alert) return null;

  const colorStyles = {
    danger: {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200',
      badge: 'bg-rose-600 text-white',
      glow: 'from-rose-500/20 via-pink-500/20 to-orange-500/20',
    },
    warning: {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200',
      badge: 'bg-amber-600 text-white',
      glow: 'from-amber-500/20 via-yellow-500/20 to-orange-500/20',
    },
    info: {
      bg: 'bg-blue-500/10 border-blue-500/30 text-blue-800 dark:text-blue-200',
      badge: 'bg-blue-600 text-white',
      glow: 'from-blue-500/20 via-cyan-500/20 to-indigo-500/20',
    },
    success: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200',
      badge: 'bg-emerald-600 text-white',
      glow: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    },
  }[alert.type];

  return (
    <div className="relative mb-6 rounded-2xl overflow-hidden page-enter shadow-lg">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorStyles.glow} rounded-2xl blur opacity-60`} />
      <div
        className={`relative p-4 sm:p-5 rounded-2xl border backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${colorStyles.bg}`}
      >
        <div className="flex items-start gap-3">
          <span
            className={`px-2.5 py-1 text-xs font-bold uppercase rounded-lg tracking-wider flex-shrink-0 mt-0.5 sm:mt-0 ${colorStyles.badge}`}
          >
            {alert.badge}
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-bold flex items-center gap-1.5">
              {alert.title}
            </h4>
            <p className="text-xs sm:text-sm mt-0.5 opacity-90">
              {alert.message}{' '}
              <span className="font-semibold underline decoration-dotted">{alert.advice}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="self-end sm:self-center p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xs font-medium flex items-center gap-1 flex-shrink-0"
          aria-label="Dismiss weather alert"
        >
          <span className="hidden sm:inline">Dismiss</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WeatherAlertBanner;
