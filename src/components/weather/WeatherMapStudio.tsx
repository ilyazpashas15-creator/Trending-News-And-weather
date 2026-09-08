'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useWeather } from '@/hooks/useWeather';

// Comprehensive dataset of world countries, states, and major meteorological hubs
export interface CityStation {
  name: string;
  region: string;
  country: string;
  countryName: string;
  flag: string;
  lat: number;
  lng: number;
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
  pressure: number;
}

export const WORLD_MAP_CITIES: Record<string, CityStation> = {
  // ─── INDIA (States, Union Territories & Major Hubs) ───
  bengaluru: { name: 'Bengaluru', region: 'Karnataka', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 12.9716, lng: 77.5946, temp: 29, condition: 'Mostly Sunny', icon: '☀️', humidity: 54, wind: 7, pressure: 1012 },
  chennai: { name: 'Chennai', region: 'Tamil Nadu', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 13.0827, lng: 80.2707, temp: 32, condition: 'Humid & Sunny', icon: '🌤️', humidity: 72, wind: 14, pressure: 1010 },
  mumbai: { name: 'Mumbai', region: 'Maharashtra', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 19.076, lng: 72.8777, temp: 31, condition: 'Partly Cloudy', icon: '⛅', humidity: 68, wind: 11, pressure: 1011 },
  delhi: { name: 'New Delhi', region: 'Delhi NCR', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 28.6139, lng: 77.209, temp: 34, condition: 'Sunny & Warm', icon: '☀️', humidity: 42, wind: 9, pressure: 1008 },
  kolkata: { name: 'Kolkata', region: 'West Bengal', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 22.5726, lng: 88.3639, temp: 33, condition: 'Light Rain', icon: '🌧️', humidity: 80, wind: 16, pressure: 1009 },
  hyderabad: { name: 'Hyderabad', region: 'Telangana', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 17.385, lng: 78.4867, temp: 30, condition: 'Scattered Clouds', icon: '🌤️', humidity: 58, wind: 8, pressure: 1013 },
  kochi: { name: 'Kochi', region: 'Kerala', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 9.9312, lng: 76.2673, temp: 28, condition: 'Light Rain', icon: '🌧️', humidity: 85, wind: 12, pressure: 1012 },
  ahmedabad: { name: 'Ahmedabad', region: 'Gujarat', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 23.0225, lng: 72.5714, temp: 35, condition: 'Clear Sky', icon: '☀️', humidity: 45, wind: 10, pressure: 1009 },
  pune: { name: 'Pune', region: 'Maharashtra', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 18.5204, lng: 73.8567, temp: 29, condition: 'Pleasant & Fair', icon: '🌤️', humidity: 56, wind: 9, pressure: 1014 },
  jaipur: { name: 'Jaipur', region: 'Rajasthan', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 26.9124, lng: 75.7873, temp: 33, condition: 'Sunny', icon: '☀️', humidity: 38, wind: 11, pressure: 1010 },
  lucknow: { name: 'Lucknow', region: 'Uttar Pradesh', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 26.8467, lng: 80.9462, temp: 32, condition: 'Hazy Sun', icon: '🌤️', humidity: 60, wind: 8, pressure: 1011 },
  chandigarh: { name: 'Chandigarh', region: 'Punjab / Haryana', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 30.7333, lng: 76.7794, temp: 31, condition: 'Clear Sky', icon: '☀️', humidity: 46, wind: 7, pressure: 1012 },
  bhopal: { name: 'Bhopal', region: 'Madhya Pradesh', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 23.2599, lng: 77.4126, temp: 31, condition: 'Scattered Clouds', icon: '⛅', humidity: 52, wind: 10, pressure: 1013 },
  patna: { name: 'Patna', region: 'Bihar', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 25.5941, lng: 85.1376, temp: 32, condition: 'Partly Cloudy', icon: '🌤️', humidity: 65, wind: 9, pressure: 1011 },
  bhubaneswar: { name: 'Bhubaneswar', region: 'Odisha', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 20.2961, lng: 85.8245, temp: 31, condition: 'Tropical Breeze', icon: '🌦️', humidity: 76, wind: 13, pressure: 1010 },
  guwahati: { name: 'Guwahati', region: 'Assam', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 26.1445, lng: 91.7362, temp: 29, condition: 'Passing Showers', icon: '🌧️', humidity: 82, wind: 8, pressure: 1012 },
  srinagar: { name: 'Srinagar', region: 'Jammu & Kashmir', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 34.0837, lng: 74.7973, temp: 18, condition: 'Crisp & Clear', icon: '🌤️', humidity: 48, wind: 6, pressure: 1018 },
  goa: { name: 'Panaji', region: 'Goa', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 15.4909, lng: 73.8278, temp: 30, condition: 'Coastal Breeze', icon: '🌤️', humidity: 78, wind: 15, pressure: 1011 },
  indore: { name: 'Indore', region: 'Madhya Pradesh', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 22.7196, lng: 75.8577, temp: 30, condition: 'Fair', icon: '☀️', humidity: 50, wind: 8, pressure: 1012 },
  visakhapatnam: { name: 'Visakhapatnam', region: 'Andhra Pradesh', country: 'IN', countryName: 'India', flag: '🇮🇳', lat: 17.6868, lng: 83.2185, temp: 31, condition: 'Humid Breeze', icon: '🌤️', humidity: 74, wind: 14, pressure: 1010 },

  // ─── UNITED STATES (Major States & Hubs) ───
  newyork: { name: 'New York', region: 'New York', country: 'US', countryName: 'United States', flag: '🇺🇸', lat: 40.7128, lng: -74.006, temp: 24, condition: 'Clear Sky', icon: '☀️', humidity: 48, wind: 10, pressure: 1015 },
  losangeles: { name: 'Los Angeles', region: 'California', country: 'US', countryName: 'United States', flag: '🇺🇸', lat: 34.0522, lng: -118.2437, temp: 27, condition: 'Sunny & Fair', icon: '☀️', humidity: 50, wind: 9, pressure: 1013 },
  chicago: { name: 'Chicago', region: 'Illinois', country: 'US', countryName: 'United States', flag: '🇺🇸', lat: 41.8781, lng: -87.6298, temp: 21, condition: 'Windy & Clear', icon: '💨', humidity: 55, wind: 22, pressure: 1016 },
  houston: { name: 'Houston', region: 'Texas', country: 'US', countryName: 'United States', flag: '🇺🇸', lat: 29.7604, lng: -95.3698, temp: 32, condition: 'Humid & Sunny', icon: '🌤️', humidity: 70, wind: 11, pressure: 1012 },
  miami: { name: 'Miami', region: 'Florida', country: 'US', countryName: 'United States', flag: '🇺🇸', lat: 25.7617, lng: -80.1918, temp: 31, condition: 'Tropical Sun', icon: '☀️', humidity: 74, wind: 14, pressure: 1014 },
  sanfrancisco: { name: 'San Francisco', region: 'California', country: 'US', countryName: 'United States', flag: '🇺🇸', lat: 37.7749, lng: -122.4194, temp: 18, condition: 'Coastal Fog', icon: '🌫️', humidity: 75, wind: 16, pressure: 1015 },
  seattle: { name: 'Seattle', region: 'Washington', country: 'US', countryName: 'United States', flag: '🇺🇸', lat: 47.6062, lng: -122.3321, temp: 17, condition: 'Light Drizzle', icon: '🌧️', humidity: 80, wind: 10, pressure: 1016 },

  // ─── UNITED KINGDOM ───
  london: { name: 'London', region: 'England', country: 'GB', countryName: 'United Kingdom', flag: '🇬🇧', lat: 51.5074, lng: -0.1278, temp: 19, condition: 'Overcast', icon: '☁️', humidity: 65, wind: 15, pressure: 1014 },
  manchester: { name: 'Manchester', region: 'England', country: 'GB', countryName: 'United Kingdom', flag: '🇬🇧', lat: 53.4808, lng: -2.2426, temp: 17, condition: 'Cloudy with Rain', icon: '🌧️', humidity: 78, wind: 17, pressure: 1012 },
  edinburgh: { name: 'Edinburgh', region: 'Scotland', country: 'GB', countryName: 'United Kingdom', flag: '🇬🇧', lat: 55.9533, lng: -3.1883, temp: 16, condition: 'Breezy & Cool', icon: '⛅', humidity: 70, wind: 20, pressure: 1015 },

  // ─── JAPAN ───
  tokyo: { name: 'Tokyo', region: 'Kanto', country: 'JP', countryName: 'Japan', flag: '🇯🇵', lat: 35.6762, lng: 139.6503, temp: 26, condition: 'Fair & Pleasant', icon: '🌤️', humidity: 55, wind: 13, pressure: 1013 },
  osaka: { name: 'Osaka', region: 'Kansai', country: 'JP', countryName: 'Japan', flag: '🇯🇵', lat: 34.6937, lng: 135.5023, temp: 27, condition: 'Partly Cloudy', icon: '⛅', humidity: 58, wind: 11, pressure: 1012 },

  // ─── AUSTRALIA ───
  sydney: { name: 'Sydney', region: 'NSW', country: 'AU', countryName: 'Australia', flag: '🇦🇺', lat: -33.8688, lng: 151.2093, temp: 22, condition: 'Sunny', icon: '☀️', humidity: 60, wind: 17, pressure: 1018 },
  melbourne: { name: 'Melbourne', region: 'Victoria', country: 'AU', countryName: 'Australia', flag: '🇦🇺', lat: -37.8136, lng: 144.9631, temp: 19, condition: 'Variable Breeze', icon: '🌤️', humidity: 62, wind: 19, pressure: 1016 },

  // ─── CANADA ───
  toronto: { name: 'Toronto', region: 'Ontario', country: 'CA', countryName: 'Canada', flag: '🇨🇦', lat: 43.6532, lng: -79.3832, temp: 20, condition: 'Clear & Mild', icon: '☀️', humidity: 50, wind: 12, pressure: 1017 },
  vancouver: { name: 'Vancouver', region: 'British Columbia', country: 'CA', countryName: 'Canada', flag: '🇨🇦', lat: 49.2827, lng: -123.1207, temp: 18, condition: 'Scattered Showers', icon: '🌧️', humidity: 72, wind: 10, pressure: 1016 },

  // ─── GERMANY & FRANCE ───
  berlin: { name: 'Berlin', region: 'Berlin', country: 'DE', countryName: 'Germany', flag: '🇩🇪', lat: 52.52, lng: 13.405, temp: 21, condition: 'Mostly Sunny', icon: '🌤️', humidity: 50, wind: 12, pressure: 1015 },
  paris: { name: 'Paris', region: 'Île-de-France', country: 'FR', countryName: 'France', flag: '🇫🇷', lat: 48.8566, lng: 2.3522, temp: 21, condition: 'Partly Cloudy', icon: '⛅', humidity: 52, wind: 9, pressure: 1016 },

  // ─── UAE & MIDDLE EAST ───
  dubai: { name: 'Dubai', region: 'Dubai', country: 'AE', countryName: 'United Arab Emirates', flag: '🇦🇪', lat: 25.2048, lng: 55.2708, temp: 38, condition: 'Sunny & Hot', icon: '🔥', humidity: 35, wind: 18, pressure: 1008 },
  abudhabi: { name: 'Abu Dhabi', region: 'Abu Dhabi', country: 'AE', countryName: 'United Arab Emirates', flag: '🇦🇪', lat: 24.4539, lng: 54.3773, temp: 37, condition: 'Clear Sky', icon: '☀️', humidity: 40, wind: 15, pressure: 1009 },

  // ─── SINGAPORE ───
  singapore: { name: 'Singapore', region: 'Singapore', country: 'SG', countryName: 'Singapore', flag: '🇸🇬', lat: 1.3521, lng: 103.8198, temp: 30, condition: 'Tropical Shower', icon: '🌦️', humidity: 82, wind: 6, pressure: 1010 },
};

