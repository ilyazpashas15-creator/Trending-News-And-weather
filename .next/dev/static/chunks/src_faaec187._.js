(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/services/astronomyService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "astronomyService",
    ()=>astronomyService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Astronomy Service for Sun, Moon & Space features
// NASA API Key - accessible on client side with NEXT_PUBLIC_ prefix
const NASA_API_KEY = ("TURBOPACK compile-time truthy", 1) ? ("TURBOPACK compile-time value", "2zhW0kjMr6HaSrg2ygjtrufX43nXUkRglZHO2Xez") || 'DEMO_KEY' : "TURBOPACK unreachable";
const astronomyService = {
    /**
   * Get sunrise and sunset times for a location
   * @param lat - Latitude in decimal degrees
   * @param lng - Longitude in decimal degrees
   * @param date - Optional date in YYYY-MM-DD format
   */ async getSunriseSunset (lat, lng, date) {
        try {
            const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0${date ? `&date=${date}` : ''}`;
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json'
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
   */ getMockSunriseSunset (lat = 12.9716) {
        const today = new Date();
        // Approximate sunrise/sunset based on latitude
        // Closer to equator = more consistent times
        // Further from equator = more variation
        const latFactor = Math.abs(lat) / 90; // 0 at equator, 1 at poles
        // Base times (equator-ish)
        const baseSunriseHour = 6;
        const baseSunsetHour = 18;
        // Adjust for latitude (simplified)
        const sunriseHour = baseSunriseHour - latFactor * 2;
        const sunsetHour = baseSunsetHour + latFactor * 2;
        const sunrise = new Date(today);
        sunrise.setHours(Math.floor(sunriseHour), Math.floor(sunriseHour % 1 * 60), 0);
        const sunset = new Date(today);
        sunset.setHours(Math.floor(sunsetHour), Math.floor(sunsetHour % 1 * 60), 0);
        const solarNoon = new Date(today);
        const noonHour = (sunriseHour + sunsetHour) / 2;
        solarNoon.setHours(Math.floor(noonHour), Math.floor(noonHour % 1 * 60), 0);
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
   */ async getCurrentMoonPhase () {
        try {
            // Try the API first, but expect it to fail due to CORS
            const response = await fetch('https://api.phaseofthemoontoday.com/v1/current', {
                headers: {
                    'Accept': 'application/json'
                }
            });
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
   */ getMockMoonPhase () {
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
            illumination = Math.round(daysSinceNew / 7.38264 * 50);
        } else if (daysSinceNew < 9.22830) {
            phase = 'First Quarter';
            emoji = '🌓';
            illumination = 50;
        } else if (daysSinceNew < 14.76529) {
            phase = 'Waxing Gibbous';
            emoji = '🌔';
            illumination = 50 + Math.round((daysSinceNew - 9.22830) / 5.53699 * 50);
        } else if (daysSinceNew < 16.61095) {
            phase = 'Full Moon';
            emoji = '🌕';
            illumination = 100;
        } else if (daysSinceNew < 22.14794) {
            phase = 'Waning Gibbous';
            emoji = '🌖';
            illumination = 100 - Math.round((daysSinceNew - 16.61095) / 5.53699 * 50);
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
        const daysToFullMoon = daysSinceNew < 14.76529 ? 14.76529 - daysSinceNew : lunarCycle - daysSinceNew + 14.76529;
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
   */ async getMoonPhaseByDate (date) {
        try {
            const response = await fetch(`https://api.phaseofthemoontoday.com/v1/date/${date}`);
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
   */ async getMoonPhaseCalendar (yearMonth) {
        try {
            const response = await fetch(`https://api.phaseofthemoontoday.com/v1/calendar/${yearMonth}`);
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
   */ async getISSLocation () {
        try {
            // Note: This API uses HTTP not HTTPS, which may cause issues
            const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', {
                headers: {
                    'Accept': 'application/json'
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
   */ getMockISSLocation () {
        // Simulate ISS movement (it orbits every ~90 minutes)
        const now = Date.now();
        const orbitalPeriod = 90 * 60 * 1000; // 90 minutes in milliseconds
        const progress = now % orbitalPeriod / orbitalPeriod;
        // Simulate latitude oscillation between -51.6° and +51.6° (ISS orbital inclination)
        const lat = Math.sin(progress * Math.PI * 2) * 51.6;
        // Simulate longitude progression (ISS moves west to east)
        const lng = progress * 360 - 180;
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
   */ async getISSPassTimes (lat, lon, altitude = 100, passes = 5) {
        try {
            const response = await fetch(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}&alt=${altitude}&n=${passes}`);
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
   */ async getPeopleInSpace () {
        try {
            const response = await fetch('http://api.open-notify.org/astros.json', {
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
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
   */ getMockPeopleInSpace () {
        return {
            number: 7,
            people: [
                {
                    name: 'Astronaut 1',
                    craft: 'ISS'
                },
                {
                    name: 'Astronaut 2',
                    craft: 'ISS'
                },
                {
                    name: 'Astronaut 3',
                    craft: 'ISS'
                },
                {
                    name: 'Astronaut 4',
                    craft: 'ISS'
                },
                {
                    name: 'Astronaut 5',
                    craft: 'ISS'
                },
                {
                    name: 'Astronaut 6',
                    craft: 'ISS'
                },
                {
                    name: 'Astronaut 7',
                    craft: 'ISS'
                }
            ],
            message: 'success'
        };
    },
    /**
   * Get NASA Astronomy Picture of the Day
   * @param date - Optional date in YYYY-MM-DD format
   */ async getAPOD (date) {
        const apiKey = ("TURBOPACK compile-time value", "2zhW0kjMr6HaSrg2ygjtrufX43nXUkRglZHO2Xez") || '2zhW0kjMr6HaSrg2ygjtrufX43nXUkRglZHO2Xez';
        try {
            const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${date ? `&date=${date}` : ''}`;
            console.log('Fetching APOD from:', url.replace(apiKey, 'API_KEY_HIDDEN'));
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json'
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
        } catch (error) {
            console.error('Error fetching APOD:', error);
            throw new Error(error.message || 'Failed to fetch NASA APOD');
        }
    },
    /**
   * Get NASA Near Earth Objects (Asteroids)
   * @param startDate - Start date in YYYY-MM-DD format
   * @param endDate - End date in YYYY-MM-DD format
   */ async getNearEarthObjects (startDate, endDate) {
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
   */ async getMarsRoverPhotos (rover = 'curiosity', sol = 1000, camera) {
        try {
            const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${camera ? `&camera=${camera}` : ''}&api_key=${NASA_API_KEY}`;
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
   */ formatTimestamp (timestamp) {
        return new Date(timestamp * 1000).toLocaleString();
    },
    /**
   * Format ISO date string to readable format
   * @param isoString - ISO 8601 date string
   */ formatISODate (isoString) {
        return new Date(isoString).toLocaleString();
    },
    /**
   * Calculate time until next event
   * @param timestamp - Unix timestamp in seconds
   */ getTimeUntil (timestamp) {
        const now = Date.now() / 1000;
        const diff = timestamp - now;
        if (diff < 0) return 'Past event';
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor(diff % 3600 / 60);
        if (hours > 24) {
            const days = Math.floor(hours / 24);
            return `${days} day${days > 1 ? 's' : ''}`;
        }
        return `${hours}h ${minutes}m`;
    }
};
const __TURBOPACK__default__export__ = astronomyService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/sun-moon-space/iss/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SunMoonSpaceISSPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$astronomyService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/astronomyService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function SunMoonSpaceISSPage() {
    _s();
    const [issData, setIssData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [peopleData, setPeopleData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [autoRefresh, setAutoRefresh] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SunMoonSpaceISSPage.useEffect": ()=>{
            fetchISSData();
            fetchPeopleInSpace();
            // Auto-refresh every 5 seconds
            const interval = setInterval({
                "SunMoonSpaceISSPage.useEffect.interval": ()=>{
                    if (autoRefresh) {
                        fetchISSData();
                    }
                }
            }["SunMoonSpaceISSPage.useEffect.interval"], 5000);
            return ({
                "SunMoonSpaceISSPage.useEffect": ()=>clearInterval(interval)
            })["SunMoonSpaceISSPage.useEffect"];
        }
    }["SunMoonSpaceISSPage.useEffect"], [
        autoRefresh
    ]);
    const fetchISSData = async ()=>{
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$astronomyService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getISSLocation();
            setIssData(data);
            setError('');
        } catch (err) {
            // Error is already handled in the service with fallback data
            console.error('Unexpected error:', err);
        } finally{
            setLoading(false);
        }
    };
    const fetchPeopleInSpace = async ()=>{
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$astronomyService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getPeopleInSpace();
            setPeopleData(data);
        } catch (err) {
            // Error is already handled in the service with fallback data
            console.error('Unexpected error:', err);
        }
    };
    const formatTimestamp = (timestamp)=>{
        return new Date(timestamp * 1000).toLocaleString();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#1a2942]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-12 px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto max-w-4xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-white",
                                        children: "ISS Tracker"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                        lineNumber: 60,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 mt-2",
                                        children: "Track the International Space Station in real-time."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setAutoRefresh(!autoRefresh),
                                className: `px-4 py-2 rounded-lg font-semibold transition-colors ${autoRefresh ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'}`,
                                children: autoRefresh ? '🔄 Auto-Refresh ON' : '⏸️ Auto-Refresh OFF'
                            }, void 0, false, {
                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#2a3f5f] rounded-2xl p-12 shadow-xl text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"
                            }, void 0, false, {
                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-300 mt-4",
                                children: "Loading ISS data..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                        lineNumber: 76,
                        columnNumber: 13
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-6",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                        lineNumber: 83,
                        columnNumber: 13
                    }, this),
                    issData && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#2a3f5f] rounded-2xl p-8 shadow-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-6xl mb-4",
                                                children: "🛰️"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 93,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-white mb-2",
                                                children: "Current ISS Location"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 94,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-sm",
                                                children: [
                                                    "Updated: ",
                                                    formatTimestamp(issData.timestamp)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 95,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#1a2942] rounded-xl p-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-400 text-sm mb-2",
                                                        children: "Latitude"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-3xl font-bold text-white",
                                                        children: [
                                                            parseFloat(issData.iss_position.latitude).toFixed(4),
                                                            "°"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-400 text-sm mt-2",
                                                        children: parseFloat(issData.iss_position.latitude) >= 0 ? 'North' : 'South'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 99,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#1a2942] rounded-xl p-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-400 text-sm mb-2",
                                                        children: "Longitude"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-3xl font-bold text-white",
                                                        children: [
                                                            parseFloat(issData.iss_position.longitude).toFixed(4),
                                                            "°"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-400 text-sm mt-2",
                                                        children: parseFloat(issData.iss_position.longitude) >= 0 ? 'East' : 'West'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 107,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 bg-[#1a2942] rounded-xl p-6 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-sm mb-2",
                                                children: "Approximate Speed"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 117,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-white",
                                                children: "~28,000 km/h"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-sm mt-2",
                                                children: "Orbits Earth every ~90 minutes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 119,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://www.google.com/maps?q=${issData.iss_position.latitude},${issData.iss_position.longitude}`,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors",
                                            children: "View on Google Maps 🗺️"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                            lineNumber: 123,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this),
                            peopleData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#2a3f5f] rounded-2xl p-8 shadow-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-5xl mb-4",
                                                children: "👨‍🚀"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 138,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-white mb-2",
                                                children: "People in Space"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 139,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-4xl font-bold text-blue-400 mt-4",
                                                children: peopleData.number
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-sm mt-2",
                                                children: "Currently in orbit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 141,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 mt-6",
                                        children: peopleData.people.map((person, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#1a2942] rounded-xl p-4 flex items-center justify-between",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl",
                                                            children: "👤"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                            lineNumber: 148,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-white font-semibold",
                                                                    children: person.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                                    lineNumber: 150,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-gray-400 text-sm",
                                                                    children: person.craft
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                                    lineNumber: 151,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                            lineNumber: 149,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 25
                                                }, this)
                                            }, index, false, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 146,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                lineNumber: 136,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#2a3f5f] rounded-2xl p-8 shadow-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-white mb-6 text-center",
                                        children: "ISS Facts"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#1a2942] rounded-xl p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-400 text-sm",
                                                        children: "Altitude"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-white",
                                                        children: "~408 km"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 164,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#1a2942] rounded-xl p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-400 text-sm",
                                                        children: "Orbital Period"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-white",
                                                        children: "~90 minutes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 168,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#1a2942] rounded-xl p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-400 text-sm",
                                                        children: "Launch Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-white",
                                                        children: "Nov 20, 1998"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 174,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 172,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#1a2942] rounded-xl p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-400 text-sm",
                                                        children: "Mass"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-white",
                                                        children: "~420,000 kg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                                lineNumber: 161,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                        lineNumber: 89,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
            lineNumber: 56,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/sun-moon-space/iss/page.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(SunMoonSpaceISSPage, "OwoiQaqD8wO249W4oqlsj6s2+lE=");
_c = SunMoonSpaceISSPage;
var _c;
__turbopack_context__.k.register(_c, "SunMoonSpaceISSPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_faaec187._.js.map