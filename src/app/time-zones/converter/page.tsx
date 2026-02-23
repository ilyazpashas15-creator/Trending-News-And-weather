'use client';

import React, { useState, useEffect } from 'react';
import { getAllTimeZones } from '@/utils/timezones';

export default function TimeZonesConverterPage() {
  const [timeZones] = useState<string[]>(() => getAllTimeZones());
  const [sourceTimezone, setSourceTimezone] = useState<string>('America/New_York');
  const [targetTimezone, setTargetTimezone] = useState<string>('Europe/London');
  const [sourceTime, setSourceTime] = useState<string>(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:mm
  });
  const [convertedTime, setConvertedTime] = useState<string>('');
  const [convertedDate, setConvertedDate] = useState<string>('');

  // Function to convert time between timezones
  const convertTime = () => {
    try {
      // Create a Date object from the source time in the source timezone
      const sourceDate = new Date(sourceTime);
      
      // Format the source time in the source timezone
      const sourceFormatted = new Intl.DateTimeFormat('en-US', {
        timeZone: sourceTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(sourceDate);
      
      // Convert to target timezone
      const targetTime = new Date(
        sourceDate.toLocaleString('en-US', { timeZone: targetTimezone })
      );
      
      const convertedTime = targetTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      const convertedDate = targetTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
      
      setConvertedTime(convertedTime);
      setConvertedDate(convertedDate);
      
      // Update source display for reference
      console.log(`Source time: ${sourceFormatted}`);
    } catch (error) {
      console.error('Error converting time:', error);
      setConvertedTime('Error converting time');
      setConvertedDate('');
    }
  };

  // Update conversion when any input changes
  useEffect(() => {
    convertTime();
  }, [sourceTime, sourceTimezone, targetTimezone]);

  const handleSwapTimezones = () => {
    setSourceTimezone(targetTimezone);
    setTargetTimezone(sourceTimezone);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">
          Time Zone Converter
        </h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">
        Convert time between different time zones
      </p>

      <div className="bg-[#1a2942] border-2 border-blue-400 rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="source-timezone" className="block text-sm font-bold text-white mb-2">
              From Timezone:
            </label>
            <select
              id="source-timezone"
              className="w-full p-3 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={sourceTimezone}
              onChange={(e) => setSourceTimezone(e.target.value)}
            >
              {timeZones.map(tz => (
                <option key={`source-${tz}`} value={tz}>{tz.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="target-timezone" className="block text-sm font-bold text-white mb-2">
              To Timezone:
            </label>
            <select
              id="target-timezone"
              className="w-full p-3 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={targetTimezone}
              onChange={(e) => setTargetTimezone(e.target.value)}
            >
              {timeZones.map(tz => (
                <option key={`target-${tz}`} value={tz}>{tz.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="source-time" className="block text-sm font-bold text-white mb-2">
            Date and Time:
          </label>
          <input
            type="datetime-local"
            id="source-time"
            className="w-full p-3 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={sourceTime}
            onChange={(e) => setSourceTime(e.target.value)}
          />
        </div>

        <div className="flex justify-center my-6">
          <button
            onClick={handleSwapTimezones}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold border-2 border-blue-400 transition"
          >
            ⇄ Swap Timezones
          </button>
        </div>

        <div className="mt-8 p-6 bg-[#0d1929] border-2 border-blue-400 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Conversion Result</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a2942] border-2 border-blue-400 p-5 rounded-lg">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">From</h3>
              <p className="text-3xl font-bold text-blue-400 mb-2">
                {new Date(sourceTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
              <p className="text-sm text-gray-300 mb-3">
                {new Date(sourceTime).toLocaleDateString([], {year: 'numeric', month: 'long', day: 'numeric'})}
              </p>
              <p className="text-sm text-blue-400 font-semibold">{sourceTimezone.replace(/_/g, ' ')}</p>
            </div>
            
            <div className="bg-[#1a2942] border-2 border-blue-400 p-5 rounded-lg">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">To</h3>
              <p className="text-3xl font-bold text-blue-400 mb-2">{convertedTime}</p>
              <p className="text-sm text-gray-300 mb-3">{convertedDate}</p>
              <p className="text-sm text-blue-400 font-semibold">{targetTimezone.replace(/_/g, ' ')}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-white mb-3">Time Difference</h3>
          <div className="bg-[#0d1929] border-2 border-purple-400 p-4 rounded-lg">
            {(() => {
              try {
                const sourceTimeObj = new Date(sourceTime);
                const sourceInUTC = new Date(sourceTimeObj.toLocaleString('en-US', { timeZone: 'UTC' }));
                const sourceLocal = new Date(sourceTimeObj.toLocaleString('en-US', { timeZone: sourceTimezone }));
                
                const targetTimeObj = new Date(
                  sourceTimeObj.toLocaleString('en-US', { timeZone: targetTimezone })
                );
                const targetInUTC = new Date(targetTimeObj.toLocaleString('en-US', { timeZone: 'UTC' }));
                
                const sourceOffsetMs = sourceLocal.getTime() - sourceInUTC.getTime();
                const targetOffsetMs = targetTimeObj.getTime() - targetInUTC.getTime();
                
                const diffMs = targetOffsetMs - sourceOffsetMs;
                const diffHours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60));
                const diffMins = Math.floor((Math.abs(diffMs) % (1000 * 60 * 60)) / (1000 * 60));
                
                const sign = diffMs >= 0 ? '+' : '-';
                
                return (
                  <p className="text-gray-300 text-center">
                    <span className="text-blue-400 font-semibold">{targetTimezone.replace(/_/g, ' ')}</span> is{' '}
                    <span className="text-white font-bold">{sign}{diffHours} hour{diffHours !== 1 ? 's' : ''}</span>
                    {diffMins > 0 ? <span className="text-white font-bold"> {diffMins} minute{diffMins !== 1 ? 's' : ''}</span> : ''}{' '}
                    {diffMs >= 0 ? 'ahead of' : 'behind'}{' '}
                    <span className="text-blue-400 font-semibold">{sourceTimezone.replace(/_/g, ' ')}</span>
                  </p>
                );
              } catch (error) {
                return <p className="text-gray-400 text-center">Unable to calculate time difference</p>;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}