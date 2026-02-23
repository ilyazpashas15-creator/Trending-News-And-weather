'use client';

import React, { useState, useMemo } from 'react';
import {
  calculateOptimalMeetingTimes,
  formatTimeForTimezone,
  MeetingTime,
} from '../../services/timezoneService';

interface Participant {
  id: string;
  name: string;
  timezone: string;
  workStart: number;
  workEnd: number;
}

interface MeetingSuggestionsProps {
  participants: Participant[];
  onSelectTime: (time: Date) => void;
  selectedTime: Date | null;
  durationMinutes: number;
  onDurationChange: (duration: number) => void;
}

const DURATION_OPTIONS = [
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
];

export default function MeetingSuggestions({
  participants,
  onSelectTime,
  selectedTime,
  durationMinutes,
  onDurationChange,
}: MeetingSuggestionsProps) {
  const [expandedSuggestion, setExpandedSuggestion] = useState<number | null>(null);

  const suggestions = useMemo(() => {
    if (participants.length === 0) return [];
    
    const timezones = participants.map((p) => p.timezone);
    return calculateOptimalMeetingTimes(
      timezones,
      durationMinutes,
      6, // startHour
      22, // endHour
      9, // workStart
      17 // workEnd
    ).slice(0, 5);
  }, [participants, durationMinutes]);

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
    if (score >= 60) return 'text-teal-400 bg-teal-500/20 border-teal-500/30';
    if (score >= 40) return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/20 border-rose-500/30';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const formatSuggestionTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    });
  };

  return (
    <div className="space-y-4">
      {/* Header with duration selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Meeting Suggestions</h3>
          <p className="text-sm text-slate-400">Top optimal times for all participants</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-400">Duration:</label>
          <select
            value={durationMinutes}
            onChange={(e) => onDurationChange(Number(e.target.value))}
            className="px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          >
            {DURATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Suggestions List */}
      {suggestions.length === 0 ? (
        <div className="bg-slate-800/30 rounded-xl p-8 text-center">
          <p className="text-slate-400">Add participants to see meeting suggestions</p>
        </div>
      ) : (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => {
            const isSelected = selectedTime?.getTime() === suggestion.utcTime.getTime();
            const isExpanded = expandedSuggestion === index;
            
            return (
              <div
                key={index}
                className={`
                  relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer
                  ${isSelected 
                    ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/30' 
                    : 'bg-slate-800/50 border-slate-600/30 hover:border-slate-500/50 hover:bg-slate-800/70'
                  }
                `}
              >
                <div
                  onClick={() => {
                    onSelectTime(suggestion.utcTime);
                    setExpandedSuggestion(isExpanded ? null : index);
                  }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${index === 0 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                          : index === 1 
                          ? 'bg-slate-400/20 text-slate-300 border border-slate-400/30'
                          : index === 2
                          ? 'bg-orange-600/20 text-orange-400 border border-orange-600/30'
                          : 'bg-slate-700/50 text-slate-400'
                        }
                      `}>
                        {index + 1}
                      </div>
                      
                      {/* Time */}
                      <div>
                        <div className="text-xl font-bold text-white">
                          {formatSuggestionTime(suggestion.utcTime)}
                        </div>
                        <div className="text-xs text-slate-400">UTC</div>
                      </div>
                    </div>
                    
                    {/* Score Badge */}
                    <div className={`
                      px-3 py-1.5 rounded-full text-xs font-medium border
                      ${getScoreColor(suggestion.score)}
                    `}>
                      {getScoreLabel(suggestion.score)} ({suggestion.score})
                    </div>
                  </div>

                  {/* Quick participant preview */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestion.localTimes.slice(0, 3).map((local, i) => (
                      <span
                        key={i}
                        className={`
                          text-xs px-2 py-1 rounded-md
                          ${local.isBusinessHours 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'bg-rose-500/10 text-rose-400'
                          }
                        `}
                      >
                        {local.timezone.split('/').pop()?.replace(/_/g, ' ')}: {local.time}
                      </span>
                    ))}
                    {suggestion.localTimes.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-md bg-slate-700/50 text-slate-400">
                        +{suggestion.localTimes.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Expand indicator */}
                  <div className="mt-3 flex items-center justify-center">
                    <svg
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-slate-600/30 pt-3">
                    <h4 className="text-sm font-medium text-slate-300 mb-3">
                      All Participant Times
                    </h4>
                    <div className="grid gap-2">
                      {suggestion.localTimes.map((local, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-2 px-3 bg-slate-900/50 rounded-lg"
                        >
                          <span className="text-sm text-slate-300">
                            {local.timezone.split('/').pop()?.replace(/_/g, ' ')}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-white">
                              {local.time}
                            </span>
                            <span
                              className={`
                                text-xs px-2 py-0.5 rounded-full
                                ${local.isBusinessHours 
                                  ? 'bg-emerald-500/20 text-emerald-400' 
                                  : 'bg-rose-500/20 text-rose-400'
                                }
                              `}
                            >
                              {local.isBusinessHours ? 'In hours' : 'Outside hours'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTime(suggestion.utcTime);
                      }}
                      className="mt-4 w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-all duration-200"
                    >
                      Select This Time
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
