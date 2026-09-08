'use client';

import React, { Suspense } from 'react';
import WeatherMapStudio from '@/components/weather/WeatherMapStudio';

export default function WeatherMapsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-400">Loading High-Definition Doppler Radar...</p>
        </div>
      }
    >
      <WeatherMapStudio />
    </Suspense>
  );
}
