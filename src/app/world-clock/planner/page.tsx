'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TimelineGrid from '../../../components/world-clock/TimelineGrid';
import ParticipantForm from '../../../components/world-clock/ParticipantForm';
import MeetingSuggestions from '../../../components/world-clock/MeetingSuggestions';
import {
  formatTimeForTimezone,
  formatDateForTimezone,
  generateEventUrl,
  getTimezoneAbbreviation,
} from '../../../services/timezoneService';
import { POPULAR_CITIES } from '../../../utils/cityDatabase';

interface Participant {
  id: string;
  name: string;
  timezone: string;
  cityId: string;
  workStart: number;
  workEnd: number;
}

interface MeetingDetails {
  title: string;
  duration: number;
  selectedTime: Date | null;
}

function PlannerContent() {
  const searchParams = useSearchParams();
  
  // Initialize state
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'My Location',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cityId: 'local',
      workStart: 9,
      workEnd: 17,
    },
  ]);
  
  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails>({
    title: '',
    duration: 60,
    selectedTime: null,
  });
  
  const [showParticipantForm, setShowParticipantForm] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<string | null>(null);
  const [shareableLink, setShareableLink] = useState('');
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  // Load from URL params if present
  useEffect(() => {
    const participantsParam = searchParams.get('participants');
    const titleParam = searchParams.get('title');
    const durationParam = searchParams.get('duration');
    
    if (participantsParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(participantsParam));
        setParticipants(parsed);
      } catch (e) {
        console.error('Failed to parse participants from URL:', e);
      }
    }
    
    if (titleParam) {
      setMeetingDetails(prev => ({ ...prev, title: titleParam }));
    }
    
    if (durationParam) {
      setMeetingDetails(prev => ({ ...prev, duration: parseInt(durationParam, 10) }));
    }
  }, [searchParams]);

  const addParticipant = useCallback((participantData: Omit<Participant, 'id'>) => {
    const newParticipant: Participant = {
      ...participantData,
      id: Date.now().toString(),
    };
    setParticipants(prev => [...prev, newParticipant]);
    setShowParticipantForm(false);
  }, []);

  const updateParticipant = useCallback((id: string, updates: Partial<Participant>) => {
    setParticipants(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    setEditingParticipant(null);
  }, []);

  const removeParticipant = useCallback((id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleTimeSelect = useCallback((time: Date) => {
    setMeetingDetails(prev => ({ ...prev, selectedTime: time }));
  }, []);

  const handleDurationChange = useCallback((duration: number) => {
    setMeetingDetails(prev => ({ ...prev, duration }));
  }, []);

  const generateShareLink = useCallback(() => {
    const params = new URLSearchParams();
    params.set('participants', encodeURIComponent(JSON.stringify(participants)));
    if (meetingDetails.title) params.set('title', meetingDetails.title);
    params.set('duration', meetingDetails.duration.toString());
    
    const url = `${window.location.origin}/world-clock/planner?${params.toString()}`;
    setShareableLink(url);
    
    navigator.clipboard.writeText(url).then(() => {
      setShowLinkCopied(true);
      setTimeout(() => setShowLinkCopied(false), 3000);
    });
  }, [participants, meetingDetails]);

  const getCurrentTimeDisplay = () => {
    return participants.map((participant) => {
      const now = new Date();
      return {
        name: participant.name,
        timezone: participant.timezone,
        time: formatTimeForTimezone(participant.timezone, now),
        date: formatDateForTimezone(participant.timezone, now),
        abbreviation: getTimezoneAbbreviation(participant.timezone, now),
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Meeting Planner
          </h1>
          <p className="text-slate-400 text-lg">
            Find the perfect time for your international meetings across multiple time zones
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Participants & Meeting Details */}
          <div className="space-y-6">
            {/* Meeting Details Form */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Meeting Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    value={meetingDetails.title}
                    onChange={(e) => setMeetingDetails(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Weekly Team Sync"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Duration: {meetingDetails.duration} minutes
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="240"
                    step="15"
                    value={meetingDetails.duration}
                    onChange={(e) => handleDurationChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>15 min</span>
                    <span>4 hours</span>
                  </div>
                </div>

                <button
                  onClick={generateShareLink}
                  className="w-full py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Generate Shareable Link
                </button>
                
                {showLinkCopied && (
                  <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Link copied to clipboard!
                  </div>
                )}
              </div>
            </div>

            {/* Participants List */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Participants ({participants.length})
                </h2>
                <button
                  onClick={() => setShowParticipantForm(true)}
                  className="p-2 bg-teal-600/20 hover:bg-teal-600/30 text-teal-400 rounded-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>

              {/* Participant Cards */}
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-white">{participant.name}</h3>
                        <p className="text-sm text-slate-400">
                          {participant.timezone.split('/').pop()?.replace(/_/g, ' ')}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Working hours: {participant.workStart}:00 - {participant.workEnd}:00
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingParticipant(participant.id)}
                          className="p-1.5 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => removeParticipant(participant.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* New Participant Form */}
              {showParticipantForm && (
                <div className="mt-4">
                  <ParticipantForm
                    onSave={addParticipant}
                    isNew={true}
                  />
                  <button
                    onClick={() => setShowParticipantForm(false)}
                    className="mt-3 w-full py-2 text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Timeline Grid */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Time Display */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
              <h2 className="text-lg font-semibold text-white mb-4">Current Time</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {getCurrentTimeDisplay().map((display, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50"
                  >
                    <p className="text-xs text-slate-400 truncate">{display.name}</p>
                    <p className="text-lg font-bold text-white">{display.time}</p>
                    <p className="text-xs text-teal-400">{display.abbreviation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Grid */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
              <h2 className="text-xl font-semibold text-white mb-4">24-Hour Timeline</h2>
              <p className="text-sm text-slate-400 mb-4">
                Click on a time slot to select it. Green = all participants available, Yellow = some available, Red = none available.
              </p>
              <TimelineGrid
                participants={participants}
                selectedTime={meetingDetails.selectedTime}
                onTimeSelect={handleTimeSelect}
                durationMinutes={meetingDetails.duration}
              />
            </div>

            {/* Meeting Suggestions */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
              <MeetingSuggestions
                participants={participants}
                onSelectTime={handleTimeSelect}
                selectedTime={meetingDetails.selectedTime}
                durationMinutes={meetingDetails.duration}
                onDurationChange={handleDurationChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MeetingPlannerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading meeting planner...</div>
      </div>
    }>
      <PlannerContent />
    </Suspense>
  );
}

