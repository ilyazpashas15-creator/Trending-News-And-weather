/**
 * Timezone Service with City Search, Fuzzy Matching, and Caching
 */

import { ALL_CITIES as CITIES, POPULAR_CITIES, City } from '../utils/cityDatabase';

// Cache for timezone conversions
interface CacheEntry {
  result: any;
  timestamp: number;
}

class TimezoneCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.result;
  }

  set(key: string, value: any): void {
    this.cache.set(key, {
      result: value,
      timestamp: Date.now()
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

const timezoneCache = new TimezoneCache();

// Fuzzy matching algorithm for city search
export function fuzzySearchCities(query: string, limit: number = 10): City[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/);
  
  const scored = CITIES.map(city => {
    const nameLower = city.name.toLowerCase();
    const countryLower = city.country.toLowerCase();
    const timezoneLower = city.timezone.toLowerCase();
    
    let score = 0;
    
    // Exact match bonus
    if (nameLower === normalizedQuery) score += 100;
    if (countryLower === normalizedQuery) score += 80;
    
    // Starts with bonus
    if (nameLower.startsWith(normalizedQuery)) score += 50;
    if (countryLower.startsWith(normalizedQuery)) score += 40;
    
    // Contains bonus
    if (nameLower.includes(normalizedQuery)) score += 30;
    if (countryLower.includes(normalizedQuery)) score += 25;
    if (timezoneLower.includes(normalizedQuery)) score += 20;
    
    // Word matching
    queryWords.forEach(word => {
      if (nameLower.includes(word)) score += 15;
      if (countryLower.includes(word)) score += 10;
    });
    
    // Population bonus (prefer larger cities)
    score += Math.log10(city.population) * 2;
    
    return { city, score };
  });
  
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.city);
}

// Get popular cities
export function getPopularCities(): City[] {
  return POPULAR_CITIES;
}

// Get all cities
export function getAllCities(): City[] {
  return CITIES;
}

// Get city by ID
export function getCityById(id: string): City | undefined {
  return CITIES.find(city => city.id === id);
}

// Get cities by timezone
export function getCitiesByTimezone(timezone: string): City[] {
  return CITIES.filter(city => city.timezone === timezone);
}

// Calculate timezone offset in minutes from UTC
export function getTimezoneOffset(timezone: string, date: Date = new Date()): number {
  const cacheKey = `offset_${timezone}_${date.toISOString().split('T')[0]}`;
  const cached = timezoneCache.get(cacheKey);
  if (cached !== null) return cached;
  
  try {
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);
    
    timezoneCache.set(cacheKey, offset);
    return offset;
  } catch (error) {
    console.error(`Error calculating offset for ${timezone}:`, error);
    return 0;
  }
}

// Check if DST is active for a timezone
export function isDSTActive(timezone: string, date: Date = new Date()): boolean {
  const cacheKey = `dst_${timezone}_${date.toISOString().split('T')[0]}`;
  const cached = timezoneCache.get(cacheKey);
  if (cached !== null) return cached;
  
  try {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    
    const janOffset = getTimezoneOffset(timezone, jan);
    const julOffset = getTimezoneOffset(timezone, jul);
    const currentOffset = getTimezoneOffset(timezone, date);
    
    const hasDST = janOffset !== julOffset;
    const isDST = hasDST && currentOffset === Math.max(janOffset, julOffset);
    
    timezoneCache.set(cacheKey, isDST);
    return isDST;
  } catch (error) {
    console.error(`Error checking DST for ${timezone}:`, error);
    return false;
  }
}

// Get timezone abbreviation
export function getTimezoneAbbreviation(timezone: string, date: Date = new Date()): string {
  try {
    const timeString = date.toLocaleTimeString('en-US', {
      timeZone: timezone,
      timeZoneName: 'short'
    });
    return timeString.split(' ').pop() || 'UTC';
  } catch (error) {
    return 'UTC';
  }
}

// Format time for a specific timezone
export function formatTimeForTimezone(
  timezone: string,
  date: Date = new Date(),
  options: Intl.DateTimeFormatOptions = {}
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    ...options
  };
  
  try {
    return date.toLocaleTimeString('en-US', {
      timeZone: timezone,
      ...defaultOptions
    });
  } catch (error) {
    return 'Invalid timezone';
  }
}

// Format date for a specific timezone
export function formatDateForTimezone(
  timezone: string,
  date: Date = new Date(),
  options: Intl.DateTimeFormatOptions = {}
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  try {
    return date.toLocaleDateString('en-US', {
      timeZone: timezone,
      ...defaultOptions
    });
  } catch (error) {
    return 'Invalid timezone';
  }
}

// Convert time between timezones
export function convertTimeBetweenZones(
  fromTimezone: string,
  toTimezone: string,
  date: Date = new Date()
): Date {
  const cacheKey = `convert_${fromTimezone}_${toTimezone}_${date.getTime()}`;
  const cached = timezoneCache.get(cacheKey);
  if (cached !== null) return new Date(cached);
  
  try {
    // Get the time in the source timezone
    const fromOffset = getTimezoneOffset(fromTimezone, date);
    const toOffset = getTimezoneOffset(toTimezone, date);
    
    // Calculate the difference
    const offsetDiff = toOffset - fromOffset;
    
    // Create new date with the converted time
    const convertedDate = new Date(date.getTime() + offsetDiff * 60 * 1000);
    
    timezoneCache.set(cacheKey, convertedDate.getTime());
    return convertedDate;
  } catch (error) {
    console.error('Error converting time:', error);
    return date;
  }
}

