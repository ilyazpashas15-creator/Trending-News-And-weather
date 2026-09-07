'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import NavbarSearch from './NavbarSearch';
import NavbarNotifications from './NavbarNotifications';
import NavbarBookmarks from './NavbarBookmarks';
import NavbarProfile from './NavbarProfile';
import ThemeToggle from './ThemeToggle';

interface NavItem {
  label: string;
  href: string;
  description: string;
  icon: string;
  badge?: string;
}

interface NavCategory {
  title: string;
  icon: string;
  items: NavItem[];
}

const NAV_CATEGORIES: Record<string, NavCategory> = {
  weather: {
    title: 'Weather',
    icon: '🌤️',
    items: [
      { label: 'Current Weather', href: '/weather', description: 'Live conditions, humidity & pressure', icon: '🌡️', badge: 'Live' },
      { label: '5-Day Forecast', href: '/weather/5day', description: 'Multi-day temperature trends', icon: '📅' },
      { label: 'Hourly Forecast', href: '/weather/hourly', description: '24-hour step-by-step radar', icon: '⏱️' },
      { label: 'Weather Maps', href: '/weather/maps', description: 'Interactive precipitation radar', icon: '🗺️' },
      { label: 'Severe Weather Alerts', href: '/weather/alerts', description: 'Storm, wind & heat advisories', icon: '⚡', badge: 'Alerts' },
    ],
  },
  news: {
    title: 'News',
    icon: '📰',
    items: [
      { label: 'Trending Feed', href: '/#news', description: 'Curated top global stories', icon: '🔥', badge: 'Hot' },
      { label: 'World News', href: '/news/world', description: 'International events & geopolitics', icon: '🌐' },
      { label: 'Local News', href: '/news/local', description: 'Headlines from your region', icon: '📍' },
      { label: 'Breaking News', href: '/news/breaking', description: 'Fast live wire dispatches', icon: '🚨', badge: 'Live' },
      { label: 'Weather News', href: '/news/weather', description: 'Climate & meteorological reports', icon: '🌪️' },
      { label: 'News Archive', href: '/news/archive', description: 'Search past reports & coverage', icon: '📁' },
    ],
  },
  worldClock: {
    title: 'World Clock',
    icon: '🌍',
    items: [
      { label: 'Popular Cities', href: '/world-clock/popular', description: 'Time across major capitals', icon: '🏙️' },
      { label: 'Time Converter', href: '/world-clock/converter', description: 'Compare hours between timezones', icon: '🔄', badge: 'Tool' },
      { label: 'Meeting Planner', href: '/world-clock/planner', description: 'Coordinate across continents', icon: '👥' },
      { label: 'All Time Zones', href: '/time-zones/all', description: 'UTC offsets & continent tables', icon: '⏱️' },
      { label: 'My Saved Cities', href: '/world-clock/my-locations', description: 'Personalized clock watchlist', icon: '⭐' },
    ],
  },
  tools: {
    title: 'Tools',
    icon: '⚡',
    items: [
      { label: 'Monthly Calendar', href: '/calendar/monthly', description: 'Interactive visual planner', icon: '🗓️' },
      { label: 'Yearly Calendar', href: '/calendar/yearly', description: 'Holidays & annual overview', icon: '📆' },
      { label: 'Countdown & Timers', href: '/timers/countdown', description: 'Stopwatch, alarms & clocks', icon: '⏳' },
      { label: 'Calculators', href: '/calculators/standard', description: 'Currency, dates, time & math', icon: '🧮' },
      { label: 'Sun & Moon Astronomy', href: '/sun-moon-space/sunrise-sunset', description: 'Sunrise, lunar phases & NASA APOD', icon: '🌙' },
    ],
  },
};

