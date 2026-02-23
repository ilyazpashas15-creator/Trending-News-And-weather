'use client';

import { useState, useEffect } from 'react';

// Define time zones with their UTC offsets
const timeZones = [
  { id: 'UTC', name: 'Coordinated Universal Time', offset: 0 },
  { id: 'EST', name: 'Eastern Standard Time', offset: -5 },
  { id: 'PST', name: 'Pacific Standard Time', offset: -8 },
  { id: 'GMT', name: 'Greenwich Mean Time', offset: 0 },
  { id: 'CET', name: 'Central European Time', offset: 1 },
  { id: 'JST', name: 'Japan Standard Time', offset: 9 },
  { id: 'AEST', name: 'Australian Eastern Time', offset: 10 },
  { id: 'BST', name: 'British Summer Time', offset: 1 },
  { id: 'IST', name: 'Indian Standard Time', offset: 5.5 },
  { id: 'CST', name: 'China Standard Time', offset: 8 },
];

export default function TimersClockPage() {
  const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>(['EST', 'PST', 'GMT']);
  const [customTimeZones, setCustomTimeZones] = useState<{id: string, name: string, offset: number}[]>([]);
  const [newTimeZoneName, setNewTimeZoneName] = useState('');
  const [newTimeZoneOffset, setNewTimeZoneOffset] = useState(0);

  // Calculate time for a given timezone offset
  const getTimeForOffset = (offset: number) => {
    const utc = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
    const newTime = new Date(utc + (3600000 * offset));
    return newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // Calculate date for a given timezone offset
  const getDateForOffset = (offset: number) => {
    const utc = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
    const newTime = new Date(utc + (3600000 * offset));
    return newTime.toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Add a custom time zone
  const addCustomTimeZone = () => {
    if (!newTimeZoneName || newTimeZoneOffset === undefined) return;
    
    const newCustomZone = {
      id: newTimeZoneName.toUpperCase().replace(/\s+/g, ''),
      name: newTimeZoneName,
      offset: newTimeZoneOffset
    };
    
    setCustomTimeZones(prev => [...prev, newCustomZone]);
    setNewTimeZoneName('');
    setNewTimeZoneOffset(0);
  };

  // Remove a custom time zone
  const removeCustomTimeZone = (id: string) => {
    setCustomTimeZones(prev => prev.filter(zone => zone.id !== id));
    setSelectedTimeZones(prev => prev.filter(zoneId => zoneId !== id));
  };

  // Toggle selection of a time zone
  const toggleTimeZone = (id: string) => {
    setSelectedTimeZones(prev => 
      prev.includes(id) 
        ? prev.filter(zoneId => zoneId !== id) 
        : [...prev, id]
    );
  };

  // Get all available time zones (predefined + custom)
  const allTimeZones = [...timeZones, ...customTimeZones];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">World Clock Timer</h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">View timers in different time zones around the world.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Zone Selection Panel */}
        <div className="lg:col-span-1 bg-[#1a2942] border-2 border-blue-400 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Select Time Zones</h2>
          
          {/* Predefined Time Zones */}
          <div className="mb-6">
            <h3 className="font-semibold text-white mb-3">Predefined Time Zones</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto bg-[#0d1929] border-2 border-blue-400 rounded-lg p-3">
              {timeZones.map(tz => (
                <div key={tz.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={tz.id}
                    checked={selectedTimeZones.includes(tz.id)}
                    onChange={() => toggleTimeZone(tz.id)}
                    className="mr-2 w-4 h-4"
                  />
                  <label htmlFor={tz.id} className="flex-1 text-gray-300 text-sm">
                    {tz.name} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Custom Time Zones */}
          {customTimeZones.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-white mb-3">Custom Time Zones</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto bg-[#0d1929] border-2 border-blue-400 rounded-lg p-3">
                {customTimeZones.map(tz => (
                  <div key={tz.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={tz.id}
                      checked={selectedTimeZones.includes(tz.id)}
                      onChange={() => toggleTimeZone(tz.id)}
                      className="mr-2 w-4 h-4"
                    />
                    <label htmlFor={tz.id} className="flex-1 flex justify-between text-gray-300 text-sm">
                      <span>{tz.name}</span>
                      <button 
                        onClick={() => removeCustomTimeZone(tz.id)}
                        className="text-red-400 hover:text-red-300 text-sm font-semibold"
                      >
                        Remove
                      </button>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add Custom Time Zone */}
          <div className="border-t-2 border-blue-400 pt-4">
            <h3 className="font-semibold text-white mb-3">Add Custom Time Zone</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold text-white mb-2">Name</label>
                <input
                  type="text"
                  value={newTimeZoneName}
                  onChange={(e) => setNewTimeZoneName(e.target.value)}
                  placeholder="e.g., My Location"
                  className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">UTC Offset (hours)</label>
                <input
                  type="number"
                  step="0.5"
                  value={newTimeZoneOffset}
                  onChange={(e) => setNewTimeZoneOffset(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <button
                onClick={addCustomTimeZone}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-400 rounded-lg font-semibold transition"
              >
                Add Time Zone
              </button>
            </div>
          </div>
        </div>
        
        {/* World Clock Display */}
        <div className="lg:col-span-2 bg-[#1a2942] border-2 border-blue-400 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">World Clock</h2>
          
          {selectedTimeZones.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>Select time zones to display their current times</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTimeZones.map(zoneId => {
                const zone = allTimeZones.find(tz => tz.id === zoneId);
                if (!zone) return null;
                
                return (
                  <div key={zoneId} className="border-2 border-blue-400 rounded-lg p-4 bg-[#0d1929] hover:bg-[#2a3f5f] transition">
                    <div className="text-lg font-semibold text-white">{zone.name}</div>
                    <div className="text-3xl font-mono font-bold my-2 text-blue-400">
                      {getTimeForOffset(zone.offset)}
                    </div>
                    <div className="text-gray-300">
                      {getDateForOffset(zone.offset)} <span className="text-blue-400">(UTC{zone.offset >= 0 ? '+' : ''}{zone.offset})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}