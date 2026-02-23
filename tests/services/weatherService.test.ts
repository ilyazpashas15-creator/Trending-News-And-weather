import axios from 'axios';
import { 
  fetchWeatherByCity, 
  fetchWeatherByCoordinates, 
  searchLocations,
  fetchWeatherForecast 
} from '@/src/services/weatherService';
import { OPENWEATHER_API_BASE_URL, OPENWEATHER_API_KEY } from '@/src/lib/constants';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the mock weather service to avoid fallback during tests
jest.mock('@/src/services/mockWeatherService', () => ({
  mockFetchWeatherByCity: jest.fn(),
  mockFetchWeatherByCoordinates: jest.fn(),
  mockFetchWeatherForecast: jest.fn(),
  mockSearchLocations: jest.fn(),
}));

describe('weatherService', () => {
  const mockWeatherData = {
    id: 1,
    name: 'London',
    main: {
      temp: 293.15,
      feels_like: 292.15,
      humidity: 70,
      pressure: 1013,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      }
    ],
    wind: {
      speed: 3.5,
      deg: 180,
    }
  };

  const mockForecastData = {
    list: [
      {
        dt: 1620000000,
        main: {
          temp: 293.15,
          feels_like: 292.15,
          temp_min: 290.15,
          temp_max: 295.15,
          pressure: 1013,
          sea_level: 1013,
          grnd_level: 950,
          humidity: 70,
          temp_kf: 2.5,
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
          speed: 3.5,
          deg: 180,
          gust: 5.0,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-03 12:00:00',
      }
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
    }
  };

  const mockLocationData = [
    {
      name: 'London',
      country: 'GB',
      lat: 51.5085,
      lon: -0.1257,
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchWeatherByCity', () => {
    it('should fetch weather data by city name', async () => {
      mockedAxios.get.mockResolvedValueOnce({ 
        status: 200, 
        data: mockWeatherData 
      });

      const result = await fetchWeatherByCity('London');
      
      expect(mockedAxios.get).toHaveBeenCalledWith(`${OPENWEATHER_API_BASE_URL}/weather`, {
        params: {
          q: 'London',
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
        },
      });
      
      expect(result).toEqual(mockWeatherData);
    });

    it('should throw an error when city is not found', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          status: 404,
          data: { message: 'City not found' }
        }
      });

      await expect(fetchWeatherByCity('InvalidCity')).rejects.toThrow('City not found');
    });
  });

  describe('fetchWeatherByCoordinates', () => {
    it('should fetch weather data by coordinates', async () => {
      mockedAxios.get.mockResolvedValueOnce({ 
        status: 200, 
        data: mockWeatherData 
      });

      const result = await fetchWeatherByCoordinates(51.5085, -0.1257);
      
      expect(mockedAxios.get).toHaveBeenCalledWith(`${OPENWEATHER_API_BASE_URL}/weather`, {
        params: {
          lat: 51.5085,
          lon: -0.1257,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
        },
      });
      
      expect(result).toEqual(mockWeatherData);
    });
  });

  describe('searchLocations', () => {
    it('should search for locations', async () => {
      mockedAxios.get.mockResolvedValueOnce({ 
        status: 200, 
        data: mockLocationData 
      });

      const result = await searchLocations('London');
      
      expect(mockedAxios.get).toHaveBeenCalledWith(`${OPENWEATHER_API_BASE_URL}/geo/1.0/direct`, {
        params: {
          q: 'London',
          limit: 5,
          appid: OPENWEATHER_API_KEY,
        },
      });
      
      expect(result).toEqual(mockLocationData);
    });
  });

  describe('fetchWeatherForecast', () => {
    it('should fetch weather forecast by city name', async () => {
      mockedAxios.get.mockResolvedValueOnce({ 
        status: 200, 
        data: mockForecastData 
      });

      const result = await fetchWeatherForecast('London');
      
      expect(mockedAxios.get).toHaveBeenCalledWith(`${OPENWEATHER_API_BASE_URL}/forecast`, {
        params: {
          q: 'London',
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
        },
      });
      
      expect(result).toEqual(mockForecastData);
    });
  });
});