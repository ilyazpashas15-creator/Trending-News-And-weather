'use client';

import React, { useState, useEffect } from 'react';
import { getAllTimeZones, formatTimeForTimezone } from '@/utils/timezones';

interface TimeZoneData {
  name: string;
  time: string;
  date: string;
  offset: string;
  offsetValue: number;
}

export default function TimeZonesOffsetsPage() {
  const [timeZones, setTimeZones] = useState<TimeZoneData[]>([]);
  const [filteredTimeZones, setFilteredTimeZones] = useState<TimeZoneData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'offset' | 'time' | 'offsetValue'>('offsetValue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTimeZones = () => {
      const zones = getAllTimeZones();
      const timeZoneData: TimeZoneData[] = zones.map(zone => {
        const { time, date, offset } = formatTimeForTimezone(zone);
        
        const offsetStr = offset.replace('UTC', '');
        const isNegative = offsetStr.startsWith('-');
        const offsetParts = offsetStr.replace('+', '').replace('-', '').split(':');
        const offsetValue = isNegative 
          ? -(parseInt(offsetParts[0]) + (offsetParts[1] ? parseInt(offsetParts[1]) / 60 : 0))
          : parseInt(offsetParts[0]) + (offsetParts[1] ? parseInt(offsetParts[1]) / 60 : 0);
        
        return {
          name: zone,
          time,
          date,
          offset,
          offsetValue
        };
      });
      
      setTimeZones(timeZoneData);
      setFilteredTimeZones(timeZoneData);
      setIsLoading(false);
    };

    fetchTimeZones();
    const interval = setInterval(fetchTimeZones, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let result = timeZones;
    
    if (searchTerm) {
      result = timeZones.filter(tz => 
        tz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tz.offset.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tz.date.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    result = [...result].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];
      
      if (sortField === 'time') {
        const aTime = new Date(`1970-01-01 ${aValue}`).getTime();
        const bTime = new Date(`1970-01-01 ${bValue}`).getTime();
        return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      return sortDirection === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });
    
    setFilteredTimeZones(result);
  }, [searchTerm, sortField, sortDirection, timeZones]);

  const handleSort = (field: 'name' | 'offset' | 'time' | 'offsetValue') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (field: 'name' | 'offset' | 'time' | 'offsetValue') => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">
            UTC Offsets
          </h1>
        </div>
        <p className="mb-6 text-center text-gray-300 text-lg">View time zones with their UTC offsets</p>
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
          UTC Offsets
        </h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">View time zones with their UTC offsets</p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by offset, region, or date..."
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
                onClick={() => handleSort('offsetValue')}
              >
                UTC Offset {getSortIndicator('offsetValue')}
              </th>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredTimeZones.length > 0 ? (
              filteredTimeZones.map((tz, index) => (
                <tr 
                  key={index} 
                  className={`${index % 2 === 0 ? 'bg-[#1a2942]' : 'bg-[#0d1929]'} hover:bg-[#2a3f5f] transition`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-400">
                    {tz.offset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    {tz.name.split('/').pop()?.replace(/_/g, ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-medium">
                    {tz.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {tz.date}
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
