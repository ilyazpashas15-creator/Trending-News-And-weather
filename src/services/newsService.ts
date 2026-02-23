import { NewsArticle } from '@/types';
import apiKeyManager from './apiKeyManager';

interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: any[];
}

/**
 * Converts NewsData.io article format to our NewsArticle format
 */
const convertNewsDataArticle = (article: any): NewsArticle => {
  return {
    source: {
      id: article.source_id || null,
      name: article.source_name || article.source_id || 'Unknown',
    },
    author: article.creator ? article.creator.join(', ') : null,
    title: article.title || 'No title',
    description: article.description || '',
    url: article.link || '',
    urlToImage: article.image_url || null,
    publishedAt: article.pubDate || new Date().toISOString(),
    content: article.content || article.description || '',
  };
};

/**
 * Fetches top headlines from NewsData.io API with automatic key failover
 * @param category - Optional category to filter news (e.g., business, entertainment, health, science, sports, technology, top)
 * @param country - Optional country code to filter news (e.g., us, gb, in)
 * @param pageSize - Number of articles to fetch (default: 20)
 * @param page - Page number for pagination (default: 1)
 * @returns Promise resolving to an array of NewsArticle
 */
export const fetchTopHeadlines = async (
  category?: string,
  country: string = 'in',
  pageSize: number = 20,
  page: number = 1,
  useWorldAPI: boolean = false
): Promise<NewsArticle[]> => {
  try {
    // Map 'general' to 'top' for NewsData.io
    const newsDataCategory = category === 'general' ? 'top' : category;

    console.log(`🔍 Fetching news - Category: "${newsDataCategory}", Country: ${country.toUpperCase()}`);
    console.log(apiKeyManager.getStatus());

    // Use API Key Manager to make the call with automatic failover
    const articles = await apiKeyManager.makeAPICall(async (apiKey: string) => {
      // Build URL with required parameters
      let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en`;

      // Always add country parameter
      if (country) {
        url += `&country=${country}`;
      }

      // CRITICAL: Always add category parameter for filtering
      if (newsDataCategory) {
        url += `&category=${newsDataCategory}`;
      }

      console.log(`📡 API Request URL: ${url.replace(apiKey, 'API_KEY_HIDDEN')}`);
      console.log(`📋 Requesting: ${newsDataCategory} news for ${country.toUpperCase()}`);
      console.log(`⏰ Request timestamp: ${new Date().toISOString()}`);

      const response = await fetch(url, {
        cache: 'no-store', // Disable caching
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Response Error: Status ${response.status}`);
        console.error(`Error details: ${errorText}`);
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const data: NewsDataResponse = await response.json();
      
      console.log(`📊 API Response Status: ${data.status}`);
      console.log(`📊 Results count: ${data.results?.length || 0}`);
      console.log(`📊 Category requested: ${newsDataCategory}`);
      console.log(`📊 Country requested: ${country}`);

      if (data.status !== 'success') {
        console.error('❌ NewsData.io returned error status:', data);
        throw new Error(`NewsData.io returned error status: ${JSON.stringify(data)}`);
      }

      if (!data.results || data.results.length === 0) {
        console.warn(`⚠️ No articles found for category: ${newsDataCategory}, country: ${country}`);
        console.warn(`⚠️ This might mean the API has no articles for this combination, not a rate limit issue`);
        return [];
      }

      const articles = data.results.slice(0, pageSize).map(convertNewsDataArticle);
      console.log(`✅ Successfully fetched ${articles.length} articles for category: ${newsDataCategory}`);
      console.log(`📰 First article title: ${articles[0]?.title || 'N/A'}`);
      console.log(`📰 First article source: ${articles[0]?.source.name || 'N/A'}`);
      console.log(`🔖 Article titles preview:`);
      articles.slice(0, 3).forEach((article, index) => {
        console.log(`   ${index + 1}. ${article.title.substring(0, 60)}...`);
      });

      return articles;
    });

    return articles;
  } catch (error) {
    console.error('❌ Failed to fetch news:', error);
    return [];
  }
};

/**
 * Fetches news articles based on a search query with category filter from NewsData.io
 * @param query - Search query for news articles
 * @param category - Category to filter by
 * @param pageSize - Number of articles to fetch (default: 20)
 * @param page - Page number for pagination (default: 1)
 * @returns Promise resolving to an array of NewsArticle
 */
