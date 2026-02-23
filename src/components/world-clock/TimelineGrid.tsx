'use client';

import React, { useState, useMemo } from 'react';
import {
  formatTimeForTimezone,
  getTimezoneOffset,
  convertTimeBetweenZones,
  MeetingTime,
} from '../../services/timezoneService';

interface Participant {
  id: string;
  name: string;
  timezone: string;
  workStart: number;
  workEnd: number;
}

interface TimelineGridProps {
  participants: Participant[];
  selectedTime: Date | null;
  onTimeSelect: (time: Date) => void;
  durationMinutes: number;
}

interface TimeSlot {
  hour: number;
  utcTime: Date;
  availability: {
    participantId: string;
    isAvailable: boolean;
    localHour: number;
    localTime: string;
  }[];
  availableCount: number;
  totalCount: number;
  status: 'all' | 'some' | 'none';
}

export default function TimelineGrid({
  participants,
  selectedTime,
  onTimeSelect,
  durationMinutes,
}: TimelineGridProps) {
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  const timeSlots = useMemo(() => {
    const slots: TimeSlot[] = [];
    const now = new Date();
    
    // Generate 24-hour slots starting from current UTC day
    for (let hour = 0; hour < 24; hour++) {
      const utcTime = new Date(now);
      utcTime.setUTCHours(hour, 0, 0, 0);
      
      const availability = participants.map((participant) => {
        const localTime = convertTimeBetweenZones('UTC', participant.timezone, utcTime);
        const localHour = localTime.getHours();
        const endHour = (localHour + Math.ceil(durationMinutes / 60)) % 24;
        
        // Check if the entire meeting duration falls within working hours
        let isAvailable = true;
        let checkHour = localHour;
        let hoursChecked = 0;
        const hoursToCheck = Math.ceil(durationMinutes / 60);
        
        while (hoursChecked < hoursToCheck) {
          const adjustedHour = checkHour % 24;
          const inWorkHours = 
            participant.workStart <= participant.workEnd
              ? adjustedHour >= participant.workStart && adjustedHour < participant.workEnd
              : adjustedHour >= participant.workStart || adjustedHour < participant.workEnd;
          
          if (!inWorkHours) {
            isAvailable = false;
            break;
          }
          checkHour++;
          hoursChecked++;
        }
        
        return {
          participantId: participant.id,
          isAvailable,
          localHour,
          localTime: formatTimeForTimezone(participant.timezone, localTime, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        };
      });
      
      const availableCount = availability.filter((a) => a.isAvailable).length;
      const totalCount = participants.length;
      
      let status: 'all' | 'some' | 'none';
      if (availableCount === totalCount) status = 'all';
      else if (availableCount === 0) status = 'none';
      else status = 'some';
      
      slots.push({
        hour,
        utcTime,
        availability,
        availableCount,
        totalCount,
        status,
      });
    }
    
    return slots;
  }, [participants, durationMinutes]);

  const getStatusColor = (status: 'all' | 'some' | 'none', isSelected: boolean, isHovered: boolean): string => {
    const baseClasses = 'transition-all duration-200 cursor-pointer border-l-2';
    
    if (isSelected) {
      return `${baseClasses} bg-blue-500/40 border-blue-400 ring-2 ring-blue-400/50`;
    }
    
    if (isHovered) {
      return `${baseClasses} bg-white/10 border-white/30`;
    }
    
    switch (status) {
      case 'all':
        return `${baseClasses} bg-emerald-500/20 border-emerald-500/50 hover:bg-emerald-500/30`;
      case 'some':
        return `${baseClasses} bg-amber-500/20 border-amber-500/50 hover:bg-amber-500/30`;
      case 'none':
        return `${baseClasses} bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20`;
    }
  };

  const formatUTCHour = (hour: number): string => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  return (
    <div className="w-full">
      {/* Header with participant names */}
      <div className="flex border-b border-slate-600/30 mb-2">
        <div className="w-20 flex-shrink-0 p-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
          UTC
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="flex min-w-max">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="w-32 flex-shrink-0 p-3 text-center border-l border-slate-600/30 first:border-l-0"
              >
                <div className="text-sm font-semibold text-white truncate">
                  {participant.name}
                </div>
                <div className="text-xs text-slate-400 truncate">
                  {participant.timezone.split('/').pop()?.replace(/_/g, ' ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline grid */}
      <div className="relative overflow-x-auto rounded-xl border border-slate-600/30 bg-slate-900/30 backdrop-blur-sm">
        <div className="min-w-max">
          {timeSlots.map((slot) => {
            const isSelected = selectedTime?.getUTCHours() === slot.hour;
            const isHovered = hoveredHour === slot.hour;
            
            return (
              <div
                key={slot.hour}
                className={`flex ${getStatusColor(slot.status, isSelected, isHovered)}`}
                onClick={() => onTimeSelect(slot.utcTime)}
                onMouseEnter={() => setHoveredHour(slot.hour)}
                onMouseLeave={() => setHoveredHour(null)}
              >
                {/* UTC Time Column */}
                <div className="w-20 flex-shrink-0 p-3 border-r border-slate-600/30 bg-slate-800/50">
                  <span className="text-sm font-mono font-medium text-slate-300">
                    {formatUTCHour(slot.hour)}
                  </span>
                </div>

                {/* Participant Columns */}
                <div className="flex">
                  {slot.availability.map((avail) => (
                    <div
                      key={avail.participantId}
                      className={`w-32 flex-shrink-0 p-3 text-center border-l border-slate-600/20 first:border-l-0 ${
                        avail.isAvailable ? 'text-emerald-300' : 'text-rose-300/60'
                      }`}
                    >
                      <span className="text-sm font-medium">{avail.localTime}</span>
                      {hoveredHour === slot.hour && (
                        <div className="text-xs text-slate-400 mt-1">
                          {avail.isAvailable ? 'Available' : 'Unavailable'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Status indicator */}
                <div className="flex-shrink-0 p-3 flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      slot.status === 'all'
                        ? 'bg-emerald-400'
                        : slot.status === 'some'
                        ? 'bg-amber-400'
                        : 'bg-rose-400'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50" />
          <span className="text-slate-300">All available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500/50" />
          <span className="text-slate-300">Some available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-rose-500/20 border border-rose-500/30" />
          <span className="text-slate-300">None available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500/40 border-2 border-blue-400" />
          <span className="text-slate-300">Selected</span>
        </div>
      </div>
    </div>
  );
}
