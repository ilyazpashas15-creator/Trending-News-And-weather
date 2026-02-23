import React from 'react';

interface SimpleWeatherIconProps {
  condition: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SimpleWeatherIcon: React.FC<SimpleWeatherIconProps> = ({
  condition,
  size = 'md'
}) => {
  // Determine the size classes based on the size prop
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  // Determine the weather condition and render appropriate icon
  const renderIcon = () => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      // Sun icon
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className={sizeClasses[size]}
        >
          <circle cx="12" cy="12" r="5" fill="#f59e0b" />
          <g fill="#f59e0b">
            <rect x="11" y="1" width="2" height="2" rx="1" />
            <rect x="11" y="21" width="2" height="2" rx="1" />
            <rect x="21" y="11" width="2" height="2" rx="1" />
            <rect x="1" y="11" width="2" height="2" rx="1" />
            <rect x="17.5" y="3.5" width="2" height="2" rx="1" transform="rotate(45 17.5 3.5)" />
            <rect x="4.5" y="18.5" width="2" height="2" rx="1" transform="rotate(45 4.5 18.5)" />
            <rect x="18.5" y="20.5" width="2" height="2" rx="1" transform="rotate(45 18.5 20.5)" />
            <rect x="3.5" y="1.5" width="2" height="2" rx="1" transform="rotate(45 3.5 1.5)" />
          </g>
        </svg>
      );
    } else if (conditionLower.includes('cloud')) {
      // Cloud icon
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className={sizeClasses[size]}
        >
          <path d="M6.5 19a4.5 4.5 0 1 1-.36-8.98 7 7 0 0 1 12.18-4.2 5.5 5.5 0 0 1 1.68 10.18 6.5 6.5 0 0 1-13.4 1z" fill="#9ca3af" />
        </svg>
      );
    } else if (conditionLower.includes('rain')) {
      // Rain icon
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className={sizeClasses[size]}
        >
          <path d="M6.5 19a4.5 4.5 0 1 1-.36-8.98 7 7 0 0 1 12.18-4.2 5.5 5.5 0 0 1 1.68 10.18 6.5 6.5 0 0 1-13.4 1z" fill="#93c5fd" />
          <g fill="#60a5fa">
            <path d="M8 16l-1 4" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 16l-1 4" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 16l-1 4" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      );
    } else if (conditionLower.includes('snow')) {
      // Snow icon
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className={sizeClasses[size]}
        >
          <path d="M6.5 19a4.5 4.5 0 1 1-.36-8.98 7 7 0 0 1 12.18-4.2 5.5 5.5 0 0 1 1.68 10.18 6.5 6.5 0 0 1-13.4 1z" fill="#cbd5e1" />
          <g fill="#e2e8f0">
            <circle cx="8" cy="16" r="1" />
            <circle cx="12" cy="16" r="1" />
            <circle cx="16" cy="16" r="1" />
          </g>
        </svg>
      );
    } else if (conditionLower.includes('thunderstorm')) {
      // Thunderstorm icon
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className={sizeClasses[size]}
        >
          <path d="M6.5 19a4.5 4.5 0 1 1-.36-8.98 7 7 0 0 1 12.18-4.2 5.5 5.5 0 0 1 1.68 10.18 6.5 6.5 0 0 1-13.4 1z" fill="#64748b" />
          <path d="M13 10l-4 6h4l-2 4" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    } else {
      // Default cloud icon
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className={sizeClasses[size]}
        >
          <path d="M6.5 19a4.5 4.5 0 1 1-.36-8.98 7 7 0 0 1 12.18-4.2 5.5 5.5 0 0 1 1.68 10.18 6.5 6.5 0 0 1-13.4 1z" fill="#9ca3af" />
        </svg>
      );
    }
  };

  return (
    <div className="flex justify-center items-center">
      {renderIcon()}
    </div>
  );
};

export default SimpleWeatherIcon;