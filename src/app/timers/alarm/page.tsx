'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, BellOff, Plus, Trash2, Volume2, Sparkles, Clock, Check, AlarmClock, AlertCircle } from 'lucide-react';

interface AlarmItem {
  id: string;
  time: string; // "HH:MM"
  label: string;
  active: boolean;
  days: string[]; // ['Mon', 'Tue', ...] or ['Everyday']
}

const DEFAULT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function TimersAlarmPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<{ time: string; date: string }>({ time: '', date: '' });
  
  // Alarms state
  const [alarms, setAlarms] = useState<AlarmItem[]>([
    { id: '1', time: '07:00', label: 'Morning Wakeup', active: true, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    { id: '2', time: '14:30', label: 'Standup Meeting', active: false, days: ['Everyday'] },
  ]);

  // Form state
  const [newTime, setNewTime] = useState('08:00');
  const [newLabel, setNewLabel] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [triggeringAlarm, setTriggeringAlarm] = useState<AlarmItem | null>(null);

  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Load saved alarms if available
    try {
      const saved = localStorage.getItem('myweatherapp_alarms');
      if (saved) setAlarms(JSON.parse(saved));
    } catch {}

    return () => obs.disconnect();
  }, []);

  // Save alarms
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('myweatherapp_alarms', JSON.stringify(alarms));
    } catch {}
  }, [alarms, mounted]);

  // Live ticking clock & alarm check
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      setCurrentTime({ time: timeStr, date: dateStr });

      const curH = pad(now.getHours());
      const curM = pad(now.getMinutes());
      const curHM = `${curH}:${curM}`;
      const dayShort = now.toLocaleDateString('en-US', { weekday: 'short' });

      // Check alarms trigger if seconds === 0
      if (now.getSeconds() === 0) {
        alarms.forEach((a) => {
          if (a.active && a.time === curHM) {
            const matchesDay = a.days.includes('Everyday') || a.days.includes(dayShort);
            if (matchesDay) {
              triggerAlarm(a);
            }
          }
        });
      }
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [alarms]);

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch {}
  };

  const triggerAlarm = (alarm: AlarmItem) => {
    setTriggeringAlarm(alarm);
    playBeep();
    if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    audioIntervalRef.current = setInterval(playBeep, 800);
  };

  const dismissAlarm = () => {
    if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    audioIntervalRef.current = null;
    setTriggeringAlarm(null);
  };

  const snoozeAlarm = () => {
    dismissAlarm();
    // Add a temporary 5-min alarm
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    const pad = (n: number) => String(n).padStart(2, '0');
    const snoozeTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const snoozeItem: AlarmItem = {
      id: `snooze-${Date.now()}`,
      time: snoozeTime,
      label: `Snooze: ${triggeringAlarm?.label || 'Alarm'}`,
      active: true,
      days: ['Everyday'],
    };
    setAlarms((prev) => [snoozeItem, ...prev]);
  };

  const handleAddAlarm = () => {
    if (!newTime) return;
    const newItem: AlarmItem = {
      id: Date.now().toString(),
      time: newTime,
      label: newLabel.trim() || 'Alarm',
      active: true,
      days: selectedDays.length > 0 ? selectedDays : ['Everyday'],
    };
    setAlarms((prev) => [newItem, ...prev]);
    setNewLabel('');
  };

  const toggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const deleteAlarm = (id: string) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(245,158,11,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(245,158,11,0.08), transparent)',
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

      {/* Alarm Ringing Modal / Banner */}
      {triggeringAlarm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-pulse">
          <div
            className="w-full max-w-md rounded-3xl p-8 text-center border shadow-2xl relative"
            style={{ backgroundColor: T.cardBg, borderColor: '#f59e0b' }}
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <AlarmClock className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black mb-1" style={{ color: T.textPrimary }}>
              {triggeringAlarm.time}
            </h2>
            <p className="text-lg font-bold text-amber-500 mb-6">{triggeringAlarm.label}</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={snoozeAlarm}
                className="px-6 py-3 rounded-xl font-bold text-sm border hover:scale-105 active:scale-95 transition-all"
                style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff', borderColor: T.cardBorder, color: T.textPrimary }}
              >
                Snooze 5 Min
              </button>
              <button
                onClick={dismissAlarm}
                className="px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                Dismiss Alarm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-amber-500/10 text-amber-500 border-amber-500/20">
            <AlarmClock className="w-3.5 h-3.5" /> Smart Scheduled Alarms
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Alarm Clock
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Set reliable alarms with custom repeat days, audio alerts, and snooze functionality.
          </p>
        </div>

        {/* Current Time Banner */}
        <div
          className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl mb-8 text-center relative overflow-hidden"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
          <div className="text-xs uppercase font-bold text-amber-500 tracking-wider mb-2">Current System Time</div>
          <div className="text-4xl sm:text-6xl font-mono font-black tracking-tight" style={{ color: T.textPrimary }} suppressHydrationWarning>
            {currentTime.time || '--:--:--'}
          </div>
          <div className="text-xs sm:text-sm font-medium mt-2" style={{ color: T.textSecondary }} suppressHydrationWarning>
            {currentTime.date || '---'}
          </div>
        </div>

        {/* Add New Alarm Form */}
        <div
          className="rounded-2xl border p-6 sm:p-8 backdrop-blur-xl mb-8"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: T.textPrimary }}>
            <Plus className="w-4 h-4 text-amber-500" /> Create New Alarm
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr,auto] gap-4 items-end">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: T.textSecondary }}>
                Time (HH:MM)
              </label>
              <input
                type="time"
                aria-label="Alarm Time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full sm:w-36 px-4 py-2.5 rounded-xl border font-mono font-bold text-base focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: T.textSecondary }}>
                Label / Description
              </label>
              <input
                type="text"
                placeholder="e.g. Daily Standup, Workout..."
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>

            <button
              onClick={handleAddAlarm}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
            >
              Add Alarm
            </button>
          </div>

          {/* Repeat Days Chips */}
          <div className="mt-4 pt-4 border-t" style={{ borderColor: T.cardBorder }}>
            <span className="text-xs font-semibold block mb-2" style={{ color: T.textSecondary }}>Repeat on:</span>
            <div className="flex flex-wrap gap-1.5">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                const active = selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className="text-xs px-3 py-1 rounded-lg border font-medium transition-all"
                    style={{
                      backgroundColor: active ? (isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.15)') : (isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff'),
                      borderColor: active ? '#f59e0b' : T.inputBorder,
                      color: active ? '#f59e0b' : T.textPrimary,
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Alarms List */}
        <div
          className="rounded-2xl border p-6 backdrop-blur-xl"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: T.textPrimary }}>
              Configured Alarms ({alarms.length})
            </h2>
            <span className="text-xs" style={{ color: T.textSecondary }}>
              Audio synthesis alert active
            </span>
          </div>

          {alarms.length === 0 ? (
            <div className="py-8 text-center text-sm" style={{ color: T.textSecondary }}>
              No alarms configured yet. Add your first alarm above!
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: T.cardBorder }}>
              {alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className="py-4 flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleAlarm(alarm.id)}
                      className="p-2.5 rounded-xl border transition-all"
                      style={{
                        backgroundColor: alarm.active ? (isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.15)') : (isDark ? 'rgba(30, 41, 59, 0.5)' : '#f1f5f9'),
                        borderColor: alarm.active ? '#f59e0b' : T.cardBorder,
                        color: alarm.active ? '#f59e0b' : T.textSecondary,
                      }}
                      title={alarm.active ? 'Disable Alarm' : 'Enable Alarm'}
                    >
                      {alarm.active ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                    </button>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-2xl font-mono font-bold ${alarm.active ? '' : 'opacity-40'}`}
                          style={{ color: T.textPrimary }}
                        >
                          {alarm.time}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: alarm.active ? '#f59e0b' : T.textSecondary }}>
                          {alarm.active ? 'Active' : 'Off'}
                        </span>
                      </div>
                      <div className="text-xs font-medium" style={{ color: T.textSecondary }}>
                        {alarm.label} • {alarm.days.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => triggerAlarm(alarm)}
                      title="Test Alarm Sound"
                      className="p-2 rounded-lg border text-xs font-semibold hover:border-amber-500 transition-all"
                      style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff', borderColor: T.cardBorder, color: T.textSecondary }}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAlarm(alarm.id)}
                      title="Delete Alarm"
                      className="p-2 rounded-lg border text-rose-500 hover:bg-rose-500/10 border-rose-500/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}