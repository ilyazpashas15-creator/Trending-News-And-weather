import React from 'react';

const WeatherCardSkeleton = () => {
  return (
    <div className="glass-card rounded-3xl mb-8 p-8 sm:p-12 animate-pulse page-enter">
      <div className="flex flex-col items-center mb-10">
        <div className="h-6 bg-white/10 rounded w-40 mb-3"></div>
        <div className="h-4 bg-white/10 rounded w-56 mb-2"></div>
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="bg-white/10 rounded-full w-20 h-20 sm:w-24 sm:h-24 mb-8"></div>
        <div className="h-16 bg-white/10 rounded w-32 mb-3"></div>
        <div className="h-4 bg-white/10 rounded w-32"></div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-4 sm:p-6">
            <div className="h-3 bg-white/10 rounded w-20 mx-auto mb-3"></div>
            <div className="h-8 bg-white/10 rounded w-16 mx-auto"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card rounded-xl p-4">
            <div className="h-3 bg-white/10 rounded w-16 mx-auto mb-2"></div>
            <div className="h-6 bg-white/10 rounded w-12 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
