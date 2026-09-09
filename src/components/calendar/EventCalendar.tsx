'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Clock, Tag, Sparkles, Check } from 'lucide-react';
import { CalendarEvent } from '@/types/calendar.types';

const CATEGORIES = ['All', 'Work', 'Personal', 'Meeting', 'Reminder'];

const DEFAULT_EVENTS: CalendarEvent[] = [
  { id: 1, title: 'Quarterly Team Planning', date: '2026-09-15', time: '10:00 AM', description: 'Q3 product roadmap & deliverables sync' },
  { id: 2, title: 'Release Deployment Window', date: '2026-09-22', time: '04:00 PM', description: 'Production rollout & smoke verification' },
  { id: 3, title: 'Client Feedback Review', date: '2026-09-28', time: '02:30 PM', description: 'Present sprint milestone outcomes' },
];

export default function EventCalendar() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>(DEFAULT_EVENTS);
  const [selectedCat, setSelectedCat] = useState('All');
  const [showAdd, setShowAdd] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('09:00');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setMounted(true);
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    try {
      const saved = localStorage.getItem('myweatherapp_user_events');
      if (saved) setEvents(JSON.parse(saved));
    } catch {}

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('myweatherapp_user_events', JSON.stringify(events));
    } catch {}
  }, [events, mounted]);

  const handleAdd = () => {
    if (!title.trim() || !date) return;
    const newEv: CalendarEvent = {
      id: Date.now(),
      title: title.trim(),
      date,
      time,
      description: description.trim(),
    };
    setEvents((prev) => [...prev, newEv]);
    setTitle('');
    setDescription('');
    setShowAdd(false);
  };

  const handleDelete = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(`${a.date}T${a.time || '00:00'}`).getTime() - new Date(`${b.date}T${b.time || '00:00'}`).getTime()
  );

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(99,102,241,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(99,102,241,0.08), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    textPrimary: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    inputBg: isDark ? 'rgba(15, 23, 42, 0.9)' : '#ffffff',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(203, 213, 225, 0.9)',
  };

  return (
    <div style={{ background: T.bgPage, minHeight: '100vh' }} className="relative transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: T.ambientOrbs }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-2 border bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
              <Calendar className="w-3.5 h-3.5" /> Agenda & Appointments
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
              Event Calendar
            </h1>
            <p className="mt-1 text-sm max-w-md" style={{ color: T.textSecondary }}>
              Schedule personal tasks, meetings, and important deadlines.
            </p>
          </div>

          <button
            onClick={() => setShowAdd(!showAdd)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {showAdd ? 'Cancel' : <><Plus className="w-4 h-4" /> New Event</>}
          </button>
        </div>

        {/* Add Event Form Modal/Panel */}
        {showAdd && (
          <div
            className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl mb-8 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            style={{
              backgroundColor: T.cardBg,
              borderColor: '#6366f1',
              boxShadow: T.cardShadow,
            }}
          >
            <h2 className="text-base font-bold mb-4" style={{ color: T.textPrimary }}>
              Add New Calendar Event
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: T.textSecondary }}>
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Design Review..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: T.textSecondary }}>
                  Date & Time
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    aria-label="Event Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl border text-sm font-semibold"
                    style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                  />
                  <input
                    type="time"
                    aria-label="Event Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-28 px-3 py-2.5 rounded-xl border font-mono font-bold text-sm"
                    style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: T.textSecondary }}>
                  Description (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Notes, agenda details, location..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
                />
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-all"
            >
              Save Event
            </button>
          </div>
        )}

        {/* Events Timeline List */}
        <div className="space-y-3">
          {sortedEvents.length === 0 ? (
            <div
              className="rounded-2xl border p-12 text-center text-sm"
              style={{ backgroundColor: T.cardBg, borderColor: T.cardBorder, color: T.textSecondary }}
            >
              No events scheduled. Click "+ New Event" to create your first appointment.
            </div>
          ) : (
            sortedEvents.map((ev) => (
              <div
                key={ev.id}
                className="group rounded-2xl border p-4 sm:p-5 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex items-center justify-between gap-4"
                style={{
                  backgroundColor: T.cardBg,
                  borderColor: T.cardBorder,
                  boxShadow: T.cardShadow,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex flex-col items-center justify-center border font-mono shrink-0"
                    style={{
                      backgroundColor: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
                      borderColor: 'rgba(99,102,241,0.3)',
                      color: '#6366f1',
                    }}
                  >
                    <span className="text-[10px] uppercase font-bold">
                      {new Date(ev.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-base font-black leading-none">
                      {new Date(ev.date).getDate()}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-bold text-base" style={{ color: T.textPrimary }}>
                      {ev.title}
                    </h2>
                    <div className="flex items-center gap-3 text-xs font-semibold mt-1" style={{ color: T.textSecondary }}>
                      {ev.time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-indigo-500" /> {ev.time}
                        </span>
                      )}
                      <span>•</span>
                      <span>{ev.date}</span>
                    </div>
                    {ev.description && (
                      <p className="text-xs mt-1.5" style={{ color: T.textSecondary }}>
                        {ev.description}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(ev.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-all"
                  title="Delete event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}