module.exports = [
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/lib/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API Constants
__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "DEFAULT_CITY",
    ()=>DEFAULT_CITY,
    "ERROR_MESSAGES",
    ()=>ERROR_MESSAGES,
    "OPENWEATHER_API_BASE_URL",
    ()=>OPENWEATHER_API_BASE_URL,
    "OPENWEATHER_API_KEY",
    ()=>OPENWEATHER_API_KEY,
    "RESPONSE_CODES",
    ()=>RESPONSE_CODES,
    "TEMPERATURE_UNITS",
    ()=>TEMPERATURE_UNITS,
    "VISUAL_CROSSING_API_BASE_URL",
    ()=>VISUAL_CROSSING_API_BASE_URL,
    "VISUAL_CROSSING_API_KEY",
    ()=>VISUAL_CROSSING_API_KEY
]);
const VISUAL_CROSSING_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services';
const OPENWEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const OPENWEATHER_API_KEY = ("TURBOPACK compile-time value", "d5074fe4d438158f54fc3b339be05b26") || '';
const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY || 'M5P8LG42JU3ZGLQDJUEW8Y9EY';
const API_BASE_URL = VISUAL_CROSSING_API_BASE_URL;
const DEFAULT_CITY = 'London';
const TEMPERATURE_UNITS = {
    METRIC: 'metric',
    IMPERIAL: 'imperial',
    KELVIN: 'kelvin'
};
const RESPONSE_CODES = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    RATE_LIMITED: 429
};
const ERROR_MESSAGES = {
    INVALID_API_KEY: 'Invalid API key provided',
    CITY_NOT_FOUND: 'Location not found',
    RATE_LIMIT_EXCEEDED: 'Rate limit exceeded, please try again later',
    NETWORK_ERROR: 'Network error, please check your connection',
    UNKNOWN_ERROR: 'An unknown error occurred'
};
}),
"[project]/src/services/mockWeatherService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock weather data for development/testing when API key is not working
__turbopack_context__.s([
    "mockFetchWeatherByCity",
    ()=>mockFetchWeatherByCity,
    "mockFetchWeatherByCoordinates",
    ()=>mockFetchWeatherByCoordinates,
    "mockFetchWeatherForecast",
    ()=>mockFetchWeatherForecast,
    "mockSearchLocations",
    ()=>mockSearchLocations
]);
// Mock current weather data
const mockCurrentWeather = {
    coord: {
        lon: -0.1257,
        lat: 51.5085
    },
    weather: [
        {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
        }
    ],
    base: 'stations',
    main: {
        temp: 18.5,
        feels_like: 17.8,
        temp_min: 16.2,
        temp_max: 19.8,
        pressure: 1015,
        humidity: 65,
        sea_level: 1020,
        grnd_level: 1015
    },
    visibility: 10000,
    wind: {
        speed: 3.6,
        deg: 230
    },
    clouds: {
        all: 0
    },
    dt: Math.floor(Date.now() / 1000),
    sys: {
        type: 1,
        id: 1414,
        country: 'GB',
        sunrise: 1622702432,
        sunset: 1622759102
    },
    timezone: 3600,
    id: 2643743,
    name: 'London',
    cod: 200
};
// Mock forecast data
const mockForecastData = {
    cod: '200',
    message: 0,
    cnt: 40,
    list: [
        {
            dt: Math.floor(Date.now() / 1000) + 3600,
            main: {
                temp: 18.5,
                feels_like: 17.8,
                temp_min: 16.2,
                temp_max: 19.8,
                pressure: 1015,
                sea_level: 1015,
                grnd_level: 1005,
                humidity: 65,
                temp_kf: 1.2
            },
            weather: [
                {
                    id: 800,
                    main: 'Clear',
                    description: 'clear sky',
                    icon: '01d'
                }
            ],
            clouds: {
                all: 0
            },
            wind: {
                speed: 3.6,
                deg: 230,
                gust: 5.1
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: 'd'
            },
            dt_txt: new Date(Date.now() + 3600000).toISOString().slice(0, 19).replace('T', ' ')
        },
        {
            dt: Math.floor(Date.now() / 1000) + 7200,
            main: {
                temp: 17.5,
                feels_like: 16.8,
                temp_min: 15.2,
                temp_max: 18.8,
                pressure: 1014,
                sea_level: 1014,
                grnd_level: 1004,
                humidity: 70,
                temp_kf: 1.2
            },
            weather: [
                {
                    id: 801,
                    main: 'Clouds',
                    description: 'few clouds',
                    icon: '02d'
                }
            ],
            clouds: {
                all: 20
            },
            wind: {
                speed: 4.1,
                deg: 240,
                gust: 5.6
            },
            visibility: 10000,
            pop: 0.1,
            sys: {
                pod: 'd'
            },
            dt_txt: new Date(Date.now() + 7200000).toISOString().slice(0, 19).replace('T', ' ')
        },
        {
            dt: Math.floor(Date.now() / 1000) + 10800,
            main: {
                temp: 16.5,
                feels_like: 15.8,
                temp_min: 14.2,
                temp_max: 17.8,
                pressure: 1013,
                sea_level: 1013,
                grnd_level: 1003,
                humidity: 75,
                temp_kf: 1.2
            },
            weather: [
                {
                    id: 500,
                    main: 'Rain',
                    description: 'light rain',
                    icon: '10d'
                }
            ],
            clouds: {
                all: 60
            },
            wind: {
                speed: 3.8,
                deg: 220,
                gust: 4.9
            },
            visibility: 10000,
            pop: 0.5,
            sys: {
                pod: 'd'
            },
            dt_txt: new Date(Date.now() + 10800000).toISOString().slice(0, 19).replace('T', ' ')
        }
    ],
    city: {
        id: 2643743,
        name: 'London',
        coord: {
            lat: 51.5085,
            lon: -0.1257
        },
        country: 'GB',
        population: 1000000,
        timezone: 3600
    }
};
// Mock location search result
const mockLocationSearch = [
    {
        name: 'London',
        local_names: {
            en: 'London'
        },
        lat: 51.5085,
        lon: -0.1257,
        country: 'GB'
    },
    {
        name: 'London',
        local_names: {
            en: 'London'
        },
        lat: 39.8864,
        lon: -83.4482,
        country: 'US'
    }
];
const mockFetchWeatherByCity = async (cityName)=>{
    // Simulate network delay
    await new Promise((resolve)=>setTimeout(resolve, 500));
    // Return mock data with updated city name
    return {
        ...mockCurrentWeather,
        name: cityName
    };
};
const mockFetchWeatherByCoordinates = async (lat, lon)=>{
    // Simulate network delay
    await new Promise((resolve)=>setTimeout(resolve, 500));
    return mockCurrentWeather;
};
const mockSearchLocations = async (query)=>{
    // Simulate network delay
    await new Promise((resolve)=>setTimeout(resolve, 300));
    return mockLocationSearch.filter((location)=>location.name.toLowerCase().includes(query.toLowerCase()));
};
const mockFetchWeatherForecast = async (cityName)=>{
    // Simulate network delay
    await new Promise((resolve)=>setTimeout(resolve, 600));
    return {
        ...mockForecastData,
        city: {
            ...mockForecastData.city,
            name: cityName
        }
    };
};
}),
"[project]/src/services/weatherService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchWeatherByCity",
    ()=>fetchWeatherByCity,
    "fetchWeatherByCoordinates",
    ()=>fetchWeatherByCoordinates,
    "fetchWeatherForecast",
    ()=>fetchWeatherForecast,
    "searchLocations",
    ()=>searchLocations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mockWeatherService.ts [app-ssr] (ecmascript)");