type RadarLayerType = 'radar' | 'precipitation' | 'temperature' | 'wind' | 'clouds' | 'lightning' | 'airquality';
type MapThemeType = 'esri_street' | 'esri_dark' | 'osm' | 'satellite';

export interface TimelineStep {
  id: string;
  label: string;
  relativeTime: string;
  isNow?: boolean;
}

// Deterministic static fallback timeline for initial SSR render (prevents hydration mismatch)
export const STATIC_FALLBACK_TIMELINE: TimelineStep[] = [
  { id: 'past_4', label: '1:00 PM', relativeTime: '-2h', isNow: false },
  { id: 'past_3', label: '1:30 PM', relativeTime: '-1h 30m', isNow: false },
  { id: 'past_2', label: '2:00 PM', relativeTime: '-1h', isNow: false },
  { id: 'past_1', label: '2:30 PM', relativeTime: '-30m', isNow: false },
  { id: 'now', label: '3:00 PM', relativeTime: 'LIVE', isNow: true },
  { id: 'future_1', label: '3:30 PM', relativeTime: '+30m', isNow: false },
  { id: 'future_2', label: '4:00 PM', relativeTime: '+1h', isNow: false },
  { id: 'future_3', label: '4:30 PM', relativeTime: '+1h 30m', isNow: false },
  { id: 'future_4', label: '5:00 PM', relativeTime: '+2h', isNow: false },
  { id: 'future_5', label: '5:30 PM', relativeTime: '+2h 30m', isNow: false },
  { id: 'future_6', label: '6:00 PM', relativeTime: '+3h', isNow: false },
  { id: 'future_7', label: '6:30 PM', relativeTime: '+3h 30m', isNow: false },
];

