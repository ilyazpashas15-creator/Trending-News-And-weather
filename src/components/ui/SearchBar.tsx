'use client';

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!city || city.trim().length === 0) {
      setIsValid(false);
      return;
    }
    
    if (city.trim().length < 2) {
      setIsValid(false);
      return;
    }
    
    // Basic validation - check if it contains only letters, spaces, and common punctuation
    const validPattern = /^[a-zA-Z\s\-,\.']+$/;
    if (!validPattern.test(city.trim())) {
      setIsValid(false);
      return;
    }
    
    setIsValid(true);
    onSearch(city.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setIsValid(true); // Reset validation when user starts typing
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center" role="form">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Search for a city..."
        className={`w-full p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          !isValid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
        }`}
        aria-label="City search input"
        aria-invalid={!isValid}
      />
      <button
        type="submit"
        disabled={!isValid || city.trim().length === 0}
        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        aria-label="Search city button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
