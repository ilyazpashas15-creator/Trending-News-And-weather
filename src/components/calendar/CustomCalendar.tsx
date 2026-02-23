'use client';

import { useState } from 'react';

export default function CustomCalendar() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const calculateDaysBetween = () => {
    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);

      // If end date is before start date, calculate in reverse
      if (end < start) {
        [start, end] = [end, start];
      }

      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateBusinessDays = () => {
    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);

      if (end < start) {
        [start, end] = [end, start];
      }

      let businessDays = 0;
      const currentDate = new Date(start);

      while (currentDate <= end) {
        const dayOfWeek = currentDate.getDay();
        // If it's not a weekend (0 = Sunday, 6 = Saturday)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          businessDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return businessDays;
    }
    return 0;
  };

  const setPresetDates = (days: number) => {
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + days);

    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(future.toISOString().split('T')[0]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2 dark:text-white">Custom Calendar</h1>
      <p className="text-gray-600 mb-8 dark:text-gray-300">Create custom date ranges and calculate durations</p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold mb-4 dark:text-white">Date Range Calculator</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-300">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 text-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-300">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 text-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-semibold dark:text-gray-300">
              Total Days: <span className="text-blue-600 dark:text-blue-400">{calculateDaysBetween()}</span>
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold dark:text-gray-300">
              Business Days: <span className="text-green-600 dark:text-green-400">{calculateBusinessDays()}</span>
            </p>
          </div>
        </div>

        {startDate && endDate && (
          <div className="mt-6 p-6 bg-blue-50 dark:bg-gray-700 rounded-lg border-2 border-blue-200 dark:border-blue-800">
            <h4 className="text-2xl font-bold text-blue-600 mb-2 dark:text-blue-400">Result</h4>
            <p className="text-xl dark:text-gray-200">
              From <strong>{new Date(startDate).toLocaleDateString()}</strong> to{' '}
              <strong>{new Date(endDate).toLocaleDateString()}</strong>
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <p className="text-lg">
                <span className="font-semibold dark:text-gray-300">Total days:</span> {calculateDaysBetween()}
              </p>
              <p className="text-lg">
                <span className="font-semibold dark:text-gray-300">Business days:</span> {calculateBusinessDays()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Date Presets */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 dark:text-white">Quick Presets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'This Week', days: 7 },
            { label: 'This Month', days: 30 },
            { label: 'This Quarter', days: 90 },
            { label: 'This Year', days: 365 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => setPresetDates(preset.days)}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition font-semibold text-gray-700 dark:text-gray-300"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}