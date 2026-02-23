import { renderHook, act } from '@testing-library/react';
import { useWeather } from '@/src/hooks/useWeather';
import { 
  fetchWeatherByCity, 
  fetchWeatherForecast 
} from '@/src/services/weatherService';

// Mock the weather service
jest.mock('@/src/services/weatherService');

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

describe('useWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useWeather());
    
    expect(result.current.weatherData).toBeNull();
    expect(result.current.forecastData).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch weather and forecast data when getWeatherByCity is called', async () => {
    (fetchWeatherByCity as jest.MockedFunction<typeof fetchWeatherByCity>)
      .mockResolvedValue(mockWeatherData);
    (fetchWeatherForecast as jest.MockedFunction<typeof fetchWeatherForecast>)
      .mockResolvedValue(mockForecastData);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.getWeatherByCity('London');
    });

    expect(fetchWeatherByCity).toHaveBeenCalledWith('London');
    expect(fetchWeatherForecast).toHaveBeenCalledWith('London');
    expect(result.current.weatherData).toEqual(mockWeatherData);
    expect(result.current.forecastData).toEqual(mockForecastData);
    expect(result.current.loading).toBe(false);
  });

  it('should handle error when fetching weather fails', async () => {
    const errorMessage = 'City not found';
    (fetchWeatherByCity as jest.MockedFunction<typeof fetchWeatherByCity>)
      .mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.getWeatherByCity('InvalidCity');
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });
});