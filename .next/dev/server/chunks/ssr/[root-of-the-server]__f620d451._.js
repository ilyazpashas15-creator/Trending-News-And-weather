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
"[project]/src/app/world-clock/popular/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$weatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/weatherService.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const PopularCitiesPage = ()=>{
    const [cities, setCities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredCities, setFilteredCities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Date());
    // Define popular cities with timezone information
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initialCities = [
            {
                id: 'new-york',
                name: 'New York',
                country: 'USA',
                timezone: 'America/New_York'
            },
            {
                id: 'london',
                name: 'London',
                country: 'UK',
                timezone: 'Europe/London'
            },
            {
                id: 'tokyo',
                name: 'Tokyo',
                country: 'Japan',
                timezone: 'Asia/Tokyo'
            },
            {
                id: 'sydney',
                name: 'Sydney',
                country: 'Australia',
                timezone: 'Australia/Sydney'
            },
            {
                id: 'dubai',
                name: 'Dubai',
                country: 'UAE',
                timezone: 'Asia/Dubai'
            },
            {
                id: 'singapore',
                name: 'Singapore',
                country: 'Singapore',
                timezone: 'Asia/Singapore'
            },
            {
                id: 'paris',
                name: 'Paris',
                country: 'France',
                timezone: 'Europe/Paris'
            },
            {
                id: 'hong-kong',
                name: 'Hong Kong',
                country: 'China',
                timezone: 'Asia/Hong_Kong'
            },
            {
                id: 'los-angeles',
                name: 'Los Angeles',
                country: 'USA',
                timezone: 'America/Los_Angeles'
            },
            {
                id: 'toronto',
                name: 'Toronto',
                country: 'Canada',
                timezone: 'America/Toronto'
            },
            {
                id: 'berlin',
                name: 'Berlin',
                country: 'Germany',
                timezone: 'Europe/Berlin'
            },
            {
                id: 'mumbai',
                name: 'Mumbai',
                country: 'India',
                timezone: 'Asia/Kolkata'
            },
            {
                id: 'shanghai',
                name: 'Shanghai',
                country: 'China',
                timezone: 'Asia/Shanghai'
            },
            {
                id: 'sao-paulo',
                name: 'São Paulo',
                country: 'Brazil',
                timezone: 'America/Sao_Paulo'
            },
            {
                id: 'moscow',
                name: 'Moscow',
                country: 'Russia',
                timezone: 'Europe/Moscow'
            }
        ];
        setCities(initialCities);
        setFilteredCities(initialCities);
        // Fetch weather data for each city
        const fetchWeatherForCities = async ()=>{
            const updatedCities = await Promise.all(initialCities.map(async (city)=>{
                try {
                    const weather = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$weatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchWeatherByCity"])(city.name);
                    return {
                        ...city,
                        weather
                    };
                } catch (error) {
                    console.error(`Error fetching weather for ${city.name}:`, error);
                    return city;
                }
            }));
            setCities(updatedCities);
            setFilteredCities(updatedCities);
        };
        fetchWeatherForCities();
    }, []);
    // Filter cities based on search term
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!searchTerm.trim()) {
            setFilteredCities(cities);
        } else {
            const term = searchTerm.toLowerCase();
            const filtered = cities.filter((city)=>city.name.toLowerCase().includes(term) || city.country.toLowerCase().includes(term));
            setFilteredCities(filtered);
        }
    }, [
        searchTerm,
        cities
    ]);
    // Update time every second
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const intervalId = setInterval(()=>{
            setCurrentTime(new Date());
        }, 1000);
        return ()=>clearInterval(intervalId);
    }, []);
    // Format time for a specific timezone using Intl API
    const formatTimeForTimezone = (timezone)=>{
        return currentTime.toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };
    // Format date for a specific timezone using Intl API
    const formatDateForTimezone = (timezone)=>{
        return currentTime.toLocaleDateString('en-US', {
            timeZone: timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    // Get UTC offset for a specific timezone
    const getUTCOffset = (timezone)=>{
        const utcDate = new Date(currentTime.toLocaleString('en-US', {
            timeZone: 'UTC'
        }));
        const localDate = new Date(currentTime.toLocaleString('en-US', {
            timeZone: timezone
        }));
        const offsetMinutes = (localDate.getTime() - utcDate.getTime()) / (1000 * 60);
        const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
        const offsetMins = Math.abs(offsetMinutes) % 60;
        const sign = offsetMinutes >= 0 ? '+' : '-';
        if (offsetMins === 0) {
            return `UTC${sign}${offsetHours}`;
        } else {
            return `UTC${sign}${offsetHours}:${offsetMins.toString().padStart(2, '0')}`;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-center border-2 border-blue-300 p-4 rounded-lg",
                    children: "Popular Cities"
                }, void 0, false, {
                    fileName: "[project]/src/app/world-clock/popular/page.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/world-clock/popular/page.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-4 text-center",
                children: "View time in popular cities around the world."
            }, void 0, false, {
                fileName: "[project]/src/app/world-clock/popular/page.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Search cities...",
                    className: "w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                    value: searchTerm,
                    onChange: (e)=>setSearchTerm(e.target.value)
                }, void 0, false, {
                    fileName: "[project]/src/app/world-clock/popular/page.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/world-clock/popular/page.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                children: filteredCities.map((city, index)=>{
                    // Define different color gradients for variety
                    const gradients = [
                        'from-blue-400 to-cyan-600',
                        'from-teal-400 to-blue-600',
                        'from-purple-400 to-pink-600',
                        'from-indigo-400 to-purple-600',
                        'from-cyan-400 to-blue-500',
                        'from-emerald-400 to-teal-600',
                        'from-amber-400 to-orange-600',
                        'from-rose-400 to-pink-600',
                        'from-violet-400 to-purple-500',
                        'from-green-400 to-emerald-600',
                        'from-fuchsia-400 to-purple-600',
                        'from-sky-400 to-blue-600',
                        'from-lime-400 to-green-600',
                        'from-red-400 to-rose-600',
                        'from-orange-400 to-amber-600'
                    ];
                    const gradient = gradients[index % gradients.length];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `bg-gradient-to-br ${gradient} rounded-xl shadow-lg shadow-blue-500/30 p-5 hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-lg`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold text-white",
                                                children: city.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/world-clock/popular/page.tsx",
                                                lineNumber: 173,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-blue-100",
                                                children: city.country
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/world-clock/popular/page.tsx",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/world-clock/popular/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    city.weather && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl text-white",
                                                children: [
                                                    city.weather.main.temp,
                                                    "°C"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/world-clock/popular/page.tsx",
                                                lineNumber: 178,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: `https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`,
                                                alt: city.weather.weather[0].description,
                                                className: "w-10 h-10 ml-auto"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/world-clock/popular/page.tsx",
                                                lineNumber: 179,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/world-clock/popular/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/world-clock/popular/page.tsx",
                                lineNumber: 171,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-mono font-bold text-white",
                                        children: formatTimeForTimezone(city.timezone)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/world-clock/popular/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-blue-100 text-sm mt-1",
                                        children: formatDateForTimezone(city.timezone)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/world-clock/popular/page.tsx",
                                        lineNumber: 192,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-blue-100 text-sm mt-1",
                                        children: [
                                            city.timezone,
                                            " (",
                                            getUTCOffset(city.timezone),
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/world-clock/popular/page.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/world-clock/popular/page.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, city.id, true, {
                        fileName: "[project]/src/app/world-clock/popular/page.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/app/world-clock/popular/page.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/world-clock/popular/page.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = PopularCitiesPage;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f620d451._.js.map