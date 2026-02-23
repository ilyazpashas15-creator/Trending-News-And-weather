'use client';

import { useState, useEffect, useRef } from 'react';

export default function TimersIntervalPage() {
  // Configuration
  const [workTime, setWorkTime] = useState({ minutes: 25, seconds: 0 });
  const [restTime, setRestTime] = useState({ minutes: 5, seconds: 0 });
  const [rounds, setRounds] = useState(4);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState({ minutes: 25, seconds: 0 });
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true); // true for work, false for rest
  const [isFinished, setIsFinished] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format time for display
  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle timer logic
  useEffect(() => {
    if (isRunning && !isFinished && (timeLeft.minutes > 0 || timeLeft.seconds > 0)) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          let { minutes, seconds } = prev;
          
          if (seconds > 0) {
            seconds--;
          } else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            // Time is up for this phase
            if (isWork) {
              // Work phase ended, check if rounds are complete
              if (currentRound < rounds) {
                setIsWork(false);
                setTimeLeft({ ...restTime });
              } else {
                // All rounds completed
                setIsRunning(false);
                setIsFinished(true);
                return prev;
              }
            } else {
              // Rest phase ended, next work round
              setIsWork(true);
              setCurrentRound(prev => prev + 1);
              setTimeLeft({ ...workTime });
            }
          }
          
          return { minutes, seconds };
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
  }, [isRunning, isFinished, timeLeft, isWork, currentRound, rounds, workTime, restTime]);

  const startTimer = () => {
    if (workTime.minutes === 0 && workTime.seconds === 0) return; // No work time set
    
    setIsRunning(true);
    setIsFinished(false);
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      // Reset to work time if timer ended
      setTimeLeft({ ...workTime });
      setCurrentRound(1);
      setIsWork(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft({ ...workTime });
    setCurrentRound(1);
    setIsWork(true);
  };

  const resetAll = () => {
    setWorkTime({ minutes: 25, seconds: 0 });
    setRestTime({ minutes: 5, seconds: 0 });
    setRounds(4);
    resetTimer();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">Interval Timer</h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">Set interval timers for workouts and other activities.</p>
      
      <div className="max-w-lg mx-auto bg-[#1a2942] border-2 border-blue-400 rounded-xl shadow-lg p-6">
        {/* Configuration Panel */}
        <div className="mb-6 p-4 bg-[#0d1929] border-2 border-blue-400 rounded-lg">
          <h2 className="text-lg font-bold text-white mb-4">Timer Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-white mb-2">Work Time (min:sec)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={workTime.minutes}
                  onChange={(e) => setWorkTime(prev => ({...prev, minutes: parseInt(e.target.value) || 0}))}
                  disabled={isRunning}
                  className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg bg-[#1a2942] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={workTime.seconds}
                  onChange={(e) => setWorkTime(prev => ({...prev, seconds: parseInt(e.target.value) || 0}))}
                  disabled={isRunning}
                  className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg bg-[#1a2942] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-white mb-2">Rest Time (min:sec)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={restTime.minutes}
                  onChange={(e) => setRestTime(prev => ({...prev, minutes: parseInt(e.target.value) || 0}))}
                  disabled={isRunning}
                  className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg bg-[#1a2942] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={restTime.seconds}
                  onChange={(e) => setRestTime(prev => ({...prev, seconds: parseInt(e.target.value) || 0}))}
                  disabled={isRunning}
                  className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg bg-[#1a2942] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-white mb-2">Rounds</label>
              <input
                type="number"
                min="1"
                value={rounds}
                onChange={(e) => setRounds(parseInt(e.target.value) || 1)}
                disabled={isRunning}
                className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg bg-[#1a2942] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className={`text-5xl font-mono font-bold py-6 rounded-lg mb-4 border-2 ${
            isWork ? 'bg-red-900 text-red-300 border-red-500' : 'bg-green-900 text-green-300 border-green-500'
          }`}>
            {formatTime(timeLeft.minutes, timeLeft.seconds)}
          </div>
          
          <div className="text-xl mb-2 text-white font-semibold">
            {isWork ? 'Work Time' : 'Rest Time'}
          </div>
          
          <div className="text-lg text-gray-300">
            Round {currentRound} of {rounds}
          </div>
          
          {isFinished && (
            <div className="mt-4 text-xl font-bold text-blue-400 animate-pulse">
              All rounds completed!
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white border-2 border-green-500 rounded-lg font-semibold transition"
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
          <button
            onClick={resetAll}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white border-2 border-gray-500 rounded-lg font-semibold transition"
          >
            Reset All
          </button>
        </div>
        
        {/* Progress */}
        <div className="mt-4">
          <div className="w-full bg-[#0d1929] border-2 border-blue-400 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-1000 ease-linear" 
              style={{ 
                width: `${((currentRound - 1) + (1 - (timeLeft.minutes * 60 + timeLeft.seconds) / (isWork ? workTime.minutes * 60 + workTime.seconds : restTime.minutes * 60 + restTime.seconds))) / rounds * 100}%` 
              }}
            ></div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-300">
            {currentRound}/{rounds} rounds completed
          </div>
        </div>
      </div>
    </div>
  );
}
