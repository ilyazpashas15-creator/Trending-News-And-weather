'use client';

import React from 'react';
import NewsSection from '@/components/ui/NewsSection';

export default function NewsWeatherPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center border-2 border-blue-300 p-4 rounded-lg">Weather News</h1>
      </div>
      <p className="mb-4 text-gray-600 dark:text-gray-300 text-center">Get the latest updates on weather conditions and forecasts.</p>
      
      <div className="mt-8">
        <NewsSection defaultCategory="science" defaultCountry="in" />
      </div>
    </div>
  );
}