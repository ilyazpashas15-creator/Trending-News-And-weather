'use client';

import React, { useState, useEffect } from 'react';
import { getAllTimeZones, formatTimeForTimezone } from '@/utils/timezones';

interface TimeZoneData {
  name: string;
  time: string;
  date: string;
  offset: string;
  country: string;
}

// Function to extract country from timezone name
const getCountryFromTimezone = (timezone: string): string => {
  const parts = timezone.split('/');
  if (parts.length > 1) {
    const countryMap: Record<string, string> = {
      'New_York': 'USA', 'Los_Angeles': 'USA', 'Chicago': 'USA', 'Houston': 'USA', 'Phoenix': 'USA',
      'London': 'UK', 'Birmingham': 'UK', 'Manchester': 'UK', 'Glasgow': 'UK', 'Liverpool': 'UK',
      'Paris': 'France', 'Marseille': 'France', 'Lyon': 'France', 'Toulouse': 'France',
      'Berlin': 'Germany', 'Hamburg': 'Germany', 'Munich': 'Germany', 'Cologne': 'Germany',
      'Tokyo': 'Japan', 'Osaka': 'Japan', 'Nagoya': 'Japan', 'Sapporo': 'Japan',
      'Sydney': 'Australia', 'Melbourne': 'Australia', 'Brisbane': 'Australia', 'Perth': 'Australia',
      'Moscow': 'Russia', 'Saint_Petersburg': 'Russia', 'Novosibirsk': 'Russia',
      'Beijing': 'China', 'Shanghai': 'China', 'Guangzhou': 'China', 'Shenzhen': 'China',
      'Madrid': 'Spain', 'Barcelona': 'Spain', 'Valencia': 'Spain', 'Seville': 'Spain',
      'Rome': 'Italy', 'Milan': 'Italy', 'Naples': 'Italy', 'Turin': 'Italy',
      'Amsterdam': 'Netherlands', 'Rotterdam': 'Netherlands', 'The_Hague': 'Netherlands',
      'Stockholm': 'Sweden', 'Gothenburg': 'Sweden', 'Malmo': 'Sweden',
      'Oslo': 'Norway', 'Bergen': 'Norway', 'Trondheim': 'Norway',
      'Copenhagen': 'Denmark', 'Aarhus': 'Denmark', 'Odense': 'Denmark',
      'Warsaw': 'Poland', 'Krakow': 'Poland', 'Lodz': 'Poland',
      'Vienna': 'Austria', 'Graz': 'Austria', 'Linz': 'Austria',
      'Mumbai': 'India', 'Delhi': 'India', 'Kolkata': 'India', 'Chennai': 'India',
      'Toronto': 'Canada', 'Montreal': 'Canada', 'Vancouver': 'Canada',
      'Mexico_City': 'Mexico', 'Guadalajara': 'Mexico', 'Monterrey': 'Mexico',
      'Sao_Paulo': 'Brazil', 'Rio_de_Janeiro': 'Brazil', 'Brasilia': 'Brazil',
      'Buenos_Aires': 'Argentina', 'Cordoba': 'Argentina', 'Rosario': 'Argentina',
      'Cairo': 'Egypt', 'Alexandria': 'Egypt', 'Giza': 'Egypt',
      'Lagos': 'Nigeria', 'Kano': 'Nigeria', 'Ibadan': 'Nigeria',
      'Johannesburg': 'South Africa', 'Cape_Town': 'South Africa', 'Durban': 'South Africa',
      'Seoul': 'South Korea', 'Busan': 'South Korea', 'Incheon': 'South Korea',
      'Bangkok': 'Thailand', 'Chiang_Mai': 'Thailand', 'Phuket': 'Thailand',
      'Singapore': 'Singapore', 'Dubai': 'UAE', 'Abu_Dhabi': 'UAE',
      'Istanbul': 'Turkey', 'Ankara': 'Turkey', 'Izmir': 'Turkey',
      'Athens': 'Greece', 'Thessaloniki': 'Greece', 'Patras': 'Greece',
      'Lisbon': 'Portugal', 'Porto': 'Portugal', 'Braga': 'Portugal',
      'Brussels': 'Belgium', 'Antwerp': 'Belgium', 'Ghent': 'Belgium',
      'Zurich': 'Switzerland', 'Geneva': 'Switzerland', 'Basel': 'Switzerland',
      'Dublin': 'Ireland', 'Cork': 'Ireland', 'Limerick': 'Ireland',
      'Helsinki': 'Finland', 'Espoo': 'Finland', 'Tampere': 'Finland',
      'Prague': 'Czech Republic', 'Brno': 'Czech Republic', 'Ostrava': 'Czech Republic',
      'Budapest': 'Hungary', 'Debrecen': 'Hungary', 'Szeged': 'Hungary',
      'Bucharest': 'Romania', 'Cluj-Napoca': 'Romania', 'Timisoara': 'Romania'
    };
    const location = parts[1];
    return countryMap[location] || parts[0];
  }
  return parts[0];
};

export default function TimeZonesCountryPage() {
  const [timeZones, setTimeZones] = useState<TimeZoneData[]>([]);
  const [filteredTimeZones, setFilteredTimeZones] = useState<TimeZoneData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [sortField, setSortField] = useState<'name' | 'offset' | 'time'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTimeZones = () => {
      const zones = getAllTimeZones();
      const timeZoneData: TimeZoneData[] = zones.map(zone => {
        const { time, date, offset } = formatTimeForTimezone(zone);
        return {
          name: zone,
          time,
          date,
          offset,
          country: getCountryFromTimezone(zone)
        };
      });
      
      setTimeZones(timeZoneData);
      setFilteredTimeZones(timeZoneData);
      
      const uniqueCountries = Array.from(new Set(timeZoneData.map(tz => tz.country))).sort();
      setCountries(['All', ...uniqueCountries]);
      setIsLoading(false);
    };

    fetchTimeZones();
    const interval = setInterval(fetchTimeZones, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let result = timeZones;
    
    if (selectedCountry !== 'All') {
      result = result.filter(tz => tz.country === selectedCountry);
    }
    
    if (searchTerm) {
      result = result.filter(tz => 
        tz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tz.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tz.date.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    result = [...result].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];
      
      if (sortField === 'offset') {
        const aOffset = parseFloat(aValue.replace('UTC', '').replace(':', '.').replace('+', '').replace('-', '-'));
        const bOffset = parseFloat(bValue.replace('UTC', '').replace(':', '.').replace('+', '').replace('-', '-'));
        aValue = aOffset;
        bValue = bOffset;
      }
      
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
  }, [searchTerm, selectedCountry, sortField, sortDirection, timeZones]);

  const handleSort = (field: 'name' | 'offset' | 'time') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
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
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">
            Time Zones by Country
          </h1>
        </div>
        <p className="mb-6 text-center text-gray-300 text-lg">View time zones organized by country</p>
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
          Time Zones by Country
        </h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">View time zones organized by country</p>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country-select" className="block text-sm font-bold text-white mb-2">
            Filter by Country:
          </label>
          <select
            id="country-select"
            className="w-full p-3 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="search-input" className="block text-sm font-bold text-white mb-2">
            Search Time Zones:
          </label>
          <input
            type="text"
            id="search-input"
            placeholder="Search by region, country, or city..."
            className="w-full p-3 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
              <th 
                scope="col" 
                className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
              >
                Country
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {tz.country}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                  No time zones found matching your filters.
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
