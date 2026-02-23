// Astronomy Service for Sun, Moon & Space features

// NASA API Key - accessible on client side with NEXT_PUBLIC_ prefix
const NASA_API_KEY = typeof window !== 'undefined' 
  ? process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY'
  : process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';

export interface SunriseSunsetData {
  sunrise: string;
  sunset: string;
  solar_noon: string;
  day_length: number;
  civil_twilight_begin: string;
  civil_twilight_end: string;
  nautical_twilight_begin: string;
  nautical_twilight_end: string;
  astronomical_twilight_begin: string;
  astronomical_twilight_end: string;
}

export interface MoonPhaseData {
  phase: string;
  illumination: number;
  emoji: string;
  days_since_new: number;
  next_full_moon: string;
  next_new_moon: string;
}

export interface ISSLocationData {
  latitude: string;
  longitude: string;
  timestamp: number;
}

export interface ISSPassTime {
  duration: number;
  risetime: number;
}

export interface AstronautData {
  name: string;
  craft: string;
}

export const astronomyService = {
  /**
   * Get sunrise and sunset times for a location
   * @param lat - Latitude in decimal degrees
   * @param lng - Longitude in decimal degrees
   * @param date - Optional date in YYYY-MM-DD format
   */
  async getSunriseSunset(
    lat: number,
    lng: number,
    date?: string
  ): Promise<{ results: SunriseSunsetData; status: string }> {
    try {
      const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0${
        date ? `&date=${date}` : ''
      }`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch sunrise/sunset data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Using calculated sunrise/sunset data (API unavailable)');
      // Return calculated data as fallback
      return this.getMockSunriseSunset(lat);
    }
  },

  /**
   * Get mock sunrise/sunset data (fallback) - Uses latitude for better accuracy
   */
  getMockSunriseSunset(lat: number = 12.9716): { results: SunriseSunsetData; status: string } {
    const today = new Date();
    
    // Approximate sunrise/sunset based on latitude
    // Closer to equator = more consistent times
    // Further from equator = more variation
    const latFactor = Math.abs(lat) / 90; // 0 at equator, 1 at poles
    
    // Base times (equator-ish)
    const baseSunriseHour = 6;
    const baseSunsetHour = 18;
    
    // Adjust for latitude (simplified)
    const sunriseHour = baseSunriseHour - (latFactor * 2);
    const sunsetHour = baseSunsetHour + (latFactor * 2);
    
    const sunrise = new Date(today);
    sunrise.setHours(Math.floor(sunriseHour), Math.floor((sunriseHour % 1) * 60), 0);
    
    const sunset = new Date(today);
    sunset.setHours(Math.floor(sunsetHour), Math.floor((sunsetHour % 1) * 60), 0);
    
    const solarNoon = new Date(today);
    const noonHour = (sunriseHour + sunsetHour) / 2;
    solarNoon.setHours(Math.floor(noonHour), Math.floor((noonHour % 1) * 60), 0);
    
    const dayLength = (sunset.getTime() - sunrise.getTime()) / 1000;
    
    return {
      results: {
        sunrise: sunrise.toISOString(),
        sunset: sunset.toISOString(),
        solar_noon: solarNoon.toISOString(),
        day_length: dayLength,
        civil_twilight_begin: new Date(sunrise.getTime() - 30 * 60000).toISOString(),
        civil_twilight_end: new Date(sunset.getTime() + 30 * 60000).toISOString(),
        nautical_twilight_begin: new Date(sunrise.getTime() - 60 * 60000).toISOString(),
        nautical_twilight_end: new Date(sunset.getTime() + 60 * 60000).toISOString(),
        astronomical_twilight_begin: new Date(sunrise.getTime() - 90 * 60000).toISOString(),
        astronomical_twilight_end: new Date(sunset.getTime() + 90 * 60000).toISOString()
      },
      status: 'OK'
    };
  },

  /**
   * Get current moon phase information
   */
  async getCurrentMoonPhase(): Promise<MoonPhaseData> {
    try {
      // Try the API first, but expect it to fail due to CORS
      const response = await fetch(
        'https://api.phaseofthemoontoday.com/v1/current',
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch moon phase data');
      }
      return await response.json();
    } catch (error) {
      console.log('Using calculated moon phase data (API unavailable)');
      // Always use calculated data as fallback
      return this.getMockMoonPhase();
    }
  },

  /**
   * Get mock moon phase data (fallback) - Uses actual lunar calculation
   */
  getMockMoonPhase(): MoonPhaseData {
    const today = new Date();
    
    // Lunar cycle calculation (simplified)
    // Known new moon: January 11, 2024
    const knownNewMoon = new Date('2024-01-11').getTime();
    const lunarCycle = 29.53059; // days
    const daysSinceKnownNew = (today.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24);
    const daysSinceNew = daysSinceKnownNew % lunarCycle;
    
    // Calculate phase
    let phase = '';
    let emoji = '🌑';
    let illumination = 0;
    
    if (daysSinceNew < 1.84566) {
      phase = 'New Moon';
      emoji = '🌑';
      illumination = 0;
    } else if (daysSinceNew < 7.38264) {
      phase = 'Waxing Crescent';
      emoji = '🌒';
      illumination = Math.round((daysSinceNew / 7.38264) * 50);
    } else if (daysSinceNew < 9.22830) {
      phase = 'First Quarter';
      emoji = '🌓';
      illumination = 50;
    } else if (daysSinceNew < 14.76529) {
      phase = 'Waxing Gibbous';
      emoji = '🌔';
      illumination = 50 + Math.round(((daysSinceNew - 9.22830) / 5.53699) * 50);
    } else if (daysSinceNew < 16.61095) {
      phase = 'Full Moon';
      emoji = '🌕';
      illumination = 100;
    } else if (daysSinceNew < 22.14794) {
      phase = 'Waning Gibbous';
      emoji = '🌖';
      illumination = 100 - Math.round(((daysSinceNew - 16.61095) / 5.53699) * 50);
    } else if (daysSinceNew < 23.99360) {
      phase = 'Last Quarter';
      emoji = '🌗';
      illumination = 50;
    } else {
      phase = 'Waning Crescent';
      emoji = '🌘';
      illumination = Math.round((1 - (daysSinceNew - 23.99360) / 5.53699) * 50);
    }
    
    // Calculate next full and new moon
    const daysToFullMoon = daysSinceNew < 14.76529 
      ? 14.76529 - daysSinceNew 
      : lunarCycle - daysSinceNew + 14.76529;
    
    const daysToNewMoon = lunarCycle - daysSinceNew;
    
    const nextFullMoon = new Date(today);
    nextFullMoon.setDate(today.getDate() + Math.ceil(daysToFullMoon));
    
    const nextNewMoon = new Date(today);
    nextNewMoon.setDate(today.getDate() + Math.ceil(daysToNewMoon));
    
    return {
      phase,
      illumination,
      emoji,
      days_since_new: parseFloat(daysSinceNew.toFixed(1)),
      next_full_moon: nextFullMoon.toISOString(),
      next_new_moon: nextNewMoon.toISOString()
    };
  },

  /**
   * Get moon phase for a specific date
   * @param date - Date in YYYY-MM-DD format
   */
  async getMoonPhaseByDate(date: string): Promise<MoonPhaseData> {
    try {
      const response = await fetch(
        `https://api.phaseofthemoontoday.com/v1/date/${date}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch moon phase data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching moon phase by date:', error);
      throw error;
    }
  },

  /**
   * Get moon phase calendar for a month
   * @param yearMonth - Year and month in YYYY-MM format
   */
  async getMoonPhaseCalendar(yearMonth: string) {
    try {
      const response = await fetch(
        `https://api.phaseofthemoontoday.com/v1/calendar/${yearMonth}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch moon phase calendar');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching moon phase calendar:', error);
      throw error;
    }
  },

  /**
   * Get current ISS location
   */
  async getISSLocation(): Promise<{
    iss_position: ISSLocationData;
    message: string;
    timestamp: number;
  }> {
    try {
      // Note: This API uses HTTP not HTTPS, which may cause issues
      const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', {
        headers: {
          'Accept': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch ISS location');
      }
      const data = await response.json();
      // Convert to our format
      return {
        iss_position: {
          latitude: data.latitude.toString(),
          longitude: data.longitude.toString(),
          timestamp: data.timestamp
        },
        message: 'success',
        timestamp: data.timestamp
      };
    } catch (error) {
      console.log('Using simulated ISS location (API unavailable)');
      // Return simulated data as fallback
      return this.getMockISSLocation();
    }
  },

  /**
   * Get mock ISS location (fallback) - Simulates orbital movement
   */
  getMockISSLocation(): {
    iss_position: ISSLocationData;
    message: string;
    timestamp: number;
  } {
    // Simulate ISS movement (it orbits every ~90 minutes)
    const now = Date.now();
    const orbitalPeriod = 90 * 60 * 1000; // 90 minutes in milliseconds
    const progress = (now % orbitalPeriod) / orbitalPeriod;
    
    // Simulate latitude oscillation between -51.6° and +51.6° (ISS orbital inclination)
    const lat = Math.sin(progress * Math.PI * 2) * 51.6;
    
    // Simulate longitude progression (ISS moves west to east)
    const lng = ((progress * 360) - 180);
    
    return {
      iss_position: {
        latitude: lat.toFixed(4),
        longitude: lng.toFixed(4),
        timestamp: Math.floor(now / 1000)
      },
      message: 'success',
      timestamp: Math.floor(now / 1000)
    };
  },

  /**
   * Get ISS pass times for a location
   * @param lat - Latitude in decimal degrees
   * @param lon - Longitude in decimal degrees
   * @param altitude - Altitude in meters (optional, default 100)
   * @param passes - Number of passes to return (optional, default 5)
   */
  async getISSPassTimes(
    lat: number,
    lon: number,
    altitude: number = 100,
    passes: number = 5
  ): Promise<{
    response: ISSPassTime[];
    message: string;
  }> {
    try {
      const response = await fetch(
        `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}&alt=${altitude}&n=${passes}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch ISS pass times');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching ISS pass times:', error);
      throw error;
    }
  },

  /**
   * Get number of people currently in space
   */
  async getPeopleInSpace(): Promise<{
    number: number;
    people: AstronautData[];
    message: string;
  }> {
    try {
      const response = await fetch('http://api.open-notify.org/astros.json', {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch people in space');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching people in space:', error);
      // Return mock data as fallback
      return this.getMockPeopleInSpace();
    }
  },

  /**
   * Get mock people in space data (fallback)
   */
  getMockPeopleInSpace(): {
    number: number;
    people: AstronautData[];
    message: string;
  } {
    return {
      number: 7,
      people: [
        { name: 'Astronaut 1', craft: 'ISS' },
        { name: 'Astronaut 2', craft: 'ISS' },
        { name: 'Astronaut 3', craft: 'ISS' },
        { name: 'Astronaut 4', craft: 'ISS' },
        { name: 'Astronaut 5', craft: 'ISS' },
        { name: 'Astronaut 6', craft: 'ISS' },
        { name: 'Astronaut 7', craft: 'ISS' }
      ],
      message: 'success'
    };
  },

  /**
   * Get NASA Astronomy Picture of the Day
   * @param date - Optional date in YYYY-MM-DD format
   */
  async getAPOD(date?: string) {
    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY || '2zhW0kjMr6HaSrg2ygjtrufX43nXUkRglZHO2Xez';
    
    try {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${
        date ? `&date=${date}` : ''
      }`;
      
      console.log('Fetching APOD from:', url.replace(apiKey, 'API_KEY_HIDDEN'));
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('APOD API error:', response.status, errorText);
        throw new Error(`Failed to fetch APOD: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('APOD data received successfully');
      return data;
    } catch (error: any) {
      console.error('Error fetching APOD:', error);
      throw new Error(error.message || 'Failed to fetch NASA APOD');
    }
  },

  /**
   * Get NASA Near Earth Objects (Asteroids)
   * @param startDate - Start date in YYYY-MM-DD format
   * @param endDate - End date in YYYY-MM-DD format
   */
  async getNearEarthObjects(startDate: string, endDate: string) {
    try {
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch near earth objects');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching near earth objects:', error);
      throw error;
    }
  },

  /**
   * Get Mars Rover Photos
   * @param rover - Rover name (curiosity, opportunity, spirit)
   * @param sol - Martian sol (day)
   * @param camera - Optional camera name
   */
  async getMarsRoverPhotos(
    rover: string = 'curiosity',
    sol: number = 1000,
    camera?: string
  ) {
    try {
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${
        camera ? `&camera=${camera}` : ''
      }&api_key=${NASA_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch Mars rover photos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Mars rover photos:', error);
      throw error;
    }
  },

  /**
   * Format Unix timestamp to readable date/time
   * @param timestamp - Unix timestamp in seconds
   */
  formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
  },

  /**
   * Format ISO date string to readable format
   * @param isoString - ISO 8601 date string
   */
  formatISODate(isoString: string): string {
    return new Date(isoString).toLocaleString();
  },

  /**
   * Calculate time until next event
   * @param timestamp - Unix timestamp in seconds
   */
  getTimeUntil(timestamp: number): string {
    const now = Date.now() / 1000;
    const diff = timestamp - now;
    
    if (diff < 0) return 'Past event';
    
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''}`;
    }
    
    return `${hours}h ${minutes}m`;
  }
};

export default astronomyService;
