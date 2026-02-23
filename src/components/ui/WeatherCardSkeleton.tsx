import React from 'react';

const WeatherCardSkeleton = () => {
  return (
    <div className="hero-weather-card mb-8 animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mt-2"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="detail-card">
            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
          </div>
        ))}
      </div>
      
      {/* Additional weather details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="detail-card">
            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;