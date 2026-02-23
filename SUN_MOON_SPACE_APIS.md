# Sun, Moon & Space APIs Documentation

This document contains all the free APIs you can use for the Sun, Moon & Space features in your application.

## 🌅 Sunrise & Sunset API

### Option 1: Sunrise-Sunset.org (Recommended - No API Key Required)

**Base URL:** `https://api.sunrise-sunset.org/json`

**Features:**
- Sunrise and sunset times
- Solar noon
- Day length
- Civil, nautical, and astronomical twilight times
- No authentication required
- Free to use with attribution

**Example Request:**
```javascript
const lat = 12.9716; // Bengaluru latitude
const lng = 77.5946; // Bengaluru longitude
const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('Sunrise:', data.results.sunrise);
    console.log('Sunset:', data.results.sunset);
  });
```

**Response Example:**
```json
{
  "results": {
    "sunrise": "2026-02-16T01:07:35+00:00",
    "sunset": "2026-02-16T12:52:59+00:00",
    "solar_noon": "2026-02-16T06:50:17+00:00",
    "day_length": 42324,
    "civil_twilight_begin": "2026-02-16T00:46:17+00:00",
    "civil_twilight_end": "2026-02-16T13:14:17+00:00",
    "nautical_twilight_begin": "2026-02-16T00:20:13+00:00",
    "nautical_twilight_end": "2026-02-16T13:40:21+00:00",
    "astronomical_twilight_begin": "2026-02-15T23:53:49+00:00",
    "astronomical_twilight_end": "2026-02-16T14:06:45+00:00"
  },
  "status": "OK",
  "tzid": "UTC"
}
```

### Option 2: SunriseSunset.io (Alternative - No API Key Required)

**Base URL:** `https://api.sunrisesunset.io/json`

**Features:**
- Sunrise, sunset, first light, last light
- Dawn, dusk, solar noon, golden hour
- Day length, timezone, UTC offset
- Date range queries (up to 365 days)
- No authentication required

**Example Request:**
```javascript
const url = `https://api.sunrisesunset.io/json?lat=12.9716&lng=77.5946`;

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 🌙 Moon Phase API

### Phase of the Moon Today (No API Key Required)

**Base URL:** `https://api.phaseofthemoontoday.com/v1`

**Features:**
- Current moon phase
- Illumination percentage
- Days since new moon
- Next full moon and new moon dates
- Historical moon phases (1900-2100)
- Location-based moonrise/moonset times
- Monthly lunar calendar

**Endpoints:**

1. **Current Moon Phase:**
```javascript
fetch('https://api.phaseofthemoontoday.com/v1/current')
  .then(response => response.json())
  .then(data => {
    console.log('Phase:', data.phase);
    console.log('Illumination:', data.illumination + '%');
    console.log('Emoji:', data.emoji);
  });
```

**Response:**
```json
{
  "phase": "Waxing Gibbous",
  "illumination": 87.3,
  "emoji": "🌔",
  "days_since_new": 11.2,
  "next_full_moon": "2026-02-25T12:34:56Z",
  "next_new_moon": "2026-03-09T08:15:30Z"
}
```

2. **Historical Moon Phase:**
```javascript
const date = '2026-02-16';
fetch(`https://api.phaseofthemoontoday.com/v1/date/${date}`)
  .then(response => response.json())
  .then(data => console.log(data));
```

3. **Location-Based Data:**
```javascript
const city = 'bengaluru';
fetch(`https://api.phaseofthemoontoday.com/v1/location/${city}`)
  .then(response => response.json())
  .then(data => console.log(data));
```

4. **Monthly Calendar:**
```javascript
const yearMonth = '2026-02';
fetch(`https://api.phaseofthemoontoday.com/v1/calendar/${yearMonth}`)
  .then(response => response.json())
  .then(data => console.log(data));
```

**Rate Limits:**
- Free Tier: 1,000 requests/day
- No authentication required for basic usage

---

## 🛰️ ISS Tracker API

### Open Notify (No API Key Required)

**Base URL:** `http://api.open-notify.org`

**Features:**
- Real-time ISS location (latitude, longitude)
- ISS pass times for specific locations
- Number of people in space
- Completely free, no authentication

**Endpoints:**

