'use client';

import React, { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { WeatherData } from '@/types/weather.types';

// Define alert types
interface WeatherAlert {
  id: number;
  sender_name: string;
  event: string;
  start: number; // Unix timestamp
  end: number;   // Unix timestamp
  description: string;
  tags: string[];
  area: string;
}

export default function SevereWeatherAlertsPage() {
  const { weatherData, loading, error, getWeatherByCity } = useWeather();
  const [city, setCity] = useState<string>('Bengaluru'); // Default city
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [noAlerts, setNoAlerts] = useState<boolean>(true);

  // Simulate fetching alerts - in a real app, this would come from a weather alerts API
  const fetchAlerts = (cityName: string) => {
    // For demonstration, we'll create mock alerts based on the city
    // In a real implementation, this would call an alerts API
    const mockAlerts: WeatherAlert[] = [];
    
    // Only show alerts for specific cities
    if (cityName.toLowerCase().includes('florida') || 
        cityName.toLowerCase().includes('texas') || 
        cityName.toLowerCase().includes('colorado')) {
      
      const now = Date.now() / 1000; // Current time in Unix timestamp
      const tomorrow = now + 24 * 60 * 60; // Tomorrow in Unix timestamp
      
      mockAlerts.push({
        id: 1,
        sender_name: 'National Weather Service',
        event: 'Severe Thunderstorm Warning',
        start: now,
        end: tomorrow,
        description: 'Severe thunderstorms producing large hail and damaging winds are expected. Take cover immediately.',
        tags: ['Thunderstorm', 'Wind', 'Hail'],
        area: cityName
      });
      
      if (cityName.toLowerCase().includes('colorado')) {
        mockAlerts.push({
          id: 2,
          sender_name: 'National Weather Service',
          event: 'Flash Flood Watch',
          start: now,
          end: tomorrow + 12 * 60 * 60, // 36 hours
          description: 'Heavy rainfall may cause flash flooding in low-lying areas. Avoid travel if possible.',
          tags: ['Flood', 'Rain'],
          area: cityName
        });
      }
      
      setNoAlerts(false);
    } else {
      setNoAlerts(true);
    }
    
    setAlerts(mockAlerts);
  };

  useEffect(() => {
    getWeatherByCity(city);
    fetchAlerts(city);
  }, [city, getWeatherByCity]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getWeatherByCity(city);
    fetchAlerts(city);
  };

  // Function to format date from Unix timestamp
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  // Function to determine alert level for styling
  const getAlertLevel = (event: string) => {
    if (event.toLowerCase().includes('warning')) {
      return 'warning';
    } else if (event.toLowerCase().includes('watch')) {
      return 'watch';
    } else if (event.toLowerCase().includes('advisory')) {
      return 'advisory';
    }
    return 'alert';
  };

  // Function to get styling classes based on alert level
  const getAlertClasses = (event: string) => {
    const level = getAlertLevel(event);
    switch(level) {
      case 'warning':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'watch':
        return 'bg-yellow-50 border-l-4 border-blue-500';
      case 'advisory':
        return 'bg-blue-50 border-l-4 border-blue-500';
      default:
        return 'bg-orange-50 border-l-4 border-orange-500';
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center border-2 border-blue-300 p-4 rounded-lg">Severe Weather Alerts</h1>
      </div>
      
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter a city name to check for alerts"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Check Alerts
          </button>
        </form>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {noAlerts && !loading && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-6 rounded-lg mb-6 text-center">
          <div className="text-2xl mb-2">✓</div>
          <h3 className="text-xl font-semibold">No Active Severe Weather Alerts</h3>
          <p className="mt-2">No weather warnings or watches are currently in effect for {city}.</p>
        </div>
      )}

      {alerts.length > 0 && !loading && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Weather Alerts for {city}</h2>
          
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-lg shadow ${getAlertClasses(alert.event)}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{alert.event}</h3>
                  <p className="text-sm text-gray-600 mt-1">Issued by: {alert.sender_name}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {alert.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {getAlertLevel(alert.event).toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-700">{alert.description}</p>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Valid from:</span>
                  <div>{formatDate(alert.start)}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Valid until:</span>
                  <div>{formatDate(alert.end)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-4 rounded-lg">
        <h3 className="font-semibold">About Weather Alerts</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Warning:</strong> Take action! A dangerous weather event is occurring or imminent.</li>
          <li><strong>Watch:</strong> Be prepared! Conditions are favorable for dangerous weather to develop.</li>
          <li><strong>Advisory:</strong> Be aware! Less severe but still significant weather conditions.</li>
        </ul>
      </div>
    </div>
  );
}
