'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchSuggestion {
    title: string;
    path: string;
    keywords: string[];
}

const SiteHeader = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const allPages: SearchSuggestion[] = [
        { title: 'Weather Forecast', path: '/weather', keywords: ['weather', 'forecast', 'temperature', 'rain', 'sun'] },
        { title: '5 Day Forecast', path: '/weather/5day', keywords: ['5 day', 'forecast', 'weather', 'week'] },
        { title: '10 Day Forecast', path: '/weather/10day', keywords: ['10 day', 'forecast', 'weather'] },
        { title: 'Hourly Weather', path: '/weather/hourly', keywords: ['hourly', 'weather', 'hour'] },
        { title: 'Weather Alerts', path: '/weather/alerts', keywords: ['alerts', 'warning', 'weather'] },
        { title: 'Weather Maps', path: '/weather/maps', keywords: ['maps', 'weather', 'radar'] },
        { title: 'Breaking News', path: '/news/breaking', keywords: ['news', 'breaking', 'latest'] },
        { title: 'World News', path: '/news/world', keywords: ['world', 'news', 'international'] },
        { title: 'Local News', path: '/news/local', keywords: ['local', 'news', 'nearby'] },
        { title: 'Weather News', path: '/news/weather', keywords: ['weather', 'news'] },
        { title: 'News Archive', path: '/news/archive', keywords: ['archive', 'news', 'old'] },
        { title: 'World Clock', path: '/world-clock/converter', keywords: ['world', 'clock', 'time', 'converter'] },
        { title: 'Time Zone Converter', path: '/time-zones/converter', keywords: ['timezone', 'converter', 'time'] },
        { title: 'All Time Zones', path: '/time-zones/all', keywords: ['timezone', 'all', 'list'] },
        { title: 'Monthly Calendar', path: '/calendar/monthly', keywords: ['calendar', 'month', 'monthly'] },
        { title: 'Yearly Calendar', path: '/calendar/yearly', keywords: ['calendar', 'year', 'yearly'] },
        { title: 'Holiday Calendar', path: '/calendar/holiday', keywords: ['holiday', 'calendar', 'vacation'] },
        { title: 'Standard Calculator', path: '/calculators/standard', keywords: ['calculator', 'math', 'calculate'] },
        { title: 'Date Calculator', path: '/calculators/date', keywords: ['date', 'calculator', 'days'] },
        { title: 'Time Calculator', path: '/calculators/time', keywords: ['time', 'calculator', 'hours'] },
        { title: 'Currency Calculator', path: '/calculators/currency', keywords: ['currency', 'money', 'exchange'] },
        { title: 'Stopwatch', path: '/timers/stopwatch', keywords: ['stopwatch', 'timer', 'stop'] },
        { title: 'Countdown Timer', path: '/timers/countdown', keywords: ['countdown', 'timer', 'count'] },
        { title: 'Alarm Clock', path: '/timers/alarm', keywords: ['alarm', 'clock', 'wake'] },
        { title: 'Clock', path: '/timers/clock', keywords: ['clock', 'time', 'current'] },
        { title: 'NASA Picture of the Day', path: '/sun-moon-space/nasa-apod', keywords: ['nasa', 'space', 'picture', 'astronomy'] },
        { title: 'Moon Phases', path: '/sun-moon-space/moon-phases', keywords: ['moon', 'phases', 'lunar'] },
        { title: 'Sunrise & Sunset', path: '/sun-moon-space/sunrise-sunset', keywords: ['sunrise', 'sunset', 'sun'] },
        { title: 'ISS Tracker', path: '/sun-moon-space/iss', keywords: ['iss', 'space', 'station', 'tracker'] },
        { title: 'Planets', path: '/sun-moon-space/planets', keywords: ['planets', 'solar', 'system'] },
    ];

    const handleSearch = (path?: string) => {
        if (path) {
            router.push(path);
            setSearchQuery('');
            setShowSuggestions(false);
            return;
        }

        if (!searchQuery.trim()) {
            setShowSuggestions(true);
            setFilteredSuggestions(allPages.slice(0, 8));
            return;
        }
        
        const query = searchQuery.toLowerCase().trim();
        const matches = allPages.filter(page => 
            page.keywords.some(keyword => keyword.includes(query)) ||
            page.title.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
            router.push(matches[0].path);
            setSearchQuery('');
            setShowSuggestions(false);
        } else {
            alert(`No results found for "${searchQuery}"\n\nTry: weather, news, time, calendar, calculator, timer, space`);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim().length > 0) {
            const query = value.toLowerCase().trim();
            const matches = allPages.filter(page => 
                page.keywords.some(keyword => keyword.includes(query)) ||
                page.title.toLowerCase().includes(query)
            );
            setFilteredSuggestions(matches.slice(0, 8));
            setShowSuggestions(true);
        } else {
            setFilteredSuggestions(allPages.slice(0, 8));
            setShowSuggestions(false);
        }
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleSearch();
    };

    const handleInputFocus = () => {
        setFilteredSuggestions(allPages.slice(0, 8));
        setShowSuggestions(true);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
                inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="bg-[#0d1526]/80 backdrop-blur-xl border-b border-purple-500/20 py-8 px-4 sm:px-6 shadow-2xl relative z-20">
            {/* Animated background elements (clipped to header bounds) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl hero-glow"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl hero-glow" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 relative z-10">
                {/* Logo Section with Enhanced Design */}
                <div className="flex items-center">
                    <div className="flex items-center gap-3">
                        {/* Enhanced Logo Icon */}
                        <div className="relative w-14 h-14 group">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            {/* Rotating ring */}
                            <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full animate-spin"></div>
                            {/* Main circle with gradient */}
                            <div className="absolute inset-2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-lg"></div>
                            <div className="absolute inset-4 bg-white dark:bg-slate-900 rounded-full"></div>
                            {/* Clock hands with glow */}
                            <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 origin-left rotate-45 shadow-lg shadow-blue-500/50"></div>
                            <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 -translate-y-1/2 origin-left -rotate-90 shadow-lg shadow-purple-500/50"></div>
                        </div>
                        
                        {/* Enhanced Title with Gradient and Effects */}
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display relative">
                            <span className="text-gradient-soft drop-shadow-lg">
                                My Weather
                            </span>
                            {' '}
                            <span className="relative inline-block">
                                <span className="text-gradient animate-gradient-x drop-shadow-lg">
                                    And News
                                </span>
                                {/* Animated underline */}
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse"></span>
                            </span>
                        </h1>
                    </div>
                </div>

                {/* Enhanced Search Section with Modern Design */}
                <div className="w-full max-w-md relative group">
                    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex w-full relative" role="search">
                        {/* Glowing border effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                        
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSearch();
                                }
                            }}
                            placeholder="Search for weather, news, tools..."
                            className="relative flex-grow px-5 py-3 text-sm glass-input border border-white/20 rounded-l-full focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-300 transition-all duration-300"
                            aria-label="Search site"
                        />
                        <button 
                            type="button"
                            onClick={handleButtonClick}
                            className="relative px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white rounded-r-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
                            aria-label="Search button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>

                    {/* Enhanced Search Suggestions Dropdown */}
                    {showSuggestions && filteredSuggestions.length > 0 && (
                        <div 
                            ref={dropdownRef}
                            className="absolute top-full mt-3 w-full glass-card-dark rounded-2xl shadow-2xl max-h-96 overflow-hidden z-50"
                        >
                            <div className="overflow-y-auto max-h-96 custom-scrollbar">
                                {filteredSuggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearch(suggestion.path)}
                                        className="w-full text-left px-5 py-3 hover:bg-gradient-to-r hover:from-blue-600/20 hover:via-purple-600/20 hover:to-pink-600/20 transition-all duration-200 border-b border-white/10 last:border-b-0 group"
                                    >
                                        <div className="font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text transition-all">
                                            {suggestion.title}
                                        </div>
                                        <div className="text-xs text-slate-400 group-hover:text-slate-300 mt-1">{suggestion.path}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SiteHeader;
