'use client';

import { useState, useEffect } from 'react';
import astronomyService from '@/services/astronomyService';

export default function SunMoonSpaceSunriseSunsetPage() {
  const [city, setCity] = useState('Bengaluru');
  const [loading, setLoading] = useState(false);
  const [sunData, setSunData] = useState<any>(null);
  const [error, setError] = useState('');

  // Default coordinates for Bengaluru
  const [coordinates, setCoordinates] = useState({ lat: 12.9716, lng: 77.5946 });

  useEffect(() => {
    fetchSunriseSunset(coordinates.lat, coordinates.lng);
  }, []);

  const fetchSunriseSunset = async (lat: number, lng: number) => {
    setLoading(true);
    setError('');
    try {
      const data = await astronomyService.getSunriseSunset(lat, lng);
      if (data.status === 'OK') {
        setSunData(data.results);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const cityCoords: { [key: string]: { lat: number; lng: number } } = {
      bengaluru: { lat: 12.9716, lng: 77.5946 },
      bangalore: { lat: 12.9716, lng: 77.5946 },
      mumbai: { lat: 19.0760, lng: 72.8777 },
      delhi: { lat: 28.7041, lng: 77.1025 },
      london: { lat: 51.5074, lng: -0.1278 },
      'new york': { lat: 40.7128, lng: -74.0060 },
      tokyo: { lat: 35.6762, lng: 139.6503 },
      paris: { lat: 48.8566, lng: 2.3522 },
      sydney: { lat: -33.8688, lng: 151.2093 },
    };

    const cityKey = city.toLowerCase();
    if (cityCoords[cityKey]) {
      setCoordinates(cityCoords[cityKey]);
      await fetchSunriseSunset(cityCoords[cityKey].lat, cityCoords[cityKey].lng);
    } else {
      setError('City not found. Try: Bengaluru, Mumbai, Delhi, London, New York, Tokyo, Paris, Sydney');
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">
          Sunrise & Sunset
        </h1>
      </div>
      <p className="mb-8 text-center text-gray-300">View sunrise and sunset times for different locations.</p>
      
      {/* Search Box */}
      <div className="bg-[#2a3f5f] rounded-2xl p-6 shadow-xl mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter city name..."
            className="flex-1 px-4 py-3 bg-[#1a2942] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
        {error && (
          <p className="text-red-400 text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Results */}
      {sunData && !loading && (
        <div className="space-y-6">
          {/* Main Times */}
          <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🌅</div>
              <h2 className="text-2xl font-bold text-white mb-2">{city}</h2>
              <p className="text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a2942] rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">🌄</div>
                <h3 className="text-gray-400 text-sm mb-2">Sunrise</h3>
                <p className="text-3xl font-bold text-white">{formatTime(sunData.sunrise)}</p>
              </div>

              <div className="bg-[#1a2942] rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">🌇</div>
                <h3 className="text-gray-400 text-sm mb-2">Sunset</h3>
                <p className="text-3xl font-bold text-white">{formatTime(sunData.sunset)}</p>
              </div>
            </div>

            <div className="mt-6 bg-[#1a2942] rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Solar Noon</p>
                  <p className="text-xl font-bold text-white">{formatTime(sunData.solar_noon)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Day Length</p>
                  <p className="text-xl font-bold text-white">{formatDuration(sunData.day_length)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Twilight Times */}
          <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Twilight Times</h3>
            <div className="space-y-4">
              <div className="bg-[#1a2942] rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Civil Twilight</p>
                  <p className="text-gray-400 text-sm">Brightest twilight phase</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm">{formatTime(sunData.civil_twilight_begin)} - {formatTime(sunData.civil_twilight_end)}</p>
                </div>
              </div>

              <div className="bg-[#1a2942] rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Nautical Twilight</p>
                  <p className="text-gray-400 text-sm">Horizon barely visible</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm">{formatTime(sunData.nautical_twilight_begin)} - {formatTime(sunData.nautical_twilight_end)}</p>
                </div>
              </div>

              <div className="bg-[#1a2942] rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Astronomical Twilight</p>
                  <p className="text-gray-400 text-sm">Darkest twilight phase</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm">{formatTime(sunData.astronomical_twilight_begin)} - {formatTime(sunData.astronomical_twilight_end)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-[#2a3f5f] rounded-2xl p-12 shadow-xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-300 mt-4">Loading sunrise/sunset data...</p>
        </div>
      )}
    </div>
  );
}