export const fetchNewsByQueryAndCategory = async (
  query: string,
  category?: string,
  pageSize: number = 20,
  page: number = 1
): Promise<NewsArticle[]> => {
  try {
    // Map 'general' to 'top' for NewsData.io
    const newsDataCategory = category === 'general' ? 'top' : category;

    console.log(`🔍 Searching NewsData.io for: "${query}" in category: "${newsDataCategory}"`);
    console.log(apiKeyManager.getStatus());

    // Use API Key Manager to make the call with automatic failover
    const articles = await apiKeyManager.makeAPICall(async (apiKey: string) => {
      let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=en`;

      // Add category parameter if provided
      if (newsDataCategory) {
        url += `&category=${newsDataCategory}`;
      }

      console.log(`📡 API Request URL: ${url.replace(apiKey, 'API_KEY_HIDDEN')}`);
      console.log(`📋 Searching: "${query}" in category: ${newsDataCategory}`);
      console.log(`⏰ Request timestamp: ${new Date().toISOString()}`);

      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Response Error: Status ${response.status}`);
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const data: NewsDataResponse = await response.json();

      console.log(`📊 API Response Status: ${data.status}`);
      console.log(`📊 Results count: ${data.results?.length || 0}`);
      console.log(`📊 Query: "${query}", Category: ${newsDataCategory}`);

      if (data.status !== 'success') {
        console.error('❌ NewsData.io search returned error status:', data);
        throw new Error(`NewsData.io returned error status: ${JSON.stringify(data)}`);
      }

      if (!data.results || data.results.length === 0) {
        console.warn(`⚠️ No articles found for query: "${query}", category: ${newsDataCategory}`);
        return [];
      }

      const articles = data.results.slice(0, pageSize).map(convertNewsDataArticle);
      console.log(`✅ Successfully fetched ${articles.length} articles`);
      console.log(`📰 First article title: ${articles[0]?.title || 'N/A'}`);
      console.log(`🔖 Article titles preview:`);
      articles.slice(0, 3).forEach((article, index) => {
        console.log(`   ${index + 1}. ${article.title.substring(0, 60)}...`);
      });

      return articles;
    });

    return articles;
  } catch (error) {
    console.error('❌ Failed to search news:', error);
    return [];
  }
};

/**
 * Fetches news articles based on a search query from NewsData.io with automatic key failover
 * @param query - Search query for news articles
 * @param pageSize - Number of articles to fetch (default: 20)
 * @param page - Page number for pagination (default: 1)
 * @returns Promise resolving to an array of NewsArticle
 */
export const fetchNewsByQuery = async (
  query: string,
  pageSize: number = 20,
  page: number = 1
): Promise<NewsArticle[]> => {
  try {
    console.log(`🔍 Searching NewsData.io for: "${query}"`);
    console.log(apiKeyManager.getStatus());

    // Use API Key Manager to make the call with automatic failover
    const articles = await apiKeyManager.makeAPICall(async (apiKey: string) => {
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=en`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const data: NewsDataResponse = await response.json();

      if (data.status !== 'success') {
        throw new Error(`NewsData.io returned error status: ${JSON.stringify(data)}`);
      }

      if (!data.results || data.results.length === 0) {
        console.warn(`⚠️ No articles found for search query: "${query}"`);
        return [];
      }

      const articles = data.results.slice(0, pageSize).map(convertNewsDataArticle);
      console.log(`✅ Successfully fetched ${articles.length} articles for query: "${query}"`);

      return articles;
    });

    return articles;
  } catch (error) {
    console.error('❌ Failed to search news:', error);
    return [];
  }
};

/**
 * Fetches news from specific sources (not supported by NewsData.io free tier)
 * @param sources - Comma-separated list of news source IDs
 * @param pageSize - Number of articles to fetch (default: 20)
 * @param page - Page number for pagination (default: 1)
 * @returns Promise resolving to an array of NewsArticle
 */
export const fetchNewsBySources = async (
  sources: string,
  pageSize: number = 20,
  page: number = 1
): Promise<NewsArticle[]> => {
  console.warn('⚠️ fetchNewsBySources is not supported by NewsData.io free tier');
  return [];
};
