// API Constants
export const VISUAL_CROSSING_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services';
export const OPENWEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '';
export const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY || 'M5P8LG42JU3ZGLQDJUEW8Y9EY';

// Default API_BASE_URL - setting it to Visual Crossing as that was the original
export const API_BASE_URL = VISUAL_CROSSING_API_BASE_URL;

// Application Constants
export const DEFAULT_CITY = 'London';
export const TEMPERATURE_UNITS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
  KELVIN: 'kelvin'
} as const;

// Response Codes
export const RESPONSE_CODES = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  RATE_LIMITED: 429
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_API_KEY: 'Invalid API key provided',
  CITY_NOT_FOUND: 'Location not found',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded, please try again later',
  NETWORK_ERROR: 'Network error, please check your connection',
  UNKNOWN_ERROR: 'An unknown error occurred'
} as const;