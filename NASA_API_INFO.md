# NASA API Information

## Important: NASA Does NOT Provide Weather APIs

NASA's APIs focus on space, astronomy, and planetary science - NOT Earth weather forecasting. For weather data, you should continue using:

- **OpenWeatherMap** (current choice) ✅
- **WeatherAPI.com**
- **Visual Crossing**
- **Tomorrow.io**

## What NASA APIs DO Provide

Your NASA API Key: `2zhW0kjMr6HaSrg2ygjtrufX43nXUkRglZHO2Xez`

### 1. 🌌 Astronomy Picture of the Day (APOD)
**Endpoint:** `https://api.nasa.gov/planetary/apod`

**What it does:**
- Daily featured astronomy image or video
- Detailed explanations
- HD versions available
- Historical archive back to 1995

**Example:**
```javascript
const response = await fetch(
  `https://api.nasa.gov/planetary/apod?api_key=2zhW0kjMr6HaSrg2ygjtrufX43nXUkRglZHO2Xez`
);
```

**✅ IMPLEMENTED:** Available at `/sun-moon-space/nasa-apod`

---

### 2. 🔴 Mars Rover Photos
**Endpoint:** `https://api.nasa.gov/mars-photos/api/v1/rovers/{rover}/photos`

**What it does:**
- Photos from Curiosity, Opportunity, Spirit rovers
- Filter by Martian sol (day)
- Filter by camera
- Thousands of images

**Example:**
```javascript
const response = await fetch(
  `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=YOUR_KEY`
);
```

---

### 3. ☄️ Near Earth Objects (Asteroids)
**Endpoint:** `https://api.nasa.gov/neo/rest/v1/feed`

**What it does:**
- Asteroids passing near Earth
- Size, velocity, distance data
- Potentially hazardous objects
- Date range queries

**Example:**
```javascript
const response = await fetch(
  `https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-02-16&end_date=2026-02-23&api_key=YOUR_KEY`
);
```

---

### 4. 🌍 NASA Earth Imagery
**Endpoint:** `https://api.nasa.gov/planetary/earth/imagery`

**What it does:**
- Satellite images of Earth
- Landsat 8 data
- Specific coordinates and dates
- Cloud-free imagery when available

**Example:**
```javascript
const response = await fetch(
  `https://api.nasa.gov/planetary/earth/imagery?lon=77.5946&lat=12.9716&date=2026-02-16&api_key=YOUR_KEY`
);
```

---

### 5. 🛰️ NASA Earth Assets
**Endpoint:** `https://api.nasa.gov/planetary/earth/assets`

**What it does:**
- Available satellite imagery dates
- Metadata for Earth observations
- Cloud coverage information

---

### 6. 🚀 NASA Image and Video Library
**Endpoint:** `https://images-api.nasa.gov/search`

**What it does:**
- Search NASA's media library
- Images, videos, audio
- Historical missions
- Space exploration content

**Example:**
```javascript
const response = await fetch(
  `https://images-api.nasa.gov/search?q=apollo%2011&media_type=image`
);
```

---

### 7. 🌟 Exoplanet Archive
**Endpoint:** `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI`

**What it does:**
- Confirmed exoplanets
- Planet properties
- Host star information
- Discovery methods

---

## Rate Limits

- **Hourly Limit:** 1,000 requests per hour
- **Demo Key:** 30 requests per hour, 50 per day
- **Your Key:** Full access with higher limits

## Current Implementation

### ✅ Already Using NASA API:
1. **APOD Page** - Shows daily astronomy picture with explanations

### 🔧 Available in astronomyService.ts:
- `getAPOD(date?)` - Get Astronomy Picture of the Day
- `getNearEarthObjects(startDate, endDate)` - Get asteroid data
- `getMarsRoverPhotos(rover, sol, camera?)` - Get Mars photos

### 💡 Potential Future Features:

1. **Mars Weather Widget**
   - Show current Mars weather from InSight lander
   - Temperature, wind, pressure on Mars

2. **Asteroid Tracker**
   - Show asteroids passing near Earth this week
   - Size and distance information

3. **Earth Satellite View**
   - Show satellite image of user's location
   - Historical imagery comparison

4. **Space Image Gallery**
   - Browse NASA's image library
   - Filter by mission, date, topic

5. **Exoplanet Explorer**
   - Discover planets outside our solar system
   - Compare to Earth

## Why Not Use NASA for Weather?

NASA focuses on:
- ❌ Space exploration
- ❌ Planetary science
- ❌ Astronomy
- ❌ Satellite imagery (not real-time weather)

For weather, use specialized services:
- ✅ OpenWeatherMap (your current choice)
- ✅ WeatherAPI.com
- ✅ NOAA (US government weather)
- ✅ Met Office (UK weather)

## Summary

Your NASA API key is perfect for:
- 🌌 Space and astronomy content
- 🔴 Mars exploration data
- ☄️ Asteroid tracking
- 🌍 Earth satellite imagery
- 🚀 NASA media library

But for weather forecasting, stick with OpenWeatherMap!

---

**Your Current Setup:**
- Weather: OpenWeatherMap API ✅
- Space/Astronomy: NASA API ✅
- Best of both worlds! 🎉
