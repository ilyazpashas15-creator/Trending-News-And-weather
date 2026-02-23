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
  { id: 'MST', name: 'Mountain Standard Time', offset: -7 },
  { id: 'AKST', name: 'Alaska Standard Time', offset: -9 },
  { id: 'HST', name: 'Hawaii Standard Time', offset: -10 },
  { id: 'WAT', name: 'West Africa Time', offset: 1 },
  { id: 'AST', name: 'Arabia Standard Time', offset: 3 },
];

export default function CalculatorsTimezonePage() {
  const [selectedTime1, setSelectedTime1] = useState<string>('00:00');
  const [selectedTimezone1, setSelectedTimezone1] = useState<string>('EST');
  const [selectedTimezone2, setSelectedTimezone2] = useState<string>('PST');
  const [result, setResult] = useState<{ time: string; diffHours: number; diffMinutes: number } | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Calculate time in destination timezone
  const calculateTimezoneConversion = () => {
    const tz1 = timeZones.find(tz => tz.id === selectedTimezone1);
    const tz2 = timeZones.find(tz => tz.id === selectedTimezone2);
    
    if (!tz1 || !tz2) return;

    // Parse the input time
    const [hours, minutes] = selectedTime1.split(':').map(Number);
    
    // Create a reference date (using current date to handle day transitions)
    const refDate = new Date();
    refDate.setHours(hours, minutes, 0, 0);
    
    // Calculate the time in UTC
    const utcTime = refDate.getTime() + (tz1.offset * 3600000);
    
    // Calculate the time in the destination timezone
    const destTime = new Date(utcTime + (tz2.offset * 3600000));
    
    const destHours = destTime.getHours();
    const destMinutes = destTime.getMinutes();
    
    // Calculate the time difference
    const diffHours = tz2.offset - tz1.offset;
    const diffMinutes = 0; // Difference in hours and minutes is already calculated
    
    setResult({
      time: `${destHours.toString().padStart(2, '0')}:${destMinutes.toString().padStart(2, '0')}`,
      diffHours: Math.abs(diffHours),
      diffMinutes
    });
  };

  // Calculate current time in selected timezones
  const calculateCurrentTime = () => {
    const tz1 = timeZones.find(tz => tz.id === selectedTimezone1);
    const tz2 = timeZones.find(tz => tz.id === selectedTimezone2);
    
    if (!tz1 || !tz2) return;

    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000); // Convert to UTC
    
    // Calculate time in selected timezones
    const time1 = new Date(utc + (3600000 * tz1.offset));
    const time2 = new Date(utc + (3600000 * tz2.offset));
    
    const time1Str = time1.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const time2Str = time2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Calculate the time difference
    const diffHours = tz2.offset - tz1.offset;
    
    setResult({
      time: time2Str,
      diffHours: Math.abs(diffHours),
      diffMinutes: 0
    });
    
    // Update the selected time to match the first timezone
    setSelectedTime1(time1Str);
  };

  // Reset the calculator
  const resetCalculator = () => {
    setSelectedTime1('00:00');
    setSelectedTimezone1('EST');
    setSelectedTimezone2('PST');
    setResult(null);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">Timezone Calculator</h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">Calculate time differences between time zones.</p>
      
      <div className="max-w-3xl mx-auto bg-[#1a2942] border-2 border-blue-400 rounded-xl shadow-lg p-6">
        {/* Current Time Display */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
          <div className="text-xl font-semibold">Current Time: {currentTime}</div>
        </div>

        {/* Input Fields */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={selectedTime1}
                onChange={(e) => setSelectedTime1(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Timezone</label>
              <select
                value={selectedTimezone1}
                onChange={(e) => setSelectedTimezone1(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {timeZones.map(tz => (
                  <option key={tz.id} value={tz.id}>
                    {tz.name} ({tz.id} UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Timezone</label>
              <select
                value={selectedTimezone2}
                onChange={(e) => setSelectedTimezone2(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {timeZones.map(tz => (
                  <option key={tz.id} value={tz.id}>
                    {tz.name} ({tz.id} UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={calculateTimezoneConversion}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
          >
            Convert Time
          </button>
          <button
            onClick={calculateCurrentTime}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium"
          >
            Convert Current Time
          </button>
          <button
            onClick={resetCalculator}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium"
          >
            Reset
          </button>
        </div>

        {/* Results Display */}
        {result && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold mb-3">Conversion Result</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{selectedTime1}</div>
                <div className="text-sm text-gray-600">{timeZones.find(tz => tz.id === selectedTimezone1)?.name}</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{result.time}</div>
                <div className="text-sm text-gray-600">{timeZones.find(tz => tz.id === selectedTimezone2)?.name}</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-100 rounded-lg text-center">
              <div className="font-medium">
                Time Difference: {result.diffHours} hour{result.diffHours !== 1 ? 's' : ''} 
                {result.diffHours > 0 ? ` (${result.diffHours > 0 ? '+' : ''}${result.diffHours})` : ''}
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-700">
                {selectedTime1} in {timeZones.find(tz => tz.id === selectedTimezone1)?.name} 
                &nbsp;=&nbsp; {result.time} in {timeZones.find(tz => tz.id === selectedTimezone2)?.name}
              </p>
            </div>
          </div>
        )}

        {/* Timezone Information */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Timezone Information</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timezone</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTC Offset</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timeZones.map((tz) => (
                  <tr key={tz.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{tz.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{tz.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
