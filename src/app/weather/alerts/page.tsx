'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, Search, Wind, CloudLightning, Waves, Flame, Bell, Info } from 'lucide-react';

interface WeatherAlert {
  id: string;
  sender: string;
  severity: 'Warning' | 'Watch' | 'Advisory';
  event: string;
  area: string;
  timeframe: string;
  description: string;
  instructions: string;
  icon: string;
}

const SAMPLE_ALERTS: { [city: string]: WeatherAlert[] } = {
  florida: [
    {
      id: 'fl-1',
      sender: 'National Weather Service Miami FL',
      severity: 'Warning',
      event: 'Severe Thunderstorm Warning',
      area: 'Miami-Dade and Broward Counties',
      timeframe: 'Until 6:30 PM EDT',
      description: 'Doppler radar indicated a line of severe storms capable of producing 60 mph wind gusts and penny-sized hail.',
      instructions: 'Move to an interior room on the lowest floor of a sturdy building. Avoid windows and secure outdoor furniture.',
      icon: 'thunder',
    },
  ],
  texas: [
    {
      id: 'tx-1',
      sender: 'NWS Storm Prediction Center',
      severity: 'Watch',
      event: 'Tornado Watch',
      area: 'North & Central Texas',
      timeframe: 'Until 10:00 PM CDT',
      description: 'Conditions are favorable for the development of severe thunderstorms capable of producing tornadoes, large hail, and damaging winds.',
      instructions: 'Review emergency plans, check weather radio batteries, and be prepared to take immediate shelter if a warning is issued.',
      icon: 'wind',
    },
  ],
  colorado: [
    {
      id: 'co-1',
      sender: 'NWS Denver/Boulder CO',
      severity: 'Advisory',
      event: 'Winter Weather Advisory',
      area: 'Front Range Foothills and Continental Divide',
      timeframe: 'Through 8:00 AM MDT Tomorrow',
      description: 'Snow accumulations of 4 to 8 inches above 8,000 feet. Road surfaces will become slick and hazardous.',
      instructions: 'Slow down and use caution while driving. Keep an extra flashlight, food, and water in your vehicle in case of an emergency.',
      icon: 'snow',
    },
  ],
};

export default function WeatherAlertsPage() {
  const [isDark, setIsDark] = useState(true);
  const [cityInput, setCityInput] = useState('Florida');
  const [activeCity, setActiveCity] = useState('Florida');

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const activeAlerts = SAMPLE_ALERTS[activeCity.toLowerCase()] || [];

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(239,68,68,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(239,68,68,0.08), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
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
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-rose-500/10 text-rose-500 border-rose-500/20">
            <AlertTriangle className="w-3.5 h-3.5" /> Emergency Weather Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Severe Weather Alerts
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Official meteorological warnings, flood watches, storm trajectories, and public safety guidance.
          </p>
        </div>

        {/* Search & Quick Chips */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search region (e.g. Florida, Texas, Colorado)..."
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setActiveCity(cityInput);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>
            <button
              onClick={() => setActiveCity(cityInput)}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Inspect
            </button>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2">
            {['Florida', 'Texas', 'Colorado', 'London', 'Tokyo', 'Bengaluru'].map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCityInput(c);
                  setActiveCity(c);
                }}
                className="text-xs px-3 py-1 rounded-lg border font-medium transition-all"
                style={{
                  backgroundColor: activeCity.toLowerCase() === c.toLowerCase() ? (isDark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.15)') : (isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff'),
                  borderColor: activeCity.toLowerCase() === c.toLowerCase() ? '#ef4444' : T.cardBorder,
                  color: activeCity.toLowerCase() === c.toLowerCase() ? '#ef4444' : T.textPrimary,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List or All-Clear Card */}
        {activeAlerts.length > 0 ? (
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden"
                style={{
                  backgroundColor: T.cardBg,
                  borderColor: alert.severity === 'Warning' ? '#ef4444' : '#f59e0b',
                  boxShadow: T.cardShadow,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: alert.severity === 'Warning' ? '#ef4444' : '#f59e0b' }}
                />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span
                    className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: alert.severity === 'Warning' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                      borderColor: alert.severity === 'Warning' ? '#ef4444' : '#f59e0b',
                      color: alert.severity === 'Warning' ? '#ef4444' : '#f59e0b',
                    }}
                  >
                    {alert.severity} • {alert.event}
                  </span>
                  <span className="text-xs font-mono font-semibold" style={{ color: T.textSecondary }}>
                    {alert.timeframe}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-1" style={{ color: T.textPrimary }}>
                  {alert.area}
                </h2>
                <p className="text-xs font-semibold mb-4" style={{ color: T.textSecondary }}>
                  Source: {alert.sender}
                </p>

                <p className="text-sm mb-4 leading-relaxed" style={{ color: T.textPrimary }}>
                  {alert.description}
                </p>

                <div
                  className="p-4 rounded-xl border flex items-start gap-3"
                  style={{
                    backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#f8fafc',
                    borderColor: T.cardBorder,
                  }}
                >
                  <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block mb-0.5" style={{ color: T.textPrimary }}>Recommended Safety Action:</strong>
                    <span style={{ color: T.textSecondary }}>{alert.instructions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="rounded-3xl border p-12 text-center backdrop-blur-xl"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-1" style={{ color: T.textPrimary }}>
              No Active Severe Alerts
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: T.textSecondary }}>
              There are currently no active warnings, watches, or advisories reported for <strong>{activeCity}</strong>. Weather conditions are within normal safety parameters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