;
;
;
// Create axios instance with default configuration
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    timeout: 5000
});
const fetchWeatherByCity = async (cityName)=>{
    const isTestMode = ("TURBOPACK compile-time value", "development") === 'test';
    try {
        const response = await apiClient.get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPENWEATHER_API_BASE_URL"]}/weather`, {
            params: {
                q: cityName,
                appid: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPENWEATHER_API_KEY"],
                units: 'metric'
            }
        });
        if (response.status === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].SUCCESS) {
            return response.data;
        } else {
            throw new Error(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERROR_MESSAGES"].UNKNOWN_ERROR);
        }
    } catch (error) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (error.response) {
            // Server responded with error status
            switch(error.response.status){
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].NOT_FOUND:
                    // Return mock data instead of throwing error
                    console.warn('City not found, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherByCity"])(cityName);
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].UNAUTHORIZED:
                    throw new Error(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERROR_MESSAGES"].INVALID_API_KEY);
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].RATE_LIMITED:
                    throw new Error(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERROR_MESSAGES"].RATE_LIMIT_EXCEEDED);
                default:
                    // console.warn('Server error, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherByCity"])(cityName);
            }
        } else if (error.request) {
            // Request was made but no response received
            // console.warn('Network error, falling back to mock data');
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherByCity"])(cityName);
        } else {
            // Something else happened
            // console.warn('Error occurred, falling back to mock data');
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherByCity"])(cityName);
        }
    }
};
const fetchWeatherByCoordinates = async (lat, lon)=>{
    try {
        const response = await apiClient.get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPENWEATHER_API_BASE_URL"]}/weather`, {
            params: {
                lat,
                lon,
                appid: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPENWEATHER_API_KEY"],
                units: 'metric'
            }
        });
        if (response.status === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].SUCCESS) {
            return response.data;
        } else {
            throw new Error(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERROR_MESSAGES"].UNKNOWN_ERROR);
        }
    } catch (error) {
        if (error.response) {
            // Server responded with error status
            switch(error.response.status){
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].NOT_FOUND:
                    // console.warn('Location not found, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherByCoordinates"])(lat, lon);
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].UNAUTHORIZED:
                    // console.warn('API key unauthorized, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherByCoordinates"])(lat, lon);
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].RATE_LIMITED:
                    // console.warn('Rate limit exceeded, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherByCoordinates"])(lat, lon);
                default:
                    // console.warn('Server error, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherByCoordinates"])(lat, lon);
            }
        } else if (error.request) {
            // Request was made but no response received
            // console.warn('Network error, falling back to mock data');
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherByCoordinates"])(lat, lon);
        } else {
            // Something else happened
            // console.warn('Error occurred, falling back to mock data');
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherByCoordinates"])(lat, lon);
        }
    }
};
const searchLocations = async (query)=>{
    try {
        const response = await apiClient.get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPENWEATHER_API_BASE_URL"]}/geo/1.0/direct`, {
            params: {
                q: query,
                limit: 5,
                appid: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPENWEATHER_API_KEY"]
            }
        });
        if (response.status === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].SUCCESS) {
            return response.data;
        } else {
            throw new Error(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERROR_MESSAGES"].UNKNOWN_ERROR);
        }
    } catch (error) {
        if (error.response) {
            // Server responded with error status
            switch(error.response.status){
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].NOT_FOUND:
                    // console.warn('Location not found, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockSearchLocations"])(query);
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].UNAUTHORIZED:
                    // console.warn('API key unauthorized, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockSearchLocations"])(query);
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].RATE_LIMITED:
                    // console.warn('Rate limit exceeded, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockSearchLocations"])(query);
                default:
                    // console.warn('Server error, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockSearchLocations"])(query);
            }
        } else if (error.request) {
            // Request was made but no response received
            // console.warn('Network error, falling back to mock data');
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockSearchLocations"])(query);
        } else {
            // Something else happened
            // console.warn('Error occurred, falling back to mock data');
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockSearchLocations"])(query);
        }
    }
};
const fetchWeatherForecast = async (cityName)=>{
    try {
        const response = await apiClient.get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPENWEATHER_API_BASE_URL"]}/forecast`, {
            params: {
                q: cityName,
                appid: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPENWEATHER_API_KEY"],
                units: 'metric'
            }
        });
        if (response.status === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].SUCCESS) {
            return response.data;
        } else {
            throw new Error(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERROR_MESSAGES"].UNKNOWN_ERROR);
        }
    } catch (error) {
        if (error.response) {
            // Server responded with error status
            switch(error.response.status){
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].NOT_FOUND:
                    // console.warn('Forecast not found, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherForecast"])(cityName);
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].UNAUTHORIZED:
                    // console.warn('API key unauthorized, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherForecast"])(cityName);
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESPONSE_CODES"].RATE_LIMITED:
                    // console.warn('Rate limit exceeded, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherForecast"])(cityName);
                default:
                    // console.warn('Server error, falling back to mock data');
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherForecast"])(cityName);
            }
        } else if (error.request) {
            // Request was made but no response received
            // console.warn('Network error, falling back to mock data');
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherForecast"])(cityName);
        } else {
            // Something else happened
            // console.warn('Error occurred, falling back to mock data');
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockWeatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFetchWeatherForecast"])(cityName);
        }
    }
};
}),
"[project]/src/hooks/useWeather.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWeather",
    ()=>useWeather
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$weatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/weatherService.ts [app-ssr] (ecmascript)");
;
;
const useWeather = ()=>{
    const [weatherData, setWeatherData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [forecastData, setForecastData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const getWeatherByCity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (city)=>{
        // Input validation
        if (!city || typeof city !== 'string' || city.trim().length === 0) {
            setError('Please enter a valid city name');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            // Fetch current weather using OpenWeatherMap API
            const currentWeather = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$weatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWeatherByCity"])(city.trim());
            setWeatherData(currentWeather);
            // Fetch forecast data using OpenWeatherMap API
            const forecast = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$weatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWeatherForecast"])(city.trim());
            setForecastData(forecast);
        } catch (err) {
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
        } finally{
            setLoading(false);
        }
    }, []);
    const getWeatherByCoordinates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (lat, lon)=>{
        setLoading(true);
        setError(null);
        try {
            // Fetch current weather using OpenWeatherMap API with coordinates
            const currentWeather = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$weatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWeatherByCoordinates"])(lat, lon);
            setWeatherData(currentWeather);
            // Fetch forecast data using OpenWeatherMap API with coordinates
            // For simplicity, we'll fetch forecast for the city name instead of coordinates
            // TODO: Add fetchWeatherForecastByCoordinates to weatherService if needed
            setForecastData(null); // Temporarily set to null since we can't fetch forecast by coordinates yet
        } catch (err) {
            const errorMessage = err.message || 'Failed to fetch weather data';
            setError(errorMessage);
            console.error('Error fetching weather by coordinates:', err);
        } finally{
            setLoading(false);
        }
    }, []);
    // Get user's current location
    const getCurrentLocationWeather = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setLoading(true);
        setError(null);
        if (!navigator.geolocation) {
            const errorMessage = 'Geolocation is not supported by your browser. Please search for a city manually.';
            setError(errorMessage);
            setLoading(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(async (position)=>{
            try {
                const { latitude, longitude } = position.coords;
                // Validate coordinates
                if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
                    throw new Error('Invalid location coordinates received');
                }
                await getWeatherByCoordinates(latitude, longitude);
            } catch (err) {
                const errorMessage = 'Failed to get weather for your location. Please try searching for a city manually.';
                setError(errorMessage);
                console.error('Location weather error:', err);
            } finally{
                setLoading(false);
            }
        }, (error)=>{
            let errorMessage = 'Unable to retrieve your location.';
            // Specific geolocation error handling
            switch(error.code){
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
        }, {
            timeout: 10000,
            enableHighAccuracy: true // Get more accurate location
        });
    }, [
        getWeatherByCoordinates
    ]);
    return {
        weatherData,
        forecastData,
        loading,
        error,
        getWeatherByCity,
        getWeatherByCoordinates,
        getCurrentLocationWeather
    };
};
}),
"[project]/src/app/weather/alerts/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SevereWeatherAlertsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWeather$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWeather.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function SevereWeatherAlertsPage() {
    const { weatherData, loading, error, getWeatherByCity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWeather$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWeather"])();
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Bengaluru'); // Default city
    const [alerts, setAlerts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [noAlerts, setNoAlerts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Simulate fetching alerts - in a real app, this would come from a weather alerts API
    const fetchAlerts = (cityName)=>{
        // For demonstration, we'll create mock alerts based on the city
        // In a real implementation, this would call an alerts API
        const mockAlerts = [];
        // Only show alerts for specific cities
        if (cityName.toLowerCase().includes('florida') || cityName.toLowerCase().includes('texas') || cityName.toLowerCase().includes('colorado')) {
            const now = Date.now() / 1000; // Current time in Unix timestamp
            const tomorrow = now + 24 * 60 * 60; // Tomorrow in Unix timestamp
            mockAlerts.push({
                id: 1,
                sender_name: 'National Weather Service',
                event: 'Severe Thunderstorm Warning',
                start: now,
                end: tomorrow,
                description: 'Severe thunderstorms producing large hail and damaging winds are expected. Take cover immediately.',
                tags: [
                    'Thunderstorm',
                    'Wind',
                    'Hail'
                ],
                area: cityName
            });
            if (cityName.toLowerCase().includes('colorado')) {
                mockAlerts.push({
                    id: 2,
                    sender_name: 'National Weather Service',
                    event: 'Flash Flood Watch',
                    start: now,
                    end: tomorrow + 12 * 60 * 60,
                    description: 'Heavy rainfall may cause flash flooding in low-lying areas. Avoid travel if possible.',
                    tags: [
                        'Flood',
                        'Rain'
                    ],
                    area: cityName
                });
            }
            setNoAlerts(false);
        } else {
            setNoAlerts(true);
        }
        setAlerts(mockAlerts);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        getWeatherByCity(city);
        fetchAlerts(city);
    }, [
        city,
        getWeatherByCity
    ]);
    const handleSearch = (e)=>{
        e.preventDefault();
        getWeatherByCity(city);
        fetchAlerts(city);
    };
    // Function to format date from Unix timestamp
    const formatDate = (timestamp)=>{
        return new Date(timestamp * 1000).toLocaleString();
    };
    // Function to determine alert level for styling
    const getAlertLevel = (event)=>{
        if (event.toLowerCase().includes('warning')) {
            return 'warning';
        } else if (event.toLowerCase().includes('watch')) {
            return 'watch';
        } else if (event.toLowerCase().includes('advisory')) {
            return 'advisory';
        }
        return 'alert';
    };
    // Function to get styling classes based on alert level
    const getAlertClasses = (event)=>{
        const level = getAlertLevel(event);
        switch(level){
            case 'warning':
                return 'bg-red-50 border-l-4 border-red-500';
            case 'watch':
                return 'bg-yellow-50 border-l-4 border-blue-500';
            case 'advisory':
                return 'bg-blue-50 border-l-4 border-blue-500';
            default:
                return 'bg-orange-50 border-l-4 border-orange-500';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto p-4 md:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-gray-800 text-center border-2 border-blue-300 p-4 rounded-lg",
                    children: "Severe Weather Alerts"
                }, void 0, false, {
                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/weather/alerts/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSearch,
                    className: "flex flex-col sm:flex-row gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-grow",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: city,
                                onChange: (e)=>setCity(e.target.value),
                                placeholder: "Enter a city name to check for alerts",
                                className: "w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            }, void 0, false, {
                                fileName: "[project]/src/app/weather/alerts/page.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/weather/alerts/page.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors",
                            children: "Check Alerts"
                        }, void 0, false, {
                            fileName: "[project]/src/app/weather/alerts/page.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/weather/alerts/page.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                    lineNumber: 142,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/weather/alerts/page.tsx",
                lineNumber: 141,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6",
                role: "alert",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        className: "font-bold",
                        children: "Error! "
                    }, void 0, false, {
                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block sm:inline",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/weather/alerts/page.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, this),
            noAlerts && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-green-50 border border-green-200 text-green-700 px-4 py-6 rounded-lg mb-6 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-2xl mb-2",
                        children: "✓"
                    }, void 0, false, {
                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-semibold",
                        children: "No Active Severe Weather Alerts"
                    }, void 0, false, {
                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2",
                        children: [
                            "No weather warnings or watches are currently in effect for ",
                            city,
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/weather/alerts/page.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this),
            alerts.length > 0 && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-gray-800 mb-4",
                        children: [
                            "Active Weather Alerts for ",
                            city
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this),
                    alerts.map((alert)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `p-4 rounded-lg shadow ${getAlertClasses(alert.event)}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-lg text-gray-800",
                                                    children: alert.event
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-600 mt-1",
                                                    children: [
                                                        "Issued by: ",
                                                        alert.sender_name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2 mt-2",
                                                    children: alert.tags.map((tag, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full",
                                                            children: tag
                                                        }, idx, false, {
                                                            fileName: "[project]/src/app/weather/alerts/page.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/weather/alerts/page.tsx",
                                            lineNumber: 171,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded",
                                                children: getAlertLevel(alert.event).toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/weather/alerts/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/weather/alerts/page.tsx",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700",
                                        children: alert.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-gray-600",
                                                    children: "Valid from:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: formatDate(alert.start)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/weather/alerts/page.tsx",
                                            lineNumber: 197,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-gray-600",
                                                    children: "Valid until:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: formatDate(alert.end)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/weather/alerts/page.tsx",
                                            lineNumber: 201,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/weather/alerts/page.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, alert.id, true, {
                            fileName: "[project]/src/app/weather/alerts/page.tsx",
                            lineNumber: 166,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/weather/alerts/page.tsx",
                lineNumber: 162,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-4 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold",
                        children: "About Weather Alerts"
                    }, void 0, false, {
                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "list-disc pl-5 mt-2 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Warning:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this),
                                    " Take action! A dangerous weather event is occurring or imminent."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/weather/alerts/page.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Watch:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this),
                                    " Be prepared! Conditions are favorable for dangerous weather to develop."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/weather/alerts/page.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Advisory:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this),
                                    " Be aware! Less severe but still significant weather conditions."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/weather/alerts/page.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/weather/alerts/page.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/weather/alerts/page.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/weather/alerts/page.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3dc21940._.js.map