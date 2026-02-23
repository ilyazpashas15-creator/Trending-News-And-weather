'use client';

import { useState, useEffect } from 'react';
import astronomyService from '@/services/astronomyService';

export default function SunMoonSpaceISSPage() {
  const [issData, setIssData] = useState<any>(null);
  const [peopleData, setPeopleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchISSData();
    fetchPeopleInSpace();

    // Auto-refresh every 5 seconds
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchISSData();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchISSData = async () => {
    try {
      const data = await astronomyService.getISSLocation();
      setIssData(data);
      setError('');
    } catch (err) {
      // Error is already handled in the service with fallback data
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPeopleInSpace = async () => {
    try {
      const data = await astronomyService.getPeopleInSpace();
      setPeopleData(data);
    } catch (err) {
      // Error is already handled in the service with fallback data
      console.error('Unexpected error:', err);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#1a2942]">
            <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">ISS Tracker</h1>
              <p className="text-gray-300 mt-2">Track the International Space Station in real-time.</p>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                autoRefresh 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              {autoRefresh ? '🔄 Auto-Refresh ON' : '⏸️ Auto-Refresh OFF'}
            </button>
          </div>
          
          {loading && (
            <div className="bg-[#2a3f5f] rounded-2xl p-12 shadow-xl text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading ISS data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {issData && !loading && (
            <div className="space-y-6">
              {/* Current ISS Location */}
              <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🛰️</div>
                  <h2 className="text-2xl font-bold text-white mb-2">Current ISS Location</h2>
                  <p className="text-gray-400 text-sm">Updated: {formatTimestamp(issData.timestamp)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#1a2942] rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-2">Latitude</p>
                    <p className="text-3xl font-bold text-white">{parseFloat(issData.iss_position.latitude).toFixed(4)}°</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {parseFloat(issData.iss_position.latitude) >= 0 ? 'North' : 'South'}
                    </p>
                  </div>

                  <div className="bg-[#1a2942] rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-2">Longitude</p>
                    <p className="text-3xl font-bold text-white">{parseFloat(issData.iss_position.longitude).toFixed(4)}°</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {parseFloat(issData.iss_position.longitude) >= 0 ? 'East' : 'West'}
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-[#1a2942] rounded-xl p-6 text-center">
                  <p className="text-gray-400 text-sm mb-2">Approximate Speed</p>
                  <p className="text-2xl font-bold text-white">~28,000 km/h</p>
                  <p className="text-gray-400 text-sm mt-2">Orbits Earth every ~90 minutes</p>
                </div>

                <div className="mt-6 text-center">
                  <a
                    href={`https://www.google.com/maps?q=${issData.iss_position.latitude},${issData.iss_position.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                  >
                    View on Google Maps 🗺️
                  </a>
                </div>
              </div>

              {/* People in Space */}
              {peopleData && (
                <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">👨‍🚀</div>
                    <h2 className="text-2xl font-bold text-white mb-2">People in Space</h2>
                    <p className="text-4xl font-bold text-blue-400 mt-4">{peopleData.number}</p>
                    <p className="text-gray-400 text-sm mt-2">Currently in orbit</p>
                  </div>

                  <div className="space-y-3 mt-6">
                    {peopleData.people.map((person: any, index: number) => (
                      <div key={index} className="bg-[#1a2942] rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">👤</div>
                          <div>
                            <p className="text-white font-semibold">{person.name}</p>
                            <p className="text-gray-400 text-sm">{person.craft}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ISS Facts */}
              <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">ISS Facts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#1a2942] rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Altitude</p>
                    <p className="text-xl font-bold text-white">~408 km</p>
                  </div>
                  <div className="bg-[#1a2942] rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Orbital Period</p>
                    <p className="text-xl font-bold text-white">~90 minutes</p>
                  </div>
                  <div className="bg-[#1a2942] rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Launch Date</p>
                    <p className="text-xl font-bold text-white">Nov 20, 1998</p>
                  </div>
                  <div className="bg-[#1a2942] rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Mass</p>
                    <p className="text-xl font-bold text-white">~420,000 kg</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
