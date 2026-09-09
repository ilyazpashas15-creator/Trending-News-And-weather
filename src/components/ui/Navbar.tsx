'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import NavbarNotifications from './NavbarNotifications';
import NavbarBookmarks from './NavbarBookmarks';
import NavbarProfile from './NavbarProfile';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/context/AuthContext';

export interface NavDropdownItem {
  label: string;
  href: string;
  description: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
}

export interface NavCategoryConfig {
  id: string;
  title: string;
  icon: string;
  items: NavDropdownItem[];
}

export const NAVBAR_CATEGORIES: NavCategoryConfig[] = [
  {
    id: 'news',
    title: 'News',
    icon: '📰',
    items: [
      { label: 'Breaking News', href: '/news/breaking', description: 'Live breaking news & top headlines', icon: '⚡', badge: 'Live', badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' },
      { label: 'World News', href: '/news/world', description: 'Global headlines & international events', icon: '🌐', badge: 'World', badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
      { label: 'Local News', href: '/news/local', description: 'Regional stories & community updates', icon: '📍', badge: 'Local', badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
      { label: 'Weather News', href: '/news/weather', description: 'Climate, storms & meteorological reports', icon: '🌪️', badge: 'Climate', badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400' },
      { label: 'Technology', href: '/news/tech', description: 'Latest gadgets, software & AI innovations', icon: '💻', badge: 'Tech', badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' },
      { label: 'Sports', href: '/news/sports', description: 'Live scores, highlights & sports updates', icon: '⚽', badge: 'Sports', badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
      { label: 'Finance', href: '/news/finance', description: 'Markets, crypto, and economic trends', icon: '📈', badge: 'Finance', badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
      { label: 'Entertainment', href: '/news/entertainment', description: 'Movies, music, celebrity & pop culture', icon: '🎬', badge: 'Culture', badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400' },
      { label: 'News Archive', href: '/news/archive', description: 'Search past editions & historical news', icon: '📁', badge: 'Archive', badgeColor: 'bg-slate-500/15 text-slate-600 dark:text-slate-400' },
    ],
  },
  {
    id: 'worldClock',
    title: 'World Clock',
    icon: '🌍',
    items: [
      { label: 'Popular Cities', href: '/world-clock/popular', description: 'Current time across top global capitals', icon: '🏙️', badge: 'Popular', badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
      { label: 'Time Converter', href: '/world-clock/converter', description: 'Interactive multi-city hour converter', icon: '🔄', badge: 'Tool', badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' },
      { label: 'Meeting Planner', href: '/world-clock/planner', description: 'Coordinate across global timezones', icon: '👥', badge: 'Planner', badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400' },
      { label: 'Add New City', href: '/world-clock/add-city', description: 'Search & add any world city to list', icon: '➕', badge: 'New', badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
      { label: 'My Saved Locations', href: '/world-clock/my-locations', description: 'Personalized clock & city watchlist', icon: '⭐', badge: 'Saved', badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
    ],
  },
  {
    id: 'timeZones',
    title: 'Time Zones',
    icon: '⏱️',
    items: [
      { label: 'Time Zone Converter', href: '/time-zones/converter', description: 'Convert time between any global zones', icon: '🌐', badge: 'Tool', badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
      { label: 'All Time Zones', href: '/time-zones/all', description: 'Comprehensive UTC & GMT zone directory', icon: '📋', badge: 'Directory', badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400' },
      { label: 'UTC Offsets', href: '/time-zones/offsets', description: 'Offsets from UTC-12 to UTC+14', icon: '🕒', badge: 'Offsets', badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400' },
      { label: 'By Continent', href: '/time-zones/continent', description: 'Timezones grouped by continental regions', icon: '🗺️', badge: 'Regions', badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
      { label: 'By Country', href: '/time-zones/country', description: 'National timezones & regional subdivisions', icon: '🎌', badge: 'Nations', badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
    ],
  },
  {
    id: 'calendar',
    title: 'Calendar',
    icon: '📅',
    items: [
      { label: 'Monthly Calendar', href: '/calendar/monthly', description: 'Interactive monthly view & schedule planner', icon: '🗓️', badge: 'Month', badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
      { label: 'Yearly Calendar', href: '/calendar/yearly', description: 'Full 12-month calendar & annual overview', icon: '📆', badge: 'Year', badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' },
      { label: 'Holiday Calendar', href: '/calendar/holiday', description: 'Public, federal & religious holiday dates', icon: '🎉', badge: 'Holidays', badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' },
      { label: 'Event Calendar', href: '/calendar/events', description: 'Plan schedules & track personal events', icon: '📌', badge: 'Events', badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400' },
      { label: 'Custom Calendar', href: '/calendar/custom', description: 'Generate custom printable & PDF templates', icon: '🎨', badge: 'Custom', badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
    ],
  },
  {
    id: 'weather',
    title: 'Weather',
    icon: '🌤️',
    items: [
      { label: 'Current Weather', href: '/weather', description: 'Live temperature, humidity & wind radar', icon: '🌡️', badge: 'Live', badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400' },
      { label: '5-Day Forecast', href: '/weather/5day', description: 'Multi-day daily temperature trends', icon: '📅', badge: '5-Day', badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
      { label: '10-Day Forecast', href: '/weather/10day', description: 'Extended outlook & weather probabilities', icon: '🌤️', badge: '10-Day', badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' },
      { label: 'Hourly Weather', href: '/weather/hourly', description: '24-hour hour-by-hour forecast radar', icon: '⏱️', badge: 'Hourly', badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400' },
      { label: 'Weather Maps', href: '/weather/maps', description: 'Doppler precipitation & satellite clouds', icon: '🗺️', badge: 'Radar', badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
      { label: 'Severe Weather Alerts', href: '/weather/alerts', description: 'Active storm, freeze & heat advisories', icon: '⚡', badge: 'Alerts', badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
    ],
  },
  {
    id: 'timers',
    title: 'Timers',
    icon: '⏳',
    items: [
      { label: 'Stopwatch', href: '/timers/stopwatch', description: 'Precision split & lap stopwatch', icon: '⏱️', badge: 'Split', badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
      { label: 'Countdown Timer', href: '/timers/countdown', description: 'Customizable countdown alarms & timers', icon: '⏳', badge: 'Timer', badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400' },
      { label: 'Alarm Clock', href: '/timers/alarm', description: 'Audio wake alarms & customizable reminders', icon: '⏰', badge: 'Alarm', badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' },
      { label: 'World Clock Timer', href: '/timers/clock', description: 'Ambient full-screen digital desk clock', icon: '🕰️', badge: 'Clock', badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400' },
      { label: 'Interval Timer', href: '/timers/interval', description: 'HIIT, Pomodoro & focus interval timer', icon: '🔁', badge: 'Interval', badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
    ],
  },
  {
    id: 'calculators',
    title: 'Calculators',
    icon: '🧮',
    items: [
      { label: 'Standard Calculator', href: '/calculators/standard', description: 'Scientific & basic arithmetic calculator', icon: '🧮', badge: 'Math', badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
      { label: 'Currency Converter', href: '/calculators/currency', description: 'Real-time global exchange rates & forex', icon: '💱', badge: 'Forex', badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
      { label: 'Date Calculator', href: '/calculators/date', description: 'Add or subtract days between dates', icon: '📅', badge: 'Dates', badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' },
      { label: 'Time Calculator', href: '/calculators/time', description: 'Add and subtract hours, minutes & seconds', icon: '⌛', badge: 'Time', badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400' },
      { label: 'Timezone Calculator', href: '/calculators/timezone', description: 'Compute exact cross-timezone offsets', icon: '🌍', badge: 'Zones', badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400' },
      { label: 'Duration Calculator', href: '/calculators/duration', description: 'Calculate exact elapsed time & intervals', icon: '⏳', badge: 'Duration', badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
      { label: 'Business Days Calculator', href: '/calculators/business', description: 'Workdays excluding weekends & holidays', icon: '💼', badge: 'Work', badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' },
    ],
  },
  {
    id: 'sunMoonSpace',
    title: 'Sun, Moon & Space',
    icon: '🌙',
    items: [
      { label: 'Observatory Hub', href: '/sun-moon-space', description: 'Comprehensive astronomical command center', icon: '🔭', badge: 'Hub', badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' },
      { label: 'Sunrise & Sunset', href: '/sun-moon-space/sunrise-sunset', description: 'Golden hour, twilight, dawn & daylight arc', icon: '🌅', badge: 'Solar', badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
      { label: 'Moon Phases', href: '/sun-moon-space/moon-phases', description: 'Real-time lunar cycle, full moon calendar', icon: '🌙', badge: 'Lunar', badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400' },
      { label: 'NASA Picture of the Day', href: '/sun-moon-space/nasa-apod', description: 'Daily astronomy discovery from NASA APOD', icon: '🚀', badge: 'NASA', badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
      { label: 'ISS Tracker', href: '/sun-moon-space/iss', description: 'Live International Space Station orbit tracker', icon: '🛰️', badge: 'ISS', badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400' },
      { label: 'Planet Positions', href: '/sun-moon-space/planets', description: 'Visible planets & solar system transits', icon: '🪐', badge: 'Planets', badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' },
      { label: 'Solar Eclipse', href: '/sun-moon-space/solar-eclipse', description: 'Solar eclipse schedules & totality paths', icon: '☀️', badge: 'Eclipse', badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' },
      { label: 'Lunar Eclipse', href: '/sun-moon-space/lunar-eclipse', description: 'Lunar eclipse dates & visibility guides', icon: '🌑', badge: 'Eclipse', badgeColor: 'bg-slate-500/15 text-slate-600 dark:text-slate-400' },
    ],
  },
];

const Navbar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect scrolling to add elevated shadow & blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
        setMobileAccordion(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = (categoryId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleDropdown = (categoryId: string) => {
    setOpenDropdown(prev => (prev === categoryId ? null : categoryId));
  };

  const toggleMobileAccordion = (categoryId: string) => {
    setMobileAccordion(prev => (prev === categoryId ? null : categoryId));
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#070b14]/95 backdrop-blur-2xl border-b border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-900/5 dark:shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
          : 'bg-white/90 dark:bg-[#070b14]/90 backdrop-blur-xl border-b border-slate-200/70 dark:border-white/[0.08]'
      }`}
    >
      {/* ── TOP TIER: Brand Logo, Quick Search, Utilities & Account (Desktop & Mobile) ── */}
      <div className="max-w-[1536px] mx-auto px-3 sm:px-5 lg:px-8 border-b border-slate-100/80 dark:border-white/[0.05]">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">

          {/* Brand Logo & Live Radar Beacon */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-base sm:text-lg font-bold shadow-lg shadow-purple-500/25 group-hover:scale-105 group-hover:shadow-purple-500/40 transition-all duration-200">
                <span>🌤️</span>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-[#070b14]" />
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-tight">
                    My Weather <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">And News</span>
                  </span>
                  <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <span className="hidden sm:inline-block text-[11px] font-medium text-slate-400 dark:text-slate-400 tracking-wider">
                  Live Global Weather, Radar & Breaking News
                </span>
              </div>
            </Link>
          </div>

          {/* Right Utilities & Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">

            {/* Notifications Popover with live alerts */}
            <NavbarNotifications />

            {/* Saved Reads Bookmarks */}
            <NavbarBookmarks />

            {/* Subtle Divider */}
            <div className="hidden sm:block h-6 w-[1px] bg-slate-200 dark:bg-white/10 mx-1" />

            {/* Profile Pill Button (Visible on desktop) */}
            <Link
              href={isAuthenticated ? '/profile' : '/login'}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-white/[0.06] hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950/40 dark:hover:text-purple-300 border border-slate-200/80 dark:border-white/10 transition-all duration-200 shadow-sm whitespace-nowrap"
            >
              Profile
            </Link>

            {/* Logout / Sign In Pill Button (Visible on desktop) */}
            {isAuthenticated ? (
              <button
                onClick={async () => {
                  await logout();
                  router.push('/');
                }}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-pink-50 dark:bg-pink-950/40 border border-pink-500/30 text-pink-700 dark:text-pink-300 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 transition-all duration-200 shadow-sm whitespace-nowrap"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white transition-all duration-200 shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 active:scale-95 whitespace-nowrap"
              >
                Logout
              </Link>
            )}

            {/* Theme Toggle */}
            <div className="flex items-center pl-1">
              <ThemeToggle />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── BOTTOM TIER: 8 Category Navigation Ribbon (Spacious & Clean on Desktop) ── */}
      <div className="hidden lg:block bg-slate-50/70 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/[0.03]">
        <div className="max-w-[1536px] mx-auto px-3 sm:px-5 lg:px-8">
          <nav className="flex items-center justify-between py-1.5" aria-label="Main Navigation">
            <div className="flex items-center gap-1 xl:gap-2 flex-wrap">
              {NAVBAR_CATEGORIES.map((category) => {
                const isOpen = openDropdown === category.id;
                const isActive = category.items.some(
                  (item) => pathname === item.href || (item.href.startsWith('/#') && pathname === '/')
                );

                return (
                  <div
                    key={category.id}
                    className="relative group flex-shrink-0"
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => toggleDropdown(category.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-bold tracking-tight transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-purple-500/40 ${
                        isOpen || isActive
                          ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-purple-500/25'
                          : 'text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-white dark:hover:bg-white/10 hover:shadow-sm'
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <span aria-hidden="true" className="text-xs opacity-90">{category.icon}</span>
                      <span>{category.title}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-white' : 'opacity-50 group-hover:opacity-100'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Mega-Menu Dropdown */}
                    {isOpen && (
                      <div
                        className={`absolute top-full mt-2 z-50 animate-in fade-in zoom-in-95 duration-150 rounded-2xl p-3 w-80 sm:w-96 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-3xl bg-white/95 dark:bg-[#0c1427]/95 border border-slate-200/90 dark:border-white/10 ${
                          category.id === 'calculators' || category.id === 'sunMoonSpace'
                            ? 'right-0'
                            : 'left-0'
                        }`}
                        role="menu"
                        onMouseEnter={() => handleMouseEnter(category.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="px-3.5 py-2.5 bg-gradient-to-r from-slate-100/90 to-purple-50/50 dark:from-white/[0.04] dark:to-purple-950/30 rounded-xl border border-slate-200/60 dark:border-white/5 flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{category.icon}</span>
                            <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white">
                              {category.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800/50">
                            {category.items.length} Modules
                          </span>
                        </div>

                        <div className="space-y-0.5 max-h-[380px] overflow-y-auto scrollbar-none py-1">
                          {category.items.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={() => setOpenDropdown(null)}
                              className="group/item flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 hover:bg-slate-100/90 dark:hover:bg-gradient-to-r dark:hover:from-blue-600/15 dark:hover:via-purple-600/15 dark:hover:to-pink-600/15 hover:translate-x-1 focus:outline-none focus:ring-1 focus:ring-purple-500/40 border border-transparent hover:border-slate-200/80 dark:hover:border-white/10"
                              role="menuitem"
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/10 flex items-center justify-center text-sm group-hover/item:scale-110 group-hover/item:border-purple-300 dark:group-hover/item:border-purple-500/40 transition-all flex-shrink-0 shadow-sm">
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover/item:text-purple-600 dark:group-hover/item:text-cyan-300 transition-colors truncate">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full flex-shrink-0 uppercase tracking-wider ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-300">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer (Accordion for all 8 categories) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 dark:bg-[#070b14]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-4 space-y-2">

            {/* Search Input in Mobile Drawer */}
            <div className="pb-3 border-b border-slate-100 dark:border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const q = formData.get('q') as string;
                  if (q?.trim()) {
                    router.push(`/weather?city=${encodeURIComponent(q.trim())}`);
                    setMobileMenuOpen(false);
                  }
                }}
                className="relative flex items-center"
              >
                <input
                  type="search"
                  name="q"
                  placeholder="Search weather, news, cities..."
                  className="w-full px-3.5 py-2 pl-9 rounded-xl text-xs bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </form>
            </div>

            {/* 8 Accordion Categories */}
            <div className="space-y-1">
              {NAVBAR_CATEGORIES.map((category) => {
                const isAccordionOpen = mobileAccordion === category.id;

                return (
                  <div key={category.id} className="border-b border-slate-100 dark:border-white/5 last:border-b-0">
                    <button
                      onClick={() => toggleMobileAccordion(category.id)}
                      className="w-full flex items-center justify-between py-3 px-2 rounded-xl text-left text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-white/[0.05] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{category.icon}</span>
                        <span>{category.title}</span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isAccordionOpen ? 'rotate-180 text-purple-600 dark:text-purple-400' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Accordion Items */}
                    {isAccordionOpen && (
                      <div className="pl-4 pr-2 pb-3 pt-1 space-y-1 bg-slate-50/50 dark:bg-white/[0.02] rounded-xl mb-1">
                        {category.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileAccordion(null);
                            }}
                            className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span>{item.icon}</span>
                              <span className="truncate">{item.label}</span>
                            </div>
                            {item.badge && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-200 text-slate-700'}`}>
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Auth & Account Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-2">
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-purple-500/40 text-purple-600 dark:text-purple-300 text-xs font-semibold text-center hover:bg-purple-600 hover:text-white transition-all shadow-sm"
              >
                Profile
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={async () => {
                    await logout();
                    setMobileMenuOpen(false);
                    router.push('/');
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-pink-500/40 text-pink-600 dark:text-pink-300 text-xs font-semibold text-center hover:bg-pink-600 hover:text-white transition-all shadow-sm"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-pink-500/40 text-pink-600 dark:text-pink-300 text-xs font-semibold text-center hover:bg-pink-600 hover:text-white transition-all shadow-sm"
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;