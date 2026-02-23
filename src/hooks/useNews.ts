import { useState, useEffect } from 'react';
import { NewsArticle } from '@/types';
import { fetchTopHeadlines, fetchNewsByQuery } from '@/services/newsService';

export const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('general');
  const [country, setCountry] = useState<string>('us');

  // Function to fetch news based on category and country
  const fetchNewsByCategory = async (cat: string = category, country_code: string = country) => {
    try {
      setLoading(true);
      setError(null);
      
      const newsData = await fetchTopHeadlines(cat, country_code);
      setArticles(newsData);
    } catch (err) {
      setError('Failed to fetch news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch news by search query
  const fetchNewsBySearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const newsData = await fetchNewsByQuery(query);
      setArticles(newsData);
    } catch (err) {
      setError('Failed to fetch news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initialize with general news
  useEffect(() => {
    fetchNewsByCategory();
  }, []);

  return {
    articles,
    loading,
    error,
    category,
    country,
    setCategory,
    setCountry,
    fetchNewsByCategory,
    fetchNewsBySearch
  };
};