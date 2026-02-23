'use client';

import React, { useState, useEffect } from 'react';

// Define the types for weather layer options
type WeatherLayer = 'temperature' | 'precipitation' | 'wind' | 'satellite';

export default function WeatherMapsPage() {
  const [selectedLayer, setSelectedLayer] = useState<WeatherLayer>('temperature');
  const [city, setCity] = useState<string>('Bengaluru');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 12.9716, lng: 77.5946 }); // Default to Bengaluru

  // Function to simulate changing the map center based on city
  const updateMapForCity = (cityName: string) => {
    // In a real implementation, you would geocode the city name to get coordinates
    // For this example, I'll use a simple mapping for demonstration
    const cityCoordinates: Record<string, { lat: number; lng: number }> = {
      'Bengaluru': { lat: 12.9716, lng: 77.5946 },
      'London': { lat: 51.5074, lng: -0.1278 },
      'New York': { lat: 40.7128, lng: -74.0060 },
      'Tokyo': { lat: 35.6762, lng: 139.6503 },
      'Sydney': { lat: -33.8688, lng: 151.2093 },
      'Paris': { lat: 48.8566, lng: 2.3522 },
      'Dubai': { lat: 25.2048, lng: 55.2708 },
    };

    const coordinates = cityCoordinates[cityName] || { lat: 12.9716, lng: 77.5946 }; // Default to Bengaluru
    setMapCenter(coordinates);
  };

  useEffect(() => {
    updateMapForCity(city);
  }, [city]);

  // Function to handle layer selection
  const handleLayerChange = (layer: WeatherLayer) => {
    setSelectedLayer(layer);
  };

  // Function to simulate map update
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateMapForCity(city);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">Weather Maps</h1>
      </div>
      
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter a city name"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Update Map
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Weather Layers</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleLayerChange('temperature')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedLayer === 'temperature'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Temperature
          </button>
          <button
            onClick={() => handleLayerChange('precipitation')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedLayer === 'precipitation'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Precipitation
          </button>
          <button
            onClick={() => handleLayerChange('wind')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedLayer === 'wind'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Wind Speed
          </button>
          <button
            onClick={() => handleLayerChange('satellite')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedLayer === 'satellite'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gray-100 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1)} Map: {city}
          </h2>
          <p className="text-sm text-gray-600">Centered on coordinates: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}</p>
        </div>
        
        {/* Map container - In a real implementation, this would be a Leaflet map */}
        <div 
          className="relative w-full h-[500px] bg-gradient-to-br from-blue-100 to-cyan-100"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%233d8bfd' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}
        >
          {/* In a real implementation, this would be a Leaflet map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 bg-white bg-opacity-80 rounded-lg shadow-lg max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Weather Map</h3>
              <p className="text-gray-600 mb-4">
                This is a placeholder for the {selectedLayer} weather map for {city}. 
                In a full implementation, this would display an interactive map with real weather data overlays.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Hot</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Warm</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Moderate</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Cool</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100">
              +
            </button>
            <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100">
              -
            </button>
          </div>
          
          {/* Location marker */}
          <div 
            className="absolute w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        </div>
        
        <div className="p-4 bg-gray-50 border-t">
          <h3 className="font-medium text-gray-800 mb-2">Map Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
              <span className="text-sm">High {selectedLayer === 'temperature' ? 'Temp' : selectedLayer === 'wind' ? 'Wind Speed' : 'Precipitation'}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
              <span className="text-sm">Medium {selectedLayer === 'temperature' ? 'Temp' : selectedLayer === 'wind' ? 'Wind Speed' : 'Precipitation'}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
              <span className="text-sm">Low {selectedLayer === 'temperature' ? 'Temp' : selectedLayer === 'wind' ? 'Wind Speed' : 'Precipitation'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <p>Note: In a production environment, this would integrate with a mapping service like Leaflet and weather data APIs to display real-time weather overlays.</p>
      </div>
    </div>
  );
}
