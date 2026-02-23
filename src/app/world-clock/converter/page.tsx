'use client';

import React, { useState, useEffect, useCallback } from 'react';
import CitySearch from '../../../components/world-clock/CitySearch';
import TimezoneCard from '../../../components/world-clock/TimezoneCard';
import { City, POPULAR_CITIES } from '../../../utils/cityDatabase';
import {
  convertTimeBetweenZones,
  formatTimeForTimezone,
  formatDateForTimezone,
  getTimezoneOffset,
  isDSTActive,
  getTimeDifference,
  formatTimeDifference,
  getRelativeTimeDescription,
  calculateOptimalMeetingTimes,
  MeetingTime
} from '../../../services/timezoneService';

interface TimezoneEntry {
  city: City;
  id: string;
}

export default function TimezoneConverterPage() {
  // Selected timezones
  const [selectedCities, setSelectedCities] = useState<TimezoneEntry[]>([]);
  const [referenceCity, setReferenceCity] = useState<City | null>(null);
  
  // Date/Time picker state
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm format
  });
  
  // Conversion results
  const [conversionResults, setConversionResults] = useState<Array<{
    city: City;
    localTime: string;
    localDate: string;
    offset: string;
    isDST: boolean;
    timeDiff: string;
  }>>([]);
  
  // Meeting planner results
  const [meetingTimes, setMeetingTimes] = useState<MeetingTime[]>([]);
  
  // DST warnings
  const [dstWarnings, setDstWarnings] = useState<Array<{
    city: City;
    warning: string;
  }>>([]);

  // Initialize with some popular cities
  useEffect(() => {
    if (selectedCities.length === 0) {
      const initialCities = POPULAR_CITIES.slice(0, 3).map((city, index) => ({
        city,
        id: `${city.id}-${index}`
      }));
      setSelectedCities(initialCities);
      setReferenceCity(POPULAR_CITIES[0]);
    }
  }, []);

  // Add a new city
  const handleAddCity = useCallback((city: City) => {
    if (selectedCities.length >= 10) {
      alert('Maximum 10 timezones allowed. Please remove one first.');
      return;
    }
    
    // Check if city already exists
    const exists = selectedCities.some(entry => entry.city.id === city.id);
    if (exists) {
      alert(`${city.name} is already added.`);
      return;
    }

    setSelectedCities(prev => [...prev, {
      city,
      id: `${city.id}-${Date.now()}`
    }]);
  }, [selectedCities]);

  // Remove a city
  const handleRemoveCity = useCallback((cityId: string) => {
    setSelectedCities(prev => prev.filter(entry => entry.id !== cityId));
  }, []);

  // Set as reference
  const handleSetReference = useCallback((city: City) => {
    setReferenceCity(city);
  }, []);

  // Calculate conversions when date or cities change
  useEffect(() => {
    if (selectedCities.length === 0 || !selectedDate) return;

    const baseDate = new Date(selectedDate);
    const refTimezone = referenceCity?.timezone || selectedCities[0]?.city.timezone || 'UTC';

    // Calculate conversion results
    const results = selectedCities.map(({ city }) => {
      try {
        const convertedDate = convertTimeBetweenZones(refTimezone, city.timezone, baseDate);
        const offset = getTimezoneOffset(city.timezone, convertedDate);
        const isDSTActiveFlag = isDSTActive(city.timezone, convertedDate);
        const timeDiff = getTimeDifference(refTimezone, city.timezone, convertedDate);

        return {
          city,
          localTime: formatTimeForTimezone(city.timezone, convertedDate),
          localDate: formatDateForTimezone(city.timezone, convertedDate),
          offset: `UTC${offset >= 0 ? '+' : '-'}${Math.floor(Math.abs(offset) / 60)}${Math.abs(offset) % 60 > 0 ? `:${Math.abs(offset) % 60}` : ''}`,
          isDST: isDSTActiveFlag,
          timeDiff: formatTimeDifference(timeDiff)
        };
      } catch (error) {
        console.error(`Error converting time for ${city.name}:`, error);
        return {
          city,
          localTime: 'Error',
          localDate: 'Error',
          offset: 'N/A',
          isDST: false,
          timeDiff: 'N/A'
        };
      }
    });

    setConversionResults(results);

    // Check for DST warnings
    const warnings: Array<{ city: City; warning: string }> = [];
    selectedCities.forEach(({ city }) => {
      const convertedDate = convertTimeBetweenZones(refTimezone, city.timezone, baseDate);
      if (isDSTActive(city.timezone, convertedDate)) {
        warnings.push({
          city,
          warning: 'Daylight Saving Time is active'
        });
      }
    });
    setDstWarnings(warnings);

    // Calculate optimal meeting times
    if (selectedCities.length >= 2) {
      const timezones = selectedCities.map(({ city }) => city.timezone);
      const optimalTimes = calculateOptimalMeetingTimes(timezones, 60, 6, 22, 9, 17);
      setMeetingTimes(optimalTimes.slice(0, 5));
    }
  }, [selectedDate, selectedCities, referenceCity]);

  // Copy results to clipboard
  const handleCopyResults = useCallback(() => {
    const refCity = referenceCity || selectedCities[0]?.city;
    if (!refCity) return;

    let text = `Timezone Conversion Results\n`;
    text += `Reference: ${refCity.name}, ${refCity.country}\n`;
    text += `Date/Time: ${new Date(selectedDate).toLocaleString()}\n\n`;
    
    conversionResults.forEach(result => {
      text += `${result.city.name}, ${result.city.country}\n`;
      text += `  Time: ${result.localTime} (${result.localDate})\n`;
      text += `  Offset: ${result.offset}\n`;
      text += `  Difference: ${result.timeDiff}\n`;
      if (result.isDST) text += `  DST: Active\n`;
      text += `\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      alert('Results copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }, [conversionResults, referenceCity, selectedCities, selectedDate]);

  // Time difference matrix
  const renderTimeDifferenceMatrix = () => {
    if (selectedCities.length < 2) return null;

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left text-slate-400 font-medium"></th>
              {selectedCities.map(({ city }) => (
                <th key={city.id} className="p-2 text-center text-slate-300 font-medium">
                  {city.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedCities.map(({ city: fromCity }) => (
              <tr key={fromCity.id}>
                <td className="p-2 text-slate-300 font-medium">{fromCity.name}</td>
                {selectedCities.map(({ city: toCity }) => {
                  const diff = getTimeDifference(fromCity.timezone, toCity.timezone, new Date(selectedDate));
                  const formatted = formatTimeDifference(diff);
                  return (
                    <td 
                      key={toCity.id} 
                      className={`
                        p-2 text-center rounded-lg
                        ${diff === 0 ? 'text-slate-400 bg-slate-800/30' : 
                          diff > 0 ? 'text-green-400 bg-green-500/10' : 
                          'text-orange-400 bg-orange-500/10'}
                      `}
                    >
                      {formatted}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Time Zone Converter
          </h1>
          <p className="text-lg text-slate-400">
            Convert time across multiple locations worldwide
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <CitySearch 
            onCitySelect={handleAddCity}
            placeholder="Search for a city to add..."
            maxResults={10}
          />
          <p className="text-center text-sm text-slate-500 mt-2">
            {selectedCities.length}/10 cities added
          </p>
        </div>

        {/* Date/Time Picker */}
        <div className="max-w-md mx-auto mb-8">
          <label className="block text-sm font-medium text-slate-400 mb-2 text-center">
            Select Date & Time for Conversion
          </label>
          <div className="flex gap-3">
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-800/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
            <button
              onClick={() => setSelectedDate(new Date().toISOString().slice(0, 16))}
              className="px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl transition-all duration-200 text-sm font-medium"
            >
              Now
            </button>
          </div>
        </div>

        {/* DST Warnings */}
        {dstWarnings.length > 0 && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-amber-400 mt-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-amber-400">DST Active</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Daylight Saving Time is currently active in: {dstWarnings.map(w => w.city.name).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timezone Cards Grid */}
        {selectedCities.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              Current Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {selectedCities.map(({ city, id }) => (
                <TimezoneCard
                  key={id}
                  city={city}
                  referenceTimezone={referenceCity?.timezone}
                  onRemove={handleRemoveCity}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}

        {/* Reference Selector */}
        {selectedCities.length > 1 && (
          <div className="max-w-md mx-auto mb-8">
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Reference Timezone
            </label>
            <select
              value={referenceCity?.id || ''}
              onChange={(e) => {
                const city = selectedCities.find(c => c.city.id === e.target.value)?.city;
                if (city) handleSetReference(city);
              }}
              className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {selectedCities.map(({ city }) => (
                <option key={city.id} value={city.id}>
                  {city.name}, {city.country}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Conversion Results Table */}
        {conversionResults.length > 0 && (
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                Conversion Results
              </h2>
              <button
                onClick={handleCopyResults}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                  />
                </svg>
                Copy Results
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-600/30 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-700/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Location</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Local Time</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Offset</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Difference</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-slate-300">DST</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {conversionResults.map((result, index) => (
                      <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{result.city.name}</div>
                          <div className="text-sm text-slate-400">{result.city.country}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-200 font-mono">{result.localTime}</td>
                        <td className="px-4 py-3 text-slate-300">{result.localDate}</td>
                        <td className="px-4 py-3 text-slate-400">{result.offset}</td>
                        <td className="px-4 py-3">
                          <span className={`
                            ${result.timeDiff === 'Same time' ? 'text-slate-400' : 
                              result.timeDiff.includes('+') ? 'text-green-400' : 'text-orange-400'}
                          `}>
                            {result.timeDiff}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {result.isDST ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
                              Active
                            </span>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Time Difference Matrix */}
        {selectedCities.length >= 2 && (
          <div className="max-w-4xl mx-auto mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">
              Time Difference Matrix
            </h2>
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-600/30 rounded-xl p-4 overflow-x-auto">
              {renderTimeDifferenceMatrix()}
            </div>
          </div>
        )}

        {/* Meeting Planner */}
        {meetingTimes.length > 0 && (
          <div className="max-w-4xl mx-auto mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">
              Optimal Meeting Times
            </h2>
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-600/30 rounded-xl p-4">
              <p className="text-sm text-slate-400 mb-4">
                Best times for meetings across all selected timezones (9 AM - 5 PM business hours)
              </p>
              <div className="space-y-3">
                {meetingTimes.slice(0, 3).map((meeting, index) => (
                  <div 
                    key={index}
                    className={`
                      p-4 rounded-lg border
                      ${meeting.allInBusinessHours 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-slate-700/30 border-slate-600/30'}
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">
                        {meeting.utcTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} UTC
                      </span>
                      <span className={`
                        text-sm
                        ${meeting.allInBusinessHours ? 'text-green-400' : 'text-amber-400'}
                      `}>
                        {meeting.allInBusinessHours ? 'All in business hours' : `${meeting.localTimes.filter(t => t.isBusinessHours).length}/${meeting.localTimes.length} in business hours`}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {meeting.localTimes.map((local, i) => (
                        <div 
                          key={i}
                          className={`
                            text-xs p-2 rounded
                            ${local.isBusinessHours 
                              ? 'bg-green-500/20 text-green-300' 
                              : 'bg-slate-600/30 text-slate-400'}
                          `}
                        >
                          <div className="font-medium">{local.timezone.split('/').pop()?.replace(/_/g, ' ')}</div>
                          <div>{local.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedCities.length === 0 && (
          <div className="text-center py-20">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mx-auto mb-4 text-slate-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className="text-slate-500 text-lg mb-2">No cities added yet</p>
            <p className="text-slate-600">Use the search above to add timezones</p>
          </div>
        )}
      </div>
    </div>
  );
}
