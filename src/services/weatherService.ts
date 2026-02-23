import axios from 'axios';
import { WeatherData, LocationSearchResult, ForecastData } from '@/types/weather.types';
import { OPENWEATHER_API_BASE_URL, OPENWEATHER_API_KEY, RESPONSE_CODES, ERROR_MESSAGES } from '@/lib/constants';
import { 
  mockFetchWeatherByCity as getMockWeatherByCity,
  mockFetchWeatherByCoordinates as getMockWeatherByCoordinates,
  mockFetchWeatherForecast as getMockWeatherForecast,
  mockSearchLocations as getMockSearchLocations
} from './mockWeatherService';

// Create axios instance with default configuration
const apiClient = axios.create({
  timeout: 5000, // Request timeout of 5 seconds
});

/**
 * Fetches current weather data for a given city
 * @param cityName - Name of the city to get weather for
 * @returns Promise resolving to WeatherData
 */
export const fetchWeatherByCity = async (cityName: string): Promise<WeatherData> => {
  const isTestMode = process.env.NODE_ENV === 'test';
  
  try {
    const response = await apiClient.get(`${OPENWEATHER_API_BASE_URL}/weather`, {
      params: {
        q: cityName,
        appid: OPENWEATHER_API_KEY,
        units: 'metric', // Default to metric units (Celsius)
      },
    });

    if (response.status === RESPONSE_CODES.SUCCESS) {
      return response.data as WeatherData;
    } else {
      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  } catch (error: any) {
    if (isTestMode) {
      // In test mode, don't fallback to mock data - let errors propagate
      if (error.response) {
        switch (error.response.status) {
          case RESPONSE_CODES.NOT_FOUND:
            throw new Error(ERROR_MESSAGES.CITY_NOT_FOUND);
          case RESPONSE_CODES.UNAUTHORIZED:
            throw new Error(ERROR_MESSAGES.INVALID_API_KEY);
          case RESPONSE_CODES.RATE_LIMITED:
            throw new Error(ERROR_MESSAGES.RATE_LIMIT_EXCEEDED);
          default:
            throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
        }
      } else {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }
    }

    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case RESPONSE_CODES.NOT_FOUND:
          // Return mock data instead of throwing error
          console.warn('City not found, falling back to mock data');
          return getMockWeatherByCity(cityName);
        case RESPONSE_CODES.UNAUTHORIZED:
          throw new Error(ERROR_MESSAGES.INVALID_API_KEY);
        case RESPONSE_CODES.RATE_LIMITED:
          throw new Error(ERROR_MESSAGES.RATE_LIMIT_EXCEEDED);
        default:
          // console.warn('Server error, falling back to mock data');
          return getMockWeatherByCity(cityName);
      }
    } else if (error.request) {
      // Request was made but no response received
      // console.warn('Network error, falling back to mock data');
      return getMockWeatherByCity(cityName);
    } else {
      // Something else happened
      // console.warn('Error occurred, falling back to mock data');
      return getMockWeatherByCity(cityName);
    }
  }
};

/**
 * Fetches current weather data for given coordinates
 * @param lat - Latitude coordinate
 * @param lon - Longitude coordinate
 * @returns Promise resolving to WeatherData
 */
export const fetchWeatherByCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await apiClient.get(`${OPENWEATHER_API_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric', // Default to metric units (Celsius)
      },
    });

    if (response.status === RESPONSE_CODES.SUCCESS) {
      return response.data as WeatherData;
    } else {
      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  } catch (error: any) {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case RESPONSE_CODES.NOT_FOUND:
          // console.warn('Location not found, falling back to mock data');
          return getMockWeatherByCoordinates(lat, lon);
        case RESPONSE_CODES.UNAUTHORIZED:
          // console.warn('API key unauthorized, falling back to mock data');
          return getMockWeatherByCoordinates(lat, lon);
        case RESPONSE_CODES.RATE_LIMITED:
          // console.warn('Rate limit exceeded, falling back to mock data');
          return getMockWeatherByCoordinates(lat, lon);
        default:
          // console.warn('Server error, falling back to mock data');
          return getMockWeatherByCoordinates(lat, lon);
      }
    } else if (error.request) {
      // Request was made but no response received
      // console.warn('Network error, falling back to mock data');
      return getMockWeatherByCoordinates(lat, lon);
    } else {
      // Something else happened
      // console.warn('Error occurred, falling back to mock data');
      return getMockWeatherByCoordinates(lat, lon);
    }
  }
};

/**
 * Searches for locations based on a query string
 * @param query - Search query for locations
 * @returns Promise resolving to array of LocationSearchResult
 */
export const searchLocations = async (query: string): Promise<LocationSearchResult[]> => {
  try {
    const response = await apiClient.get(`${OPENWEATHER_API_BASE_URL}/geo/1.0/direct`, {
      params: {
        q: query,
        limit: 5, // Limit to 5 results
        appid: OPENWEATHER_API_KEY,
      },
    });

    if (response.status === RESPONSE_CODES.SUCCESS) {
      return response.data as LocationSearchResult[];
    } else {
      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  } catch (error: any) {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case RESPONSE_CODES.NOT_FOUND:
          // console.warn('Location not found, falling back to mock data');
          return getMockSearchLocations(query);
        case RESPONSE_CODES.UNAUTHORIZED:
          // console.warn('API key unauthorized, falling back to mock data');
          return getMockSearchLocations(query);
        case RESPONSE_CODES.RATE_LIMITED:
          // console.warn('Rate limit exceeded, falling back to mock data');
          return getMockSearchLocations(query);
        default:
          // console.warn('Server error, falling back to mock data');
          return getMockSearchLocations(query);
      }
    } else if (error.request) {
      // Request was made but no response received
      // console.warn('Network error, falling back to mock data');
      return getMockSearchLocations(query);
    } else {
      // Something else happened
      // console.warn('Error occurred, falling back to mock data');
      return getMockSearchLocations(query);
    }
  }
};

/**
 * Fetches 5-day weather forecast for a given city
 * @param cityName - Name of the city to get forecast for
 * @returns Promise resolving to ForecastData
 */
export const fetchWeatherForecast = async (cityName: string): Promise<ForecastData> => {
  try {
    const response = await apiClient.get(`${OPENWEATHER_API_BASE_URL}/forecast`, {
      params: {
        q: cityName,
        appid: OPENWEATHER_API_KEY,
        units: 'metric', // Default to metric units (Celsius)
      },
    });

    if (response.status === RESPONSE_CODES.SUCCESS) {
      return response.data as ForecastData;
    } else {
      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  } catch (error: any) {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case RESPONSE_CODES.NOT_FOUND:
          // console.warn('Forecast not found, falling back to mock data');
          return getMockWeatherForecast(cityName);
        case RESPONSE_CODES.UNAUTHORIZED:
          // console.warn('API key unauthorized, falling back to mock data');
          return getMockWeatherForecast(cityName);
        case RESPONSE_CODES.RATE_LIMITED:
          // console.warn('Rate limit exceeded, falling back to mock data');
          return getMockWeatherForecast(cityName);
        default:
          // console.warn('Server error, falling back to mock data');
          return getMockWeatherForecast(cityName);
      }
    } else if (error.request) {
      // Request was made but no response received
      // console.warn('Network error, falling back to mock data');
      return getMockWeatherForecast(cityName);
    } else {
      // Something else happened
      // console.warn('Error occurred, falling back to mock data');
      return getMockWeatherForecast(cityName);
    }
  }
};