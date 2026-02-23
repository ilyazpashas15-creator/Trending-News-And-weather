export interface WeatherData {
  id: number;
  name: string;
  base: string; // Internal parameter
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  cod: number;
}

export interface LocationSearchResult {
  name: string;
  local_names?: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string; // Additional field for US states
}

// Forecast item type for each forecast entry
export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
  };
}

// Visual Crossing API Types
export interface VisualCrossingDay {
  datetime: string;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  humidity: number;
  conditions: string;
  description: string;
  icon: string;
  [key: string]: any; // Allow additional properties that might be returned by the API
}

export interface VisualCrossingWeatherData {
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: VisualCrossingDay[];
  [key: string]: any; // Allow additional properties
}

export interface VisualCrossingForecastData {
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: VisualCrossingDay[];
  [key: string]: any; // Allow additional properties
}