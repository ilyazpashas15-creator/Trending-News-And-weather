'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SiteHeader = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const router = useRouter();

    // Define searchable pages with keywords
    const searchablePages = [
        { title: 'Home', path: '/', keywords: ['home', 'main', 'weather', 'news'] },
        { title: 'Weather - Current', path: '/weather', keywords: ['current', 'weather', 'now', 'today'] },
        { title: 'Weather - 5 Day Forecast', path: '/weather/5day', keywords: ['5 day', 'forecast', 'week', 'future'] },
        { title: 'Weather - 10 Day Forecast', path: '/weather/10day', keywords: ['10 day', 'forecast', 'extended'] },
        { title: 'Weather - Hourly', path: '/weather/hourly', keywords: ['hourly', 'hour', 'today'] },
        { title: 'Weather - Maps', path: '/weather/maps', keywords: ['maps', 'radar', 'satellite'] },
        { title: 'Weather - Alerts', path: '/weather/alerts', keywords: ['alerts', 'warnings', 'severe'] },
        { title: 'News - Breaking', path: '/news/breaking', keywords: ['breaking', 'news', 'latest'] },
        { title: 'News - Local', path: '/news/local', keywords: ['local', 'news', 'city'] },
        { title: 'News - World', path: '/news/world', keywords: ['world', 'international', 'global'] },
        { title: 'News - Weather News', path: '/news/weather', keywords: ['weather news', 'climate'] },
        { title: 'News - Archive', path: '/news/archive', keywords: ['archive', 'old', 'past'] },
        { title: 'Sun, Moon & Space', path: '/sun-moon-space', keywords: ['sun', 'moon', 'space', 'astronomy'] },
        { title: 'NASA Picture of the Day', path: '/sun-moon-space/nasa-apod', keywords: ['nasa', 'apod', 'picture', 'space'] },
        { title: 'Moon Phases', path: '/sun-moon-space/moon-phases', keywords: ['moon', 'phases', 'lunar'] },
        { title: 'Sunrise & Sunset', path: '/sun-moon-space/sunrise-sunset', keywords: ['sunrise', 'sunset', 'sun'] },
        { title: 'Solar Eclipse', path: '/sun-moon-space/solar-eclipse', keywords: ['solar', 'eclipse', 'sun'] },
        { title: 'Lunar Eclipse', path: '/sun-moon-space/lunar-eclipse', keywords: ['lunar', 'eclipse', 'moon'] },
        { title: 'ISS Tracker', path: '/sun-moon-space/iss', keywords: ['iss', 'space station', 'tracker'] },
        { title: 'Planets', path: '/sun-moon-space/planets', keywords: ['planets', 'solar system'] },
        { title: 'Time Zones - All', path: '/time-zones/all', keywords: ['time zones', 'all', 'world time'] },
        { title: 'Time Zones - By Continent', path: '/time-zones/continent', keywords: ['continent', 'time zones'] },
        { title: 'Time Zones - By Country', path: '/time-zones/country', keywords: ['country', 'time zones'] },
        { title: 'Time Zones - Offsets', path: '/time-zones/offsets', keywords: ['offsets', 'utc', 'gmt'] },
        { title: 'Time Zones - Meeting Times', path: '/time-zones/meeting-times', keywords: ['meeting', 'times', 'schedule'] },
        { title: 'Calendar - Monthly', path: '/calendar/monthly', keywords: ['calendar', 'monthly', 'month'] },
        { title: 'Calendar - Yearly', path: '/calendar/yearly', keywords: ['calendar', 'yearly', 'year'] },
        { title: 'Calendar - Holiday', path: '/calendar/holiday', keywords: ['holiday', 'calendar', 'festivals'] },
        { title: 'Calendar - Events', path: '/calendar/events', keywords: ['events', 'calendar'] },
        { title: 'Calendar - Custom', path: '/calendar/custom', keywords: ['custom', 'calendar'] },
        { title: 'Calculator - Standard', path: '/calculators/standard', keywords: ['calculator', 'standard', 'math'] },
        { title: 'Calculator - Time', path: '/calculators/time', keywords: ['time', 'calculator'] },
        { title: 'Calculator - Date', path: '/calculators/date', keywords: ['date', 'calculator'] },
        { title: 'Calculator - Duration', path: '/calculators/duration', keywords: ['duration', 'calculator'] },
        { title: 'Calculator - Business Days', path: '/calculators/business', keywords: ['business', 'days', 'calculator'] },
        { title: 'Calculator - Currency', path: '/calculators/currency', keywords: ['currency', 'exchange', 'money'] },
        { title: 'Calculator - Timezone', path: '/calculators/timezone', keywords: ['timezone', 'calculator'] },
        { title: 'About', path: '/about', keywords: ['about', 'info', 'information'] },
        { title: 'Contact', path: '/contact', keywords: ['contact', 'email', 'support'] },
        { title: 'Privacy Policy', path: '/privacy', keywords: ['privacy', 'policy', 'terms'] },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowResults(true);
        }
    };

    const filteredPages = searchablePages.filter(page => {
        const query = searchQuery.toLowerCase();
        return (
            page.title.toLowerCase().includes(query) ||
            page.keywords.some(keyword => keyword.toLowerCase().includes(query))
        );
    });

    const handlePageClick = (path: string) => {
        router.push(path);
        setSearchQuery('');
        setShowResults(false);
    };

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
                    <form onSubmit={handleSearch} className="flex w-full">
                        <input
                            type="search"
                            placeholder="Search site..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowResults(e.target.value.trim().length > 0);
                            }}
                            onFocus={() => searchQuery.trim() && setShowResults(true)}
                            className="flex-grow px-3 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        />
                        <button 
                            type="submit"
                            className="px-4 py-1.5 bg-[#2C3E50] text-white rounded-r-full hover:bg-slate-700 flex items-center justify-center transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>

                    {/* Search Results Dropdown */}
                    {showResults && searchQuery.trim() && (
                        <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                            {filteredPages.length > 0 ? (
                                <div className="py-2">
                                    {filteredPages.map((page, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageClick(page.path)}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 text-sm text-gray-800 dark:text-gray-200 transition-colors"
                                        >
                                            <div className="font-medium">{page.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{page.path}</div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                    No results found for "{searchQuery}"
                                </div>
                            )}
                        </div>
                    )}

                    {/* Click outside to close */}
                    {showResults && (
                        <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setShowResults(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SiteHeader;

