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
"[project]/src/app/weather/5day/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FiveDayForecastPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWeather$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWeather.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const DailyForecastCard = ({ forecast })=>{
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString('en-US', {
        weekday: 'short'
    });
    const dateString = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-400 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50 transition-all",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-bold text-xl text-white mb-1",
                    children: day
                }, void 0, false, {
                    fileName: "[project]/src/app/weather/5day/page.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-blue-400 mb-4",
                    children: dateString
                }, void 0, false, {
                    fileName: "[project]/src/app/weather/5day/page.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "my-4 flex justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
                        alt: forecast.weather[0].description,
                        className: "w-16 h-16"
                    }, void 0, false, {
                        fileName: "[project]/src/app/weather/5day/page.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/weather/5day/page.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-3xl font-bold text-white mt-4",
                    children: [
                        Math.round(forecast.main.temp_max),
                        "°"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/weather/5day/page.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl text-gray-300 mt-1",
                    children: [
                        Math.round(forecast.main.temp_min),
                        "°"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/weather/5day/page.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-300 capitalize mt-3",
                    children: forecast.weather[0].description
                }, void 0, false, {
                    fileName: "[project]/src/app/weather/5day/page.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/weather/5day/page.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/weather/5day/page.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function FiveDayForecastPage() {
    const { forecastData, loading, error, getWeatherByCity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWeather$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWeather"])();
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Bengaluru'); // Default city
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        getWeatherByCity(city);
    }, [
        city,
        getWeatherByCity
    ]);
    // Group forecast data by day (since the API returns 3-hourly data)
    const dailyForecast = forecastData?.list.filter((item, index)=>{
        const date = new Date(item.dt * 1000);
        return date.getUTCHours() === 12; // Around midday
    }).slice(0, 5) || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto p-4 md:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-gray-800 dark:text-white text-center border-2 border-blue-300 p-4 rounded-lg",
                    children: "5-Day Forecast"
                }, void 0, false, {
                    fileName: "[project]/src/app/weather/5day/page.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/weather/5day/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-grow",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: city,
                                onChange: (e)=>setCity(e.target.value),
                                placeholder: "Enter a city name",
                                className: "w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                                onKeyDown: (e)=>{
                                    if (e.key === 'Enter') {
                                        getWeatherByCity(city);
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/weather/5day/page.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/weather/5day/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>getWeatherByCity(city),
                            className: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors",
                            children: "Update Forecast"
                        }, void 0, false, {
                            fileName: "[project]/src/app/weather/5day/page.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/weather/5day/page.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/weather/5day/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/weather/5day/page.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/weather/5day/page.tsx",
                lineNumber: 85,
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
                        fileName: "[project]/src/app/weather/5day/page.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block sm:inline",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/weather/5day/page.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/weather/5day/page.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this),
            forecastData && !loading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
                children: dailyForecast.map((day, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyForecastCard, {
                        forecast: day
                    }, index, false, {
                        fileName: "[project]/src/app/weather/5day/page.tsx",
                        lineNumber: 100,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/weather/5day/page.tsx",
                lineNumber: 98,
                columnNumber: 9
            }, this),
            !loading && !error && !forecastData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-yellow-100 border border-blue-400 text-yellow-700 px-4 py-3 rounded relative",
                role: "alert",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        className: "font-bold",
                        children: "No Data Available! "
                    }, void 0, false, {
                        fileName: "[project]/src/app/weather/5day/page.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block sm:inline",
                        children: "Please try searching for a valid city."
                    }, void 0, false, {
                        fileName: "[project]/src/app/weather/5day/page.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/weather/5day/page.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/weather/5day/page.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cfbdced0._.js.map