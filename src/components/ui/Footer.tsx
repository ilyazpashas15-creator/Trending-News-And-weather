'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [feedbackGiven, setFeedbackGiven] = useState<'up' | 'down' | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedbackGiven(type);
    setTimeout(() => {
      // Auto-clear or keep
    }, 4000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-slate-900 dark:bg-[#060a17] text-slate-300 overflow-hidden border-t border-slate-800/80 dark:border-white/10 transition-colors duration-300">
      
      {/* Ambient Radial Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      {/* ── Top Feedback & Satisfaction Banner ── */}
      <div className="relative z-10 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-3.5 px-4 sm:px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          
          <div className="flex items-center gap-3 text-white">
            <span className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
              <span>✨</span> How was your portal experience today?
            </span>
            
            {feedbackGiven ? (
              <span className="text-xs font-black px-3 py-1 rounded-full bg-white/20 backdrop-blur-md animate-fadeIn">
                🎉 Thank you for your feedback!
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFeedback('up')}
                  className="px-3 py-1 text-xs font-extrabold rounded-full bg-white/15 hover:bg-white/30 active:scale-95 transition-all flex items-center gap-1 backdrop-blur-md shadow-xs"
                  aria-label="Great experience"
                >
                  <span>👍</span>
                  <span>Great</span>
                </button>
                <button
                  onClick={() => handleFeedback('down')}
                  className="px-3 py-1 text-xs font-extrabold rounded-full bg-white/15 hover:bg-white/30 active:scale-95 transition-all flex items-center gap-1 backdrop-blur-md shadow-xs"
                  aria-label="Needs improvement"
                >
                  <span>👎</span>
                  <span>Improve</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-white/90">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/25 transition-all shadow-xs"
            >
              <span>📩</span>
              <span>Contact Support</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ── Main Footer Navigation & Supporter Spotlight ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Supporter Card & Newsletter (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Supporter Glass Box */}
            <div className="relative rounded-3xl p-1 overflow-hidden shadow-xl">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-3xl blur opacity-70" />
              <div className="relative rounded-[22px] bg-slate-800/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-slate-700/80 dark:border-white/10 p-6">
                
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-2xl shadow-lg shadow-pink-500/30">
                    ❤️
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white tracking-tight">
                      Love Our Platform?
                    </h3>
                    <p className="text-xs text-purple-300 font-semibold">
                      Support independent meteorological journalism
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 mb-5">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Browse 100% ad-free on all devices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Sun & Moon ephemeris accurate to the second</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>High-res printable astronomical PDF templates</span>
                  </li>
                </ul>

                <Link
                  href="/about"
                  className="block w-full py-2.5 text-center text-xs font-black text-white rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-purple-500/25 transition-all hover:scale-105 active:scale-95"
                >
                  ⭐ Become a Supporter / Pro
                </Link>
              </div>
            </div>

            {/* Quick Newsletter Box */}
            <div className="rounded-2xl bg-slate-800/50 dark:bg-white/[0.03] border border-slate-700/60 dark:border-white/10 p-4">
              <span className="text-xs font-extrabold text-white block mb-1">
                📬 Daily Meteorological Briefing
              </span>
              <p className="text-[11px] text-slate-400 mb-3">
                Get sunrise, severe weather alerts, and top world news delivered to your inbox.
              </p>
              {subscribed ? (
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold text-center border border-emerald-500/30">
                  ✓ Successfully subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 dark:bg-black/40 border border-slate-700 dark:border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white whitespace-nowrap transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Column 2-5: Navigation Links Grid (8 cols on lg) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              
              {/* Company */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
                  <span className="text-blue-400">🏢</span> Company
                </h4>
                <ul className="space-y-2.5 text-xs">
                  <li><Link href="/about" className="text-slate-400 hover:text-cyan-300 transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="text-slate-400 hover:text-cyan-300 transition-colors">Careers & Team</Link></li>
                  <li><Link href="/contact" className="text-slate-400 hover:text-cyan-300 transition-colors">Contact Support</Link></li>
                  <li><Link href="/news/world" className="text-slate-400 hover:text-cyan-300 transition-colors">Press & Media</Link></li>
                  <li><Link href="/about" className="text-slate-400 hover:text-cyan-300 transition-colors">Sitemap</Link></li>
                </ul>

                <h4 className="text-xs font-black uppercase tracking-wider text-white mt-8 mb-3.5 flex items-center gap-1.5">
                  <span className="text-purple-400">🌐</span> Connect
                </h4>
                <div className="flex items-center gap-2">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white flex items-center justify-center border border-blue-500/30 transition-all hover:scale-110"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  {/* Twitter / X */}
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="w-8 h-8 rounded-lg bg-slate-700/40 hover:bg-black text-slate-300 hover:text-white flex items-center justify-center border border-slate-600/30 transition-all hover:scale-110"
                  >
                    <span className="text-xs font-black">𝕏</span>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-8 h-8 rounded-lg bg-sky-600/20 hover:bg-sky-600 text-sky-400 hover:text-white flex items-center justify-center border border-sky-500/30 transition-all hover:scale-110"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-8 h-8 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white flex items-center justify-center border border-red-500/30 transition-all hover:scale-110"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>

              {/* Legal & Policies */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
                  <span className="text-amber-400">⚖️</span> Legal
                </h4>
                <ul className="space-y-2.5 text-xs">
                  <li><Link href="/privacy" className="text-slate-400 hover:text-cyan-300 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/privacy" className="text-slate-400 hover:text-cyan-300 transition-colors">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="text-slate-400 hover:text-cyan-300 transition-colors">Cookie Settings</Link></li>
                  <li><Link href="/privacy" className="text-slate-400 hover:text-cyan-300 transition-colors">Disclaimer</Link></li>
                  <li><Link href="/contact" className="text-slate-400 hover:text-cyan-300 transition-colors">Advertising Policy</Link></li>
                </ul>
              </div>

              {/* Services & Portals */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
                  <span className="text-pink-400">🌤️</span> Services
                </h4>
                <ul className="space-y-2.5 text-xs">
                  <li><Link href="/weather" className="text-slate-400 hover:text-cyan-300 transition-colors">Live Radar</Link></li>
                  <li><Link href="/weather/5day" className="text-slate-400 hover:text-cyan-300 transition-colors">5-Day Outlook</Link></li>
                  <li><Link href="/world-clock" className="text-slate-400 hover:text-cyan-300 transition-colors">World Clocks</Link></li>
                  <li><Link href="/time-zones/all" className="text-slate-400 hover:text-cyan-300 transition-colors">Time Zones</Link></li>
                  <li><Link href="/sun-moon-space" className="text-slate-400 hover:text-cyan-300 transition-colors">Sun & Moon Ephemeris</Link></li>
                  <li><Link href="/calendar/monthly" className="text-slate-400 hover:text-cyan-300 transition-colors">Calendars & Holidays</Link></li>
                  <li><Link href="/news/world" className="text-slate-400 hover:text-cyan-300 transition-colors">Global News Feed</Link></li>
                </ul>
              </div>

              {/* Calculators & Tools */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
                  <span className="text-emerald-400">🧮</span> Free Tools
                </h4>
                <ul className="space-y-2.5 text-xs">
                  <li><Link href="/timers/stopwatch" className="text-slate-400 hover:text-cyan-300 transition-colors">Digital Stopwatch</Link></li>
                  <li><Link href="/timers/alarm" className="text-slate-400 hover:text-cyan-300 transition-colors">Online Alarm</Link></li>
                  <li><Link href="/calculators/time" className="text-slate-400 hover:text-cyan-300 transition-colors">Time Calculator</Link></li>
                  <li><Link href="/calculators/date" className="text-slate-400 hover:text-cyan-300 transition-colors">Date Difference</Link></li>
                  <li><Link href="/time-zones/converter" className="text-slate-400 hover:text-cyan-300 transition-colors">TZ Meeting Planner</Link></li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar: Operational Status & Branding ── */}
      <div className="relative z-10 bg-slate-950/90 dark:bg-black/90 border-t border-slate-800 dark:border-white/10 py-5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Network Status */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="text-2xl drop-shadow-md">🌤️</span>
              <span className="text-base font-black tracking-tight text-white">
                My Weather <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">And News</span>
              </span>
            </div>

            <span className="hidden sm:inline text-slate-600 dark:text-slate-700">•</span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Global Meteorological Feeds Active
            </span>
          </div>

          {/* Copyright text */}
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center sm:text-right">
            © {new Date().getFullYear()} My Weather And News. Precision timekeeping & meteorological intelligence.
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