1. **Current ISS Location:**
```javascript
fetch('http://api.open-notify.org/iss-now.json')
  .then(response => response.json())
  .then(data => {
    const { latitude, longitude } = data.iss_position;
    console.log('ISS Location:', latitude, longitude);
  });
```

**Response:**
```json
{
  "message": "success",
  "timestamp": 1708099200,
  "iss_position": {
    "latitude": "12.3456",
    "longitude": "77.5678"
  }
}
```

2. **ISS Pass Times:**
```javascript
const lat = 12.9716;
const lon = 77.5946;
fetch(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`)
  .then(response => response.json())
  .then(data => {
    console.log('Next passes:', data.response);
  });
```

**Response:**
```json
{
  "message": "success",
  "request": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "altitude": 100,
    "passes": 5,
    "datetime": 1708099200
  },
  "response": [
    {
      "duration": 645,
      "risetime": 1708099800
    }
  ]
}
```

3. **People in Space:**
```javascript
fetch('http://api.open-notify.org/astros.json')
  .then(response => response.json())
  .then(data => {
    console.log('People in space:', data.number);
    console.log('Astronauts:', data.people);
  });
```

**Note:** Poll this API no more than once every 5 seconds to avoid overloading.

---

## 🌑 Solar & Lunar Eclipse Data

For eclipse data, you can use the **Sunrise-Sunset.org** API or calculate eclipses using astronomical libraries.

### Alternative: NASA API (Requires Free API Key)

**Get API Key:** https://api.nasa.gov/

**Features:**
- Astronomy Picture of the Day (APOD)
- Mars Rover Photos
- Near Earth Objects
- And more...

**Example:**
```javascript
const NASA_API_KEY = 'DEMO_KEY'; // Replace with your key
fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 🪐 Planet Positions

For planet positions, you can use:

1. **Astronomy Engine Library** (Client-side calculation)
   - GitHub: https://github.com/cosinekitty/astronomy
   - No API required, pure JavaScript calculations
   - Supports all planets, moon, sun positions

2. **US Naval Observatory API** (Free, no key)
   - URL: https://aa.usno.navy.mil/data/api
   - Provides rise/set/transit times for major solar system bodies

---

## 📝 Attribution Requirements

When using these free APIs, please include attribution:

- **Sunrise-Sunset.org:** Link to https://sunrise-sunset.org
- **SunriseSunset.io:** "Powered by SunriseSunset.io"
- **Phase of the Moon Today:** Link to https://phaseofthemoontoday.com
- **Open Notify:** Link to http://open-notify.org

---

## 🚀 Quick Start Implementation

Here's a complete example service file you can use:

```typescript
// src/services/astronomyService.ts

export const astronomyService = {
  // Get sunrise/sunset times
  async getSunriseSunset(lat: number, lng: number, date?: string) {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0${date ? `&date=${date}` : ''}`;
    const response = await fetch(url);
    return response.json();
  },

  // Get current moon phase
  async getCurrentMoonPhase() {
    const response = await fetch('https://api.phaseofthemoontoday.com/v1/current');
    return response.json();
  },

  // Get ISS location
  async getISSLocation() {
    const response = await fetch('http://api.open-notify.org/iss-now.json');
    return response.json();
  },

  // Get ISS pass times
  async getISSPassTimes(lat: number, lon: number) {
    const response = await fetch(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`);
    return response.json();
  },

  // Get people in space
  async getPeopleInSpace() {
    const response = await fetch('http://api.open-notify.org/astros.json');
    return response.json();
  }
};
```

---

## 💡 Tips

1. **No API Keys Needed:** All the main APIs listed above work without authentication
2. **Rate Limits:** Be respectful of rate limits, cache responses when possible
3. **Error Handling:** Always implement proper error handling for API calls
4. **CORS:** These APIs support CORS, so they work from browser applications
5. **Caching:** Consider caching responses to reduce API calls and improve performance

---

## 📚 Additional Resources

- [Astronomy Engine Documentation](https://github.com/cosinekitty/astronomy)
- [NASA API Portal](https://api.nasa.gov/)
- [US Naval Observatory](https://aa.usno.navy.mil/)
- [Open Notify Documentation](http://open-notify.org/Open-Notify-API/)
