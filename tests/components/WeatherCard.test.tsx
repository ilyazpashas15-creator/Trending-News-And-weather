import { render, screen } from '@testing-library/react';
import WeatherCard from '@/src/components/ui/WeatherCard';
import { WeatherData } from '@/src/types/weather.types';

// Mock weather data
const mockWeatherData: WeatherData = {
  id: 1,
  name: 'London',
  main: {
    temp: 293.15, // This will be 20°C after conversion
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

describe('WeatherCard', () => {
  it('renders correctly with weather data', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    // Check if the city name is displayed
    expect(screen.getByText('London')).toBeInTheDocument();
    
    // Check if the temperature is displayed (converted from Kelvin to Celsius)
    expect(screen.getByText('20')).toBeInTheDocument();
    // Check if the description is displayed
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    
    // Check if the description is displayed
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    
    // Check if the feels like temperature is displayed
    expect(screen.getByText('Feels like 19°C')).toBeInTheDocument();
    
    // Check if weather details are displayed
    expect(screen.getByText('70%')).toBeInTheDocument(); // Humidity
    expect(screen.getByText('3.5 m/s')).toBeInTheDocument(); // Wind speed
    expect(screen.getByText('1013 hPa')).toBeInTheDocument(); // Pressure
    // Wind direction is not displayed in the current component, removing this test
  });

  it('displays correct temperature conversion', () => {
    const weatherDataWithDifferentTemp: WeatherData = {
      ...mockWeatherData,
      main: {
        ...mockWeatherData.main,
        temp: 273.15, // 0°C
      }
    };
    
    render(<WeatherCard weather={weatherDataWithDifferentTemp} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});