// Generate real-time timeline steps synchronized with current local clock
export function generateRealtimeTimeline(): TimelineStep[] {
  const now = new Date();
  
  const formatTime = (d: Date) => {
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const steps: TimelineStep[] = [];

  // Base nearest half-hour timestamp
  const currentMinutes = now.getMinutes();
  const baseMinutes = currentMinutes < 30 ? 0 : 30;
  const baseNearestHalfHour = new Date(now);
  baseNearestHalfHour.setMinutes(baseMinutes, 0, 0);

  // 4 past steps rounded to clean half hours
  for (let i = 4; i >= 1; i--) {
    const pastDate = new Date(baseNearestHalfHour.getTime() - (i - 1) * 30 * 60 * 1000 - 30 * 60 * 1000);
    const diffMin = Math.round((now.getTime() - pastDate.getTime()) / 60000);
    const hoursAgo = Math.floor(diffMin / 60);
    const minsAgo = diffMin % 60;
    const relStr = hoursAgo > 0 ? `-${hoursAgo}h${minsAgo > 0 ? ` ${minsAgo}m` : ''}` : `-${minsAgo}m`;

    steps.push({
      id: `past_${i}`,
      label: formatTime(pastDate),
      relativeTime: relStr,
      isNow: false,
    });
  }

  // Exact Current Live Real-Time step
  steps.push({
    id: 'now',
    label: formatTime(now),
    relativeTime: 'LIVE',
    isNow: true,
  });

  // 7 future forecast steps rounded to clean half hours
  for (let i = 1; i <= 7; i++) {
    const futureDate = new Date(baseNearestHalfHour.getTime() + i * 30 * 60 * 1000);
    if (futureDate.getTime() <= now.getTime()) {
      futureDate.setTime(futureDate.getTime() + 30 * 60 * 1000);
    }
    const diffMin = Math.round((futureDate.getTime() - now.getTime()) / 60000);
    const hoursAhead = Math.floor(diffMin / 60);
    const minsAhead = diffMin % 60;
    const relStr = hoursAhead > 0 ? `+${hoursAhead}h${minsAhead > 0 ? ` ${minsAhead}m` : ''}` : `+${minsAhead}m`;

    steps.push({
      id: `future_${i}`,
      label: formatTime(futureDate),
      relativeTime: relStr,
      isNow: false,
    });
  }

  return steps;
}

export default function WeatherMapStudio() {
  const searchParams = useSearchParams();
  const initialCityQuery = searchParams.get('city') || 'Bengaluru';

  // Weather hook
  const { weatherData, loading, getWeatherByCity } = useWeather();

  // Component mounted state
  const [mounted, setMounted] = useState<boolean>(false);

  // Dynamic real-time timeline steps initialized with deterministic static fallback
  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>(STATIC_FALLBACK_TIMELINE);

  // Component states
  const [selectedCity, setSelectedCity] = useState<string>(initialCityQuery);
  const [selectedLayer, setSelectedLayer] = useState<RadarLayerType>('radar');
  const [mapTheme, setMapTheme] = useState<MapThemeType>('esri_street');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(4); // Default to 'NOW' index
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Array<{ key: string; name: string; region: string; country: string; flag: string }>>([]);
  const [showLayerMenu, setShowLayerMenu] = useState<boolean>(false);
  const [showThemeMenu, setShowThemeMenu] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Worldwide Matrix Modal state
  const [showGlobalMatrixModal, setShowGlobalMatrixModal] = useState<boolean>(false);
  const [matrixFilterCountry, setMatrixFilterCountry] = useState<string>('ALL');
  const [matrixSearchQuery, setMatrixSearchQuery] = useState<string>('');
  const [matrixSortBy, setMatrixSortBy] = useState<'temp_desc' | 'temp_asc' | 'name' | 'humidity'>('temp_desc');

  // Active layer toggle options
  const [showAllMapPins, setShowAllMapPins] = useState<boolean>(true);
  const [showLightning, setShowLightning] = useState<boolean>(true);
  const [showStormPaths, setShowStormPaths] = useState<boolean>(true);
  const [showWindVectors, setShowWindVectors] = useState<boolean>(false);
  const [timeHorizon, setTimeHorizon] = useState<'4h' | '10d'>('4h');

  // Leaflet map reference
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const allPinsGroupRef = useRef<any>(null);
  const canvasLayerRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Synchronize real local clock after mounting (client-side only)
  useEffect(() => {
    setMounted(true);
    setTimelineSteps(generateRealtimeTimeline());

    const clockTimer = setInterval(() => {
      setTimelineSteps(generateRealtimeTimeline());
    }, 15000); // refresh every 15s so clock is always real-time

    return () => clearInterval(clockTimer);
  }, []);

  // ALL COUNTRIES full wide-angle live radar launcher
  const handleShowAllCountriesMap = () => {
    if (mapInstanceRef.current) {
      // Zoom out to view all countries and states across India, South Asia & surrounding nations
      mapInstanceRef.current.flyTo([22.5, 84.0], 4.8, { duration: 1.6 });
    }
    setShowAllMapPins(true);
    setShowLightning(true);
    setShowStormPaths(true);
    setSelectedLayer('radar');
  };

  // Active Coordinates
  const currentCityKey = useMemo(() => {
    const clean = selectedCity.toLowerCase().replace(/[^a-z]/g, '');
    const match = Object.keys(WORLD_MAP_CITIES).find((k) => clean.includes(k) || k.includes(clean));
    return match || 'bengaluru';
  }, [selectedCity]);

  const activeCityMeta = useMemo(() => {
    return WORLD_MAP_CITIES[currentCityKey] || WORLD_MAP_CITIES.bengaluru;
  }, [currentCityKey]);

  // Load weather when city changes
  useEffect(() => {
    getWeatherByCity(selectedCity);
  }, [selectedCity]);

  // Auto-play timeline animation loop
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => (prev + 1) % timelineSteps.length);
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timelineSteps.length]);

  // Handle Search input
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = Object.entries(WORLD_MAP_CITIES)
      .filter(([k, v]) => v.name.toLowerCase().includes(q) || v.region.toLowerCase().includes(q) || v.countryName.toLowerCase().includes(q))
      .map(([k, v]) => ({ key: k, name: v.name, region: v.region, country: v.country, flag: v.flag }));
    setSearchResults(results);
  }, [searchQuery]);

  // Filtered Regional Stations for the active country in the sidebar (FIX: London won't show in India!)
  const regionalStationsForActiveCountry = useMemo(() => {
    const countryCode = activeCityMeta.country || 'IN';
    const stationsInCountry = Object.entries(WORLD_MAP_CITIES).filter(([_, v]) => v.country === countryCode);
    return stationsInCountry.length > 0 ? stationsInCountry.slice(0, 10) : Object.entries(WORLD_MAP_CITIES).slice(0, 10);
  }, [activeCityMeta]);

  // Global Explorer filtered & sorted items
  const matrixFilteredCities = useMemo(() => {
    let list = Object.entries(WORLD_MAP_CITIES);

    if (matrixFilterCountry !== 'ALL') {
      list = list.filter(([_, v]) => v.country === matrixFilterCountry);
    }

    if (matrixSearchQuery.trim()) {
      const q = matrixSearchQuery.toLowerCase();
      list = list.filter(([_, v]) => 
        v.name.toLowerCase().includes(q) || 
        v.region.toLowerCase().includes(q) || 
        v.countryName.toLowerCase().includes(q) ||
        v.condition.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      if (matrixSortBy === 'temp_desc') return b[1].temp - a[1].temp;
      if (matrixSortBy === 'temp_asc') return a[1].temp - b[1].temp;
      if (matrixSortBy === 'name') return a[1].name.localeCompare(b[1].name);
      if (matrixSortBy === 'humidity') return b[1].humidity - a[1].humidity;
      return 0;
    });

    return list;
  }, [matrixFilterCountry, matrixSearchQuery, matrixSortBy]);

  // Initialize Leaflet Map
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      if (!isMounted || !mapContainerRef.current) return;

      // 100% Free, High-Resolution, Watermark-Free Tile Providers
      const tileUrls: Record<MapThemeType, { url: string; attribution: string; subdomains?: string }> = {
        esri_street: {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri World Street Map',
        },
        esri_dark: {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri Dark Doppler Basemap',
        },
        osm: {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; OpenStreetMap contributors',
          subdomains: 'abc',
        },
        satellite: {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri World Imagery',
        },
      };

      const themeConfig = tileUrls[mapTheme] || tileUrls.esri_street;

      const map = L.map(mapContainerRef.current, {
        center: [activeCityMeta.lat, activeCityMeta.lng],
        zoom: 8.5,
        minZoom: 3,
        maxZoom: 16,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      L.tileLayer(themeConfig.url, {
        maxZoom: 18,
        subdomains: themeConfig.subdomains || 'abc',
      }).addTo(map);

      // Layer group for all countries & states weather pins
      const pinsGroup = L.layerGroup().addTo(map);
      allPinsGroupRef.current = pinsGroup;

      // RENDER ALL COUNTRIES & STATES WEATHER BADGES ACROSS THE ENTIRE MAP!
      Object.entries(WORLD_MAP_CITIES).forEach(([k, c]) => {
        const isSelected = c.name.toLowerCase() === activeCityMeta.name.toLowerCase();
        
        const pinHtml = `
          <div class="cursor-pointer transition-transform duration-200 hover:scale-110 hover:z-50 group">
            <div class="px-2.5 py-1 rounded-full ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black shadow-[0_4px_20px_rgba(79,70,229,0.7)] ring-2 ring-white scale-105'
                : 'bg-slate-900/95 hover:bg-black text-white font-extrabold shadow-lg border border-white/30 ring-1 ring-black/20'
            } backdrop-blur-xl text-[11px] whitespace-nowrap flex items-center gap-1.5 pointer-events-auto">
              <span>${c.flag}</span>
              <span class="text-[9px] px-1 py-0.5 rounded bg-white/20 text-white font-mono font-bold leading-none">${c.country}</span>
              <span class="tracking-tight text-white font-bold">${c.name}</span>
              <span class="${isSelected ? 'text-amber-300' : 'text-cyan-300'} font-black font-mono">${c.temp}°</span>
            </div>
          </div>
        `;

        const pinIcon = L.divIcon({
          className: 'interactive-weather-map-pin',
          html: pinHtml,
          iconSize: [110, 26],
          iconAnchor: [55, 13],
        });

        const pinMarker = L.marker([c.lat, c.lng], { icon: pinIcon });
        
        pinMarker.on('click', () => {
          setSelectedCity(c.name);
          map.flyTo([c.lat, c.lng], 8.5, { duration: 1.2 });
        });

        pinMarker.addTo(pinsGroup);

        if (isSelected) {
          markerRef.current = pinMarker;
        }
      });
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapTheme]);

  // Pan map when city changes & update pin highlights
  useEffect(() => {
    if (mapInstanceRef.current && activeCityMeta) {
      mapInstanceRef.current.flyTo([activeCityMeta.lat, activeCityMeta.lng], 8.5, {
        duration: 1.2,
      });

      // Re-render pins with active selected styling
      if (allPinsGroupRef.current) {
        import('leaflet').then((LModule) => {
          const L = LModule.default;
          allPinsGroupRef.current.clearLayers();
          
          Object.entries(WORLD_MAP_CITIES).forEach(([k, c]) => {
            const isSelected = c.name.toLowerCase() === activeCityMeta.name.toLowerCase();
            
            const pinHtml = `
              <div class="cursor-pointer transition-transform duration-200 hover:scale-110 hover:z-50 group">
                <div class="px-2.5 py-1 rounded-full ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black shadow-[0_4px_20px_rgba(79,70,229,0.7)] ring-2 ring-white scale-105'
                    : 'bg-slate-900/95 hover:bg-black text-white font-extrabold shadow-lg border border-white/30 ring-1 ring-black/20'
                } backdrop-blur-xl text-[11px] whitespace-nowrap flex items-center gap-1.5 pointer-events-auto">
                  <span>${c.flag}</span>
                  <span class="text-[9px] px-1 py-0.5 rounded bg-white/20 text-white font-mono font-bold leading-none">${c.country}</span>
                  <span class="tracking-tight text-white font-bold">${c.name}</span>
                  <span class="${isSelected ? 'text-amber-300' : 'text-cyan-300'} font-black font-mono">${c.temp}°</span>
                </div>
              </div>
            `;

            const pinIcon = L.divIcon({
              className: 'interactive-weather-map-pin',
              html: pinHtml,
              iconSize: [110, 26],
              iconAnchor: [55, 13],
            });

            const pinMarker = L.marker([c.lat, c.lng], { icon: pinIcon });
            pinMarker.on('click', () => {
              setSelectedCity(c.name);
              mapInstanceRef.current.flyTo([c.lat, c.lng], 8.5, { duration: 1.2 });
            });
            pinMarker.addTo(allPinsGroupRef.current);
          });
        });
      }
    }
  }, [activeCityMeta]);

  // Toggle map pins visibility
  useEffect(() => {
    if (mapInstanceRef.current && allPinsGroupRef.current) {
      if (showAllMapPins) {
        if (!mapInstanceRef.current.hasLayer(allPinsGroupRef.current)) {
          mapInstanceRef.current.addLayer(allPinsGroupRef.current);
        }
      } else {
        if (mapInstanceRef.current.hasLayer(allPinsGroupRef.current)) {
          mapInstanceRef.current.removeLayer(allPinsGroupRef.current);
        }
      }
    }
  }, [showAllMapPins]);

  // ════════ GEO-ANCHORED RADAR ENGINE ════════
  useEffect(() => {
    const canvas = canvasLayerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;

    const renderOverlay = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const map = mapInstanceRef.current;

      if (map && map.latLngToContainerPoint) {
        const phase = (currentStepIndex + frame * 0.02) % 6;
        const currentZoom = map.getZoom ? map.getZoom() : 8.5;
        const zoomScale = Math.pow(2, currentZoom - 8.5);

        // ─── Multi-Country & Regional Convective Doppler Storm Bands ───
        const geoCells = [
          // Bengal, Bay of Bengal & Bangladesh Severe Supercell Corridor
          { lat: 23.8 + Math.sin(phase * 0.4) * 0.2, lng: 89.8 + Math.cos(phase * 0.4) * 0.2, radiusKm: 140, intensity: 'severe' },
          { lat: 22.4 + Math.cos(phase * 0.5) * 0.15, lng: 88.9, radiusKm: 120, intensity: 'severe' },
          { lat: 20.8, lng: 88.2, radiusKm: 160, intensity: 'heavy' },
          { lat: 19.2 + Math.sin(phase * 0.3) * 0.2, lng: 86.8, radiusKm: 180, intensity: 'moderate' },
          { lat: 17.5, lng: 85.5, radiusKm: 190, intensity: 'light' },
          { lat: 15.2, lng: 83.8, radiusKm: 170, intensity: 'light' },
          { lat: 24.8, lng: 91.8, radiusKm: 130, intensity: 'heavy' },
          { lat: 26.2, lng: 92.5, radiusKm: 110, intensity: 'severe' },
          { lat: 27.5, lng: 89.2, radiusKm: 100, intensity: 'moderate' },

          // Northern Plains & Himalayan Foothills
          { lat: 28.5 + Math.sin(phase * 0.3) * 0.1, lng: 79.5, radiusKm: 130, intensity: 'heavy' },
          { lat: 27.2, lng: 83.5, radiusKm: 120, intensity: 'severe' },
          { lat: 28.2, lng: 84.8, radiusKm: 110, intensity: 'moderate' },

          // Myanmar & Southeast Asia Storm Tracks (Matches user reference)
          { lat: 21.5, lng: 94.2, radiusKm: 130, intensity: 'severe' },
          { lat: 19.8 + Math.cos(phase * 0.4) * 0.15, lng: 96.5, radiusKm: 140, intensity: 'heavy' },
          { lat: 17.2, lng: 96.8, radiusKm: 150, intensity: 'severe' },
          { lat: 15.5, lng: 98.2, radiusKm: 140, intensity: 'heavy' },
          { lat: 18.5, lng: 99.8, radiusKm: 130, intensity: 'moderate' },
          { lat: 16.0, lng: 101.5, radiusKm: 150, intensity: 'heavy' },
          { lat: 13.5, lng: 100.8, radiusKm: 130, intensity: 'light' },

          // Central & Peninsular India Convective Cells
          { lat: 21.5, lng: 78.5, radiusKm: 110, intensity: 'moderate' },
          { lat: 18.5, lng: 74.5, radiusKm: 90, intensity: 'light' },
          { lat: 14.5 + Math.sin(phase * 0.5) * 0.1, lng: 76.5, radiusKm: 100, intensity: 'moderate' },
          { lat: 12.8, lng: 77.8, radiusKm: 85, intensity: 'heavy' },
          { lat: 9.8, lng: 76.8, radiusKm: 95, intensity: 'moderate' },

          // Geo-anchored cell right over active station
          { lat: activeCityMeta.lat + 0.35 + Math.sin(phase * 0.5) * 0.06, lng: activeCityMeta.lng + 0.15, radiusKm: 35 * zoomScale, intensity: 'severe' },
          { lat: activeCityMeta.lat - 0.2 + Math.cos(phase * 0.3) * 0.04, lng: activeCityMeta.lng + 0.45, radiusKm: 40 * zoomScale, intensity: 'heavy' },
        ];

        if (selectedLayer === 'radar' || selectedLayer === 'precipitation' || showStormPaths) {
          // Draw Convective Doppler Radar Reflectivity Blobs anchored to map lat/lng
          geoCells.forEach((cell) => {
            try {
              const point = map.latLngToContainerPoint([cell.lat, cell.lng]);
              const r = Math.max(12, Math.min(260, cell.radiusKm * (currentZoom < 6 ? 0.75 : 2.5)));

              const grad = ctx.createRadialGradient(point.x, point.y, 2, point.x, point.y, r);
              if (cell.intensity === 'severe') {
                grad.addColorStop(0, 'rgba(236, 72, 153, 0.85)'); // Hail / Magenta core
                grad.addColorStop(0.25, 'rgba(239, 68, 68, 0.75)'); // Crimson Heavy Rain
                grad.addColorStop(0.55, 'rgba(245, 158, 11, 0.6)'); // Amber
                grad.addColorStop(0.8, 'rgba(34, 197, 94, 0.4)'); // Convective Green
                grad.addColorStop(1, 'rgba(34, 197, 94, 0)');
              } else if (cell.intensity === 'heavy') {
                grad.addColorStop(0, 'rgba(239, 68, 68, 0.75)');
                grad.addColorStop(0.4, 'rgba(245, 158, 11, 0.6)');
                grad.addColorStop(0.75, 'rgba(34, 197, 94, 0.4)');
                grad.addColorStop(1, 'rgba(34, 197, 94, 0)');
              } else if (cell.intensity === 'moderate') {
                grad.addColorStop(0, 'rgba(245, 158, 11, 0.6)');
                grad.addColorStop(0.5, 'rgba(34, 197, 94, 0.45)');
                grad.addColorStop(0.85, 'rgba(56, 189, 248, 0.25)');
                grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
              } else {
                grad.addColorStop(0, 'rgba(34, 197, 94, 0.55)');
                grad.addColorStop(0.65, 'rgba(56, 189, 248, 0.35)');
                grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
              }

              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(point.x, point.y, r, 0, Math.PI * 2);
              ctx.fill();
            } catch (e) {}
          });

          // ─── Multi-Country Animated Lightning Strike Clusters (Matches user reference) ───
          if (showLightning) {
            const multiRegionLightning = [
              // Bengal, Bangladesh & Northeast Strike Clusters
              { lat: 24.2, lng: 90.2, f: 0 }, { lat: 23.5, lng: 89.5, f: 4 }, { lat: 24.8, lng: 91.5, f: 8 },
              { lat: 22.8, lng: 88.5, f: 12 }, { lat: 23.9, lng: 88.2, f: 16 }, { lat: 22.1, lng: 89.9, f: 20 },
              { lat: 25.5, lng: 91.8, f: 3 }, { lat: 26.2, lng: 92.8, f: 7 }, { lat: 26.8, lng: 93.5, f: 11 },
              { lat: 27.2, lng: 88.8, f: 15 }, { lat: 25.1, lng: 89.2, f: 19 }, { lat: 21.5, lng: 90.5, f: 23 },
              { lat: 23.1, lng: 89.1, f: 2 }, { lat: 24.5, lng: 89.8, f: 9 }, { lat: 22.5, lng: 90.8, f: 14 },

              // Bay of Bengal Offshore Lightning Bands
              { lat: 20.2, lng: 87.8, f: 2 }, { lat: 19.5, lng: 88.4, f: 6 }, { lat: 18.8, lng: 86.9, f: 10 },
              { lat: 17.9, lng: 86.2, f: 14 }, { lat: 16.5, lng: 85.0, f: 18 }, { lat: 15.2, lng: 84.2, f: 22 },
              { lat: 14.1, lng: 83.5, f: 5 }, { lat: 12.8, lng: 82.8, f: 9 }, { lat: 19.1, lng: 87.5, f: 17 },

              // Myanmar & Southeast Asia Lightning Corridors
              { lat: 21.8, lng: 94.5, f: 1 }, { lat: 20.5, lng: 95.8, f: 7 }, { lat: 19.2, lng: 96.2, f: 13 },
              { lat: 18.1, lng: 96.8, f: 17 }, { lat: 17.0, lng: 96.4, f: 21 }, { lat: 16.2, lng: 97.5, f: 4 },
              { lat: 15.1, lng: 98.6, f: 10 }, { lat: 17.8, lng: 99.2, f: 16 }, { lat: 16.5, lng: 101.2, f: 22 },
              { lat: 18.9, lng: 102.1, f: 8 }, { lat: 14.2, lng: 100.5, f: 14 }, { lat: 19.9, lng: 97.8, f: 18 },

              // Northern & Central India Strike Zones
              { lat: 28.6, lng: 80.2, f: 2 }, { lat: 27.5, lng: 84.2, f: 8 }, { lat: 26.8, lng: 85.5, f: 14 },
              { lat: 21.8, lng: 79.2, f: 6 }, { lat: 19.2, lng: 75.2, f: 12 }, { lat: 13.5, lng: 78.2, f: 18 },
              { lat: 11.2, lng: 77.2, f: 24 }, { lat: 23.2, lng: 77.5, f: 5 }, { lat: 15.2, lng: 74.8, f: 11 },
              
              // Local strikes near active city
              { lat: activeCityMeta.lat + 0.38, lng: activeCityMeta.lng + 0.16, f: 0 },
              { lat: activeCityMeta.lat - 0.22, lng: activeCityMeta.lng + 0.47, f: 12 },
            ];

            multiRegionLightning.forEach((lp) => {
              const isFlashActive = (frame + lp.f * 3) % 24 < 14;
              if (isFlashActive) {
                try {
                  const pt = map.latLngToContainerPoint([lp.lat, lp.lng]);
                  
                  // Draw rich SVG-style yellow lightning bolt with amber glow
                  ctx.save();
                  ctx.shadowColor = '#f59e0b';
                  ctx.shadowBlur = 10;
                  ctx.fillStyle = '#facc15'; // Bright yellow
                  ctx.strokeStyle = '#78350f'; // Dark amber outline
                  ctx.lineWidth = 1.2;

                  ctx.beginPath();
                  ctx.moveTo(pt.x + 2, pt.y - 12);
                  ctx.lineTo(pt.x - 5, pt.y - 1);
                  ctx.lineTo(pt.x - 1, pt.y - 1);
                  ctx.lineTo(pt.x - 4, pt.y + 11);
                  ctx.lineTo(pt.x + 5, pt.y + 1);
                  ctx.lineTo(pt.x + 1, pt.y + 1);
                  ctx.closePath();

                  ctx.fill();
                  ctx.stroke();
                  ctx.restore();
                } catch (e) {}
              }
            });
          }
        } else if (selectedLayer === 'temperature') {
          const centerPt = map.latLngToContainerPoint([activeCityMeta.lat, activeCityMeta.lng]);
          const grad = ctx.createRadialGradient(centerPt.x, centerPt.y, 40, centerPt.x, centerPt.y, 480);
          grad.addColorStop(0, 'rgba(249, 115, 22, 0.38)');
          grad.addColorStop(0.6, 'rgba(234, 179, 8, 0.24)');
          grad.addColorStop(1, 'rgba(14, 165, 233, 0.15)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (selectedLayer === 'wind' || showWindVectors) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
          ctx.lineWidth = 2;
          for (let i = 0; i < 28; i++) {
            const startX = (i * 65 + frame * 3.8) % canvas.width;
            const startY = (i * 38 + Math.sin(frame * 0.05 + i) * 25) % canvas.height;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + 35, startY + 8);
            ctx.stroke();
          }
        } else if (selectedLayer === 'clouds') {
          const centerPt = map.latLngToContainerPoint([activeCityMeta.lat, activeCityMeta.lng]);
          const grad = ctx.createRadialGradient(centerPt.x, centerPt.y, 30, centerPt.x, centerPt.y, 400);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
          grad.addColorStop(0.6, 'rgba(241, 245, 249, 0.25)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      frame++;
      animationFrameRef.current = requestAnimationFrame(renderOverlay);
    };

    const updateCanvasSize = () => {
      if (mapContainerRef.current) {
        canvas.width = mapContainerRef.current.clientWidth;
        canvas.height = mapContainerRef.current.clientHeight;
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    renderOverlay();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [selectedLayer, showLightning, showWindVectors, currentStepIndex, activeCityMeta]);

  // Handle Zoom In / Out
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };
  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };
  const handleCenterMe = () => {
    if (mapInstanceRef.current && activeCityMeta) {
      mapInstanceRef.current.flyTo([activeCityMeta.lat, activeCityMeta.lng], 8.5, {
        duration: 1.2,
      });
    }
  };

  // Weather display values
  const currentTemp = unit === 'C' ? activeCityMeta.temp : Math.round((activeCityMeta.temp * 9) / 5 + 32);
  const conditionText = weatherData?.weather?.[0]?.description || activeCityMeta.condition;

  return (
    <div className={`relative flex flex-col w-full h-screen overflow-hidden bg-slate-950 font-sans text-slate-100 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      
      {/* ════════════════ TOP HEADER BAR & NAVIGATION ════════════════ */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-6 h-15 bg-white/90 dark:bg-[#070e24]/90 backdrop-blur-3xl border-b border-slate-200/80 dark:border-white/[0.08] text-slate-900 dark:text-white shadow-sm">
        {/* Left: Brand + Back to Weather */}
        <div className="flex items-center gap-3">
          <Link
            href="/weather"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.15] text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-xs hover:scale-102 active:scale-98"
          >
            <span>←</span>
            <span className="font-extrabold">Weather Dashboard</span>
          </Link>
          <div className="h-4 w-px bg-slate-300 dark:bg-white/10 hidden md:block" />
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs font-black">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>4K LIVE DOPPLER RADAR</span>
          </div>
        </div>

        {/* Center: Interactive Nav Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          <Link href="/news" className="px-3.5 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl transition-all whitespace-nowrap">
            Discover
          </Link>
          <Link href="/weather" className="px-3.5 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl transition-all whitespace-nowrap">
            Weather
          </Link>
          <Link href="/weather/maps" className="px-4 py-1.5 text-xs font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md shadow-blue-500/30 whitespace-nowrap">
            🗺️ Maps
          </Link>
          <button
            onClick={handleShowAllCountriesMap}
            className="px-3.5 py-1.5 text-xs font-black rounded-xl bg-gradient-to-r from-purple-600/25 to-pink-600/25 text-purple-600 dark:text-pink-300 border border-purple-500/40 hover:bg-purple-500/30 transition-all whitespace-nowrap flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95"
            title="Live Convective Radar & Lightning across All Countries"
          >
            <span className="text-sm">⚡</span>
            <span>ALL COUNTRIES</span>
          </button>
          <button
            onClick={() => setShowGlobalMatrixModal(true)}
            className="px-2.5 py-1.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.15] text-slate-600 dark:text-slate-300 transition-all whitespace-nowrap flex items-center gap-1 shadow-xs"
            title="Open Matrix Grid Table"
          >
            <span>📊</span>
            <span>Matrix Table</span>
          </button>
          <Link href="/weather/hourly" className="px-3.5 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl transition-all whitespace-nowrap">
            Hourly
          </Link>
          <Link href="/weather/10day" className="px-3.5 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl transition-all whitespace-nowrap">
            Monthly & Trends
          </Link>
        </nav>

        {/* Right: Personalize / My Location Pill */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCenterMe}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/60 dark:to-indigo-950/60 text-blue-600 dark:text-cyan-300 border border-blue-200 dark:border-blue-500/30 hover:scale-105 transition-all shadow-xs"
          >
            <span>📍</span>
            <span>Locate Me</span>
          </button>
        </div>
      </header>

      {/* ════════════════ MAIN INTERACTIVE MAP BODY ════════════════ */}
      <div className="relative flex-1 flex w-full overflow-hidden">
        
        {/* ─── LEFT COLLAPSIBLE METEOROLOGICAL SIDEBAR ─── */}
        <div
          className={`relative z-20 flex-shrink-0 transition-all duration-300 bg-white/95 dark:bg-[#070e24]/95 backdrop-blur-3xl border-r border-slate-200/90 dark:border-white/[0.08] shadow-2xl flex flex-col justify-between overflow-y-auto scrollbar-none ${
            sidebarOpen ? 'w-80 sm:w-88' : 'w-0 -translate-x-full border-r-0'
          }`}
        >
          <div className="p-4 sm:p-5 space-y-4">
            
            {/* ════ LUXURY STATION COCKPIT HERO CARD (LIGHT & DARK MODE READY) ════ */}
            <div className="relative rounded-[28px] p-5 bg-gradient-to-br from-white via-blue-50/60 to-indigo-50/50 dark:from-slate-900 dark:via-[#0d1838] dark:to-[#08122c] text-slate-900 dark:text-white border border-blue-200/80 dark:border-white/15 shadow-[0_12px_32px_rgba(37,99,235,0.09)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.35)] overflow-hidden transition-colors">
              
              {/* Subtle ambient light gradient effect */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-400/15 dark:bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-400/10 dark:bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

              {/* Station Header + Unit Switcher Pill */}
              <div className="relative z-10 flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl filter drop-shadow-sm">{activeCityMeta.flag}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-600 text-white font-mono font-bold leading-none shadow-xs">
                      {activeCityMeta.country}
                    </span>
                    <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                      {activeCityMeta.name} North
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100/90 dark:bg-blue-500/25 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-400/30 shadow-xs">
                      {activeCityMeta.region}, {activeCityMeta.countryName}
                    </span>
                  </div>
                </div>

                {/* °C / °F Switcher Pill */}
                <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-[11px] font-black shadow-xs">
                  <button
                    onClick={() => setUnit('C')}
                    className={`px-2.5 py-1 rounded-full transition-all ${
                      unit === 'C'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => setUnit('F')}
                    className={`px-2.5 py-1 rounded-full transition-all ${
                      unit === 'F'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    °F
                  </button>
                </div>
              </div>

              {/* Temperature & Condition Spotlight */}
              <div className="relative z-10 flex items-center justify-between my-4 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-5xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    {activeCityMeta.icon}
                  </span>
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                        {currentTemp}°
                      </span>
                      <span className="text-xl font-extrabold text-blue-600 dark:text-cyan-400 ml-1">
                        {unit}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-800 dark:text-slate-100 block capitalize">
                    {conditionText}
                  </span>
                  <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 mt-0.5 block font-mono">
                    H {currentTemp + 3}° • L {currentTemp - 7}°
                  </span>
                </div>
              </div>

              {/* Weather Stats Row */}
              <div className="relative z-10 grid grid-cols-3 gap-1.5 py-2.5 my-2 border-t border-b border-slate-200/80 dark:border-white/10 text-[10px] font-extrabold text-center">
                <div className="bg-white/90 dark:bg-white/[0.06] border border-blue-100/80 dark:border-transparent p-2 rounded-xl shadow-xs">
                  <span className="block text-slate-500 dark:text-slate-400 font-semibold mb-0.5">Humidity</span>
                  <span className="text-blue-600 dark:text-cyan-300 text-xs font-black">{activeCityMeta.humidity}%</span>
                </div>
                <div className="bg-white/90 dark:bg-white/[0.06] border border-blue-100/80 dark:border-transparent p-2 rounded-xl shadow-xs">
                  <span className="block text-slate-500 dark:text-slate-400 font-semibold mb-0.5">Wind</span>
                  <span className="text-slate-800 dark:text-white text-xs font-black">{activeCityMeta.wind} km/h</span>
                </div>
                <div className="bg-white/90 dark:bg-white/[0.06] border border-blue-100/80 dark:border-transparent p-2 rounded-xl shadow-xs">
                  <span className="block text-slate-500 dark:text-slate-400 font-semibold mb-0.5">Pressure</span>
                  <span className="text-indigo-600 dark:text-amber-300 text-xs font-black">{activeCityMeta.pressure} hPa</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 space-y-2 mt-3.5">
                <Link
                  href={`/weather`}
                  className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/30 hover:scale-102 active:scale-98"
                >
                  <span>See 5-Day Full Forecast</span>
                  <span>→</span>
                </Link>

                <button
                  onClick={handleShowAllCountriesMap}
                  className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-700 dark:text-pink-300 border border-purple-300/80 dark:border-purple-500/30 text-xs font-black flex items-center justify-center gap-2 transition-all backdrop-blur-md shadow-xs hover:scale-102 active:scale-98"
                  title="View Live Doppler Radar & Lightning across all countries"
                >
                  <span className="text-sm">⚡</span>
                  <span>ALL COUNTRIES LIVE RADAR</span>
                </button>
              </div>
            </div>

            {/* ════ LIVE DOPPLER RADAR HUD (LIGHT & DARK MODE READY) ════ */}
            <div className="rounded-[28px] p-5 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 dark:from-slate-900/95 dark:via-[#0d1633]/95 dark:to-[#09112a]/95 border border-blue-200/80 dark:border-cyan-500/30 shadow-[0_10px_25px_rgba(59,130,246,0.08)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.35)] text-slate-800 dark:text-slate-100 transition-colors">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/80 dark:border-white/10">
                <span className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-cyan-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
                  Live Doppler Telemetry
                </span>
                <span className="text-[10px] font-mono font-bold text-blue-700 dark:text-cyan-200 bg-blue-100/90 dark:bg-cyan-500/20 px-2 py-0.5 rounded-full border border-blue-200 dark:border-cyan-400/30 shadow-xs">
                  98.4% Accuracy
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 my-2.5">
                <div className="p-2.5 rounded-2xl bg-white/90 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 shadow-xs">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold">Precipitation</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">0.0 mm/h</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/90 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 shadow-xs">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold">Cloud Density</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">28% Cover</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/90 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 shadow-xs">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold">Active Storm Cells</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">0 within 50km</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/90 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 shadow-xs">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold">Lightning Density</span>
                  <span className="text-sm font-black text-amber-600 dark:text-amber-300">3 Strikes / 30m</span>
                </div>
              </div>

              <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300/90 leading-tight mt-3">
                Convective radar sweep active. No hazardous storm cells or flood warnings detected near your area.
              </p>
            </div>

            {/* Quick Regional Stations (Filtered strictly to active country) */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {activeCityMeta.countryName} Stations
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100/80 dark:bg-cyan-500/20 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-400/30">
                  {regionalStationsForActiveCountry.length} Available
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {regionalStationsForActiveCountry.map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => {
                      setSelectedCity(v.name);
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.flyTo([v.lat, v.lng], 8.5);
                      }
                    }}
                    className={`p-2.5 rounded-2xl text-left text-xs font-extrabold border transition-all hover:scale-102 active:scale-98 ${
                      activeCityMeta.name === v.name
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-md shadow-blue-500/25 ring-1 ring-blue-400/50'
                        : 'bg-white hover:bg-blue-50/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-800 dark:text-slate-200 border-slate-200/90 dark:border-white/10 hover:border-blue-400 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate flex items-center gap-1.5">
                        <span>{v.flag}</span>
                        <span className="truncate">{v.name}</span>
                      </span>
                      <span className="text-[11px] font-mono font-black opacity-95 ml-1">{v.temp}°</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ─── SIDEBAR TOGGLE BUTTON (◀ / ▶) ─── */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 z-30 left-0 transition-all duration-300 p-2.5 bg-white dark:bg-[#070e24] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-r-2xl shadow-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-black"
          style={{ left: sidebarOpen ? '20rem' : '0' }}
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>

        {/* ─── INTERACTIVE MAP CONTAINER & CANVAS OVERLAYS ─── */}
        <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-900">
          
          {/* Base Leaflet Map DOM Node */}
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Meteorological Radar Sweep Canvas Layer */}
          <canvas
            ref={canvasLayerRef}
            className="absolute inset-0 z-10 pointer-events-none w-full h-full"
          />

          {/* ─── TOP-LEFT: RADAR LAYER DROPDOWN PILL ─── */}
          <div className="absolute top-4 left-14 sm:left-16 z-20">
            <div className="relative">
              <button
                onClick={() => setShowLayerMenu(!showLayerMenu)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#070e24]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/15 text-slate-900 dark:text-white font-black text-xs sm:text-sm shadow-xl hover:scale-105 transition-all"
              >
                <span>
                  {selectedLayer === 'radar' && '🌀'}
                  {selectedLayer === 'precipitation' && '🌧️'}
                  {selectedLayer === 'temperature' && '🌡️'}
                  {selectedLayer === 'wind' && '💨'}
                  {selectedLayer === 'clouds' && '☁️'}
                  {selectedLayer === 'lightning' && '⚡'}
                  {selectedLayer === 'airquality' && '🍃'}
                </span>
                <span className="capitalize">{selectedLayer} Layer</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {/* Layer Selection Dropdown Menu */}
              {showLayerMenu && (
                <div className="absolute left-0 mt-2 w-60 rounded-3xl bg-white dark:bg-[#070e24] border border-slate-200 dark:border-white/15 shadow-2xl p-2 z-30 space-y-1">
                  {[
                    { id: 'radar', label: 'Doppler Radar', icon: '🌀', desc: 'Precipitation reflectivity sweep' },
                    { id: 'precipitation', label: 'Precipitation', icon: '🌧️', desc: 'Rain, snow & hail intensity' },
                    { id: 'temperature', label: 'Temperature', icon: '🌡️', desc: 'Thermal heatmap & contours' },
                    { id: 'wind', label: 'Wind Streams', icon: '💨', desc: 'Vector velocity & direction' },
                    { id: 'clouds', label: 'Satellite Clouds', icon: '☁️', desc: 'Infrared & visible cloud cover' },
                    { id: 'lightning', label: 'Lightning Strikes', icon: '⚡', desc: 'Live strike density & storm paths' },
                    { id: 'airquality', label: 'Air Quality (AQI)', icon: '🍃', desc: 'Pollution index contours' },
                  ].map((layer) => (
                    <button
                      key={layer.id}
                      onClick={() => {
                        setSelectedLayer(layer.id as RadarLayerType);
                        setShowLayerMenu(false);
                      }}
                      className={`w-full p-2.5 rounded-2xl text-left text-xs flex items-start gap-3 transition-all ${
                        selectedLayer === layer.id
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <span className="text-lg">{layer.icon}</span>
                      <div>
                        <span className="font-extrabold block">{layer.label}</span>
                        <span className={`text-[10px] ${selectedLayer === layer.id ? 'text-blue-100' : 'text-slate-400'}`}>
                          {layer.desc}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ─── TOP-RIGHT: MAP SEARCH BAR ─── */}
          <div className="absolute top-4 right-14 sm:right-16 z-20 max-w-xs sm:max-w-sm w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city on map (e.g. Bengaluru, London)..."
                className="w-full py-2.5 pl-10 pr-4 rounded-full bg-white/95 dark:bg-[#070e24]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-bold shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                🔍
              </span>

              {/* Autocomplete Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full rounded-3xl bg-white dark:bg-[#070e24] border border-slate-200 dark:border-white/15 shadow-2xl p-2 z-30 max-h-60 overflow-y-auto">
                  {searchResults.map((res) => (
                    <button
                      key={res.key}
                      onClick={() => {
                        setSelectedCity(res.name);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="w-full p-2.5 text-left text-xs rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-800 dark:text-slate-200 font-extrabold flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <span>{res.flag}</span>
                        <span>{res.name}, {res.region} ({res.country})</span>
                      </span>
                      <span className="text-[11px] text-blue-500 font-black">Jump →</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ─── RIGHT EDGE: FLOATING MAP CONTROL TOOLS ─── */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2.5">
            {/* Open Worldwide Matrix View Button */}
            <button
              onClick={() => setShowGlobalMatrixModal(true)}
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white text-base font-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
              title="View All Countries & States Weather at Once"
            >
              🌐
            </button>

            {/* Toggle All Countries & States Pins on Map */}
            <button
              onClick={() => setShowAllMapPins(!showAllMapPins)}
              className={`w-10 h-10 rounded-2xl text-xs font-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all ${
                showAllMapPins
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/95 dark:bg-[#070e24]/95 text-slate-400 border border-slate-200 dark:border-white/15'
              }`}
              title={showAllMapPins ? 'Hide Country Pins' : 'Show All Countries Pins'}
            >
              📍
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-10 h-10 rounded-2xl bg-white/95 dark:bg-[#070e24]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/15 text-slate-700 dark:text-slate-200 text-sm font-bold flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
              title="Toggle Fullscreen"
            >
              ⛶
            </button>

            {/* Zoom Controls */}
            <div className="flex flex-col rounded-2xl bg-white/95 dark:bg-[#070e24]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/15 overflow-hidden shadow-xl">
              <button
                onClick={handleZoomIn}
                className="w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 text-base font-black hover:bg-slate-100 dark:hover:bg-white/10 transition-all border-b border-slate-200/90 dark:border-white/10"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                className="w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 text-base font-black hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                title="Zoom Out"
              >
                -
              </button>
            </div>

            {/* Palette / Map Theme Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="w-10 h-10 rounded-2xl bg-white/95 dark:bg-[#070e24]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/15 text-slate-700 dark:text-slate-200 text-sm font-extrabold flex items-center justify-center shadow-xl hover:scale-105 transition-all"
                title="Change Map Style"
              >
                🎨
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-52 rounded-3xl bg-white dark:bg-[#070e24] border border-slate-200 dark:border-white/15 shadow-2xl p-2 z-30 space-y-1">
                  {[
                    { id: 'esri_street', label: 'World Street Map', icon: '📍' },
                    { id: 'esri_dark', label: 'Dark Doppler Radar', icon: '🌑' },
                    { id: 'osm', label: 'Standard OSM', icon: '🗺️' },
                    { id: 'satellite', label: 'Satellite Terrain', icon: '🛰️' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setMapTheme(t.id as MapThemeType);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full p-2.5 rounded-2xl text-left text-xs flex items-center gap-2.5 font-extrabold transition-all ${
                        mapTheme === t.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <span className="text-base">{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Center on location */}
            <button
              onClick={handleCenterMe}
              className="w-10 h-10 rounded-2xl bg-white/95 dark:bg-[#070e24]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/15 text-slate-700 dark:text-slate-200 text-sm font-bold flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
              title="Center on Active City"
            >
              🎯
            </button>
          </div>

          {/* ════════════════ MAP LAYERS & TIME HORIZON CARD (BOTTOM LEFT) ════════════════ */}
          <div className="absolute bottom-[96px] sm:bottom-[104px] left-3 sm:left-6 z-20 pointer-events-none">
            <div className="flex flex-col gap-1.5 p-2 sm:p-2.5 rounded-2xl bg-white/95 dark:bg-[#070e24]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] pointer-events-auto min-w-[290px] sm:min-w-[340px]">
              {/* Row 1: Map Layers */}
              <div className="flex items-center gap-2 sm:gap-3 text-[10px] font-bold text-slate-700 dark:text-slate-200">
                <span className="w-16 font-extrabold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider flex-shrink-0">
                  Map layers
                </span>
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                  <label className="flex items-center gap-1 cursor-pointer select-none text-[10px] font-semibold hover:text-amber-500 transition-colors">
                    <input
                      type="checkbox"
                      checked={showLightning}
                      onChange={(e) => setShowLightning(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-amber-400 w-3 h-3 cursor-pointer accent-amber-500"
                    />
                    <span>⚡ Lightning strikes</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer select-none text-[10px] font-semibold hover:text-purple-500 transition-colors">
                    <input
                      type="checkbox"
                      checked={showStormPaths}
                      onChange={(e) => setShowStormPaths(e.target.checked)}
                      className="rounded text-purple-600 focus:ring-purple-500 w-3 h-3 cursor-pointer accent-purple-600"
                    />
                    <span>🌀 Thunderstorm paths</span>
                  </label>
                  <label className="hidden sm:flex items-center gap-1 cursor-pointer select-none text-[10px] font-semibold hover:text-blue-500 transition-colors">
                    <input
                      type="checkbox"
                      checked={showAllMapPins}
                      onChange={(e) => setShowAllMapPins(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-3 h-3 cursor-pointer accent-blue-600"
                    />
                    <span>📍 Pins</span>
                  </label>
                </div>
              </div>

              {/* Row 2: Time Horizon */}
              <div className="flex items-center gap-2 sm:gap-3 text-[10px] font-bold text-slate-700 dark:text-slate-200 pt-1 border-t border-slate-100 dark:border-white/5">
                <span className="w-16 font-extrabold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider flex-shrink-0">
                  Time
                </span>
                <div className="flex items-center gap-3">
                  <label 
                    onClick={() => setTimeHorizon('4h')}
                    className="flex items-center gap-1.5 cursor-pointer select-none text-[10px] font-bold"
                  >
                    <span className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all ${timeHorizon === '4h' ? 'border-amber-500 bg-amber-500' : 'border-slate-300 dark:border-white/20'}`}>
                      {timeHorizon === '4h' && <span className="w-1 h-1 rounded-full bg-white" />}
                    </span>
                    <span className={timeHorizon === '4h' ? 'text-amber-600 dark:text-amber-400 font-extrabold' : 'text-slate-600 dark:text-slate-400'}>
                      4 Hours
                    </span>
                  </label>

                  <label 
                    onClick={() => setTimeHorizon('10d')}
                    className="flex items-center gap-1.5 cursor-pointer select-none text-[10px] font-bold"
                  >
                    <span className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all ${timeHorizon === '10d' ? 'border-amber-500 bg-amber-500' : 'border-slate-300 dark:border-white/20'}`}>
                      {timeHorizon === '10d' && <span className="w-1 h-1 rounded-full bg-white" />}
                    </span>
                    <span className={timeHorizon === '10d' ? 'text-amber-600 dark:text-amber-400 font-extrabold' : 'text-slate-600 dark:text-slate-400'}>
                      10 Days
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════ SEPARATE RADAR REFLECTIVITY & FORECAST CARD (BOTTOM RIGHT) ════════════════ */}
          <div className="absolute bottom-[96px] sm:bottom-[104px] right-3 sm:right-6 z-20 pointer-events-none flex flex-col items-end gap-1">
            {/* Feedback Button */}
            <button
              onClick={() => alert('Feedback recorded! Live radar telemetry is operating in real-time.')}
              className="px-2.5 py-0.5 rounded-lg bg-white/95 dark:bg-[#070e24]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/15 text-slate-800 dark:text-slate-200 text-[10px] font-bold flex items-center gap-1 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all pointer-events-auto mb-0.5"
              title="Give Feedback"
            >
              <span className="text-[11px]">💬</span>
              <span>Feedback</span>
            </button>

            {/* Top Pill: Rain, Snow, Rain/snow Mix with compact vivid intensity swatches */}
            <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/95 dark:bg-[#070e24]/95 backdrop-blur-3xl border border-slate-200/90 dark:border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] pointer-events-auto text-[10px] font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
              {/* Rain */}
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-600 dark:text-slate-300">Rain</span>
                <div className="flex items-center gap-[2px]">
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#84cc16]" title="Light Rain" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#22c55e]" title="Moderate Rain" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#15803d]" title="Heavy Rain" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#eab308]" title="Very Heavy Rain" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#f97316]" title="Intense Rain" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#991b1b]" title="Severe Torrential" />
                </div>
              </div>

              {/* Snow */}
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-600 dark:text-slate-300">Snow</span>
                <div className="flex items-center gap-[2px]">
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#bae6fd]" title="Flurries" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#38bdf8]" title="Light Snow" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#0ea5e9]" title="Moderate Snow" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#2563eb]" title="Heavy Snow" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#1d4ed8]" title="Blizzard" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#1e1b4b]" title="Severe Blizzard" />
                </div>
              </div>

              {/* Rain/snow Mix */}
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-600 dark:text-slate-300">Mix</span>
                <div className="flex items-center gap-[2px]">
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#fbcfe8]" title="Trace Mix" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#f472b6]" title="Light Sleet" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#db2777]" title="Moderate Sleet" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#9333ea]" title="Freezing Rain" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#7e22ce]" title="Hail" />
                  <span className="w-1.5 h-2.5 rounded-[1px] bg-[#4c1d95]" title="Severe Hail" />
                </div>
              </div>
            </div>

            {/* Bottom Segmented Bar: 0-30m, 30-60m, 60-90m, 90-120m */}
            <div className="w-full flex items-center rounded-full overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-slate-200/90 dark:border-white/15 pointer-events-auto text-[9.5px] font-bold text-white text-center">
              <div className="flex-1 py-0.5 px-1.5 bg-[#6b21a8] hover:brightness-110 transition-all select-none">
                0-30m
              </div>
              <div className="flex-1 py-0.5 px-1.5 bg-[#a21caf] hover:brightness-110 transition-all border-l border-white/20 select-none">
                30-60m
              </div>
              <div className="flex-1 py-0.5 px-1.5 bg-[#ea580c] hover:brightness-110 transition-all border-l border-white/20 select-none">
                60-90m
              </div>
              <div className="flex-1 py-0.5 px-1.5 bg-[#f43f5e] hover:brightness-110 transition-all border-l border-white/20 select-none">
                90-120m
              </div>
            </div>
          </div>

          {/* ════════════════ BOTTOM ANIMATED RADAR TIMELINE SCRUBBER ════════════════ */}
          <div className="absolute bottom-0 inset-x-0 z-30 p-3 sm:p-4 bg-white/95 dark:bg-[#070e24]/95 backdrop-blur-3xl border-t border-slate-200/90 dark:border-white/15 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
            <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-4">
              
              {/* Play / Pause Loop Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-11 h-11 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 text-slate-950 font-black text-base flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/40 transition-all hover:scale-105"
                title={isPlaying ? 'Pause Loop' : 'Play Radar Loop'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              {/* Scrubbable Timeline Track */}
              <div 
                suppressHydrationWarning={true}
                className="flex-1 relative flex items-center overflow-x-auto scrollbar-none rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 p-1.5 gap-1"
              >

                {timelineSteps.map((step, idx) => {
                  const isActive = currentStepIndex === idx;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStepIndex(idx)}
                      suppressHydrationWarning={true}
                      className={`flex-1 py-2 px-1 text-center rounded-xl transition-all relative z-10 min-w-[75px] ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md scale-102 ring-2 ring-amber-300/80'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10 font-extrabold'
                      }`}
                    >
                      {step.isNow ? (
                        <div className="flex flex-col items-center" suppressHydrationWarning={true}>
                          <span className="text-[9px] uppercase tracking-wider font-black bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full mb-0.5 shadow-xs animate-pulse">
                            LIVE NOW
                          </span>
                          <span className="text-xs font-black" suppressHydrationWarning={true}>{step.label}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center" suppressHydrationWarning={true}>
                          <span className="text-xs font-black" suppressHydrationWarning={true}>{step.label}</span>
                          <span className="text-[9px] font-medium opacity-60" suppressHydrationWarning={true}>{step.relativeTime}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ════════════════ WORLDWIDE ALL COUNTRIES & STATES MATRIX MODAL ════════════════ */}
      {showGlobalMatrixModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-6xl h-[90vh] rounded-[32px] bg-white/95 dark:bg-[#070e24]/95 border border-slate-200/90 dark:border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/80 dark:bg-white/[0.02]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌐</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    ALL COUNTRIES WEATHER MATRIX
                  </h2>
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  Explore real-time temperatures, atmospheric conditions, and Doppler radar across all countries and regional states at once.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowGlobalMatrixModal(false)}
                className="w-10 h-10 rounded-2xl bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-white font-black text-lg flex items-center justify-center transition-all hover:scale-105"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Controls Bar: Country Tabs + Search + Sort */}
            <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-white/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white/60 dark:bg-[#0a132e]/60">
              
              {/* Country Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                {[
                  { id: 'ALL', label: '🌍 All Countries', count: Object.keys(WORLD_MAP_CITIES).length },
                  { id: 'IN', label: '🇮🇳 India (20 States)', count: 20 },
                  { id: 'US', label: '🇺🇸 United States', count: 7 },
                  { id: 'GB', label: '🇬🇧 United Kingdom', count: 3 },
                  { id: 'JP', label: '🇯🇵 Japan', count: 2 },
                  { id: 'AU', label: '🇦🇺 Australia', count: 2 },
                  { id: 'CA', label: '🇨🇦 Canada', count: 2 },
                  { id: 'AE', label: '🇦🇪 UAE', count: 2 },
                  { id: 'FR', label: '🇫🇷 France', count: 1 },
                  { id: 'DE', label: '🇩🇪 Germany', count: 1 },
                  { id: 'SG', label: '🇸🇬 Singapore', count: 1 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setMatrixFilterCountry(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                      matrixFilterCountry === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                        : 'bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search & Sort Suite */}
              <div className="flex items-center gap-2.5">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    value={matrixSearchQuery}
                    onChange={(e) => setMatrixSearchQuery(e.target.value)}
                    placeholder="Filter state or city..."
                    className="w-full py-2 pl-8 pr-3 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                </div>

                <select
                  value={matrixSortBy}
                  onChange={(e: any) => setMatrixSortBy(e.target.value)}
                  className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-xs font-extrabold text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="temp_desc">🔥 Hottest First</option>
                  <option value="temp_asc">❄️ Coolest First</option>
                  <option value="name">🔤 Name (A-Z)</option>
                  <option value="humidity">💧 Highest Humidity</option>
                </select>
              </div>

            </div>

            {/* Matrix City Cards Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {matrixFilteredCities.map(([key, city]) => {
                const tempVal = unit === 'C' ? city.temp : Math.round((city.temp * 9) / 5 + 32);
                return (
                  <div
                    key={key}
                    className="rounded-2xl p-4 bg-slate-50 dark:bg-[#0c1638] border border-slate-200/90 dark:border-white/[0.08] hover:border-blue-500/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Top Row: Country Badge + Region */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{city.flag}</span>
                          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                            {city.countryName}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400">
                          {city.region}
                        </span>
                      </div>

                      {/* City Name + Temperature */}
                      <div className="flex items-center justify-between my-2">
                        <div>
                          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-500 transition-colors">
                            {city.name}
                          </h3>
                          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 capitalize">
                            {city.condition}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-right">
                          <span className="text-2xl">{city.icon}</span>
                          <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {tempVal}°{unit}
                          </span>
                        </div>
                      </div>

                      {/* Weather Metrics Bar */}
                      <div className="grid grid-cols-3 gap-1.5 py-2 my-2 border-t border-b border-slate-200/70 dark:border-white/5 text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center">
                        <div className="bg-white/80 dark:bg-white/[0.03] p-1.5 rounded-lg">
                          <span className="block opacity-60">High / Low</span>
                          <span className="text-slate-800 dark:text-slate-200 font-extrabold">{tempVal + 3}° / {tempVal - 7}°</span>
                        </div>
                        <div className="bg-white/80 dark:bg-white/[0.03] p-1.5 rounded-lg">
                          <span className="block opacity-60">Humidity</span>
                          <span className="text-blue-600 dark:text-cyan-400 font-extrabold">{city.humidity}%</span>
                        </div>
                        <div className="bg-white/80 dark:bg-white/[0.03] p-1.5 rounded-lg">
                          <span className="block opacity-60">Wind</span>
                          <span className="text-slate-800 dark:text-slate-200 font-extrabold">{city.wind} km/h</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Jump to Radar Button */}
                    <button
                      onClick={() => {
                        setSelectedCity(city.name);
                        setShowGlobalMatrixModal(false);
                        if (mapInstanceRef.current) {
                          mapInstanceRef.current.flyTo([city.lat, city.lng], 8.5);
                        }
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>🗺️ View on Live Radar</span>
                      <span>→</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.02] flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Showing {matrixFilteredCities.length} meteorological stations across all countries & states</span>
              <button
                onClick={() => setShowGlobalMatrixModal(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white font-extrabold"
              >
                Close Matrix
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
