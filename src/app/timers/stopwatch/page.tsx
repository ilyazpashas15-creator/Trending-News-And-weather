'use client';

import { useState, useEffect, useRef } from 'react';

export default function TimersStopwatchPage() {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format time for display (HH:MM:SS.mmm)
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  // Handle timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const pauseStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps(prev => [...prev, time]);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">Stopwatch</h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">Use the stopwatch to measure elapsed time.</p>
      
      <div className="max-w-md mx-auto bg-[#1a2942] border-2 border-blue-400 rounded-xl shadow-lg p-6">
        {/* Large Display */}
        <div className="text-center mb-8">
          <div className="text-6xl font-mono font-bold bg-[#0d1929] border-2 border-blue-400 text-blue-400 py-6 rounded-lg">
            {formatTime(time)}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {!isRunning ? (
            time === 0 ? (
              <button
                onClick={startStopwatch}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white border-2 border-green-500 rounded-lg font-semibold transition"
              >
                Start
              </button>
            ) : (
              <button
                onClick={startStopwatch}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white border-2 border-green-500 rounded-lg font-semibold transition"
              >
                Resume
              </button>
            )
          ) : (
            <button
              onClick={pauseStopwatch}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white border-2 border-blue-500 rounded-lg font-semibold transition"
            >
              Pause
            </button>
          )}
          <button
            onClick={recordLap}
            disabled={!isRunning}
            className={`px-6 py-3 rounded-lg font-semibold border-2 transition ${
              !isRunning 
                ? 'bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-400'
            }`}
          >
            Lap
          </button>
          <button
            onClick={resetStopwatch}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white border-2 border-red-500 rounded-lg font-semibold transition"
          >
            Reset
          </button>
        </div>

        {/* Lap Times */}
        {laps.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-3">Lap Times</h3>
            <div className="max-h-60 overflow-y-auto bg-[#0d1929] border-2 border-blue-400 rounded-lg p-3">
              {laps.map((lapTime, index) => (
                <div 
                  key={index} 
                  className="flex justify-between py-2 border-b border-gray-700 last:border-b-0"
                >
                  <span className="text-gray-300">Lap {laps.length - index}</span>
                  <span className="font-mono text-blue-400 font-semibold">{formatTime(lapTime)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
