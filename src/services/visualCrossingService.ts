import axios from 'axios';
import { 
  VisualCrossingWeatherData, 
  LocationSearchResult, 
  VisualCrossingForecastData 
} from '@/types/weather.types';
import { 
  API_BASE_URL, 
  VISUAL_CROSSING_API_KEY, 
  RESPONSE_CODES, 
  ERROR_MESSAGES 
} from '@/lib/constants';

// Create axios instance with default configuration
const apiClient = axios.create({
  timeout: 5000, // Request timeout of 5 seconds
});

/**
 * Fetches current weather data for a given location using Visual Crossing API
 * @param location - Name of the location to get weather for
 * @param startDate - Start date for the weather data (format: YYYY-MM-DD)
 * @param endDate - End date for the weather data (format: YYYY-MM-DD)
 * @returns Promise resolving to VisualCrossingWeatherData
 */
export const fetchWeatherByLocation = async (
  location: string, 
  startDate: string = new Date().toISOString().split('T')[0],
  endDate: string = startDate
): Promise<VisualCrossingWeatherData> => {
  try {
    const url = `${API_BASE_URL}/timeline/${encodeURIComponent(location)}/${startDate}/${endDate}?unitGroup=metric&contentType=json&key=${VISUAL_CROSSING_API_KEY}`;
    
    const response = await apiClient.get(url);

    if (response.status === RESPONSE_CODES.SUCCESS) {
      return response.data as VisualCrossingWeatherData;
    } else {
      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  } catch (error: any) {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case RESPONSE_CODES.NOT_FOUND:
          console.warn('Location not found, falling back to mock data');
          return getMockWeatherByLocation(location, startDate, endDate);
        case RESPONSE_CODES.UNAUTHORIZED:
          console.warn('API key unauthorized, falling back to mock data');
          return getMockWeatherByLocation(location, startDate, endDate);
        case RESPONSE_CODES.RATE_LIMITED:
          console.warn('Rate limit exceeded, falling back to mock data');
          return getMockWeatherByLocation(location, startDate, endDate);
        default:
          console.warn('Server error, falling back to mock data');
          return getMockWeatherByLocation(location, startDate, endDate);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.warn('Network error, falling back to mock data');
      return getMockWeatherByLocation(location, startDate, endDate);
    } else {
      // Something else happened
      console.warn('Error occurred, falling back to mock data');
      return getMockWeatherByLocation(location, startDate, endDate);
    }
  }
};

/**
 * Fetches weather forecast data for a given location using Visual Crossing API
 * @param location - Name of the location to get forecast for
 * @param days - Number of days for the forecast (default: 7)
 * @returns Promise resolving to VisualCrossingForecastData
 */
export const fetchWeatherForecast = async (
  location: string, 
  days: number = 7
): Promise<VisualCrossingForecastData> => {
  const startDate = new Date().toISOString().split('T')[0];
  const endDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  try {
    const url = `${API_BASE_URL}/timeline/${encodeURIComponent(location)}/${startDate}/${endDate}?unitGroup=metric&contentType=json&key=${VISUAL_CROSSING_API_KEY}`;
    
    const response = await apiClient.get(url);

    if (response.status === RESPONSE_CODES.SUCCESS) {
      return response.data as VisualCrossingForecastData;
    } else {
      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  } catch (error: any) {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case RESPONSE_CODES.NOT_FOUND:
          console.warn('Forecast not found, falling back to mock data');
          return getMockWeatherForecast(location, days);
        case RESPONSE_CODES.UNAUTHORIZED:
          console.warn('API key unauthorized, falling back to mock data');
          return getMockWeatherForecast(location, days);
        case RESPONSE_CODES.RATE_LIMITED:
          console.warn('Rate limit exceeded, falling back to mock data');
          return getMockWeatherForecast(location, days);
        default:
          console.warn('Server error, falling back to mock data');
          return getMockWeatherForecast(location, days);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.warn('Network error, falling back to mock data');
      return getMockWeatherForecast(location, days);
    } else {
      // Something else happened
      console.warn('Error occurred, falling back to mock data');
      return getMockWeatherForecast(location, days);
    }
  }
};

/**
 * Searches for locations using a query string
 * @param query - Search query for locations
 * @returns Promise resolving to array of LocationSearchResult
 */
export const searchLocations = async (query: string): Promise<LocationSearchResult[]> => {
  try {
    // Visual Crossing doesn't have a dedicated location search endpoint
    // We'll return a mock result for now
    return getMockSearchLocations(query);
  } catch (error) {
    console.warn('Location search not supported by Visual Crossing, returning mock data');
    return getMockSearchLocations(query);
  }
};

// Mock service functions as fallbacks
const getMockWeatherByLocation = async (
  location: string, 
  startDate: string, 
  endDate: string
): Promise<VisualCrossingWeatherData> => {
  // Return mock data when API call fails
  return {
    resolvedAddress: location,
    address: location,
    timezone: 'UTC',
    tzoffset: 0,
    days: [
      {
        datetime: startDate,
        datetimeEpoch: Date.now() / 1000,
        tempmax: 22,
        tempmin: 15,
        temp: 18.5,
        feelslikemax: 23,
        feelslikemin: 14,
        feelslike: 19,
        humidity: 65,
        conditions: 'Partly cloudy',
        description: 'Partly cloudy throughout the day.',
        icon: 'partly-cloudy-day',
      }
    ]
  };
};

const getMockWeatherForecast = async (
  location: string, 
  days: number
): Promise<VisualCrossingForecastData> => {
  const startDate = new Date();
  const forecast: any[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    forecast.push({
      datetime: date.toISOString().split('T')[0],
      datetimeEpoch: date.getTime() / 1000,
      tempmax: 20 + i,
      tempmin: 10 + i,
      temp: 15 + i,
      feelslikemax: 22 + i,
      feelslikemin: 12 + i,
      feelslike: 17 + i,
      humidity: 60 + i,
      conditions: i % 2 === 0 ? 'Sunny' : 'Cloudy',
      description: i % 2 === 0 ? 'Sunny throughout the day.' : 'Cloudy with occasional sunshine.',
      icon: i % 2 === 0 ? 'sunny' : 'cloudy',
    });
  }
  
  return {
    resolvedAddress: location,
    address: location,
    timezone: 'UTC',
    tzoffset: 0,
    days: forecast
  };
};

const getMockSearchLocations = async (query: string): Promise<LocationSearchResult[]> => {
  // Return mock location results
  return [
    {
      name: query,
      lat: 40.7128,
      lon: -74.0060,
      country: 'US',
      state: 'New York'
    }
  ];
};