'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TimeUnit {
  value: number;
  label: string;
  prevValue: number;
}

interface EventCountdownProps {
  targetDate: Date;
  className?: string;
}

export default function EventCountdown({ targetDate, className = '' }: EventCountdownProps) {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([
    { value: 0, label: 'Days', prevValue: 0 },
    { value: 0, label: 'Hours', prevValue: 0 },
    { value: 0, label: 'Minutes', prevValue: 0 },
    { value: 0, label: 'Seconds', prevValue: 0 },
  ]);
  const [hasPassed, setHasPassed] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setHasPassed(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      setHasPassed(false);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeUnits((prevUnits) => [
        {
          value: days,
          label: 'Days',
          prevValue: prevUnits[0]?.value || 0,
        },
        {
          value: hours,
          label: 'Hours',
          prevValue: prevUnits[1]?.value || 0,
        },
        {
          value: minutes,
          label: 'Minutes',
          prevValue: prevUnits[2]?.value || 0,
        },
        {
          value: seconds,
          label: 'Seconds',
          prevValue: prevUnits[3]?.value || 0,
        },
      ]);
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    intervalRef.current = setInterval(calculateTimeRemaining, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [targetDate]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  if (hasPassed) {
    return (
      <div className={`${className}`}>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-600/30 text-center">
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Event Has Passed</h2>
          <p className="text-slate-400">This event took place on {new Date(targetDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeUnits.map((unit, index) => (
          <CountdownCard
            key={unit.label}
            value={unit.value}
            prevValue={unit.prevValue}
            label={unit.label}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

interface CountdownCardProps {
  value: number;
  prevValue: number;
  label: string;
  index: number;
}

function CountdownCard({ value, prevValue, label, index }: CountdownCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const formattedValue = value.toString().padStart(2, '0');
  const formattedPrev = prevValue.toString().padStart(2, '0');

  useEffect(() => {
    if (value !== prevValue) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  // Different gradient colors for each unit
  const gradients = [
    'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    'from-teal-500/20 to-emerald-500/20 border-teal-500/30',
    'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    'from-rose-500/20 to-pink-500/20 border-rose-500/30',
  ];

  const numberColors = [
    'text-blue-400',
    'text-teal-400',
    'text-amber-400',
    'text-rose-400',
  ];

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-6 
        bg-gradient-to-br ${gradients[index]}
        backdrop-blur-xl border
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-lg
      `}
    >
      {/* Glassmorphism shine effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Background glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="relative text-center">
        {/* Number with animation */}
        <div className="relative h-16 flex items-center justify-center overflow-hidden">
          <div
            className={`
              text-5xl md:text-6xl font-bold ${numberColors[index]}
              transition-all duration-500
              ${isAnimating ? 'transform -translate-y-2 opacity-0' : 'transform translate-y-0 opacity-100'}
            `}
          >
            {formattedValue}
          </div>
          
          {/* Previous number (for animation) */}
          <div
            className={`
              absolute text-5xl md:text-6xl font-bold ${numberColors[index]} opacity-30
              transition-all duration-500
              ${isAnimating ? 'transform translate-y-0 opacity-30' : 'transform translate-y-8 opacity-0'}
            `}
          >
            {formattedPrev}
          </div>
        </div>

        {/* Label */}
        <p className="text-sm md:text-base text-slate-400 font-medium uppercase tracking-wider mt-2">
          {label}
        </p>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/20" />
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/20" />
      <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-white/20" />
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-white/20" />
    </div>
  );
}
