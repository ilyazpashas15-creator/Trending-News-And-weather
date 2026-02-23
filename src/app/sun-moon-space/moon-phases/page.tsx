'use client';

import { useState, useEffect } from 'react';
import astronomyService from '@/services/astronomyService';

export default function SunMoonSpaceMoonPhasesPage() {
  const [moonData, setMoonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMoonPhase();
  }, []);

  const fetchMoonPhase = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await astronomyService.getCurrentMoonPhase();
      setMoonData(data);
    } catch (err) {
      // Error is already handled in the service with fallback data
      // So this shouldn't happen, but just in case
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoonPhaseEmoji = (phase: string) => {
    const phaseMap: { [key: string]: string } = {
      'new moon': '🌑',
      'waxing crescent': '🌒',
      'first quarter': '🌓',
      'waxing gibbous': '🌔',
      'full moon': '🌕',
      'waning gibbous': '🌖',
      'last quarter': '🌗',
      'waning crescent': '🌘'
    };
    return phaseMap[phase.toLowerCase()] || '🌙';
  };

  return (
    <div className="min-h-screen bg-[#1a2942]">
            <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-white">Moon Phases</h1>
          <p className="mb-8 text-gray-300">Track the phases of the moon throughout the month.</p>
          
          {loading && (
            <div className="bg-[#2a3f5f] rounded-2xl p-12 shadow-xl text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading moon phase data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {moonData && !loading && (
            <div className="space-y-6">
              {/* Current Moon Phase */}
              <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="text-8xl mb-4">{moonData.emoji || '🌙'}</div>
                  <h2 className="text-3xl font-bold text-white mb-2">{moonData.phase}</h2>
                  <p className="text-gray-400 mb-6">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  
                  <div className="bg-[#1a2942] rounded-xl p-6 max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400">Illumination</span>
                      <span className="text-2xl font-bold text-white">{moonData.illumination}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                      <div 
                        className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${moonData.illumination}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-6 bg-[#1a2942] rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Days Since New Moon</p>
                    <p className="text-2xl font-bold text-white">{moonData.days_since_new?.toFixed(1)} days</p>
                  </div>
                </div>
              </div>

              {/* Upcoming Moon Events */}
              <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Upcoming Moon Events</h3>
                <div className="space-y-4">
                  <div className="bg-[#1a2942] rounded-xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">🌕</div>
                      <div>
                        <p className="text-white font-semibold text-lg">Next Full Moon</p>
                        <p className="text-gray-400 text-sm">{formatDate(moonData.next_full_moon)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a2942] rounded-xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">🌑</div>
                      <div>
                        <p className="text-white font-semibold text-lg">Next New Moon</p>
                        <p className="text-gray-400 text-sm">{formatDate(moonData.next_new_moon)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Moon Phase Guide */}
              <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Moon Phase Guide</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'New Moon', emoji: '🌑' },
                    { name: 'Waxing Crescent', emoji: '🌒' },
                    { name: 'First Quarter', emoji: '🌓' },
                    { name: 'Waxing Gibbous', emoji: '🌔' },
                    { name: 'Full Moon', emoji: '🌕' },
                    { name: 'Waning Gibbous', emoji: '🌖' },
                    { name: 'Last Quarter', emoji: '🌗' },
                    { name: 'Waning Crescent', emoji: '🌘' }
                  ].map((phase) => (
                    <div 
                      key={phase.name}
                      className={`bg-[#1a2942] rounded-xl p-4 text-center transition-all ${
                        moonData.phase.toLowerCase() === phase.name.toLowerCase() 
                          ? 'ring-2 ring-blue-500' 
                          : ''
                      }`}
                    >
                      <div className="text-3xl mb-2">{phase.emoji}</div>
                      <p className="text-white text-sm font-semibold">{phase.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
