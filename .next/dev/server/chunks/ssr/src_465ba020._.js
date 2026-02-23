module.exports = [
"[project]/src/components/ui/NewsCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const NewsCard = ({ article })=>{
    const formatDate = (dateString)=>{
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300",
        children: [
            article.urlToImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: article.urlToImage,
                alt: article.title,
                className: "w-full h-48 object-cover",
                onError: (e)=>{
                    const target = e.target;
                    target.onerror = null; // Prevent infinite loop
                    target.style.display = 'none';
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/NewsCard.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-start mb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-lg text-gray-900 line-clamp-2",
                            children: article.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/NewsCard.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/NewsCard.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-sm mb-3 line-clamp-2",
                        children: article.description
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/NewsCard.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center text-xs text-gray-500 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: article.source.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/NewsCard.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: formatDate(article.publishedAt)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/NewsCard.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/NewsCard.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: article.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "text-blue-600 hover:text-blue-800 text-sm font-medium",
                                children: "Read more →"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/NewsCard.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            article.author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500 text-xs",
                                children: [
                                    "By ",
                                    article.author
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/NewsCard.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/NewsCard.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/NewsCard.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/NewsCard.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = NewsCard;
}),
"[project]/src/services/newsService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchNewsByQuery",
    ()=>fetchNewsByQuery,
    "fetchNewsBySources",
    ()=>fetchNewsBySources,
    "fetchTopHeadlines",
    ()=>fetchTopHeadlines
]);
/**
 * Converts NewsData.io article format to our NewsArticle format
 */ const convertNewsDataArticle = (article)=>{
    return {
        source: {
            id: article.source_id || null,
            name: article.source_name || article.source_id || 'Unknown'
        },
        author: article.creator ? article.creator.join(', ') : null,
        title: article.title || 'No title',
        description: article.description || '',
        url: article.link || '',
        urlToImage: article.image_url || null,
        publishedAt: article.pubDate || new Date().toISOString(),
        content: article.content || article.description || ''
    };
};
const fetchTopHeadlines = async (category, country = 'in', pageSize = 20, page = 1, useWorldAPI = false)=>{
    const newsDataKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || process.env.NEWS_API_KEY;
    if (!newsDataKey || !newsDataKey.startsWith('pub_')) {
        console.error('❌ No valid NewsData.io API key found');
        return [];
    }
    try {
        // Map 'general' to 'top' for NewsData.io
        const newsDataCategory = category === 'general' ? 'top' : category;
        // Build URL with required parameters
        let url = `https://newsdata.io/api/1/news?apikey=${newsDataKey}&language=en`;
        // Add country parameter
        if (country) {
            url += `&country=${country}`;
        }
        // Always add category parameter
        if (newsDataCategory) {
            url += `&category=${newsDataCategory}`;
        }
        console.log(`🔍 Fetching ${newsDataCategory} news for ${country.toUpperCase()}`);
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 429) {
                console.warn('⚠️ NewsData.io API rate limit exceeded (200 requests/day on free tier)');
            } else {
                console.error(`❌ NewsData.io API error: ${response.status} ${response.statusText}`);
            }
            return [];
        }
        const data = await response.json();
        if (data.status !== 'success') {
            console.error('❌ NewsData.io returned error status:', data);
            return [];
        }
        if (!data.results || data.results.length === 0) {
            console.warn(`⚠️ No articles found for category: ${newsDataCategory}, country: ${country}`);
            return [];
        }
        const articles = data.results.slice(0, pageSize).map(convertNewsDataArticle);
        console.log(`✅ Successfully fetched ${articles.length} articles for category: ${newsDataCategory}`);
        return articles;
    } catch (error) {
        console.error('❌ NewsData.io request failed:', error);
        return [];
    }
};
const fetchNewsByQuery = async (query, pageSize = 20, page = 1)=>{
    const newsDataKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || process.env.NEWS_API_KEY;
    if (!newsDataKey || !newsDataKey.startsWith('pub_')) {
        console.error('❌ No valid NewsData.io API key found for search');
        return [];
    }
    try {
        const url = `https://newsdata.io/api/1/news?apikey=${newsDataKey}&q=${encodeURIComponent(query)}&language=en`;
        console.log(`🔍 Searching NewsData.io for: "${query}"`);
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 429) {
                console.warn('⚠️ NewsData.io API rate limit exceeded for search');
            } else {
                console.error(`❌ NewsData.io search API error: ${response.status} ${response.statusText}`);
            }
            return [];
        }
        const data = await response.json();
        if (data.status !== 'success') {
            console.error('❌ NewsData.io search returned error status:', data);
            return [];
        }
        if (!data.results || data.results.length === 0) {
            console.warn(`⚠️ No articles found for search query: "${query}"`);
            return [];
        }
        const articles = data.results.slice(0, pageSize).map(convertNewsDataArticle);
        console.log(`✅ Successfully fetched ${articles.length} articles for query: "${query}"`);
        return articles;
    } catch (error) {
        console.error('❌ NewsData.io search request failed:', error);
        return [];
    }
};
const fetchNewsBySources = async (sources, pageSize = 20, page = 1)=>{
    console.warn('⚠️ fetchNewsBySources is not supported by NewsData.io free tier');
    return [];
};
}),
"[project]/src/components/ui/LoadingSpinner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const LoadingSpinner = ({ size = 'md' })=>{
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center items-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${sizeClasses[size]} animate-spin rounded-full border-t-2 border-b-2 border-blue-500`
        }, void 0, false, {
            fileName: "[project]/src/components/ui/LoadingSpinner.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/LoadingSpinner.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = LoadingSpinner;
}),
"[project]/src/components/ui/ErrorMessage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const ErrorMessage = ({ message })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                children: "Error: "
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ErrorMessage.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            " ",
            message
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/ErrorMessage.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ErrorMessage;
}),
"[project]/src/data/citiesData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Comprehensive list of major cities by state/region
__turbopack_context__.s([
    "citiesByState",
    ()=>citiesByState
]);
const citiesByState = {
    // USA - All 50 States
    'Alabama': [
        'Birmingham',
        'Montgomery',
        'Mobile',
        'Huntsville',
        'Tuscaloosa'
    ],
    'Alaska': [
        'Anchorage',
        'Fairbanks',
        'Juneau',
        'Sitka',
        'Ketchikan'
    ],
    'Arizona': [
        'Phoenix',
        'Tucson',
        'Mesa',
        'Chandler',
        'Scottsdale'
    ],
    'Arkansas': [
        'Little Rock',
        'Fort Smith',
        'Fayetteville',
        'Springdale',
        'Jonesboro'
    ],
    'California': [
        'Los Angeles',
        'San Francisco',
        'San Diego',
        'Sacramento',
        'San Jose',
        'Fresno',
        'Long Beach',
        'Oakland',
        'Bakersfield',
        'Anaheim'
    ],
    'Colorado': [
        'Denver',
        'Colorado Springs',
        'Aurora',
        'Fort Collins',
        'Lakewood'
    ],
    'Connecticut': [
        'Bridgeport',
        'New Haven',
        'Hartford',
        'Stamford',
        'Waterbury'
    ],
    'Delaware': [
        'Wilmington',
        'Dover',
        'Newark',
        'Middletown',
        'Smyrna'
    ],
    'Florida': [
        'Miami',
        'Orlando',
        'Tampa',
        'Jacksonville',
        'Fort Lauderdale',
        'Tallahassee',
        'St. Petersburg',
        'Hialeah',
        'Port St. Lucie',
        'Cape Coral'
    ],
    'Georgia': [
        'Atlanta',
        'Augusta',
        'Columbus',
        'Macon',
        'Savannah'
    ],
    'Hawaii': [
        'Honolulu',
        'Pearl City',
        'Hilo',
        'Kailua',
        'Waipahu'
    ],
    'Idaho': [
        'Boise',
        'Meridian',
        'Nampa',
        'Idaho Falls',
        'Pocatello'
    ],
    'Illinois': [
        'Chicago',
        'Aurora',
        'Naperville',
        'Joliet',
        'Rockford',
        'Springfield',
        'Peoria',
        'Elgin',
        'Waukegan',
        'Cicero'
    ],
    'Indiana': [
        'Indianapolis',
        'Fort Wayne',
        'Evansville',
        'South Bend',
        'Carmel'
    ],
    'Iowa': [
        'Des Moines',
        'Cedar Rapids',
        'Davenport',
        'Sioux City',
        'Iowa City'
    ],
    'Kansas': [
        'Wichita',
        'Overland Park',
        'Kansas City',
        'Topeka',
        'Olathe'
    ],
    'Kentucky': [
        'Louisville',
        'Lexington',
        'Bowling Green',
        'Owensboro',
        'Covington'
    ],
    'Louisiana': [
        'New Orleans',
        'Baton Rouge',
        'Shreveport',
        'Lafayette',
        'Lake Charles'
    ],
    'Maine': [
        'Portland',
        'Lewiston',
        'Bangor',
        'South Portland',
        'Auburn'
    ],
    'Maryland': [
        'Baltimore',
        'Frederick',
        'Rockville',
        'Gaithersburg',
        'Bowie'
    ],
    'Massachusetts': [
        'Boston',
        'Worcester',
        'Springfield',
        'Cambridge',
        'Lowell'
    ],
    'Michigan': [
        'Detroit',
        'Grand Rapids',
        'Warren',
        'Sterling Heights',
        'Ann Arbor'
    ],
    'Minnesota': [
        'Minneapolis',
        'St. Paul',
        'Rochester',
        'Duluth',
        'Bloomington'
    ],
    'Mississippi': [
        'Jackson',
        'Gulfport',
        'Southaven',
        'Hattiesburg',
        'Biloxi'
    ],
    'Missouri': [
        'Kansas City',
        'St. Louis',
        'Springfield',
        'Columbia',
        'Independence'
    ],
    'Montana': [
        'Billings',
        'Missoula',
        'Great Falls',
        'Bozeman',
        'Butte'
    ],
    'Nebraska': [
        'Omaha',
        'Lincoln',
        'Bellevue',
        'Grand Island',
        'Kearney'
    ],
    'Nevada': [
        'Las Vegas',
        'Henderson',
        'Reno',
        'North Las Vegas',
        'Sparks'
    ],
    'New Hampshire': [
        'Manchester',
        'Nashua',
        'Concord',
        'Derry',
        'Rochester'
    ],
    'New Jersey': [
        'Newark',
        'Jersey City',
        'Paterson',
        'Elizabeth',
        'Edison'
    ],
    'New Mexico': [
        'Albuquerque',
        'Las Cruces',
        'Rio Rancho',
        'Santa Fe',
        'Roswell'
    ],
    'New York': [
        'New York City',
        'Buffalo',
        'Rochester',
        'Yonkers',
        'Syracuse',
        'Albany',
        'New Rochelle',
        'Mount Vernon',
        'Schenectady',
        'Utica'
    ],
    'North Carolina': [
        'Charlotte',
        'Raleigh',
        'Greensboro',
        'Durham',
        'Winston-Salem'
    ],
    'North Dakota': [
        'Fargo',
        'Bismarck',
        'Grand Forks',
        'Minot',
        'West Fargo'
    ],
    'Ohio': [
        'Columbus',
        'Cleveland',
        'Cincinnati',
        'Toledo',
        'Akron'
    ],
    'Oklahoma': [
        'Oklahoma City',
        'Tulsa',
        'Norman',
        'Broken Arrow',
        'Lawton'
    ],
    'Oregon': [
        'Portland',
        'Salem',
        'Eugene',
        'Gresham',
        'Hillsboro'
    ],
    'Pennsylvania': [
        'Philadelphia',
        'Pittsburgh',
        'Allentown',
        'Erie',
        'Reading'
    ],
    'Rhode Island': [
        'Providence',
        'Warwick',
        'Cranston',
        'Pawtucket',
        'East Providence'
    ],
    'South Carolina': [
        'Charleston',
        'Columbia',
        'North Charleston',
        'Mount Pleasant',
        'Rock Hill'
    ],
    'South Dakota': [
        'Sioux Falls',
        'Rapid City',
        'Aberdeen',
        'Brookings',
        'Watertown'
    ],
    'Tennessee': [
        'Nashville',
        'Memphis',
        'Knoxville',
        'Chattanooga',
        'Clarksville'
    ],
    'Texas': [
        'Houston',
        'Dallas',
        'Austin',
        'San Antonio',
        'Fort Worth',
        'El Paso',
        'Arlington',
        'Corpus Christi',
        'Plano',
        'Laredo'
    ],
    'Utah': [
        'Salt Lake City',
        'West Valley City',
        'Provo',
        'West Jordan',
        'Orem'
    ],
    'Vermont': [
        'Burlington',
        'South Burlington',
        'Rutland',
        'Barre',
        'Montpelier'
    ],
    'Virginia': [
        'Virginia Beach',
        'Norfolk',
        'Chesapeake',
        'Richmond',
        'Newport News'
    ],
    'Washington': [
        'Seattle',
        'Spokane',
        'Tacoma',
        'Vancouver',
        'Bellevue'
    ],
    'West Virginia': [
        'Charleston',
        'Huntington',
        'Morgantown',
        'Parkersburg',
        'Wheeling'
    ],
    'Wisconsin': [
        'Milwaukee',
        'Madison',
        'Green Bay',
        'Kenosha',
        'Racine'
    ],
    'Wyoming': [
        'Cheyenne',
        'Casper',
        'Laramie',
        'Gillette',
        'Rock Springs'
    ],
    // India - All States and Union Territories
    'Andhra Pradesh': [
        'Visakhapatnam',
        'Vijayawada',
        'Guntur',
        'Nellore',
        'Kurnool'
    ],
    'Arunachal Pradesh': [
        'Itanagar',
        'Naharlagun',
        'Pasighat',
        'Namsai',
        'Tezu'
    ],
    'Assam': [
        'Guwahati',
        'Silchar',
        'Dibrugarh',
        'Jorhat',
        'Nagaon'
    ],
    'Bihar': [
        'Patna',
        'Gaya',
        'Bhagalpur',
        'Muzaffarpur',
        'Purnia'
    ],
    'Chhattisgarh': [
        'Raipur',
        'Bhilai',
        'Bilaspur',
        'Korba',
        'Durg'
    ],
    'Goa': [
        'Panaji',
        'Margao',
        'Vasco da Gama',
        'Mapusa',
        'Ponda'
    ],
    'Gujarat': [
        'Ahmedabad',
        'Surat',
        'Vadodara',
        'Rajkot',
        'Bhavnagar',
        'Jamnagar',
        'Junagadh',
        'Gandhinagar',
        'Anand',
        'Nadiad'
    ],
    'Haryana': [
        'Faridabad',
        'Gurgaon',
        'Panipat',
        'Ambala',
        'Yamunanagar'
    ],
    'Himachal Pradesh': [
        'Shimla',
        'Dharamshala',
        'Solan',
        'Mandi',
        'Kullu'
    ],
    'Jharkhand': [
        'Ranchi',
        'Jamshedpur',
        'Dhanbad',
        'Bokaro',
        'Deoghar'
    ],
    'Karnataka': [
        'Bangalore',
        'Mysore',
        'Mangalore',
        'Hubli',
        'Belgaum',
        'Gulbarga',
        'Davangere',
        'Bellary',
        'Bijapur',
        'Shimoga'
    ],
    'Kerala': [
        'Thiruvananthapuram',
        'Kochi',
        'Kozhikode',
        'Thrissur',
        'Kollam'
    ],
    'Madhya Pradesh': [
        'Indore',
        'Bhopal',
        'Jabalpur',
        'Gwalior',
        'Ujjain'
    ],
    'Maharashtra': [
        'Mumbai',
        'Pune',
        'Nagpur',
        'Thane',
        'Nashik',
        'Aurangabad',
        'Solapur',
        'Kolhapur',
        'Amravati',
        'Nanded'
    ],
    'Manipur': [
        'Imphal',
        'Thoubal',
        'Bishnupur',
        'Churachandpur',
        'Kakching'
    ],
    'Meghalaya': [
        'Shillong',
        'Tura',
        'Nongstoin',
        'Jowai',
        'Baghmara'
    ],
    'Mizoram': [
        'Aizawl',
        'Lunglei',
        'Champhai',
        'Serchhip',
        'Kolasib'
    ],
    'Nagaland': [
        'Kohima',
        'Dimapur',
        'Mokokchung',
        'Tuensang',
        'Wokha'
    ],
    'Odisha': [
        'Bhubaneswar',
        'Cuttack',
        'Rourkela',
        'Berhampur',
        'Sambalpur'
    ],
    'Punjab': [
        'Ludhiana',
        'Amritsar',
        'Jalandhar',
        'Patiala',
        'Bathinda'
    ],
    'Rajasthan': [
        'Jaipur',
        'Jodhpur',
        'Kota',
        'Bikaner',
        'Udaipur',
        'Ajmer',
        'Bhilwara',
        'Alwar',
        'Bharatpur',
        'Sikar'
    ],
    'Sikkim': [
        'Gangtok',
        'Namchi',
        'Gyalshing',
        'Mangan',
        'Rangpo'
    ],
    'Tamil Nadu': [
        'Chennai',
        'Coimbatore',
        'Madurai',
        'Tiruchirappalli',
        'Salem',
        'Tirunelveli',
        'Tiruppur',
        'Erode',
        'Vellore',
        'Thoothukudi'
    ],
    'Telangana': [
        'Hyderabad',
        'Warangal',
        'Nizamabad',
        'Khammam',
        'Karimnagar'
    ],
    'Tripura': [
        'Agartala',
        'Udaipur',
        'Dharmanagar',
        'Kailasahar',
        'Belonia'
    ],
    'Uttar Pradesh': [
        'Lucknow',
        'Kanpur',
        'Ghaziabad',
        'Agra',
        'Varanasi',
        'Meerut',
        'Allahabad',
        'Bareilly',
        'Aligarh',
        'Moradabad'
    ],
    'Uttarakhand': [
        'Dehradun',
        'Haridwar',
        'Roorkee',
        'Haldwani',
        'Rudrapur'
    ],
    'West Bengal': [
        'Kolkata',
        'Howrah',
        'Durgapur',
        'Asansol',
        'Siliguri'
    ],
    'Delhi': [
        'New Delhi',
        'Central Delhi',
        'South Delhi',
        'North Delhi',
        'East Delhi',
        'West Delhi',
        'North East Delhi',
        'North West Delhi',
        'South East Delhi',
        'South West Delhi'
    ],
    'Jammu and Kashmir': [
        'Srinagar',
        'Jammu',
        'Anantnag',
        'Baramulla',
        'Udhampur'
    ],
    'Ladakh': [
        'Leh',
        'Kargil',
        'Nubra',
        'Zanskar',
        'Drass'
    ],
    'Puducherry': [
        'Puducherry',
        'Karaikal',
        'Mahe',
        'Yanam'
    ],
    'Chandigarh': [
        'Chandigarh'
    ],
    'Dadra and Nagar Haveli': [
        'Silvassa'
    ],
    'Daman and Diu': [
        'Daman',
        'Diu'
    ],
    'Lakshadweep': [
        'Kavaratti',
        'Agatti',
        'Amini',
        'Andrott',
        'Minicoy'
    ],
    'Andaman and Nicobar Islands': [
        'Port Blair',
        'Diglipur',
        'Rangat',
        'Mayabunder',
        'Car Nicobar'
    ],
    // UK
    'England': [
        'London',
        'Manchester',
        'Birmingham',
        'Liverpool',
        'Leeds',
        'Sheffield',
        'Bristol',
        'Newcastle',
        'Nottingham',
        'Southampton'
    ],
    'Scotland': [
        'Edinburgh',
        'Glasgow',
        'Aberdeen',
        'Dundee',
        'Inverness',
        'Stirling',
        'Perth',
        'Paisley'
    ],
    'Wales': [
        'Cardiff',
        'Swansea',
        'Newport',
        'Wrexham',
        'Barry',
        'Merthyr Tydfil',
        'Neath',
        'Bridgend'
    ],
    'Northern Ireland': [
        'Belfast',
        'Derry',
        'Lisburn',
        'Newry',
        'Armagh',
        'Bangor',
        'Craigavon',
        'Ballymena'
    ],
    // Canada
    'Alberta': [
        'Calgary',
        'Edmonton',
        'Red Deer',
        'Lethbridge',
        'Medicine Hat',
        'Grande Prairie',
        'Airdrie',
        'Spruce Grove'
    ],
    'British Columbia': [
        'Vancouver',
        'Victoria',
        'Surrey',
        'Burnaby',
        'Richmond',
        'Abbotsford',
        'Coquitlam',
        'Kelowna'
    ],
    'Manitoba': [
        'Winnipeg',
        'Brandon',
        'Steinbach',
        'Thompson',
        'Portage la Prairie'
    ],
    'New Brunswick': [
        'Moncton',
        'Saint John',
        'Fredericton',
        'Dieppe',
        'Miramichi'
    ],
    'Newfoundland and Labrador': [
        'St. Johns',
        'Mount Pearl',
        'Corner Brook',
        'Conception Bay South',
        'Grand Falls-Windsor'
    ],
    'Northwest Territories': [
        'Yellowknife',
        'Hay River',
        'Inuvik',
        'Fort Smith',
        'Behchoko'
    ],
    'Nova Scotia': [
        'Halifax',
        'Sydney',
        'Dartmouth',
        'Truro',
        'New Glasgow'
    ],
    'Nunavut': [
        'Iqaluit',
        'Rankin Inlet',
        'Arviat',
        'Baker Lake',
        'Cambridge Bay'
    ],
    'Ontario': [
        'Toronto',
        'Ottawa',
        'Mississauga',
        'Hamilton',
        'London',
        'Kitchener',
        'Windsor',
        'Oshawa',
        'Barrie',
        'Kingston'
    ],
    'Prince Edward Island': [
        'Charlottetown',
        'Summerside',
        'Stratford',
        'Cornwall',
        'Montague'
    ],
    'Quebec': [
        'Montreal',
        'Quebec City',
        'Laval',
        'Gatineau',
        'Longueuil',
        'Sherbrooke',
        'Saguenay',
        'Trois-Rivières'
    ],
    'Saskatchewan': [
        'Saskatoon',
        'Regina',
        'Prince Albert',
        'Moose Jaw',
        'Swift Current'
    ],
    'Yukon': [
        'Whitehorse',
        'Dawson City',
        'Watson Lake',
        'Haines Junction',
        'Carmacks'
    ],
    // Australia
    'New South Wales': [
        'Sydney',
        'Newcastle',
        'Wollongong',
        'Central Coast',
        'Maitland',
        'Wagga Wagga',
        'Albury',
        'Port Macquarie'
    ],
    'Victoria': [
        'Melbourne',
        'Geelong',
        'Ballarat',
        'Bendigo',
        'Shepparton',
        'Mildura',
        'Warrnambool',
        'Wodonga'
    ],
    'Queensland': [
        'Brisbane',
        'Gold Coast',
        'Sunshine Coast',
        'Townsville',
        'Cairns',
        'Toowoomba',
        'Mackay',
        'Rockhampton'
    ],
    'Western Australia': [
        'Perth',
        'Mandurah',
        'Bunbury',
        'Kalgoorlie',
        'Geraldton',
        'Albany',
        'Broome',
        'Busselton'
    ],
    'South Australia': [
        'Adelaide',
        'Mount Gambier',
        'Whyalla',
        'Murray Bridge',
        'Port Augusta',
        'Port Pirie',
        'Victor Harbor'
    ],
    'Tasmania': [
        'Hobart',
        'Launceston',
        'Devonport',
        'Burnie',
        'Kingston',
        'Ulverstone',
        'Glenorchy'
    ],
    'Australian Capital Territory': [
        'Canberra',
        'Queanbeyan',
        'Gungahlin',
        'Tuggeranong',
        'Belconnen'
    ],
    'Northern Territory': [
        'Darwin',
        'Alice Springs',
        'Palmerston',
        'Katherine',
        'Nhulunbuy'
    ],
    // Germany
    'Baden-Württemberg': [
        'Stuttgart',
        'Mannheim',
        'Karlsruhe',
        'Freiburg',
        'Heidelberg',
        'Ulm',
        'Heilbronn',
        'Pforzheim'
    ],
    'Bavaria': [
        'Munich',
        'Nuremberg',
        'Augsburg',
        'Regensburg',
        'Ingolstadt',
        'Würzburg',
        'Fürth',
        'Erlangen'
    ],
    'Berlin': [
        'Mitte',
        'Charlottenburg',
        'Kreuzberg',
        'Prenzlauer Berg',
        'Neukölln',
        'Friedrichshain',
        'Tempelhof',
        'Schöneberg'
    ],
    'Brandenburg': [
        'Potsdam',
        'Cottbus',
        'Brandenburg',
        'Frankfurt (Oder)',
        'Oranienburg'
    ],
    'Bremen': [
        'Bremen',
        'Bremerhaven'
    ],
    'Hamburg': [
        'Altona',
        'Eimsbüttel',
        'Hamburg-Mitte',
        'Wandsbek',
        'Bergedorf',
        'Harburg',
        'Hamburg-Nord'
    ],
    'Hesse': [
        'Frankfurt',
        'Wiesbaden',
        'Kassel',
        'Darmstadt',
        'Offenbach',
        'Hanau',
        'Gießen',
        'Marburg'
    ],
    'Lower Saxony': [
        'Hanover',
        'Braunschweig',
        'Oldenburg',
        'Osnabrück',
        'Wolfsburg',
        'Göttingen',
        'Salzgitter'
    ],
    'Mecklenburg-Vorpommern': [
        'Rostock',
        'Schwerin',
        'Neubrandenburg',
        'Stralsund',
        'Greifswald'
    ],
    'North Rhine-Westphalia': [
        'Cologne',
        'Düsseldorf',
        'Dortmund',
        'Essen',
        'Duisburg',
        'Bochum',
        'Wuppertal',
        'Bielefeld',
        'Bonn',
        'Münster'
    ],
    'Rhineland-Palatinate': [
        'Mainz',
        'Ludwigshafen',
        'Koblenz',
        'Trier',
        'Kaiserslautern'
    ],
    'Saarland': [
        'Saarbrücken',
        'Neunkirchen',
        'Homburg',
        'Völklingen',
        'St. Wendel'
    ],
    'Saxony': [
        'Leipzig',
        'Dresden',
        'Chemnitz',
        'Zwickau',
        'Plauen'
    ],
    'Saxony-Anhalt': [
        'Magdeburg',
        'Halle',
        'Dessau',
        'Wittenberg',
        'Stendal'
    ],
    'Schleswig-Holstein': [
        'Kiel',
        'Lübeck',
        'Flensburg',
        'Neumünster',
        'Norderstedt'
    ],
    'Thuringia': [
        'Erfurt',
        'Jena',
        'Gera',
        'Weimar',
        'Gotha'
    ]
};
}),
"[project]/src/components/ui/NewsSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$NewsCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/NewsCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$newsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/newsService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LoadingSpinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/LoadingSpinner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorMessage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ErrorMessage.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$citiesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/citiesData.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const NewsSection = ({ defaultCategory = 'general', defaultCountry = 'in', useWorldAPI = false })=>{
    const [articles, setArticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultCategory);
    const [selectedCountry, setSelectedCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultCountry);
    const [selectedState, setSelectedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCity, setSelectedCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const categories = [
        {
            id: 'general',
            name: 'General'
        },
        {
            id: 'business',
            name: 'Business'
        },
        {
            id: 'entertainment',
            name: 'Entertainment'
        },
        {
            id: 'health',
            name: 'Health'
        },
        {
            id: 'science',
            name: 'Science'
        },
        {
            id: 'sports',
            name: 'Sports'
        },
        {
            id: 'technology',
            name: 'Technology'
        }
    ];
    const countries = [
        {
            code: 'us',
            name: 'United States',
            flag: '🇺🇸'
        },
        {
            code: 'in',
            name: 'India',
            flag: '🇮🇳'
        },
        {
            code: 'gb',
            name: 'United Kingdom',
            flag: '🇬🇧'
        },
        {
            code: 'ca',
            name: 'Canada',
            flag: '🇨🇦'
        },
        {
            code: 'au',
            name: 'Australia',
            flag: '🇦🇺'
        },
        {
            code: 'de',
            name: 'Germany',
            flag: '🇩🇪'
        }
    ];
    // States/Regions for different countries
    const statesByCountry = {
        us: [
            'Alabama',
            'Alaska',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Delaware',
            'Florida',
            'Georgia',
            'Hawaii',
            'Idaho',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Montana',
            'Nebraska',
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'New York',
            'North Carolina',
            'North Dakota',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Pennsylvania',
            'Rhode Island',
            'South Carolina',
            'South Dakota',
            'Tennessee',
            'Texas',
            'Utah',
            'Vermont',
            'Virginia',
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming'
        ],
        in: [
            'Andhra Pradesh',
            'Arunachal Pradesh',
            'Assam',
            'Bihar',
            'Chhattisgarh',
            'Goa',
            'Gujarat',
            'Haryana',
            'Himachal Pradesh',
            'Jharkhand',
            'Karnataka',
            'Kerala',
            'Madhya Pradesh',
            'Maharashtra',
            'Manipur',
            'Meghalaya',
            'Mizoram',
            'Nagaland',
            'Odisha',
            'Punjab',
            'Rajasthan',
            'Sikkim',
            'Tamil Nadu',
            'Telangana',
            'Tripura',
            'Uttar Pradesh',
            'Uttarakhand',
            'West Bengal',
            'Delhi',
            'Jammu and Kashmir',
            'Ladakh',
            'Puducherry',
            'Chandigarh',
            'Dadra and Nagar Haveli',
            'Daman and Diu',
            'Lakshadweep',
            'Andaman and Nicobar Islands'
        ],
        gb: [
            'England',
            'Scotland',
            'Wales',
            'Northern Ireland'
        ],
        ca: [
            'Alberta',
            'British Columbia',
            'Manitoba',
            'New Brunswick',
            'Newfoundland and Labrador',
            'Northwest Territories',
            'Nova Scotia',
            'Nunavut',
            'Ontario',
            'Prince Edward Island',
            'Quebec',
            'Saskatchewan',
            'Yukon'
        ],
        au: [
            'New South Wales',
            'Victoria',
            'Queensland',
            'Western Australia',
            'South Australia',
            'Tasmania',
            'Australian Capital Territory',
            'Northern Territory'
        ],
        de: [
            'Baden-Württemberg',
            'Bavaria',
            'Berlin',
            'Brandenburg',
            'Bremen',
            'Hamburg',
            'Hesse',
            'Lower Saxony',
            'Mecklenburg-Vorpommern',
            'North Rhine-Westphalia',
            'Rhineland-Palatinate',
            'Saarland',
            'Saxony',
            'Saxony-Anhalt',
            'Schleswig-Holstein',
            'Thuringia'
        ]
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadNews();
    }, [
        selectedCategory,
        selectedCountry,
        selectedState,
        selectedCity,
        searchQuery
    ]);
    const loadNews = async ()=>{
        try {
            setLoading(true);
            setError(null);
            let newsData = [];
            if (searchQuery.trim()) {
                // If there's a search query, fetch news based on the query
                newsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$newsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchNewsByQuery"])(searchQuery);
            } else if (selectedCity) {
                // If a city is selected, search for news from that city
                const cityQuery = `${selectedCity} ${selectedState}`;
                newsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$newsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchNewsByQuery"])(cityQuery);
            } else if (selectedState) {
                // If a state is selected, search for news from that state
                const stateQuery = `${selectedState} ${selectedCountry === 'us' ? 'USA' : selectedCountry === 'in' ? 'India' : ''}`;
                newsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$newsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchNewsByQuery"])(stateQuery);
            } else {
                // Otherwise, fetch top headlines by category and country
                newsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$newsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTopHeadlines"])(selectedCategory, selectedCountry, 20, 1, useWorldAPI);
            }
            if (newsData.length === 0) {
                setError(`No news articles found for ${selectedCity || selectedState || selectedCountry.toUpperCase()} in ${selectedCategory} category. The API might have rate limits or the region may not have articles in this category.`);
            }
            setArticles(newsData);
        } catch (err) {
            setError('Failed to load news. Please try again later.');
            console.error('Error loading news:', err);
        } finally{
            setLoading(false);
        }
    };
    const handleCategoryChange = (category)=>{
        setSelectedCategory(category);
        setSearchQuery(''); // Reset search when changing category
    };
    const handleCountryChange = (countryCode)=>{
        setSelectedCountry(countryCode);
        setSelectedState(''); // Reset state when changing country
        setSelectedCity(''); // Reset city when changing country
        setSearchQuery(''); // Reset search when changing country
    };
    const handleStateChange = (state)=>{
        setSelectedState(state);
        setSelectedCity(''); // Reset city when changing state
        setSearchQuery(''); // Reset search when changing state
    };
    const handleCityChange = (city)=>{
        setSelectedCity(city);
        setSearchQuery(''); // Reset search when changing city
    };
    const handleSearch = (e)=>{
        e.preventDefault();
    // The effect will handle loading based on searchQuery
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center",
                        children: "Latest News"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/NewsSection.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center",
                                children: "Select Country:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/NewsSection.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 justify-center",
                                children: countries.map((country)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleCountryChange(country.code),
                                        className: `px-4 py-2 text-sm rounded-lg flex items-center justify-center gap-2 transition-colors ${selectedCountry === country.code ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: country.flag
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/NewsSection.tsx",
                                                lineNumber: 147,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: country.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/NewsSection.tsx",
                                                lineNumber: 148,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, country.code, true, {
                                        fileName: "[project]/src/components/ui/NewsSection.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/NewsSection.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/NewsSection.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    statesByCountry[selectedCountry] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center",
                                children: "Select State/Region (Optional):"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/NewsSection.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleStateChange(''),
                                        className: `px-3 py-1.5 text-sm rounded-lg transition-colors text-center ${selectedState === '' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`,
                                        children: "All States"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/NewsSection.tsx",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    statesByCountry[selectedCountry].map((state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleStateChange(state),
                                            className: `px-3 py-1.5 text-sm rounded-lg transition-colors text-center ${selectedState === state ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`,
                                            children: state
                                        }, state, false, {
                                            fileName: "[project]/src/components/ui/NewsSection.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/NewsSection.tsx",
                                lineNumber: 160,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/NewsSection.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    selectedState && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$citiesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["citiesByState"][selectedState] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center",
                                children: "Select City (Optional):"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/NewsSection.tsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleCityChange(''),
                                        className: `px-3 py-1.5 text-sm rounded-lg transition-colors text-center ${selectedCity === '' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`,
                                        children: "All Cities"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/NewsSection.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$citiesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["citiesByState"][selectedState].map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleCityChange(city),
                                            className: `px-3 py-1.5 text-sm rounded-lg transition-colors text-center ${selectedCity === city ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`,
                                            children: city
                                        }, city, false, {
                                            fileName: "[project]/src/components/ui/NewsSection.tsx",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/NewsSection.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/NewsSection.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSearch,
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: searchQuery,
                                            onChange: (e)=>setSearchQuery(e.target.value),
                                            placeholder: "Search for news...",
                                            className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/NewsSection.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600",
                                            children: "🔍"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/NewsSection.tsx",
                                            lineNumber: 233,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/NewsSection.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/NewsSection.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 justify-center",
                                children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleCategoryChange(category.id),
                                        className: `px-3 py-1.5 text-sm rounded-full text-center ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`,
                                        children: category.name
                                    }, category.id, false, {
                                        fileName: "[project]/src/components/ui/NewsSection.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/NewsSection.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/NewsSection.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/NewsSection.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorMessage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                message: error
            }, void 0, false, {
                fileName: "[project]/src/components/ui/NewsSection.tsx",
                lineNumber: 260,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LoadingSpinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/ui/NewsSection.tsx",
                    lineNumber: 264,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/NewsSection.tsx",
                lineNumber: 263,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: articles.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                    children: articles.map((article, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$NewsCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            article: article
                        }, index, false, {
                            fileName: "[project]/src/components/ui/NewsSection.tsx",
                            lineNumber: 271,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/NewsSection.tsx",
                    lineNumber: 269,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-lg",
                            children: "No news articles found."
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/NewsSection.tsx",
                            lineNumber: 276,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-400 text-sm mt-2",
                            children: "Try changing your search or category."
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/NewsSection.tsx",
                            lineNumber: 277,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/NewsSection.tsx",
                    lineNumber: 275,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/NewsSection.tsx",
                lineNumber: 267,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/NewsSection.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = NewsSection;
}),
"[project]/src/app/news/breaking/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewsBreakingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$NewsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/NewsSection.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function NewsBreakingPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-gray-800 dark:text-white text-center border-2 border-blue-300 p-4 rounded-lg",
                    children: "Breaking News"
                }, void 0, false, {
                    fileName: "[project]/src/app/news/breaking/page.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/news/breaking/page.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-4 text-gray-600 dark:text-gray-300 text-center",
                children: "Get the latest breaking news as it happens."
            }, void 0, false, {
                fileName: "[project]/src/app/news/breaking/page.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$NewsSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    defaultCategory: "general",
                    defaultCountry: "in"
                }, void 0, false, {
                    fileName: "[project]/src/app/news/breaking/page.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/news/breaking/page.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/news/breaking/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_465ba020._.js.map