// Get time difference between two timezones
export function getTimeDifference(fromTimezone: string, toTimezone: string, date: Date = new Date()): number {
  const fromOffset = getTimezoneOffset(fromTimezone, date);
  const toOffset = getTimezoneOffset(toTimezone, date);
  return (toOffset - fromOffset) / 60;
}

// Format time difference as string
export function formatTimeDifference(hours: number): string {
  if (hours === 0) return 'Same time';
  const absHours = Math.abs(hours);
  const sign = hours > 0 ? '+' : '-';
  const wholeHours = Math.floor(absHours);
  const minutes = Math.round((absHours - wholeHours) * 60);
  
  if (minutes === 0) {
    return `${sign}${wholeHours} hour${wholeHours !== 1 ? 's' : ''}`;
  }
  return `${sign}${wholeHours}h ${minutes}m`;
}

// Get relative time description
export function getRelativeTimeDescription(fromTimezone: string, toTimezone: string, date: Date = new Date()): string {
  const diff = getTimeDifference(fromTimezone, toTimezone, date);
  
  if (diff === 0) return 'Same time zone';
  
  const formatted = formatTimeDifference(diff);
  const direction = diff > 0 ? 'ahead of' : 'behind';
  
  return `${formatted} ${direction} ${fromTimezone.split('/').pop()?.replace(/_/g, ' ')}`;
}

// Calculate optimal meeting times
export interface MeetingTime {
  utcTime: Date;
  localTimes: {
    timezone: string;
    time: string;
    isBusinessHours: boolean;
  }[];
  score: number;
  allInBusinessHours: boolean;
}

export function calculateOptimalMeetingTimes(
  timezones: string[],
  durationMinutes: number = 60,
  startHour: number = 6,
  endHour: number = 22,
  workStart: number = 9,
  workEnd: number = 17
): MeetingTime[] {
  const meetingTimes: MeetingTime[] = [];
  const now = new Date();
  
  // Check each hour in the range
  for (let hour = startHour; hour <= endHour; hour++) {
    const utcTime = new Date(now);
    utcTime.setUTCHours(hour, 0, 0, 0);
    
    const localTimes = timezones.map(tz => {
      const localTime = convertTimeBetweenZones('UTC', tz, utcTime);
      const localHour = localTime.getHours();
      const isBusinessHours = localHour >= workStart && localHour < workEnd;
      
      return {
        timezone: tz,
        time: formatTimeForTimezone(tz, localTime),
        isBusinessHours
      };
    });
    
    const inBusinessHoursCount = localTimes.filter(t => t.isBusinessHours).length;
    const allInBusinessHours = inBusinessHoursCount === timezones.length;
    
    // Score based on how many are in business hours
    let score = inBusinessHoursCount * 10;
    if (allInBusinessHours) score += 50;
    
    // Prefer times between 10am-4pm local for most participants
    const midDayCount = localTimes.filter(t => {
      const localTime = convertTimeBetweenZones('UTC', t.timezone, utcTime);
      const localHour = localTime.getHours();
      return localHour >= 10 && localHour <= 16;
    }).length;
    score += midDayCount * 5;
    
    meetingTimes.push({
      utcTime,
      localTimes,
      score,
      allInBusinessHours
    });
  }
  
  // Sort by score (descending)
  return meetingTimes.sort((a, b) => b.score - a.score);
}

// Generate shareable event URL
export function generateEventUrl(eventName: string, date: Date, timezone: string): string {
  const params = new URLSearchParams({
    name: eventName,
    date: date.toISOString(),
    timezone
  });
  
  return `/world-clock/event?${params.toString()}`;
}

// Parse event from URL
export function parseEventFromUrl(searchParams: URLSearchParams): {
  name: string;
  date: Date;
  timezone: string;
} | null {
  const name = searchParams.get('name');
  const dateStr = searchParams.get('date');
  const timezone = searchParams.get('timezone');
  
  if (!name || !dateStr || !timezone) return null;
  
  try {
    const date = new Date(dateStr);
    return { name, date, timezone };
  } catch {
    return null;
  }
}

// Get all unique timezones from cities
export function getAllTimezones(): string[] {
  const timezones = new Set<string>();
  CITIES.forEach(city => timezones.add(city.timezone));
  return Array.from(timezones).sort();
}

// Get cities by region
export function getCitiesByRegion(region: string): City[] {
  return CITIES.filter(city => city.region === region);
}

// Get regions
export function getRegions(): string[] {
  const regions = new Set<string>();
  CITIES.forEach(city => regions.add(city.region));
  return Array.from(regions).sort();
}

// Clear cache (useful for testing)
export function clearTimezoneCache(): void {
  timezoneCache.clear();
}

export { timezoneCache };

// Alias for formatDateTimeForTimezone (combines time and date formatting)
export function formatDateTimeForTimezone(
  timezone: string,
  date: Date = new Date(),
  options: Intl.DateTimeFormatOptions = {}
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    ...options
  };
  
  try {
    return date.toLocaleString('en-US', {
      timeZone: timezone,
      ...defaultOptions
    });
  } catch (error) {
    return 'Invalid timezone';
  }
}
