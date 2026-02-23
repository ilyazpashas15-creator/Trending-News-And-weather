import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';
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

  // State for open dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing to allow moving to dropdown
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
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

  return (
    <div ref={navbarRef}>
      <style jsx>{`
      `}</style>
      <nav className="nav-gradient px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1">
          {/* News Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('News')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-blue-200 flex items-center">
              News ▼
            </button>
            {openDropdown === 'News' && (
              <div className="dropdown-content absolute left-0 top-full mt-2 min-w-[180px] z-50">
                {dropdownData.News.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="dropdown-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* World Clock Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('World Clock')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-blue-200 flex items-center">
              World Clock ▼
            </button>
            {openDropdown === 'World Clock' && (
              <div className="dropdown-content absolute left-0 top-full mt-2 min-w-[180px] z-50">
                {dropdownData['World Clock'].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="dropdown-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Time Zones Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('Time Zones')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-blue-200 flex items-center">
              Time Zones ▼
            </button>
            {openDropdown === 'Time Zones' && (
              <div className="dropdown-content absolute left-0 top-full mt-2 min-w-[180px] z-50">
                {dropdownData['Time Zones'].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="dropdown-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Calendar Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('Calendar')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-blue-200 flex items-center">
              Calendar ▼
            </button>
            {openDropdown === 'Calendar' && (
              <div className="dropdown-content absolute left-0 top-full mt-2 min-w-[180px] z-50">
                {dropdownData.Calendar.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="dropdown-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Weather Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('Weather')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-blue-200 flex items-center">
              Weather ▼
            </button>
            {openDropdown === 'Weather' && (
              <div className="dropdown-content absolute left-0 top-full mt-2 min-w-[180px] z-50">
                {dropdownData.Weather.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="dropdown-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Timers Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('Timers')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-blue-200 flex items-center">
              Timers ▼
            </button>
            {openDropdown === 'Timers' && (
              <div className="dropdown-content absolute left-0 top-full mt-2 min-w-[180px] z-50">
                {dropdownData.Timers.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="dropdown-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Calculators Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('Calculators')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-blue-200 flex items-center">
              Calculators ▼
            </button>
            {openDropdown === 'Calculators' && (
              <div className="dropdown-content absolute left-0 top-full mt-2 min-w-[180px] z-50">
                {dropdownData.Calculators.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="dropdown-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sun, Moon & Space Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('Sun, Moon & Space')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-blue-200 flex items-center">
              Sun, Moon & Space ▼
            </button>
            {openDropdown === 'Sun, Moon & Space' && (
              <div className="dropdown-content absolute left-0 top-full mt-2 min-w-[180px] z-50">
                {dropdownData['Sun, Moon & Space'].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="dropdown-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side of navigation */}
        <div className="flex items-center gap-3">

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <>
              <button 
                onClick={() => router.push('/login')}
                className="border border-white text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition-colors"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => router.push('/profile')}
                className="border border-white text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition-colors"
              >
                Profile
              </button>
              <button 
                onClick={async () => {
                  await logout();
                  router.push('/');
                }}
                className="border border-white text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition-colors"
              >
                Logout
              </button>
            </>
          )}

          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;