'use client';

import { useState } from 'react';

export default function CalculatorsTimePage() {
  const [calculationMode, setCalculationMode] = useState<'difference' | 'add' | 'subtract'>('difference');
  const [time1, setTime1] = useState<string>('00:00');
  const [time2, setTime2] = useState<string>('00:00');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    totalMinutes: number;
    totalHours: number;
    formattedTime?: string;
  } | null>(null);

  // Parse time string to seconds
  const parseTimeToSeconds = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60;
  };

  // Format seconds to HH:MM:SS
  const formatSecondsToTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate difference between two times
  const calculateDifference = () => {
    const time1Sec = parseTimeToSeconds(time1);
    const time2Sec = parseTimeToSeconds(time2);
    
    const differenceSec = Math.abs(time2Sec - time1Sec);
    
    const h = Math.floor(differenceSec / 3600);
    const m = Math.floor((differenceSec % 3600) / 60);
    const s = differenceSec % 60;
    
    setResult({
      hours: h,
      minutes: m,
      seconds: s,
      totalSeconds: differenceSec,
      totalMinutes: Math.floor(differenceSec / 60),
      totalHours: differenceSec / 3600
    });
  };

  // Add time to a given time
  const calculateAddTime = () => {
    const baseTimeSec = parseTimeToSeconds(time1);
    const additionSec = hours * 3600 + minutes * 60 + seconds;
    const resultSec = baseTimeSec + additionSec;
    
    // Normalize the result to 24-hour format (0-23:0-59)
    const normalizedSec = resultSec % 86400; // 86400 seconds in a day
    
    const h = Math.floor(normalizedSec / 3600);
    const m = Math.floor((normalizedSec % 3600) / 60);
    const s = normalizedSec % 60;
    
    setResult({
      hours: Math.floor(resultSec / 3600),
      minutes: Math.floor((resultSec % 3600) / 60),
      seconds: resultSec % 60,
      totalSeconds: resultSec,
      totalMinutes: Math.floor(resultSec / 60),
      totalHours: resultSec / 3600,
      formattedTime: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    });
  };

  // Subtract time from a given time
  const calculateSubtractTime = () => {
    const baseTimeSec = parseTimeToSeconds(time1);
    const subtractionSec = hours * 3600 + minutes * 60 + seconds;
    
    // Ensure we don't go negative by adding a day if needed
    let resultSec = baseTimeSec - subtractionSec;
    if (resultSec < 0) {
      resultSec += 86400; // Add 24 hours in seconds
    }
    
    const h = Math.floor(resultSec / 3600);
    const m = Math.floor((resultSec % 3600) / 60);
    const s = resultSec % 60;
    
    setResult({
      hours: Math.abs(Math.floor((baseTimeSec - subtractionSec) / 3600)),
      minutes: Math.floor(((baseTimeSec - subtractionSec) % 3600) / 60),
      seconds: (baseTimeSec - subtractionSec) % 60,
      totalSeconds: Math.abs(baseTimeSec - subtractionSec),
      totalMinutes: Math.abs(Math.floor((baseTimeSec - subtractionSec) / 60)),
      totalHours: Math.abs((baseTimeSec - subtractionSec) / 3600),
      formattedTime: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    });
  };

  // Reset all calculations
  const resetCalculator = () => {
    setTime1('00:00');
    setTime2('00:00');
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setResult(null);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">Time Calculator</h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">Calculate time differences and durations.</p>
      
      <div className="max-w-3xl mx-auto bg-[#1a2942] border-2 border-blue-400 rounded-xl shadow-lg p-6">
        {/* Calculation Mode Selector */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b-2 border-blue-400">
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
              Add Time
            </button>
            <button
              className={`pb-2 px-3 font-semibold ${calculationMode === 'subtract' ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-400'}`}
              onClick={() => {
                setCalculationMode('subtract');
                setResult(null);
              }}
            >
              Subtract Time
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="mb-6">
          {calculationMode === 'difference' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-white mb-2">Start Time</label>
                <input
                  type="time"
                  value={time1}
                  onChange={(e) => setTime1(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">End Time</label>
                <input
                  type="time"
                  value={time2}
                  onChange={(e) => setTime2(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-white mb-2">Base Time</label>
                <input
                  type="time"
                  value={time1}
                  onChange={(e) => setTime1(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Add/Subtract Time</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <input
                      type="number"
                      min="0"
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Hrs"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min="0"
                      value={minutes}
                      onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Min"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min="0"
                      value={seconds}
                      onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Sec"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              if (calculationMode === 'difference') {
                calculateDifference();
              } else if (calculationMode === 'add') {
                calculateAddTime();
              } else {
                calculateSubtractTime();
              }
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-400 rounded-lg font-semibold transition"
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
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-400">{result.hours}</div>
                <div className="text-sm text-gray-300">Hours</div>
              </div>
              <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-400">{result.minutes}</div>
                <div className="text-sm text-gray-300">Minutes</div>
              </div>
              <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-400">{result.seconds}</div>
                <div className="text-sm text-gray-300">Seconds</div>
              </div>
              <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-400">
                  {calculationMode !== 'difference' ? result.formattedTime : '--:--:--'}
                </div>
                <div className="text-sm text-gray-300">Time</div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg">
                <div className="text-lg font-bold text-blue-400">{result.totalHours.toFixed(2)}</div>
                <div className="text-sm text-gray-300">Total Hours</div>
              </div>
              <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg">
                <div className="text-lg font-bold text-blue-400">{result.totalMinutes}</div>
                <div className="text-sm text-gray-300">Total Minutes</div>
              </div>
              <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg">
                <div className="text-lg font-bold text-blue-400">{result.totalSeconds}</div>
                <div className="text-sm text-gray-300">Total Seconds</div>
              </div>
              <div className="bg-[#1a2942] border-2 border-blue-400 p-4 rounded-lg">
                <div className="text-lg font-bold text-blue-400">
                  {formatSecondsToTime(result.totalSeconds)}
                </div>
                <div className="text-sm text-gray-300">Formatted Time</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}