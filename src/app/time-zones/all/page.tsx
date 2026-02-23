'use client';

import React, { useState, useEffect } from 'react';
import { getAllTimeZones, formatTimeForTimezone } from '@/utils/timezones';

interface TimeZoneData {
  name: string;
  time: string;
  date: string;
  offset: string;
}

export default function TimeZonesAllPage() {
  const [timeZones, setTimeZones] = useState<TimeZoneData[]>([]);
  const [filteredTimeZones, setFilteredTimeZones] = useState<TimeZoneData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'offset' | 'time'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize time zone data
  useEffect(() => {
    const fetchTimeZones = () => {
      const zones = getAllTimeZones();
      const timeZoneData: TimeZoneData[] = zones.map(zone => {
        const { time, date, offset } = formatTimeForTimezone(zone);
        return {
          name: zone,
          time,
          date,
          offset
        };
      });
      
      setTimeZones(timeZoneData);
      setFilteredTimeZones(timeZoneData);
      setIsLoading(false);
    };

    fetchTimeZones();

    // Update times every minute
    const interval = setInterval(fetchTimeZones, 60000);

    return () => clearInterval(interval);
  }, []);

  // Apply search filter
  useEffect(() => {
    let result = timeZones;
    
    if (searchTerm) {
      result = timeZones.filter(tz => 
        tz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tz.date.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];
      
      // For offset sorting, we need special handling to sort by numeric value
      if (sortField === 'offset') {
        // Extract numeric value from offset (e.g., from "UTC+05:30" get 5.5)
        const aOffset = parseFloat(aValue.replace('UTC', '').replace(':', '.').replace('+', '').replace('-', '-'));
        const bOffset = parseFloat(bValue.replace('UTC', '').replace(':', '.').replace('+', '').replace('-', '-'));
        aValue = aOffset;
        bValue = bOffset;
      }
      
      // For time sorting, convert to comparable value
      if (sortField === 'time') {
        // Convert time to 24-hour format for comparison
        const aTime = new Date(`1970-01-01 ${aValue}`).getTime();
        const bTime = new Date(`1970-01-01 ${bValue}`).getTime();
        return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }
      
      // Default string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      // Default numeric comparison
      return sortDirection === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });
    
    setFilteredTimeZones(result);
  }, [searchTerm, sortField, sortDirection, timeZones]);

  const handleSort = (field: 'name' | 'offset' | 'time') => {
    if (sortField === field) {
      // Toggle sort direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (field: 'name' | 'offset' | 'time') => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">
            All Time Zones
          </h1>
        </div>
        <p className="mb-4 text-center text-gray-300">View all time zones around the world.</p>
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">
          All Time Zones
        </h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">
        View all time zones around the world with their current times
      </p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search time zones by region, country, or city..."
          className="w-full md:w-1/2 mx-auto block p-3 border-2 border-blue-400 rounded-lg bg-[#1a2942] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border-2 border-blue-400 shadow-lg bg-[#1a2942]">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#0d1929]">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-[#2a3f5f] transition"
                onClick={() => handleSort('name')}
              >
                Timezone Name {getSortIndicator('name')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-[#2a3f5f] transition"
                onClick={() => handleSort('time')}
              >
                Current Time {getSortIndicator('time')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-[#2a3f5f] transition"
                onClick={() => handleSort('name')}
              >
                Current Date {getSortIndicator('name')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-[#2a3f5f] transition"
                onClick={() => handleSort('offset')}
              >
                UTC Offset {getSortIndicator('offset')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredTimeZones.length > 0 ? (
              filteredTimeZones.map((tz, index) => (
                <tr 
                  key={index} 
                  className={`${index % 2 === 0 ? 'bg-[#1a2942]' : 'bg-[#0d1929]'} hover:bg-[#2a3f5f] transition`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    {tz.name.split('/').pop()?.replace(/_/g, ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-medium">
                    {tz.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {tz.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-medium">
                    {tz.offset}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">
                  No time zones found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-400 text-center">
        Showing <span className="text-blue-400 font-semibold">{filteredTimeZones.length}</span> of <span className="text-blue-400 font-semibold">{timeZones.length}</span> time zones
      </div>
    </div>
  );
}