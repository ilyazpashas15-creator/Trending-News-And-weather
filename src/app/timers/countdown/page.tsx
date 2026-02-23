'use client';

import { useState, useEffect, useRef } from 'react';

export default function TimersCountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [initialTime, setInitialTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle input changes
  const handleTimeChange = (field: 'hours' | 'minutes' | 'seconds', value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(field === 'hours' ? 23 : 59, numValue));
    
    setInitialTime(prev => ({
      ...prev,
      [field]: clampedValue
    }));
    
    // Update current time if not running
    if (!isRunning) {
      setTimeLeft(prev => ({
        ...prev,
        [field]: clampedValue
      }));
    }
  };

  // Start the countdown
  const startTimer = () => {
    if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      // If time is 0, set from initial values
      if (initialTime.hours > 0 || initialTime.minutes > 0 || initialTime.seconds > 0) {
        setTimeLeft({...initialTime});
      } else {
        return; // No time set
      }
    }
    
    setIsRunning(true);
    setIsFinished(false);
  };

  // Pause the countdown
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // Reset the countdown
  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft({...initialTime});
  };

  // Format time for display
  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  // Handle timer logic
  useEffect(() => {
    if (isRunning && (timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0)) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          let { hours, minutes, seconds } = prev;
          
          if (seconds > 0) {
            seconds--;
          } else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          } else {
            // Timer finished
            setIsRunning(false);
            setIsFinished(true);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return prev; // Return the same time to show 00:00:00
          }
          
          return { hours, minutes, seconds };
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  // Handle timer completion
  useEffect(() => {
    if (isFinished) {
      // Optionally play a sound or show an alert
      alert('Countdown finished!');
    }
  }, [isFinished]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">Countdown Timer</h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">Set and use countdown timers.</p>
      
      <div className="max-w-md mx-auto bg-[#1a2942] border-2 border-blue-400 rounded-xl shadow-lg p-6">
        {/* Time Input Fields */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2">Hours</label>
            <input
              type="number"
              min="0"
              max="23"
              value={initialTime.hours}
              onChange={(e) => handleTimeChange('hours', e.target.value)}
              disabled={isRunning}
              className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Minutes</label>
            <input
              type="number"
              min="0"
              max="59"
              value={initialTime.minutes}
              onChange={(e) => handleTimeChange('minutes', e.target.value)}
              disabled={isRunning}
              className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={initialTime.seconds}
              onChange={(e) => handleTimeChange('seconds', e.target.value)}
              disabled={isRunning}
              className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Large Display */}
        <div className="text-center mb-8">
          <div className="text-6xl font-mono font-bold bg-[#0d1929] border-2 border-blue-400 text-blue-400 py-6 rounded-lg">
            {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </div>
          {isFinished && (
            <div className="mt-4 text-xl font-bold text-red-400 animate-pulse">
              Time's up!
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <button
              onClick={startTimer}
              disabled={timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0}
              className={`px-6 py-3 rounded-lg font-semibold border-2 transition ${
                timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0
                  ? 'bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white border-green-500'
              }`}
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white border-2 border-blue-500 rounded-lg font-semibold transition"
            >
              Pause
            </button>
          )}
          <button
            onClick={resetTimer}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-400 rounded-lg font-semibold transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
