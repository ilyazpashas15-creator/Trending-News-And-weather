'use client';

import { useState, useEffect } from 'react';
import { searchLocations } from '@/services/weatherService';
import { LocationSearchResult } from '@/types/weather.types';

interface SavedCity {
  id: string;
  name: string;
  country: string;
  timezone: string;
}

export default function WorldClockAddCityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [savedCities, setSavedCities] = useState<SavedCity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved cities from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedWorldClockCities');
    if (saved) {
      const parsedCities: SavedCity[] = JSON.parse(saved);
      setSavedCities(parsedCities);
    }
  }, []);

  // Debounced search function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchLocations(query);
      setSearchResults(results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search for cities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addCity = (city: LocationSearchResult) => {
    // Check if city is already saved
    const alreadySaved = savedCities.some(
      savedCity => savedCity.name.toLowerCase() === city.name.toLowerCase()
    );
    
    if (alreadySaved) {
      alert(`${city.name} is already in your saved locations!`);
      return;
    }
    
    // Construct timezone based on coordinates (this is a simplified approach)
    // In a real app, you'd want to use a timezone API to get the exact timezone
    const newCity: SavedCity = {
      id: `${city.name}-${Date.now()}`,
      name: city.name,
      country: city.country,
      timezone: getClosestTimezone(city.lat, city.lon) // Fallback timezone calculation
    };
    
    const updatedCities = [...savedCities, newCity];
    setSavedCities(updatedCities);
    localStorage.setItem('savedWorldClockCities', JSON.stringify(updatedCities));
    
    setSearchTerm('');
    setSearchResults([]);
    alert(`${city.name} has been added to your locations!`);
  };

  // Helper function to get closest timezone based on coordinates (simplified)
  const getClosestTimezone = (lat: number, lon: number): string => {
    // This is a simplified approach - in a real app, you'd use a timezone API
    // For now, return a default timezone based on longitude
    const offset = Math.round(lon / 15); // Rough approximation
    if (offset >= -10 && offset <= -4) return 'America/New_York';
    if (offset >= -3 && offset <= 3) return 'Europe/London';
    if (offset >= 4 && offset <= 7) return 'Asia/Dubai';
    if (offset >= 8 && offset <= 12) return 'Asia/Tokyo';
    if (offset >= -4 && offset <= -11) return 'America/Los_Angeles';
    if (offset >= 12 && offset <= 15) return 'Australia/Sydney';
    
    // Default to London for unknown locations
    return 'Europe/London';
  };

  const isCitySaved = (cityName: string) => {
    return savedCities.some(city => city.name.toLowerCase() === cityName.toLowerCase());
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-center border-2 border-blue-300 p-4 rounded-lg">Add New City</h1>
      </div>
      <p className="mb-4 text-center">Add a new city to your world clock.</p>
      
      <div className="max-w-2xl">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for a city..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {searchResults.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {searchResults.map((city, index) => (
                <li key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{city.name}</h3>
                      <p className="text-sm text-gray-500">{city.country}</p>
                    </div>
                    <button
                      onClick={() => addCity(city)}
                      disabled={isCitySaved(city.name)}
                      className={`px-4 py-2 rounded ${
                        isCitySaved(city.name)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {isCitySaved(city.name) ? 'Added' : 'Add'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {!loading && searchTerm && searchResults.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500">
            No cities found. Try a different search term.
          </div>
        )}
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Saved Cities</h2>
          {savedCities.length === 0 ? (
            <p className="text-gray-600">No saved cities yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {savedCities.map(city => (
                <span 
                  key={city.id} 
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {city.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}