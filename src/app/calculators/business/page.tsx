'use client';

import { useState } from 'react';

export default function CalculatorsBusinessPage() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [excludeHolidays, setExcludeHolidays] = useState<boolean>(false);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [newHoliday, setNewHoliday] = useState<string>('');
  const [result, setResult] = useState<{
    businessDays: number;
    totalDays: number;
    weekends: number;
    holidays: number;
    formattedPeriod: string;
  } | null>(null);

  // Add a holiday to the list
  const addHoliday = () => {
    if (newHoliday && !holidays.includes(newHoliday)) {
      setHolidays([...holidays, newHoliday]);
      setNewHoliday('');
    }
  };

  // Remove a holiday from the list
  const removeHoliday = (date: string) => {
    setHolidays(holidays.filter(h => h !== date));
  };

  // Calculate business days between two dates
  const calculateBusinessDays = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Ensure start date is before end date
    const startDateObj = start < end ? start : end;
    const endDateObj = start < end ? end : start;
    
    let current = new Date(startDateObj);
    let businessDays = 0;
    let totalDays = 0;
    let weekends = 0;
    let holidaysCount = 0;
    
    // Convert holiday strings to Date objects for comparison
    const holidayDates = holidays.map(h => new Date(h).toDateString());
    
    while (current <= endDateObj) {
      totalDays++;
      const dayOfWeek = current.getDay(); // 0 = Sunday, 6 = Saturday
      
      // Check if it's a weekend (Saturday or Sunday)
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } 
      // Check if it's a holiday
      else if (excludeHolidays && holidayDates.includes(current.toDateString())) {
        holidaysCount++;
      }
      // Otherwise it's a business day
      else {
        businessDays++;
      }
      
      // Move to the next day
      current.setDate(current.getDate() + 1);
    }
    
    // Calculate the formatted period
    const startFormatted = startDateObj.toLocaleDateString();
    const endFormatted = endDateObj.toLocaleDateString();
    const formattedPeriod = `${startFormatted} to ${endFormatted}`;
    
    setResult({
      businessDays,
      totalDays,
      weekends,
      holidays: holidaysCount,
      formattedPeriod
    });
  };

  // Add business days to a start date
  const addBusinessDays = () => {
    if (!startDate || !result) return;

    const start = new Date(startDate);
    let businessDaysToAdd = result.businessDays;
    let current = new Date(start);
    
    // Convert holiday strings to Date objects for comparison
    const holidayDates = holidays.map(h => new Date(h).toDateString());
    
    while (businessDaysToAdd > 0) {
      current.setDate(current.getDate() + 1);
      const dayOfWeek = current.getDay();
      
      // If it's a weekday and not a holiday, count it as a business day
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && 
          (!excludeHolidays || !holidayDates.includes(current.toDateString()))) {
        businessDaysToAdd--;
      }
    }
    
    setEndDate(current.toISOString().split('T')[0]);
  };

  // Reset all inputs and results
  const resetCalculator = () => {
    setStartDate('');
    setEndDate('');
    setExcludeHolidays(false);
    setHolidays([]);
    setResult(null);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">Business Days Calculator</h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">Calculate business days between two dates.</p>
      
      <div className="max-w-4xl mx-auto bg-[#1a2942] border-2 border-blue-400 rounded-xl shadow-lg p-6">
        {/* Input Fields */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Date Range</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Holidays</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="excludeHolidays"
                    checked={excludeHolidays}
                    onChange={(e) => setExcludeHolidays(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="excludeHolidays" className="ml-2 block text-sm text-gray-700">
                    Exclude holidays from business days calculation
                  </label>
                </div>
                
                {excludeHolidays && (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={newHoliday}
                        onChange={(e) => setNewHoliday(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={addHoliday}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                      >
                        Add
                      </button>
                    </div>
                    
                    {holidays.length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Selected Holidays:</h4>
                        <div className="flex flex-wrap gap-2">
                          {holidays.map((holiday, index) => (
                            <div 
                              key={index} 
                              className="flex items-center bg-red-100 text-red-800 px-2 py-1 rounded text-sm"
                            >
                              <span>{new Date(holiday).toLocaleDateString()}</span>
                              <button 
                                onClick={() => removeHoliday(holiday)}
                                className="ml-1 text-red-600 hover:text-red-800"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={calculateBusinessDays}
            disabled={!startDate || !endDate}
            className={`px-6 py-2 rounded-md font-medium ${
              !startDate || !endDate
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Calculate Business Days
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
            <h3 className="text-lg font-semibold mb-3">Business Days Calculation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg text-center border-2 border-blue-500">
                <div className="text-2xl font-bold text-blue-600">{result.businessDays}</div>
                <div className="text-sm text-gray-600">Business Days</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">{result.totalDays}</div>
                <div className="text-sm text-gray-600">Total Days</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">{result.weekends}</div>
                <div className="text-sm text-gray-600">Weekend Days</div>
              </div>
              {excludeHolidays && (
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-600">{result.holidays}</div>
                  <div className="text-sm text-gray-600">Holidays</div>
                </div>
              )}
            </div>
            
            <div className="mt-4 p-3 bg-green-100 rounded-lg text-center">
              <div className="font-medium">Date Range:</div>
              <div className="text-lg font-bold">{result.formattedPeriod}</div>
            </div>
          </div>
        )}

        {/* Additional Features */}
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Additional Operations</h3>
            <div className="flex justify-center">
              <button
                onClick={addBusinessDays}
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md font-medium"
              >
                Add Business Days to Start Date
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600 text-center">
              This will update the end date to be the start date plus {result.businessDays} business days
            </p>
          </div>
        )}
      </div>
    </div>
  );
}