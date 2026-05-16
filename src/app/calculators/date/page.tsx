'use client';

import { useState } from 'react';

export default function CalculatorsDatePage() {
  const [calculationMode, setCalculationMode] = useState<'difference' | 'add'>('difference');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [addTime, setAddTime] = useState({ days: 0, months: 0, years: 0 });
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
    formattedDate?: string;
  } | null>(null);

  // Calculate difference between two dates
  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Ensure start date is before end date
    const earlier = start < end ? start : end;
    const later = start < end ? end : start;
    
    // Calculate difference in milliseconds
    const diffTime = Math.abs(later.getTime() - earlier.getTime());
    
    // Convert to different units
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44); // Average days in a month
    const diffYears = Math.floor(diffDays / 365.25); // Average days in a year (accounting for leap years)
    
    setResult({
      days: diffDays,
      weeks: diffWeeks,
      months: diffMonths,
      years: diffYears
    });
  };

  // Add time to a date
  const calculateAddTime = () => {
    if (!startDate) return;

    const start = new Date(startDate);
    const resultDate = new Date(start);
    
    // Add the specified time
    resultDate.setFullYear(resultDate.getFullYear() + addTime.years);
    resultDate.setMonth(resultDate.getMonth() + addTime.months);
    resultDate.setDate(resultDate.getDate() + addTime.days);
    
    // Calculate difference
    const diffTime = Math.abs(resultDate.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);
    
    setResult({
      days: diffDays,
      weeks: diffWeeks,
      months: diffMonths,
      years: diffYears,
      formattedDate: resultDate.toISOString().split('T')[0]
    });
  };

  // Reset all calculations
  const resetCalculator = () => {
    setStartDate('');
    setEndDate('');
    setAddTime({ days: 0, months: 0, years: 0 });
    setResult(null);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">Date Calculator</h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">Calculate dates and time differences.</p>
      
      <div className="max-w-3xl mx-auto bg-[#1a2942] border-2 border-blue-400 rounded-xl shadow-lg p-6">
        {/* Calculation Mode Selector */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b-2 border-blue-400">
            <button
              className={`pb-2 px-3 font-semibold ${calculationMode === 'difference' ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-400'}`}
              onClick={() => {
                setCalculationMode('difference');
                setResult(null);
              }}
            >
              Difference Calculator
            </button>
            <button
              className={`pb-2 px-3 font-semibold ${calculationMode === 'add' ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-400'}`}
              onClick={() => {
                setCalculationMode('add');
                setResult(null);
              }}
            >
              Add/Subtract Time
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-white mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            
            {calculationMode === 'difference' ? (
              <div>
                <label className="block text-sm font-bold text-white mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-bold text-white mb-2">Add Time</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <input
                      type="number"
                      min="0"
                      value={addTime.days}
                      onChange={(e) => setAddTime({...addTime, days: parseInt(e.target.value) || 0})}
                      className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Days"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min="0"
                      value={addTime.months}
                      onChange={(e) => setAddTime({...addTime, months: parseInt(e.target.value) || 0})}
                      className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Months"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min="0"
                      value={addTime.years}
                      onChange={(e) => setAddTime({...addTime, years: parseInt(e.target.value) || 0})}
                      className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Years"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={calculationMode === 'difference' ? calculateDifference : calculateAddTime}
            disabled={!startDate || (calculationMode === 'difference' ? !endDate : false)}
            className={`px-6 py-3 rounded-lg font-semibold border-2 transition ${
              !startDate || (calculationMode === 'difference' && !endDate)
                ? 'bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-400'
            }`}
          >
            Calculate
          </button>
          <button
            onClick={resetCalculator}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white border-2 border-gray-500 rounded-lg font-semibold transition"
          >
            Reset
          </button>
        </div>

        {/* Results Display */}
        {result && (
          <div className="mt-6 p-4 bg-[#0d1929] border-2 border-blue-400 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-4">Results</h3>
            
            {calculationMode === 'difference' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">{result.days}</div>
                  <div className="text-sm text-gray-300">Days</div>
                </div>
                <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">{result.weeks}</div>
                  <div className="text-sm text-gray-300">Weeks</div>
                </div>
                <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">{result.months}</div>
                  <div className="text-sm text-gray-300">Months</div>
                </div>
                <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">{result.years}</div>
                  <div className="text-sm text-gray-300">Years</div>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">{result.days}</div>
                    <div className="text-sm text-gray-300">Days</div>
                  </div>
                  <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">{result.weeks}</div>
                    <div className="text-sm text-gray-300">Weeks</div>
                  </div>
                  <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">{result.months}</div>
                    <div className="text-sm text-gray-300">Months</div>
                  </div>
                  <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">{result.years}</div>
                    <div className="text-sm text-gray-300">Years</div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-green-900 border-2 border-green-500 rounded-lg text-center">
                  <div className="font-semibold text-green-300">New Date:</div>
                  <div className="text-lg font-bold text-green-200">{result.formattedDate}</div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}