const Navbar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect scrolling to add elevated shadow
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const toggleMobileAccordion = (key: string) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileAccordion(null);
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#070b18]/95 backdrop-blur-2xl border-b border-slate-200/90 dark:border-white/10 shadow-md dark:shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(99,102,241,0.08)] py-2.5'
          : 'bg-white/90 dark:bg-[#070b18]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left Side: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group flex-shrink-0 focus:outline-none"
          aria-label="Home - My Weather and News"
        >
          {/* Animated Glowing Logo Icon */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin" />
            <div className="absolute inset-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-inner flex items-center justify-center">
              <span className="text-[13px] filter drop-shadow">🌤️</span>
            </div>
          </div>

          {/* Site Title */}
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight font-display text-slate-900 dark:text-white leading-tight flex items-center gap-1">
              <span>My Weather</span>
              <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text">
                & News
              </span>
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Dropdown Menus */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 relative z-10" aria-label="Main Navigation">
          {Object.entries(NAV_CATEGORIES).map(([key, category]) => {
            const isMenuOpen = openDropdown === key;
            return (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setOpenDropdown(isMenuOpen ? null : key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 ${
                    isMenuOpen
                      ? 'bg-purple-50 dark:bg-white/10 text-purple-600 dark:text-purple-300 shadow-sm'
                      : 'text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/5'
                  }`}
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="text-base">{category.icon}</span>
                  <span>{category.title}</span>
                  <svg
                    className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                      isMenuOpen ? 'rotate-180 text-purple-600 dark:text-purple-400' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu Flyout */}
                {isMenuOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 w-80 bg-white/95 dark:bg-[#0c1324]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    role="menu"
                  >
                    <div className="px-3 py-1.5 border-b border-slate-100 dark:border-white/10 mb-1 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        {category.title} Hub
                      </span>
                      <span className="text-xs">{category.icon}</span>
                    </div>

                    <div className="space-y-0.5">
                      {category.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-white/5 transition-all group"
                          role="menuitem"
                        >
                          <span className="text-xl p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 group-hover:scale-110 transition-transform flex-shrink-0">
                            {item.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
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
        </nav>

        {/* Center-Right: Search Input in Navbar */}
        <div className="hidden md:block flex-1 max-w-xs xl:max-w-sm ml-auto mr-2">
          <NavbarSearch />
        </div>

        {/* Right Actions: Notifications, Bookmarks, Profile, Dark Toggle, Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Notifications Popover */}
          <NavbarNotifications />

          {/* Bookmarks Popover */}
          <NavbarBookmarks />

          {/* User Profile Dropdown */}
          <NavbarProfile />

          {/* Dark Mode Switcher */}
          <div className="pl-1">
            <ThemeToggle />
          </div>

          {/* Hamburger Menu Button (Mobile & Tablet) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors touch-target flex flex-col items-center justify-center gap-1.5"
            aria-label="Open mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-200 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-[#070b18]/98 backdrop-blur-2xl px-4 py-5 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Mobile Search Bar */}
          <div className="mb-4">
            <NavbarSearch className="w-full" compact={false} />
          </div>

          {/* Mobile Categories Accordion */}
          <div className="space-y-1 divide-y divide-slate-100 dark:divide-white/5">
            {Object.entries(NAV_CATEGORIES).map(([key, category]) => {
              const isExpanded = mobileAccordion === key;
              return (
                <div key={key} className="pt-2">
                  <button
                    type="button"
                    onClick={() => toggleMobileAccordion(key)}
                    className="w-full flex items-center justify-between py-2.5 px-2 text-slate-800 dark:text-slate-100 font-bold text-sm hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.title}</span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-purple-600' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Accordion Sub-items */}
                  {isExpanded && (
                    <div className="pl-4 pr-2 pb-2 pt-1 space-y-1 bg-slate-50/80 dark:bg-white/[0.02] rounded-xl mb-2">
                      {category.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={handleMobileLinkClick}
                          className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span>{item.icon}</span>
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
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

          {/* Quick Footer Links inside Mobile Menu */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/#news"
              onClick={handleMobileLinkClick}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-center hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
            >
              🔖 Saved Reads
            </Link>
            <Link
              href="/weather/alerts"
              onClick={handleMobileLinkClick}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-center hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
            >
              ⚡ Weather Alerts
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;