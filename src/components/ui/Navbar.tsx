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
      <nav className="nav-gradient px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Desktop navigation items - hidden on mobile */}
        <div className="hidden lg:flex items-center gap-6 flex-1">
          {categoryKeys.map((category) => (
            <div
              key={category}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-blue-200 flex items-center whitespace-nowrap">
                {category} ▼
              </button>
              {openDropdown === category && (
                <div className="dropdown-content absolute left-0 top-full mt-2 min-w-[180px] z-50">
                  {dropdownData[category as keyof typeof dropdownData].map((item, index) => (
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
          ))}
        </div>

        {/* Right side: desktop auth buttons + theme switcher + hamburger */}
        <div className="flex items-center gap-3 ml-auto lg:ml-0">
          {/* Desktop auth buttons - hidden on mobile */}
          <div className="hidden lg:flex items-center gap-3">
            {!isAuthenticated ? (
              <button
                onClick={() => router.push('/login')}
                className="border border-white text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition-colors"
              >
                Login
              </button>
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
          </div>

          <ThemeSwitcher />

          {/* Hamburger button - visible only on mobile */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5 text-white"
            aria-label="Toggle navigation menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden mobile-menu">
          <div className="nav-gradient px-4 py-2 border-t border-white/10">
            {categoryKeys.map((category) => (
              <div key={category} className="border-b border-white/10 last:border-b-0">
                <button
                  onClick={() => toggleMobileSubmenu(category)}
                  className="w-full flex items-center justify-between px-2 py-3 text-white hover:text-blue-200 text-left"
                >
                  <span className="font-medium">{category}</span>
                  <span className={`transition-transform duration-200 text-sm ${mobileSubmenu === category ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {mobileSubmenu === category && (
                  <div className="pb-2 pl-4">
                    {dropdownData[category as keyof typeof dropdownData].map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={handleMobileLinkClick}
                        className="block px-2 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile auth buttons */}
            <div className="flex flex-col gap-2 pt-3 pb-2">
              {!isAuthenticated ? (
                <button
                  onClick={() => { router.push('/login'); handleMobileLinkClick(); }}
                  className="border border-white text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition-colors text-center"
                >
                  Login
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { router.push('/profile'); handleMobileLinkClick(); }}
                    className="border border-white text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition-colors text-center"
                  >
                    Profile
                  </button>
                  <button
                    onClick={async () => {
                      await logout();
                      router.push('/');
                      handleMobileLinkClick();
                    }}
                    className="border border-white text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition-colors text-center"
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