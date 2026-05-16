'use client';

import { useState } from 'react';

export default function CalculatorsDurationPage() {
  const [startDate, setStartDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('00:00');
  const [endDate, setEndDate] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('00:00');
  const [result, setResult] = useState<{
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    weeks: number;
    months: number;
    years: number;
    formattedDuration: string;
  } | null>(null);

  // Calculate duration between two datetime values
  const calculateDuration = () => {
    if (!startDate || !endDate) return;

    // Create date objects with time components
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    
    // Calculate difference in milliseconds
    let diffTime = Math.abs(endDateTime.getTime() - startDateTime.getTime());
    
    // Handle negative time (when start is after end)
    const isNegative = startDateTime > endDateTime;
    
    // Convert to different units
    const diffMs = diffTime % 1000;
    diffTime = Math.floor(diffTime / 1000);
    
    const diffSeconds = diffTime % 60;
    diffTime = Math.floor(diffTime / 60);
    
    const diffMinutes = diffTime % 60;
    diffTime = Math.floor(diffTime / 60);
    
    const diffHours = diffTime % 24;
    diffTime = Math.floor(diffTime / 24);
    
    const diffDays = diffTime;
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);
    
    // Format the duration string
    let formattedDuration = '';
    if (diffYears > 0) {
      formattedDuration += `${diffYears} year${diffYears !== 1 ? 's' : ''}, `;
    }
    if (diffMonths > 0) {
      formattedDuration += `${diffMonths} month${diffMonths !== 1 ? 's' : ''}, `;
    }
    if (diffDays > 0) {
      formattedDuration += `${diffDays} day${diffDays !== 1 ? 's' : ''}, `;
    }
    if (diffHours > 0) {
      formattedDuration += `${diffHours} hour${diffHours !== 1 ? 's' : ''}, `;
    }
    if (diffMinutes > 0) {
      formattedDuration += `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}, `;
    }
    if (diffSeconds > 0) {
      formattedDuration += `${diffSeconds} second${diffSeconds !== 1 ? 's' : ''}`;
    }
    
    // Remove trailing comma and space if it exists
    formattedDuration = formattedDuration.replace(/, $/, '');
    
    if (formattedDuration === '') {
      formattedDuration = '0 seconds';
    }
    
    // Add negative indicator if needed
    if (isNegative) {
      formattedDuration = `-${formattedDuration}`;
    }
    
    setResult({
      milliseconds: diffMs,
      seconds: diffSeconds,
      minutes: diffMinutes,
      hours: diffHours,
      days: diffDays,
      weeks: diffWeeks,
      months: diffMonths,
      years: diffYears,
      formattedDuration
    });
  };

  // Reset all inputs and results
  const resetCalculator = () => {
    setStartDate('');
    setStartTime('00:00');
    setEndDate('');
    setEndTime('00:00');
    setResult(null);
  };

  // Calculate duration from a single datetime with time added
  const calculateAddDuration = () => {
    if (!startDate) return;

    const startDateTime = new Date(`${startDate}T${startTime}`);
    
    // Calculate end date by adding the duration
    const endDateTime = new Date(startDateTime);
    endDateTime.setDate(startDateTime.getDate() + (result?.days || 0));
    endDateTime.setHours(startDateTime.getHours() + (result?.hours || 0));
    endDateTime.setMinutes(startDateTime.getMinutes() + (result?.minutes || 0));
    endDateTime.setSeconds(startDateTime.getSeconds() + (result?.seconds || 0));
    
    setEndDate(endDateTime.toISOString().split('T')[0]);
    setEndTime(`${endDateTime.getHours().toString().padStart(2, '0')}:${endDateTime.getMinutes().toString().padStart(2, '0')}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">Duration Calculator</h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">Calculate the duration between two dates or times.</p>
      
      <div className="max-w-3xl mx-auto bg-[#1a2942] border-2 border-blue-400 rounded-xl shadow-lg p-6">
        {/* Input Fields */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Start Date & Time</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">End Date & Time</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={calculateDuration}
            disabled={!startDate || !endDate}
            className={`px-6 py-2 rounded-md font-medium ${
              !startDate || !endDate
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Calculate Duration
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
            <h3 className="text-lg font-semibold mb-3">Duration Between Dates</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-600">{result.years}</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-600">{result.months}</div>
                <div className="text-sm text-gray-600">Months</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-600">{result.days}</div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-600">{result.hours}</div>
                <div className="text-sm text-gray-600">Hours</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-600">{result.minutes}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-600">{result.seconds}</div>
                <div className="text-sm text-gray-600">Seconds</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-600">{result.milliseconds}</div>
                <div className="text-sm text-gray-600">Milliseconds</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-600">{result.weeks}</div>
                <div className="text-sm text-gray-600">Weeks</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-100 rounded-lg text-center">
              <div className="font-medium">Total Duration:</div>
              <div className="text-lg font-bold">{result.formattedDuration}</div>
            </div>
          </div>
        )}

        {/* Additional Features */}
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Additional Operations</h3>
            <div className="flex justify-center">
              <button
                onClick={calculateAddDuration}
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md font-medium"
              >
                Add Duration to Start Time
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600 text-center">
              This will set the end date/time to be the start date/time plus the calculated duration
            </p>
          </div>
        )}
      </div>
    </div>
  );
}