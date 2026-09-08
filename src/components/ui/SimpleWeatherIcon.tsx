import React from 'react';

interface SimpleWeatherIconProps {
  condition: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SimpleWeatherIcon: React.FC<SimpleWeatherIconProps> = ({
  condition,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  const conditionLower = (condition || '').toLowerCase();

  const renderIcon = () => {
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${sizeClasses[size]} drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-transform duration-300`}
        >
          <defs>
            <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            <linearGradient id="rayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="14" fill="url(#sunGrad)" />
          {/* Pulsing Sun Rays */}
          <g stroke="url(#rayGrad)" strokeWidth="3" strokeLinecap="round">
            <line x1="32" y1="6" x2="32" y2="12" />
            <line x1="32" y1="52" x2="32" y2="58" />
            <line x1="6" y1="32" x2="12" y2="32" />
            <line x1="52" y1="32" x2="58" y2="32" />
            <line x1="13.6" y1="13.6" x2="17.8" y2="17.8" />
            <line x1="46.2" y1="46.2" x2="50.4" y2="50.4" />
            <line x1="13.6" y1="50.4" x2="17.8" y2="46.2" />
            <line x1="46.2" y1="17.8" x2="50.4" y2="13.6" />
          </g>
        </svg>
      );
    }

    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${sizeClasses[size]} drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]`}
        >
          <defs>
            <linearGradient id="rainCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="rainDropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          {/* Cloud Body */}
          <path
            d="M20 40h26a10 10 0 0 0 2.4-19.7A14 14 0 0 0 21.6 22 9 9 0 0 0 20 40z"
            fill="url(#rainCloudGrad)"
          />
          {/* Rain Drops */}
          <line x1="22" y1="46" x2="18" y2="54" stroke="url(#rainDropGrad)" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="46" x2="28" y2="54" stroke="url(#rainDropGrad)" strokeWidth="3" strokeLinecap="round" />
          <line x1="42" y1="46" x2="38" y2="54" stroke="url(#rainDropGrad)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    }

    if (conditionLower.includes('thunderstorm')) {
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${sizeClasses[size]} drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]`}
        >
          <defs>
            <linearGradient id="stormCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <path
            d="M20 38h26a10 10 0 0 0 2.4-19.7A14 14 0 0 0 21.6 20 9 9 0 0 0 20 38z"
            fill="url(#stormCloudGrad)"
          />
          {/* Lightning Bolt */}
          <polygon
            points="34,36 26,48 33,48 29,58 41,44 34,44"
            fill="url(#boltGrad)"
            className="animate-pulse"
          />
        </svg>
      );
    }

    if (conditionLower.includes('snow')) {
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${sizeClasses[size]} drop-shadow-[0_0_12px_rgba(186,230,253,0.5)]`}
        >
          <defs>
            <linearGradient id="snowCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <path
            d="M20 38h26a10 10 0 0 0 2.4-19.7A14 14 0 0 0 21.6 20 9 9 0 0 0 20 38z"
            fill="url(#snowCloudGrad)"
          />
          <g fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1">
            <circle cx="22" cy="48" r="2.5" />
            <circle cx="33" cy="52" r="2.5" />
            <circle cx="44" cy="48" r="2.5" />
          </g>
        </svg>
      );
    }

    if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return (
        <svg
          viewBox="0 0 64 64"
          className={`${sizeClasses[size]} drop-shadow-[0_0_10px_rgba(148,163,184,0.3)]`}
        >
          <defs>
            <linearGradient id="mistGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <line x1="16" y1="26" x2="48" y2="26" stroke="url(#mistGrad)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="12" y1="34" x2="52" y2="34" stroke="url(#mistGrad)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="18" y1="42" x2="46" y2="42" stroke="url(#mistGrad)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="22" y1="50" x2="42" y2="50" stroke="url(#mistGrad)" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    }

    // Default Clouds
    return (
      <svg
        viewBox="0 0 64 64"
        className={`${sizeClasses[size]} drop-shadow-[0_0_12px_rgba(148,163,184,0.3)]`}
      >
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <radialGradient id="sunBehind" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
        </defs>
        {/* Sun Behind Cloud */}
        <circle cx="44" cy="22" r="10" fill="url(#sunBehind)" opacity="0.9" />
        {/* Foreground Cloud */}
        <path
          d="M18 44h30a11 11 0 0 0 2.5-21.7A15 15 0 0 0 19.8 24 10 10 0 0 0 18 44z"
          fill="url(#cloudGrad)"
        />
      </svg>
    );
  };

  return <div className="flex justify-center items-center">{renderIcon()}</div>;
};

export default SimpleWeatherIcon;