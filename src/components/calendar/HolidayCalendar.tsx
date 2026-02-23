'use client';

import { useState, useMemo } from 'react';
import { holidays2026, getCountries, holidayColors, holidayIcons, type Holiday } from '@/data/holidaysData';

export default function HolidayCalendar() {
  const [currentYear] = useState(2026);
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Get unique countries for filtering
  const countries = useMemo(() => {
    return ['All', ...getCountries()];
  }, []);

  // Holiday types
  const types = ['All', 'national', 'religious', 'festival', 'observance'];

  // Filter holidays based on selected country and type
  const filteredHolidays = useMemo(() => {
    let filtered = holidays2026;
    
    if (selectedCountry !== 'All') {
      filtered = filtered.filter(holiday => holiday.country === selectedCountry);
    }
    
    if (selectedType !== 'All') {
      filtered = filtered.filter(holiday => holiday.type === selectedType);
    }
    
    return filtered.sort((a, b) => a.date.localeCompare(b.date));
  }, [selectedCountry, selectedType]);

  // Group holidays by month
  const holidaysByMonth = useMemo(() => {
    const grouped: { [key: string]: Holiday[] } = {};
    
    filteredHolidays.forEach(holiday => {
      const month = new Date(holiday.date).toLocaleDateString('en-US', { month: 'long' });
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(holiday);
    });
    
    return grouped;
  }, [filteredHolidays]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-4xl font-bold text-white border-2 border-blue-300 p-4 rounded-lg">
          Holiday Calendar {currentYear}
        </h1>
      </div>
      <p className="text-gray-300 mb-8 text-center text-lg">
        Comprehensive list of holidays, festivals, and observances from around the world
      </p>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Country filter */}
        <div>
          <label htmlFor="country-filter" className="block text-lg font-medium mb-2 text-gray-300">
            Filter by Country/Region
          </label>
          <select
            id="country-filter"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg bg-[#1a2942] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Type filter */}
        <div>
          <label htmlFor="type-filter" className="block text-lg font-medium mb-2 text-gray-300">
            Filter by Type
          </label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg bg-[#1a2942] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1a2942] border-2 border-red-400 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🎌</div>
          <div className="text-2xl font-bold text-white">
            {holidays2026.filter(h => h.type === 'national').length}
          </div>
          <div className="text-sm text-gray-300">National</div>
        </div>
        <div className="bg-[#1a2942] border-2 border-purple-400 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🕉️</div>
          <div className="text-2xl font-bold text-white">
            {holidays2026.filter(h => h.type === 'religious').length}
          </div>
          <div className="text-sm text-gray-300">Religious</div>
        </div>
        <div className="bg-[#1a2942] border-2 border-blue-400 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🎉</div>
          <div className="text-2xl font-bold text-white">
            {holidays2026.filter(h => h.type === 'festival').length}
          </div>
          <div className="text-sm text-gray-300">Festivals</div>
        </div>
        <div className="bg-[#1a2942] border-2 border-blue-400 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-2xl font-bold text-white">
            {holidays2026.filter(h => h.type === 'observance').length}
          </div>
          <div className="text-sm text-gray-300">Observances</div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-center">
        <span className="text-lg text-gray-300">
          Showing <span className="font-bold text-blue-400">{filteredHolidays.length}</span> holidays
        </span>
      </div>

      {/* Holidays grouped by month */}
      <div className="space-y-8">
        {Object.entries(holidaysByMonth).map(([month, monthHolidays]) => (
          <div key={month} className="bg-[#1a2942] rounded-lg shadow-lg overflow-hidden border-2 border-blue-400">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">{month} {currentYear}</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0d1929] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Holiday Name</th>
                    <th className="px-6 py-4 text-left">Type</th>
                    <th className="px-6 py-4 text-left">Country/Region</th>
                  </tr>
                </thead>
                <tbody>
                  {monthHolidays.map((holiday, index) => (
                    <tr
                      key={index}
                      className={`
                        border-b border-gray-700 hover:bg-[#2a3f5f] transition
                        ${index % 2 === 0 ? 'bg-[#1a2942]' : 'bg-[#0d1929]'}
                      `}
                    >
                      <td className="px-6 py-4 font-semibold text-blue-400">
                        {new Date(holiday.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-white">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{holidayIcons[holiday.type]}</span>
                          <div>
                            <div className="font-medium">{holiday.name}</div>
                            {holiday.description && (
                              <div className="text-sm text-gray-400">{holiday.description}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${holidayColors[holiday.type]}`}>
                          {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{holiday.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {filteredHolidays.length === 0 && (
        <div className="text-center py-12 bg-[#1a2942] rounded-lg border-2 border-blue-400">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-xl text-gray-300">No holidays found for the selected filters.</p>
          <p className="text-gray-400 mt-2">Try adjusting your filters to see more results.</p>
        </div>
      )}

      <div className="mt-8 p-6 bg-[#1a2942] border-2 border-blue-400 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-2">About This Calendar</h3>
        <p className="text-gray-300">
          This comprehensive holiday calendar includes national holidays, religious celebrations, 
          cultural festivals, and special observances from countries around the world including 
          India, USA, UK, Canada, Australia, France, Mexico, and more. Use the filters above to 
          find holidays specific to your region or type of celebration.
        </p>
      </div>
    </div>
  );
}
