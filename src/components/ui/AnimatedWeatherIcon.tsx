import React from 'react';

interface AnimatedWeatherIconProps {
  condition: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const AnimatedWeatherIcon: React.FC<AnimatedWeatherIconProps> = ({ 
  condition, 
  size = 'md' 
}) => {
  // Determine the size classes based on the size prop
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  // Determine the weather condition and render appropriate animated icon
  const renderAnimatedIcon = () => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      // Animated sun icon
      return (
        <div className={`${sizeClasses[size]} relative`}>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Sun */}
            <div className="w-3/4 h-3/4 rounded-full bg-blue-300 animate-pulse shadow-lg shadow-blue-300/50"></div>
          </div>
          
          {/* Sun rays - animated */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full animate-spin">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute rounded-full bg-blue-300"
                  style={{
                    width: '4px',
                    height: '20px',
                    top: '10%',
                    left: '50%',
                    transformOrigin: '50% 60px',
                    transform: `translateX(-50%) rotate(${i * 45}deg)`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (conditionLower.includes('cloud')) {
      // Animated cloud icon
      return (
        <div className={`${sizeClasses[size]} relative`}>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Main cloud */}
            <div className="w-3/4 h-1/3 bg-gray-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            
            {/* Cloud parts */}
            <div className="w-1/3 h-1/4 bg-gray-300 rounded-full absolute top-2/5 left-1/3 transform -translate-x-1/2 animate-pulse"></div>
            <div className="w-1/3 h-1/4 bg-gray-300 rounded-full absolute top-2/5 right-1/3 transform translate-x-1/2 animate-pulse"></div>
          </div>
        </div>
      );
    } else if (conditionLower.includes('rain')) {
      // Animated rain icon
      return (
        <div className={`${sizeClasses[size]} relative`}>
          {/* Cloud */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-3/4 h-1/4 bg-gray-400 rounded-full"></div>
          
          {/* Rain drops */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-3 bg-blue-400 rounded-full animate-rain"
                style={{
                  left: `${-20 + i * 15}px`,
                  animationDelay: `${i * 0.2}s`,
                  animation: `rain 1.5s linear infinite`,
                }}
              ></div>
            ))}
          </div>
        </div>
      );
    } else if (conditionLower.includes('snow')) {
      // Animated snow icon
      return (
        <div className={`${sizeClasses[size]} relative`}>
          {/* Cloud */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-3/4 h-1/4 bg-gray-400 rounded-full"></div>
          
          {/* Snow flakes */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-snow"
                style={{
                  left: `${-20 + i * 15}px`,
                  animationDelay: `${i * 0.3}s`,
                  animation: `snow 3s linear infinite`,
                }}
              ></div>
            ))}
          </div>
        </div>
      );
    } else if (conditionLower.includes('thunderstorm')) {
      // Animated thunderstorm icon
      return (
        <div className={`${sizeClasses[size]} relative`}>
          {/* Cloud */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-3/4 h-1/3 bg-gray-700 rounded-full"></div>
          
          {/* Lightning */}
          <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 animate-pulse">
            <div className="w-0 h-0 
              border-l-[10px] border-l-transparent
              border-b-[20px] border-b-yellow-300
              border-r-[10px] border-r-transparent"></div>
          </div>
        </div>
      );
    } else {
      // Default animated cloud for other conditions
      return (
        <div className={`${sizeClasses[size]} relative`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-1/3 bg-gray-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <div className="w-1/3 h-1/4 bg-gray-300 rounded-full absolute top-2/5 left-1/3 transform -translate-x-1/2 animate-pulse"></div>
            <div className="w-1/3 h-1/4 bg-gray-300 rounded-full absolute top-2/5 right-1/3 transform translate-x-1/2 animate-pulse"></div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex justify-center items-center">
      {renderAnimatedIcon()}
    </div>
  );
};

export default AnimatedWeatherIcon;
