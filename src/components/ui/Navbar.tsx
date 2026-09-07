import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // Define dropdown data structure with specific routes
  const dropdownData = {
    News: [
      { label: 'World News', href: '/news/world' },
      { label: 'Local News', href: '/news/local' },
      { label: 'Weather News', href: '/news/weather' },
      { label: 'Breaking News', href: '/news/breaking' },
      { label: 'News Archive', href: '/news/archive' },
    ],
    'World Clock': [
      { label: 'Popular Cities', href: '/world-clock/popular' },
      { label: 'My Locations', href: '/world-clock/my-locations' },
      { label: 'Add New City', href: '/world-clock/add-city' },
      { label: 'Time Converter', href: '/world-clock/converter' },
      { label: 'Meeting Planner', href: '/world-clock/planner' },
    ],
    'Time Zones': [
      { label: 'All Time Zones', href: '/time-zones/all' },
      { label: 'By Continent', href: '/time-zones/continent' },
      { label: 'By Country', href: '/time-zones/country' },
      { label: 'UTC Offsets', href: '/time-zones/offsets' },
      { label: 'Time Zone Converter', href: '/time-zones/converter' },
    ],
    Calendar: [
      { label: 'Monthly Calendar', href: '/calendar/monthly' },
      { label: 'Yearly Calendar', href: '/calendar/yearly' },
      { label: 'Holiday Calendar', href: '/calendar/holiday' },
      { label: 'Event Calendar', href: '/calendar/events' },
      { label: 'Custom Calendar', href: '/calendar/custom' },
    ],
    Weather: [
      { label: 'Current Weather', href: '/weather' },
      { label: 'Hourly Forecast', href: '/weather/hourly' },
      { label: '5-Day Forecast', href: '/weather/5day' },
      { label: '10-Day Forecast', href: '/weather/10day' },
      { label: 'Weather Maps', href: '/weather/maps' },
      { label: 'Severe Weather Alerts', href: '/weather/alerts' },
    ],
    Timers: [
      { label: 'Countdown Timer', href: '/timers/countdown' },
      { label: 'Stopwatch', href: '/timers/stopwatch' },
      { label: 'Alarm Clock', href: '/timers/alarm' },
      { label: 'Interval Timer', href: '/timers/interval' },
      { label: 'World Clock Timer', href: '/timers/clock' },
    ],
    Calculators: [
      { label: 'Standard Calculator', href: '/calculators/standard' },
      { label: 'Currency Converter', href: '/calculators/currency' },
      { label: 'Date Calculator', href: '/calculators/date' },
      { label: 'Time Calculator', href: '/calculators/time' },
      { label: 'Timezone Calculator', href: '/calculators/timezone' },
      { label: 'Duration Calculator', href: '/calculators/duration' },
      { label: 'Business Days Calculator', href: '/calculators/business' },
    ],
    'Sun, Moon & Space': [
      { label: 'Sunrise & Sunset', href: '/sun-moon-space/sunrise-sunset' },
      { label: 'Moon Phases', href: '/sun-moon-space/moon-phases' },
      { label: 'Solar Eclipse', href: '/sun-moon-space/solar-eclipse' },
      { label: 'Lunar Eclipse', href: '/sun-moon-space/lunar-eclipse' },
      { label: 'Planet Positions', href: '/sun-moon-space/planets' },
      { label: 'ISS Tracker', href: '/sun-moon-space/iss' },
      { label: 'NASA Picture of the Day', href: '/sun-moon-space/nasa-apod' },
    ],
  };

  // State for open dropdown (desktop)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // Close dropdown / mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
        setMobileSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
    setMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (menu: string) => {
    setMobileSubmenu(prev => (prev === menu ? null : menu));
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
  };

  const categoryKeys = Object.keys(dropdownData);

  return (
    <div ref={navbarRef}>
      <nav className="sticky top-0 z-40 bg-white/85 dark:bg-[#0a0f1e]/85 backdrop-blur-xl px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg relative transition-colors duration-300">
        {/* Animated background elements (clipped to nav bounds) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Desktop navigation items - hidden on mobile */}
        <div className="hidden lg:flex items-center gap-6 flex-1 relative z-10">
          {categoryKeys.map((category) => (
            <div
              key={category}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-blue-300 dark:hover:to-purple-300 dark:hover:bg-clip-text flex items-center whitespace-nowrap transition-all duration-300 font-medium text-sm">
                {category} <span className="ml-1 text-[10px] opacity-70">▼</span>
              </button>
              {openDropdown === category && (
                <div className="absolute left-0 top-full mt-2 min-w-[200px] z-50 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden py-1">
                  {dropdownData[category as keyof typeof dropdownData].map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-gradient-to-r dark:hover:from-blue-600/25 dark:hover:via-purple-600/25 dark:hover:to-pink-600/25 hover:text-purple-600 dark:hover:text-white transition-all duration-200 border-b border-slate-100 dark:border-white/5 last:border-b-0"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side: desktop auth buttons + theme switcher + hamburger */}
        <div className="flex items-center gap-3 ml-auto lg:ml-0 relative z-10">
          {/* Desktop auth buttons - hidden on mobile */}
          <div className="hidden lg:flex items-center gap-3">
            {!isAuthenticated ? (
              <button
                onClick={() => router.push('/login')}
                className="border border-blue-500/40 bg-blue-50/50 dark:bg-white/5 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent text-sm transition-all duration-300 font-medium shadow-sm"
              >
                Login
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push('/profile')}
                  className="border border-purple-500/40 bg-purple-50/50 dark:bg-white/5 text-purple-600 dark:text-purple-300 px-4 py-1.5 rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent text-sm transition-all duration-300 font-medium shadow-sm"
                >
                  Profile
                </button>
                <button
                  onClick={async () => {
                    await logout();
                    router.push('/');
                  }}
                  className="border border-pink-500/40 bg-pink-50/50 dark:bg-white/5 text-pink-600 dark:text-pink-300 px-4 py-1.5 rounded-xl hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 hover:text-white hover:border-transparent text-sm transition-all duration-300 font-medium shadow-sm"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <ThemeToggle />

          {/* Hamburger button - visible only on mobile */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 text-slate-800 dark:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 touch-target"
            aria-label="Toggle navigation menu"
          >
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden mobile-menu">
          <div className="bg-white/95 dark:bg-[#0a0f1e]/95 backdrop-blur-xl px-4 py-3 border-t border-slate-200 dark:border-white/10 shadow-2xl">
            {categoryKeys.map((category) => (
              <div key={category} className="border-b border-slate-100 dark:border-white/10 last:border-b-0">
                <button
                  onClick={() => toggleMobileSubmenu(category)}
                  className="w-full flex items-center justify-between px-2 py-3 text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-transparent dark:hover:bg-gradient-to-r dark:hover:from-blue-300 dark:hover:to-purple-300 dark:hover:bg-clip-text text-left transition-all font-medium text-sm"
                >
                  <span>{category}</span>
                  <span className={`transition-transform duration-200 text-xs opacity-70 ${mobileSubmenu === category ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {mobileSubmenu === category && (
                  <div className="pb-2 pl-4 bg-slate-50 dark:bg-white/[0.04] rounded-lg">
                    {dropdownData[category as keyof typeof dropdownData].map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={handleMobileLinkClick}
                        className="block px-2 py-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white rounded transition-all"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile auth buttons */}
            <div className="flex flex-col gap-2 pt-4 pb-2">
              {!isAuthenticated ? (
                <button
                  onClick={() => { router.push('/login'); handleMobileLinkClick(); }}
                  className="border border-blue-500/40 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm transition-all duration-300 text-center font-medium shadow-md"
                >
                  Login
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { router.push('/profile'); handleMobileLinkClick(); }}
                    className="border border-purple-500/40 bg-purple-600 text-white px-4 py-2.5 rounded-xl text-sm transition-all duration-300 text-center font-medium shadow-md"
                  >
                    Profile
                  </button>
                  <button
                    onClick={async () => {
                      await logout();
                      router.push('/');
                      handleMobileLinkClick();
                    }}
                    className="border border-pink-500/40 bg-pink-600 text-white px-4 py-2.5 rounded-xl text-sm transition-all duration-300 text-center font-medium shadow-md"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;