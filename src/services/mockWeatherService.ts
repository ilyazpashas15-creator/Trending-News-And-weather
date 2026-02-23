// Mock weather data for development/testing when API key is not working
import { WeatherData, ForecastData, LocationSearchResult } from '@/types/weather.types';

// Mock current weather data
const mockCurrentWeather: WeatherData = {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    }
  ],
  base: 'stations',
  main: {
    temp: 18.5,
    feels_like: 17.8,
    temp_min: 16.2,
    temp_max: 19.8,
    pressure: 1015,
    humidity: 65,
    sea_level: 1020,
    grnd_level: 1015,
  },
  visibility: 10000,
  wind: {
    speed: 3.6,
    deg: 230,
  },
  clouds: {
    all: 0,
  },
  dt: Math.floor(Date.now() / 1000),
  sys: {
    type: 1,
    id: 1414,
    country: 'GB',
    sunrise: 1622702432,
    sunset: 1622759102,
  },
  timezone: 3600,
  id: 2643743,
  name: 'London',
  cod: 200,
};

// Mock forecast data
const mockForecastData: ForecastData = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: Math.floor(Date.now() / 1000) + 3600,
      main: {
        temp: 18.5,
        feels_like: 17.8,
        temp_min: 16.2,
        temp_max: 19.8,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1005,
        humidity: 65,
        temp_kf: 1.2,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        }
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 3.6,
        deg: 230,
        gust: 5.1,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now() + 3600000).toISOString().slice(0, 19).replace('T', ' '),
    },
    {
      dt: Math.floor(Date.now() / 1000) + 7200,
      main: {
        temp: 17.5,
        feels_like: 16.8,
        temp_min: 15.2,
        temp_max: 18.8,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1004,
        humidity: 70,
        temp_kf: 1.2,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d',
        }
      ],
      clouds: {
        all: 20,
      },
      wind: {
        speed: 4.1,
        deg: 240,
        gust: 5.6,
      },
      visibility: 10000,
      pop: 0.1,
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now() + 7200000).toISOString().slice(0, 19).replace('T', ' '),
    },
    {
      dt: Math.floor(Date.now() / 1000) + 10800,
      main: {
        temp: 16.5,
        feels_like: 15.8,
        temp_min: 14.2,
        temp_max: 17.8,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1003,
        humidity: 75,
        temp_kf: 1.2,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        }
      ],
      clouds: {
        all: 60,
      },
      wind: {
        speed: 3.8,
        deg: 220,
        gust: 4.9,
      },
      visibility: 10000,
      pop: 0.5,
      sys: {
        pod: 'd',
      },
      dt_txt: new Date(Date.now() + 10800000).toISOString().slice(0, 19).replace('T', ' '),
    },
  ],
  city: {
    id: 2643743,
    name: 'London',
    coord: {
      lat: 51.5085,
      lon: -0.1257,
    },
    country: 'GB',
    population: 1000000,
    timezone: 3600,
  },
};

// Mock location search result
const mockLocationSearch: LocationSearchResult[] = [
  {
    name: 'London',
    local_names: {
      en: 'London',
    },
    lat: 51.5085,
    lon: -0.1257,
    country: 'GB',
  },
  {
    name: 'London',
    local_names: {
      en: 'London',
    },
    lat: 39.8864,
    lon: -83.4482,
    country: 'US',
  },
];

/**
 * Mock function to fetch weather by city name
 */
export const mockFetchWeatherByCity = async (cityName: string): Promise<WeatherData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data with updated city name
  return {
    ...mockCurrentWeather,
    name: cityName,
  };
};

/**
 * Mock function to fetch weather by coordinates
 */
export const mockFetchWeatherByCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockCurrentWeather;
};

/**
 * Mock function to search locations
 */
export const mockSearchLocations = async (query: string): Promise<LocationSearchResult[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockLocationSearch.filter(location => 
    location.name.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Mock function to fetch weather forecast
 */
export const mockFetchWeatherForecast = async (cityName: string): Promise<ForecastData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return {
    ...mockForecastData,
    city: {
      ...mockForecastData.city,
      name: cityName,
    },
  };
};