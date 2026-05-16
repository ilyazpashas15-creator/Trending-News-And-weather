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
        <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-6 px-4 sm:px-6 shadow-sm relative z-20">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
                {/* Logo Section */}
                <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        {/* Logo Icon representation */}
                        <div className="w-10 h-10 relative">
                            <div className="absolute inset-0 border-4 border-blue-400 rounded-full border-t-transparent animate-spin-slow"></div>
                            <div className="absolute inset-2 bg-blue-600 rounded-full"></div>
                            <div className="absolute inset-4 bg-white rounded-full"></div>
                            {/* Clock hands */}
                            <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-slate-800 -translate-y-1/2 origin-left rotate-45"></div>
                            <div className="absolute top-1/2 left-1/2 w-2 h-0.5 bg-slate-800 -translate-y-1/2 origin-left -rotate-90"></div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-700 dark:text-white font-sans">
                            My Weather <span className="text-blue-600">And News</span>
                        </h1>
                    </div>
                </div>

                {/* Header Search Section - centered and smaller */}
                <div className="w-full max-w-md relative">
                    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex w-full" role="search">
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
                            placeholder="Search site..."
                            className="flex-grow px-3 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            aria-label="Search site"
                        />
                        <button 
                            type="button"
                            onClick={handleButtonClick}
                            className="px-4 py-1.5 bg-[#2C3E50] text-white rounded-r-full hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Search button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>

                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && filteredSuggestions.length > 0 && (
                        <div 
                            ref={dropdownRef}
                            className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50"
                        >
                            {filteredSuggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSearch(suggestion.path)}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border-b border-gray-200 dark:border-slate-600 last:border-b-0"
                                >
                                    <div className="font-medium text-slate-700 dark:text-white">{suggestion.title}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{suggestion.path}</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SiteHeader;
