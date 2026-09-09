'use client';

import React, { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import TimelineGrid from '../../../components/world-clock/TimelineGrid';
import ParticipantForm from '../../../components/world-clock/ParticipantForm';
import MeetingSuggestions from '../../../components/world-clock/MeetingSuggestions';
import {
  formatTimeForTimezone,
  formatDateForTimezone,
  getTimezoneAbbreviation,
} from '../../../services/timezoneService';

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
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'My Location (Host)',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      cityId: 'local',
      workStart: 9,
      workEnd: 17,
    },
    {
      id: '2',
      name: 'London Team',
      timezone: 'Europe/London',
      cityId: 'london',
      workStart: 9,
      workEnd: 17,
    },
    {
      id: '3',
      name: 'Tokyo HQ',
      timezone: 'Asia/Tokyo',
      cityId: 'tokyo',
      workStart: 9,
      workEnd: 18,
    }
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
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const participantsParam = searchParams.get('participants');
    const titleParam = searchParams.get('title');
    const durationParam = searchParams.get('duration');

    if (participantsParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(participantsParam));
        setParticipants(parsed);
      } catch (e) {
        console.error('Failed to parse participants:', e);
      }
    }
    if (titleParam) setMeetingDetails(prev => ({ ...prev, title: titleParam }));
    if (durationParam) setMeetingDetails(prev => ({ ...prev, duration: parseInt(durationParam, 10) }));
  }, [searchParams]);

  const addParticipant = useCallback((data: Omit<Participant, 'id'>) => {
    const newParticipant: Participant = { ...data, id: Date.now().toString() };
    setParticipants(prev => [...prev, newParticipant]);
    setShowParticipantForm(false);
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

  const T = {
    bgPage: isDark
      ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)'
      : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark
      ? 'radial-gradient(circle 800px at 20% 0%, rgba(99,102,241,0.08), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(14,165,233,0.06), transparent 70%)'
      : 'radial-gradient(circle 800px at 20% 0%, rgba(99,102,241,0.04), transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(14,165,233,0.03), transparent 70%)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.85)' : '#ffffff',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    subheading: isDark ? '#94a3b8' : '#64748b',
    footerText: isDark ? '#64748b' : '#94a3b8',
  };

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-200" style={{ background: T.bgPage }}>
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" style={{ background: T.ambientOrbs }} />

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-7 pb-16">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 shadow-xs bg-purple-500/10 border border-purple-500/25">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              International Coordination · Overlap Finder
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-slate-900 dark:text-white">
            Meeting Planner
          </h1>
          <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: T.subheading }}>
            Coordinate meetings seamlessly across timezones and discover perfect working hour overlaps.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column (4 cols): Details & Participants */}
          <div className="lg:col-span-4 space-y-4">
            {/* Meeting Details Card */}
            <div
              className="rounded-2xl p-4 sm:p-5 backdrop-blur-xl"
              style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
            >
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-base">📋</span>
                <span>Meeting Details</span>
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    value={meetingDetails.title}
                    onChange={(e) => setMeetingDetails(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Global Sprint Planning"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    <span>Duration</span>
                    <span className="text-purple-600 dark:text-purple-400">{meetingDetails.duration} min</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="180"
                    step="15"
                    value={meetingDetails.duration}
                    onChange={(e) => handleDurationChange(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>15m</span>
                    <span>1 hr</span>
                    <span>2 hrs</span>
                    <span>3 hrs</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={generateShareLink}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Shareable Link</span>
                </button>

                {showLinkCopied && (
                  <div className="text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 py-1.5 rounded-lg">
                    ✓ Link copied to clipboard!
                  </div>
                )}
              </div>
            </div>

            {/* Participants Card */}
            <div
              className="rounded-2xl p-4 sm:p-5 backdrop-blur-xl"
              style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-base">👥</span>
                  <span>Participants ({participants.length})</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setShowParticipantForm(true)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 hover:bg-purple-100 transition-all cursor-pointer"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-2">
                {participants.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5 flex items-start justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{p.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {p.timezone.split('/').pop()?.replace(/_/g, ' ')}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Hours: {p.workStart}:00 – {p.workEnd}:00
                      </p>
                    </div>

                    {participants.length > 1 && (
                      <button
                        onClick={() => removeParticipant(p.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                        title="Remove participant"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {showParticipantForm && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <ParticipantForm onSave={addParticipant} isNew={true} />
                  <button
                    type="button"
                    onClick={() => setShowParticipantForm(false)}
                    className="mt-2 w-full py-1 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (8 cols): Clocks, Timeline & Suggestions */}
          <div className="lg:col-span-8 space-y-4">
            {/* Live Participant Clocks Strip */}
            <div
              className="rounded-2xl p-4 backdrop-blur-xl"
              style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
            >
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Current Local Times
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {participants.map((p) => {
                  const nowStr = formatTimeForTimezone(p.timezone, currentTime);
                  const abbr = getTimezoneAbbreviation(p.timezone, currentTime);
                  return (
                    <div
                      key={p.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5"
                    >
                      <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 truncate">{p.name}</p>
                      <p suppressHydrationWarning className="text-lg font-bold font-mono text-slate-900 dark:text-white my-0.5">
                        {mounted ? nowStr : '--:--:--'}
                      </p>
                      <p className="text-[10px] font-semibold text-purple-600 dark:text-purple-400">{abbr}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Grid */}
            <div
              className="rounded-2xl p-4 sm:p-5 backdrop-blur-xl"
              style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  24-Hour International Timeline
                </h2>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>All Available</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Partial Overlap</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span>Off Hours</span>
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <TimelineGrid
                  participants={participants}
                  selectedTime={meetingDetails.selectedTime}
                  onTimeSelect={handleTimeSelect}
                  durationMinutes={meetingDetails.duration}
                />
              </div>
            </div>

            {/* Smart Meeting Suggestions */}
            <div
              className="rounded-2xl p-4 sm:p-5 backdrop-blur-xl"
              style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, boxShadow: T.cardShadow }}
            >
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

        <footer className="text-center text-xs mt-10" style={{ color: T.footerText }}>
          <span>Coordinated Universal Time (UTC) calculations</span>
          <span className="mx-2">·</span>
          <span>Instant shareable links preserve meeting configurations</span>
        </footer>
      </div>
    </div>
  );
}

export default function MeetingPlannerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
          <div className="text-xs font-semibold text-slate-500">Loading meeting planner...</div>
        </div>
      }
    >
      <PlannerContent />
    </Suspense>
  );
}
