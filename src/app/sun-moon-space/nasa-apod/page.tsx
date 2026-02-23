'use client';

import { useState, useEffect } from 'react';
import astronomyService from '@/services/astronomyService';

export default function NASAAPODPage() {
  const [apodData, setApodData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    console.log('NASA APOD page mounted');
    fetchAPOD();
  }, []);

  const fetchAPOD = async (date?: string) => {
    console.log('fetchAPOD called with date:', date);
    setLoading(true);
    setError('');
    try {
      console.log('Fetching APOD for date:', date || 'today');
      const data = await astronomyService.getAPOD(date);
      console.log('APOD data received:', data);
      setApodData(data);
    } catch (err: any) {
      console.error('APOD fetch error:', err);
      setError(`Error fetching NASA APOD: ${err.message || 'Please try again.'}`);
    } finally {
      console.log('fetchAPOD completed, loading:', false);
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date) {
      fetchAPOD(date);
    }
  };

  const handleToday = () => {
    setSelectedDate('');
    fetchAPOD();
  };

  return (
    <div className="min-h-screen bg-[#1a2942]">
            <div className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Debug Info */}
          <div className="mb-4 p-4 bg-gray-800 rounded text-white text-xs">
            <p>Loading: {loading ? 'true' : 'false'}</p>
            <p>Error: {error || 'none'}</p>
            <p>Has Data: {apodData ? 'true' : 'false'}</p>
            {apodData && <p>Title: {apodData.title}</p>}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">NASA Astronomy Picture of the Day</h1>
              <p className="text-gray-300 mt-2">Discover the cosmos with NASA's daily featured image</p>
            </div>
            <div className="flex gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                max={new Date().toISOString().split('T')[0]}
                className="px-4 py-2 bg-[#2a3f5f] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={handleToday}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Today
              </button>
            </div>
          </div>
          
          {loading && (
            <div className="bg-[#2a3f5f] rounded-2xl p-12 shadow-xl text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading NASA APOD...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {apodData && !loading && (
            <div className="space-y-6">
              {/* Main Image/Video */}
              <div className="bg-[#2a3f5f] rounded-2xl overflow-hidden shadow-xl">
                {apodData.media_type === 'image' ? (
                  <img 
                    src={apodData.url} 
                    alt={apodData.title}
                    className="w-full h-auto"
                  />
                ) : apodData.media_type === 'video' ? (
                  <div className="relative pb-[56.25%]">
                    <iframe
                      src={apodData.url}
                      title={apodData.title}
                      className="absolute top-0 left-0 w-full h-full"
                      allowFullScreen
                    />
                  </div>
                ) : null}
              </div>

              {/* Title and Date */}
              <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{apodData.title}</h2>
                    <p className="text-gray-400">
                      📅 {new Date(apodData.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  {apodData.copyright && (
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">© {apodData.copyright}</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-600 pt-6 mt-6">
                  <h3 className="text-xl font-bold text-white mb-3">Explanation</h3>
                  <p className="text-gray-300 leading-relaxed">{apodData.explanation}</p>
                </div>

                {apodData.hdurl && (
                  <div className="mt-6 text-center">
                    <a
                      href={apodData.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                    >
                      View HD Image 🖼️
                    </a>
                  </div>
                )}
              </div>

              {/* NASA Credit */}
              <div className="bg-blue-500/20 border-2 border-blue-500 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🚀</div>
                  <div>
                    <h4 className="text-blue-200 font-bold text-lg mb-1">Powered by NASA</h4>
                    <p className="text-blue-200 text-sm">
                      Image and explanation courtesy of NASA's Astronomy Picture of the Day (APOD) service.
                      Visit <a href="https://apod.nasa.gov" target="_blank" rel="noopener noreferrer" className="underline">apod.nasa.gov</a> for more.
                    </p>
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
