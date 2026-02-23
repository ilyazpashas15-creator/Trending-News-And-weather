'use client';

import React, { useState, useEffect } from 'react';
import NewsCard from '../ui/NewsCard';
import { NewsArticle } from '@/types';
import { fetchTopHeadlines, fetchNewsByQuery, fetchNewsByQueryAndCategory } from '@/services/newsService';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import { citiesByState } from '@/data/citiesData';

interface NewsSectionProps {
  defaultCategory?: string;
  defaultCountry?: string;
  useWorldAPI?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ 
  defaultCategory = 'general', 
  defaultCountry = 'in',
  useWorldAPI = false
}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedCountry, setSelectedCountry] = useState<string>(defaultCountry);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'general', name: 'General' },
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
  ];

  const countries = [
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
    { code: 'de', name: 'Germany', flag: '🇩🇪' },
  ];

  // States/Regions for different countries
  const statesByCountry: { [key: string]: string[] } = {
    us: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    in: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep', 'Andaman and Nicobar Islands'],
    gb: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    ca: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'],
    au: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'],
    de: ['Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'],
  };

  useEffect(() => {
    loadNews();
  }, [selectedCategory, selectedCountry, selectedState, selectedCity, searchQuery]);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let newsData: NewsArticle[] = [];
      
      console.log('🔄 Loading news with filters:', {
        category: selectedCategory,
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        searchQuery: searchQuery
      });
      
      if (searchQuery.trim()) {
        // If there's a search query, fetch news based on the query with category
        console.log(`🔍 Using search query: "${searchQuery}" with category: ${selectedCategory}`);
        newsData = await fetchNewsByQueryAndCategory(searchQuery, selectedCategory);
      } else if (selectedCity) {
        // If a city is selected, try with category first
        const cityQuery = `${selectedCity} ${selectedState}`;
        console.log(`🏙️ Fetching city news: "${cityQuery}" with category: ${selectedCategory}`);
        newsData = await fetchNewsByQueryAndCategory(cityQuery, selectedCategory);
        
        // Fallback: If no results, try state-level with category
        if (newsData.length === 0 && selectedState) {
          console.log(`⚠️ No city results, trying state-level: ${selectedState}`);
          const stateQuery = `${selectedState} ${selectedCountry === 'us' ? 'USA' : selectedCountry === 'in' ? 'India' : ''}`;
          newsData = await fetchNewsByQueryAndCategory(stateQuery, selectedCategory);
        }
        
        // Fallback: If still no results, try country-level with category
        if (newsData.length === 0) {
          console.log(`⚠️ No state results, trying country-level: ${selectedCountry}`);
          newsData = await fetchTopHeadlines(selectedCategory, selectedCountry, 20, 1, useWorldAPI);
        }
      } else if (selectedState) {
        // If a state is selected, try with category first
        const stateQuery = `${selectedState} ${selectedCountry === 'us' ? 'USA' : selectedCountry === 'in' ? 'India' : ''}`;
        console.log(`📍 Fetching state news: "${stateQuery}" with category: ${selectedCategory}`);
        newsData = await fetchNewsByQueryAndCategory(stateQuery, selectedCategory);
        
        // Fallback: If no results, try country-level with category
        if (newsData.length === 0) {
          console.log(`⚠️ No state results, trying country-level: ${selectedCountry}`);
          newsData = await fetchTopHeadlines(selectedCategory, selectedCountry, 20, 1, useWorldAPI);
        }
      } else {
        // Otherwise, fetch top headlines by category and country
        console.log(`🌍 Fetching country headlines: ${selectedCountry} with category: ${selectedCategory}`);
        newsData = await fetchTopHeadlines(selectedCategory, selectedCountry, 20, 1, useWorldAPI);
      }
      
      console.log(`📊 Received ${newsData.length} articles`);
      
      if (newsData.length === 0) {
        setError(`No news articles found for ${selectedCity || selectedState || selectedCountry.toUpperCase()} in ${selectedCategory} category. Try selecting a different category or region.`);
      }
      
      setArticles(newsData);
    } catch (err) {
      setError('Failed to load news. Please try again later.');
      console.error('Error loading news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Reset search when changing category
  };

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setSelectedState(''); // Reset state when changing country
    setSelectedCity(''); // Reset city when changing country
    setSearchQuery(''); // Reset search when changing country
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity(''); // Reset city when changing state
    setSearchQuery(''); // Reset search when changing state
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSearchQuery(''); // Reset search when changing city
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The effect will handle loading based on searchQuery
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">Latest News</h2>
        
        {/* Country Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">Select Country:</label>
          <div className="flex flex-wrap gap-2 justify-center">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountryChange(country.code)}
                className={`px-4 py-2 text-sm rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  selectedCountry === country.code
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* State/Region Selector - Shows only if country has states */}
        {statesByCountry[selectedCountry] && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
              Select State/Region (Optional):
            </label>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleStateChange('')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors text-center ${
                  selectedState === ''
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All States
              </button>
              {statesByCountry[selectedCountry].map((state) => (
                <button
                  key={state}
                  onClick={() => handleStateChange(state)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors text-center ${
                    selectedState === state
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* City Selector - Shows only if state is selected and has cities */}
        {selectedState && citiesByState[selectedState] && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
              Select City (Optional):
            </label>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleCityChange('')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors text-center ${
                  selectedCity === ''
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All Cities
              </button>
              {citiesByState[selectedState].map((city) => (
                <button
                  key={city}
                  onClick={() => handleCityChange(city)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors text-center ${
                    selectedCity === city
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Search and Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for news..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                🔍
              </button>
            </div>
          </form>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-3 py-1.5 text-sm rounded-full text-center ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news articles found.</p>
              <p className="text-gray-400 text-sm mt-2">Try changing your search or category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsSection;