'use client';

import React, { useState, useMemo } from 'react';
import { City, POPULAR_CITIES } from '../../utils/cityDatabase';
import { fuzzySearchCities } from '../../services/timezoneService';

interface Participant {
  id: string;
  name: string;
  timezone: string;
  cityId: string;
  workStart: number;
  workEnd: number;
}

interface ParticipantFormProps {
  participant?: Participant;
  onSave: (participant: Omit<Participant, 'id'>) => void;
  onRemove?: (id: string) => void;
  isNew?: boolean;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function ParticipantForm({
  participant,
  onSave,
  onRemove,
  isNew = false,
}: ParticipantFormProps) {
  const [name, setName] = useState(participant?.name || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [workStart, setWorkStart] = useState(participant?.workStart || 9);
  const [workEnd, setWorkEnd] = useState(participant?.workEnd || 17);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const searchedCities = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return fuzzySearchCities(searchQuery, 10);
  }, [searchQuery]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!selectedCity && !participant?.cityId) {
      newErrors.city = 'Please select a city/timezone';
    }
    
    if (workStart === workEnd) {
      newErrors.hours = 'Start and end times cannot be the same';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    
    const city = selectedCity || (participant?.cityId 
      ? POPULAR_CITIES.find(c => c.id === participant.cityId) 
      : null);
    
    if (!city) return;
    
    onSave({
      name: name.trim(),
      timezone: city.timezone,
      cityId: city.id,
      workStart,
      workEnd,
    });
    
    if (isNew) {
      setName('');
      setSearchQuery('');
      setSelectedCity(null);
      setWorkStart(9);
      setWorkEnd(17);
    }
  };

  const formatHour = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${period}`;
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setSearchQuery(city.name);
    setShowCityDropdown(false);
    setErrors(prev => ({ ...prev, city: '' }));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Participant Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors(prev => ({ ...prev, name: '' }));
            }}
            placeholder="Enter name..."
            className={`w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
              errors.name 
                ? 'border-rose-500/50 focus:ring-rose-500/50' 
                : 'border-slate-600/50 focus:ring-teal-500/50 focus:border-teal-500/50'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
          )}
        </div>

        {/* City/Timezone Search */}
        <div className="relative">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            City / Timezone
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowCityDropdown(true);
                setErrors(prev => ({ ...prev, city: '' }));
              }}
              onFocus={() => setShowCityDropdown(true)}
              placeholder="Search for a city..."
              className={`w-full px-4 py-3 pl-11 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                errors.city 
                  ? 'border-rose-500/50 focus:ring-rose-500/50' 
                  : 'border-slate-600/50 focus:ring-teal-500/50 focus:border-teal-500/50'
              }`}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          {errors.city && (
            <p className="mt-1 text-xs text-rose-400">{errors.city}</p>
          )}

          {/* Dropdown Results */}
          {showCityDropdown && searchQuery.length >= 2 && (
            <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-600/50 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
              {searchedCities.length > 0 ? (
                searchedCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors border-b border-slate-700/30 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-medium">{city.name}</span>
                        <span className="text-slate-400 text-sm ml-2">{city.country}</span>
                      </div>
                      <span className="text-xs text-slate-500">{city.timezone}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-slate-400 text-sm">
                  No cities found. Try a different search.
                </div>
              )}
            </div>
          )}

          {/* Selected City Display */}
          {selectedCity && (
            <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-teal-500/10 border border-teal-500/30 rounded-lg">
              <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-teal-300">
                {selectedCity.name}, {selectedCity.country} ({selectedCity.timezone})
              </span>
            </div>
          )}
        </div>

        {/* Working Hours */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Working Hours
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Start</label>
              <select
                value={workStart}
                onChange={(e) => setWorkStart(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                {HOURS.map((hour) => (
                  <option key={hour} value={hour}>
                    {formatHour(hour)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">End</label>
              <select
                value={workEnd}
                onChange={(e) => setWorkEnd(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                {HOURS.map((hour) => (
                  <option key={hour} value={hour}>
                    {formatHour(hour)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errors.hours && (
            <p className="mt-1 text-xs text-rose-400">{errors.hours}</p>
          )}
          <p className="mt-1 text-xs text-slate-400">
            {formatHour(workStart)} - {formatHour(workEnd)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isNew ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              )}
            </svg>
            {isNew ? 'Add Participant' : 'Save Changes'}
          </button>
          
          {!isNew && onRemove && participant && (
            <button
              onClick={() => onRemove(participant.id)}
              className="px-4 py-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 font-medium rounded-xl transition-all duration-200 flex items-center justify-center"
              aria-label="Remove participant"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
