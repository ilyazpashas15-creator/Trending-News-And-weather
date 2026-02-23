/**
 * Formats temperature based on user preference
 * @param kelvinTemp - Temperature in Kelvin
 * @param unit - Temperature unit ('metric', 'imperial', or 'kelvin')
 * @returns Formatted temperature string
 */
export const formatTemperature = (kelvinTemp: number, unit: 'metric' | 'imperial' | 'kelvin' = 'metric'): string => {
  let temp: number;
  let unitSymbol: string;

  switch (unit) {
    case 'metric':
      // Temperature is already in Celsius when API uses units: 'metric'
      temp = Math.round(kelvinTemp);
      unitSymbol = '°C';
      break;
    case 'imperial':
      // Convert Celsius to Fahrenheit
      temp = Math.round(kelvinTemp * 9/5 + 32);
      unitSymbol = '°F';
      break;
    case 'kelvin':
    default:
      temp = Math.round(kelvinTemp);
      unitSymbol = 'K';
      break;
  }

  return `${temp}${unitSymbol}`;
};

/**
 * Formats wind speed based on user preference
 * @param windSpeed - Wind speed in m/s
 * @param unit - Temperature unit ('metric' or 'imperial')
 * @returns Formatted wind speed string
 */
export const formatWindSpeed = (windSpeed: number, unit: 'metric' | 'imperial' = 'metric'): string => {
  let speed: number;
  let unitLabel: string;

  if (unit === 'imperial') {
    // Convert m/s to mph
    speed = Math.round(windSpeed * 2.237);
    unitLabel = 'mph';
  } else {
    // Use m/s
    speed = Math.round(windSpeed * 100) / 100; // Round to 2 decimal places
    unitLabel = 'm/s';
  }

  return `${speed} ${unitLabel}`;
};

/**
 * Converts Unix timestamp to formatted date string
 * @param timestamp - Unix timestamp
 * @param options - Formatting options
 * @returns Formatted date string
 */
export const formatUnixDate = (
  timestamp: number, 
  options: { withTime?: boolean; locale?: string } = {}
): string => {
  const { withTime = false, locale = 'en-US' } = options;
  const date = new Date(timestamp * 1000);
  
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  
  if (withTime) {
    dateOptions.hour = '2-digit';
    dateOptions.minute = '2-digit';
  }
  
  return date.toLocaleDateString(locale, dateOptions);
};

/**
 * Formats pressure from hPa to user preferred unit
 * @param pressure - Pressure in hPa
 * @param unit - Unit preference ('metric' or 'imperial')
 * @returns Formatted pressure string
 */
export const formatPressure = (pressure: number, unit: 'metric' | 'imperial' = 'metric'): string => {
  let formattedPressure: number;
  let unitLabel: string;

  if (unit === 'imperial') {
    // Convert hPa to inHg
    formattedPressure = pressure * 0.02953;
    unitLabel = 'inHg';
  } else {
    // Use hPa
    formattedPressure = pressure;
    unitLabel = 'hPa';
  }

  return `${Math.round(formattedPressure * 100) / 100} ${unitLabel}`;
};

/**
 * Formats humidity percentage
 * @param humidity - Humidity value
 * @returns Formatted humidity string
 */
export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};

/**
 * Converts degrees to compass direction
 * @param degrees - Wind direction in degrees
 * @returns Compass direction string
 */
export const degreesToCompassDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / (360 / directions.length)) % directions.length;
  return directions[index];
};

/**
 * Gets a descriptive weather icon based on weather condition
 * @param condition - Weather condition string
 * @param iconCode - OpenWeatherMap icon code
 * @returns Weather icon component or path
 */
export const getWeatherIcon = (condition: string, iconCode: string): string => {
  // Return the OpenWeatherMap icon URL
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};