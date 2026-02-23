import { useState, useCallback } from 'react';
import {
  fetchWeatherByCity,
  fetchWeatherForecast,
  fetchWeatherByCoordinates
} from '@/services/weatherService';
import { 
  VisualCrossingWeatherData, 
  VisualCrossingForecastData,
  WeatherData, 
  ForecastData 
} from '@/types/weather.types';



export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getWeatherByCity = useCallback(async (city: string) => {
    // Input validation
    if (!city || typeof city !== 'string' || city.trim().length === 0) {
      setError('Please enter a valid city name');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather using OpenWeatherMap API
      const currentWeather = await fetchWeatherByCity(city.trim());
      setWeatherData(currentWeather);
      
      // Fetch forecast data using OpenWeatherMap API
      const forecast = await fetchWeatherForecast(city.trim());
      setForecastData(forecast);
    } catch (err: any) {
      let errorMessage = 'Failed to fetch weather data';
      
      // Specific error handling for different API responses
      if (err.message) {
        if (err.message.includes('City not found')) {
          errorMessage = `City "${city}" not found. Please check the spelling and try again.`;
        } else if (err.message.includes('API key')) {
          errorMessage = 'Weather service temporarily unavailable. Please try again later.';
        } else if (err.message.includes('Network error')) {
          errorMessage = 'Network connection error. Please check your internet connection and try again.';
        } else if (err.message.includes('Rate limit')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getWeatherByCoordinates = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather using OpenWeatherMap API with coordinates
      const currentWeather = await fetchWeatherByCoordinates(lat, lon);
      setWeatherData(currentWeather);
      
      // Fetch forecast data using OpenWeatherMap API with coordinates
      // For simplicity, we'll fetch forecast for the city name instead of coordinates
      // TODO: Add fetchWeatherForecastByCoordinates to weatherService if needed
      setForecastData(null); // Temporarily set to null since we can't fetch forecast by coordinates yet
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch weather data';
      setError(errorMessage);
      console.error('Error fetching weather by coordinates:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user's current location
  const getCurrentLocationWeather = useCallback(() => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      const errorMessage = 'Geolocation is not supported by your browser. Please search for a city manually.';
      setError(errorMessage);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Validate coordinates
          if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
            throw new Error('Invalid location coordinates received');
          }
          
          await getWeatherByCoordinates(latitude, longitude);
        } catch (err: any) {
          const errorMessage = 'Failed to get weather for your location. Please try searching for a city manually.';
          setError(errorMessage);
          console.error('Location weather error:', err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        
        // Specific geolocation error handling
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please allow location access or search for a city manually.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Please search for a city manually.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again or search for a city manually.';
            break;
          default:
            errorMessage = 'Unable to retrieve your location. Please search for a city manually.';
            break;
        }
        
        setError(errorMessage);
        console.error('Geolocation error:', error);
        setLoading(false);
      },
      {
        timeout: 10000, // 10 second timeout
        enableHighAccuracy: true // Get more accurate location
      }
    );
  }, [getWeatherByCoordinates]);

  return {
    weatherData,
    forecastData,
    loading,
    error,
    getWeatherByCity,
    getWeatherByCoordinates,
    getCurrentLocationWeather,
  };
};