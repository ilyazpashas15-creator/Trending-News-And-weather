module.exports = [
"[project]/src/data/holidaysData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Comprehensive holidays and festivals data for 2026
__turbopack_context__.s([
    "getCountries",
    ()=>getCountries,
    "getHolidaysByType",
    ()=>getHolidaysByType,
    "getHolidaysForDate",
    ()=>getHolidaysForDate,
    "getHolidaysForMonth",
    ()=>getHolidaysForMonth,
    "holidayColors",
    ()=>holidayColors,
    "holidayIcons",
    ()=>holidayIcons,
    "holidays2026",
    ()=>holidays2026
]);
const holidays2026 = [
    // January 2026
    {
        date: '2026-01-01',
        name: "New Year's Day",
        country: 'Worldwide',
        type: 'national',
        description: 'First day of the year - Government Holiday'
    },
    {
        date: '2026-01-06',
        name: 'Epiphany',
        country: 'Christian Countries',
        type: 'religious',
        description: 'Christian feast day'
    },
    {
        date: '2026-01-14',
        name: 'Makar Sankranti',
        country: 'India',
        type: 'festival',
        description: 'Hindu harvest festival'
    },
    {
        date: '2026-01-14',
        name: 'Pongal',
        country: 'India',
        type: 'festival',
        description: 'Tamil harvest festival'
    },
    {
        date: '2026-01-19',
        name: 'Martin Luther King Jr. Day',
        country: 'USA',
        type: 'national',
        description: 'US federal holiday - Government Holiday'
    },
    {
        date: '2026-01-26',
        name: 'Republic Day',
        country: 'India',
        type: 'national',
        description: 'Indian Constitution adopted - Government Holiday'
    },
    {
        date: '2026-01-26',
        name: 'Australia Day',
        country: 'Australia',
        type: 'national',
        description: 'National day of Australia - Government Holiday'
    },
    // February 2026
    {
        date: '2026-02-14',
        name: "Valentine's Day",
        country: 'Worldwide',
        type: 'observance',
        description: 'Day of love and romance'
    },
    {
        date: '2026-02-16',
        name: 'Presidents Day',
        country: 'USA',
        type: 'national',
        description: 'US federal holiday - Government Holiday'
    },
    {
        date: '2026-02-17',
        name: 'Maha Shivaratri',
        country: 'India',
        type: 'religious',
        description: 'Hindu festival honoring Lord Shiva'
    },
    {
        date: '2026-02-24',
        name: 'Mardi Gras',
        country: 'USA',
        type: 'festival',
        description: 'Carnival celebration'
    },
    // March 2026
    {
        date: '2026-03-01',
        name: "St. David's Day",
        country: 'Wales',
        type: 'national',
        description: 'Patron saint of Wales'
    },
    {
        date: '2026-03-06',
        name: 'Holi',
        country: 'India',
        type: 'festival',
        description: 'Festival of colors'
    },
    {
        date: '2026-03-08',
        name: "International Women's Day",
        country: 'Worldwide',
        type: 'observance',
        description: 'Celebrating women'
    },
    {
        date: '2026-03-14',
        name: 'Eid-ul-Fitr (Tentative)',
        country: 'Islamic Countries',
        type: 'religious',
        description: 'End of Ramadan - Government Holiday in Islamic countries'
    },
    {
        date: '2026-03-17',
        name: "St. Patrick's Day",
        country: 'Ireland',
        type: 'national',
        description: 'Irish cultural celebration - Government Holiday in Ireland'
    },
    {
        date: '2026-03-20',
        name: 'Spring Equinox',
        country: 'Worldwide',
        type: 'observance',
        description: 'First day of spring'
    },
    {
        date: '2026-03-25',
        name: 'Holi (Second Day)',
        country: 'India',
        type: 'festival',
        description: 'Festival of colors celebration'
    },
    // April 2026
    {
        date: '2026-04-01',
        name: "April Fool's Day",
        country: 'Worldwide',
        type: 'observance',
        description: 'Day of pranks and jokes'
    },
    {
        date: '2026-04-02',
        name: 'Ram Navami',
        country: 'India',
        type: 'religious',
        description: 'Birth of Lord Rama - Government Holiday in some states'
    },
    {
        date: '2026-04-03',
        name: 'Good Friday',
        country: 'Christian Countries',
        type: 'religious',
        description: 'Crucifixion of Jesus - Government Holiday'
    },
    {
        date: '2026-04-05',
        name: 'Easter Sunday',
        country: 'Christian Countries',
        type: 'religious',
        description: 'Resurrection of Jesus'
    },
    {
        date: '2026-04-06',
        name: 'Easter Monday',
        country: 'UK',
        type: 'national',
        description: 'Day after Easter - Government Holiday'
    },
    {
        date: '2026-04-10',
        name: 'Mahavir Jayanti',
        country: 'India',
        type: 'religious',
        description: 'Birth of Lord Mahavira - Government Holiday'
    },
    {
        date: '2026-04-13',
        name: 'Vaisakhi',
        country: 'India',
        type: 'festival',
        description: 'Sikh and Hindu festival'
    },
    {
        date: '2026-04-14',
        name: 'Ambedkar Jayanti',
        country: 'India',
        type: 'national',
        description: 'Birth anniversary of Dr. B.R. Ambedkar - Government Holiday'
    },
    {
        date: '2026-04-22',
        name: 'Earth Day',
        country: 'Worldwide',
        type: 'observance',
        description: 'Environmental awareness day'
    },
    {
        date: '2026-04-25',
        name: 'ANZAC Day',
        country: 'Australia',
        type: 'national',
        description: 'Remembrance day - Government Holiday'
    },
    // May 2026
    {
        date: '2026-05-01',
        name: 'Labour Day / May Day',
        country: 'Worldwide',
        type: 'national',
        description: 'International Workers Day - Government Holiday'
    },
    {
        date: '2026-05-04',
        name: 'May the Fourth',
        country: 'Worldwide',
        type: 'observance',
        description: 'Star Wars Day'
    },
    {
        date: '2026-05-07',
        name: 'Buddha Purnima',
        country: 'India',
        type: 'religious',
        description: 'Birth of Buddha - Government Holiday'
    },
    {
        date: '2026-05-10',
        name: "Mother's Day",
        country: 'USA',
        type: 'observance',
        description: 'Honoring mothers'
    },
    {
        date: '2026-05-21',
        name: 'Eid-ul-Adha (Tentative)',
        country: 'Islamic Countries',
        type: 'religious',
        description: 'Festival of Sacrifice - Government Holiday in Islamic countries'
    },
    {
        date: '2026-05-25',
        name: 'Memorial Day',
        country: 'USA',
        type: 'national',
        description: 'US federal holiday - Government Holiday'
    },
    // June 2026
    {
        date: '2026-06-14',
        name: 'Flag Day',
        country: 'USA',
        type: 'observance',
        description: 'US flag commemoration'
    },
    {
        date: '2026-06-19',
        name: 'Juneteenth',
        country: 'USA',
        type: 'national',
        description: 'Freedom Day - Government Holiday'
    },
    {
        date: '2026-06-21',
        name: "Father's Day",
        country: 'USA',
        type: 'observance',
        description: 'Honoring fathers'
    },
    {
        date: '2026-06-21',
        name: 'Summer Solstice',
        country: 'Worldwide',
        type: 'observance',
        description: 'Longest day of the year'
    },
    // July 2026
    {
        date: '2026-07-01',
        name: 'Canada Day',
        country: 'Canada',
        type: 'national',
        description: 'Canadian national day - Government Holiday'
    },
    {
        date: '2026-07-04',
        name: 'Independence Day',
        country: 'USA',
        type: 'national',
        description: 'US Independence - Government Holiday'
    },
    {
        date: '2026-07-14',
        name: 'Bastille Day',
        country: 'France',
        type: 'national',
        description: 'French national day - Government Holiday'
    },
    {
        date: '2026-07-17',
        name: 'Muharram (Tentative)',
        country: 'Islamic Countries',
        type: 'religious',
        description: 'Islamic New Year - Government Holiday in Islamic countries'
    },
    // August 2026
    {
        date: '2026-08-03',
        name: 'Friendship Day',
        country: 'Worldwide',
        type: 'observance',
        description: 'Celebrating friendship'
    },
    {
        date: '2026-08-15',
        name: 'Independence Day',
        country: 'India',
        type: 'national',
        description: 'Indian Independence - Government Holiday'
    },
    {
        date: '2026-08-15',
        name: 'Assumption of Mary',
        country: 'Christian Countries',
        type: 'religious',
        description: 'Christian feast day - Government Holiday in some countries'
    },
    {
        date: '2026-08-16',
        name: 'Raksha Bandhan',
        country: 'India',
        type: 'festival',
        description: 'Brother-sister bond celebration'
    },
    {
        date: '2026-08-24',
        name: 'Janmashtami',
        country: 'India',
        type: 'religious',
        description: 'Birth of Lord Krishna - Government Holiday in some states'
    },
    {
        date: '2026-08-31',
        name: 'Summer Bank Holiday',
        country: 'UK',
        type: 'national',
        description: 'UK bank holiday - Government Holiday'
    },
    // September 2026
    {
        date: '2026-09-05',
        name: 'Ganesh Chaturthi',
        country: 'India',
        type: 'festival',
        description: 'Birth of Lord Ganesha - Government Holiday in some states'
    },
    {
        date: '2026-09-07',
        name: 'Labor Day',
        country: 'USA',
        type: 'national',
        description: 'US federal holiday - Government Holiday'
    },
    {
        date: '2026-09-22',
        name: 'Autumn Equinox',
        country: 'Worldwide',
        type: 'observance',
        description: 'First day of autumn'
    },
    {
        date: '2026-09-26',
        name: 'Milad-un-Nabi (Tentative)',
        country: 'Islamic Countries',
        type: 'religious',
        description: 'Birth of Prophet Muhammad - Government Holiday in Islamic countries'
    },
    // October 2026
    {
        date: '2026-10-02',
        name: 'Gandhi Jayanti',
        country: 'India',
        type: 'national',
        description: 'Birth of Mahatma Gandhi - Government Holiday'
    },
    {
        date: '2026-10-12',
        name: 'Columbus Day / Indigenous Peoples Day',
        country: 'USA',
        type: 'national',
        description: 'US federal holiday - Government Holiday'
    },
    {
        date: '2026-10-13',
        name: 'Dussehra (Vijaya Dashami)',
        country: 'India',
        type: 'festival',
        description: 'Victory of good over evil - Government Holiday'
    },
    {
        date: '2026-10-31',
        name: 'Halloween',
        country: 'Western Countries',
        type: 'observance',
        description: 'Spooky celebration'
    },
    // November 2026
    {
        date: '2026-11-01',
        name: 'All Saints Day',
        country: 'Christian Countries',
        type: 'religious',
        description: 'Christian feast day - Government Holiday in some countries'
    },
    {
        date: '2026-11-02',
        name: 'Day of the Dead',
        country: 'Mexico',
        type: 'festival',
        description: 'Honoring deceased loved ones'
    },
    {
        date: '2026-11-05',
        name: 'Guy Fawkes Night',
        country: 'UK',
        type: 'observance',
        description: 'Bonfire Night'
    },
    {
        date: '2026-11-11',
        name: 'Veterans Day',
        country: 'USA',
        type: 'national',
        description: 'Honoring military veterans - Government Holiday'
    },
    {
        date: '2026-11-11',
        name: 'Remembrance Day',
        country: 'UK',
        type: 'national',
        description: 'Honoring fallen soldiers - Government Holiday'
    },
    {
        date: '2026-11-12',
        name: 'Diwali (Deepavali)',
        country: 'India',
        type: 'festival',
        description: 'Festival of lights - Government Holiday'
    },
    {
        date: '2026-11-14',
        name: "Children's Day",
        country: 'India',
        type: 'observance',
        description: 'Celebrating children - Birth of Jawaharlal Nehru'
    },
    {
        date: '2026-11-26',
        name: 'Thanksgiving',
        country: 'USA',
        type: 'national',
        description: 'US harvest celebration - Government Holiday'
    },
    {
        date: '2026-11-27',
        name: 'Black Friday',
        country: 'USA',
        type: 'observance',
        description: 'Shopping day'
    },
    {
        date: '2026-11-30',
        name: 'Cyber Monday',
        country: 'Worldwide',
        type: 'observance',
        description: 'Online shopping day'
    },
    {
        date: '2026-11-30',
        name: 'Guru Nanak Jayanti',
        country: 'India',
        type: 'religious',
        description: 'Birth of Guru Nanak - Government Holiday'
    },
    // December 2026
    {
        date: '2026-12-08',
        name: 'Immaculate Conception',
        country: 'Christian Countries',
        type: 'religious',
        description: 'Christian feast day - Government Holiday in some countries'
    },
    {
        date: '2026-12-21',
        name: 'Winter Solstice',
        country: 'Worldwide',
        type: 'observance',
        description: 'Shortest day of the year'
    },
    {
        date: '2026-12-24',
        name: 'Christmas Eve',
        country: 'Christian Countries',
        type: 'religious',
        description: 'Day before Christmas'
    },
    {
        date: '2026-12-25',
        name: 'Christmas Day',
        country: 'Worldwide',
        type: 'religious',
        description: 'Birth of Jesus Christ - Government Holiday'
    },
    {
        date: '2026-12-26',
        name: 'Boxing Day',
        country: 'UK',
        type: 'national',
        description: 'Day after Christmas - Government Holiday'
    },
    {
        date: '2026-12-31',
        name: "New Year's Eve",
        country: 'Worldwide',
        type: 'observance',
        description: 'Last day of the year'
    }
];
function getHolidaysForDate(date) {
    // Format date as YYYY-MM-DD in local timezone to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    return holidays2026.filter((holiday)=>holiday.date === dateStr);
}
function getHolidaysForMonth(year, month) {
    const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
    return holidays2026.filter((holiday)=>holiday.date.startsWith(monthStr));
}
function getCountries() {
    const countries = Array.from(new Set(holidays2026.map((h)=>h.country)));
    return countries.sort();
}
function getHolidaysByType(type) {
    return holidays2026.filter((holiday)=>holiday.type === type);
}
const holidayColors = {
    national: 'bg-red-700 border-red-500 text-white',
    religious: 'bg-purple-700 border-purple-500 text-white',
    observance: 'bg-blue-700 border-blue-500 text-white',
    festival: 'bg-amber-700 border-amber-500 text-white'
};
const holidayIcons = {
    national: '🎌',
    religious: '🕉️',
    observance: '📅',
    festival: '🎉'
};
}),
"[project]/src/components/calendar/MonthlyCalendar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MonthlyCalendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$holidaysData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/holidaysData.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function MonthlyCalendar() {
    const [currentDate, setCurrentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Date());
    // Get current month and year
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    // Month names
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    // Day names
    const dayNames = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];
    // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // Get number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Get days in previous month
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    // Navigate to previous month
    const goToPreviousMonth = ()=>{
        setCurrentDate(new Date(year, month - 1, 1));
    };
    // Navigate to next month
    const goToNextMonth = ()=>{
        setCurrentDate(new Date(year, month + 1, 1));
    };
    // Go to today
    const goToToday = ()=>{
        setCurrentDate(new Date());
    };
    // Helper function to get the nth occurrence of a day in a month
    const getNthDayOfMonth = (year, month, dayOfWeek, n)=>{
        let count = 0;
        for(let day = 1; day <= daysInMonth; day++){
            const date = new Date(year, month, day);
            if (date.getDay() === dayOfWeek) {
                count++;
                if (count === n) {
                    return day;
                }
            }
        }
        return -1;
    };
    // Get 2nd and 4th Saturday of the month (6 = Saturday)
    const secondSaturday = getNthDayOfMonth(year, month, 6, 2);
    const fourthSaturday = getNthDayOfMonth(year, month, 6, 4);
    // Check if a day is 2nd or 4th Saturday
    const isSpecialSaturday = (day, isCurrentMonth)=>{
        if (!isCurrentMonth) return '';
        if (day === secondSaturday) return '2nd Sat';
        if (day === fourthSaturday) return '4th Sat';
        return '';
    };
    // Generate calendar days array
    const calendarDays = [];
    // Add previous month's days
    for(let i = firstDayOfMonth - 1; i >= 0; i--){
        const prevMonthDay = daysInPrevMonth - i;
        const date = new Date(year, month - 1, prevMonthDay);
        calendarDays.push({
            day: prevMonthDay,
            isCurrentMonth: false,
            isToday: false,
            holidays: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$holidaysData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHolidaysForDate"])(date)
        });
    }
    // Add current month's days
    const today = new Date();
    for(let day = 1; day <= daysInMonth; day++){
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const date = new Date(year, month, day);
        calendarDays.push({
            day: day,
            isCurrentMonth: true,
            isToday: isToday,
            holidays: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$holidaysData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHolidaysForDate"])(date)
        });
    }
    // Add next month's days to complete the grid
    const remainingDays = 42 - calendarDays.length; // 6 rows × 7 days = 42
    for(let day = 1; day <= remainingDays; day++){
        const date = new Date(year, month + 1, day);
        calendarDays.push({
            day: day,
            isCurrentMonth: false,
            isToday: false,
            holidays: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$holidaysData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHolidaysForDate"])(date)
        });
    }
    // Get all holidays for the current month
    const monthHolidays = calendarDays.filter((day)=>day.isCurrentMonth && day.holidays.length > 0).map((day)=>({
            day: day.day,
            holidays: day.holidays
        })).sort((a, b)=>a.day - b.day);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-[1800px] mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-bold text-white border-2 border-blue-300 p-4 rounded-lg",
                            children: "Monthly Calendar"
                        }, void 0, false, {
                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-300 text-center text-lg",
                        children: "View the calendar with holidays and festivals for the current month"
                    }, void 0, false, {
                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#1a2942] border-2 border-blue-400 rounded-lg shadow-md p-4 mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row items-center justify-between mb-4 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: goToPreviousMonth,
                                    className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition border-2 border-blue-400",
                                    "aria-label": "Previous Month",
                                    children: "← Previous"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-white",
                                        children: [
                                            monthNames[month],
                                            " ",
                                            year
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: goToNextMonth,
                                    className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition border-2 border-blue-400",
                                    "aria-label": "Next Month",
                                    children: "Next →"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: goToToday,
                            className: "px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-semibold border-2 border-blue-400",
                            children: "Today"
                        }, void 0, false, {
                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#1a2942] border-2 border-blue-400 rounded-lg shadow-md p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-7 gap-2 mb-2",
                                    children: dayNames.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center font-bold text-white py-2 bg-[#0d1929] rounded border border-blue-400",
                                            children: day
                                        }, day, false, {
                                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                            lineNumber: 191,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-7 gap-2",
                                    children: calendarDays.map((dayObj, index)=>{
                                        const hasHoliday = dayObj.holidays.length > 0;
                                        const specialSat = isSpecialSaturday(dayObj.day, dayObj.isCurrentMonth);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `
                      min-h-[90px] flex flex-col p-2 rounded border-2 cursor-pointer
                      transition-all hover:shadow-lg relative
                      ${dayObj.isCurrentMonth ? 'border-blue-400 bg-[#0d1929] text-white font-semibold' : 'border-gray-600 bg-[#0a1420] text-gray-500'}
                      ${dayObj.isToday ? 'bg-blue-500 text-white border-blue-400 font-bold hover:bg-blue-600 ring-2 ring-blue-400' : hasHoliday || specialSat ? 'hover:bg-[#2a3f5f]' : 'hover:bg-[#1a2942]'}
                      ${specialSat ? 'bg-purple-900 border-purple-400' : ''}
                    `,
                                            title: dayObj.holidays.map((h)=>`${h.name} (${h.country})`).join('\n'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-base font-bold mb-1",
                                                    children: dayObj.day
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 21
                                                }, this),
                                                specialSat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[11px] px-1 py-0.5 rounded mb-1 bg-purple-200 text-purple-900 border border-purple-400 font-semibold",
                                                    children: [
                                                        "🏢 ",
                                                        specialSat
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 23
                                                }, this),
                                                hasHoliday && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 overflow-hidden",
                                                    children: [
                                                        dayObj.holidays.slice(0, 2).map((holiday, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `text-[11px] px-1 py-0.5 rounded mb-0.5 border ${dayObj.isToday ? 'bg-white text-gray-800 border-gray-300' : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$holidaysData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["holidayColors"][holiday.type]}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "mr-0.5",
                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$holidaysData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["holidayIcons"][holiday.type]
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                                        lineNumber: 246,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "truncate block leading-tight",
                                                                        children: holiday.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                                        lineNumber: 247,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, idx, true, {
                                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                                lineNumber: 238,
                                                                columnNumber: 27
                                                            }, this)),
                                                        dayObj.holidays.length > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-gray-400",
                                                            children: [
                                                                "+",
                                                                dayObj.holidays.length - 2
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                            lineNumber: 207,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#1a2942] border-2 border-blue-400 rounded-lg shadow-md p-2.5 sticky top-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-bold text-white mb-2 text-center border-b-2 border-blue-400 pb-1.5",
                                    children: "📅 This Month's Events"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-[11px] font-bold text-purple-300 mb-1.5 flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🏢"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 17
                                                }, this),
                                                " Bank Holidays"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                            lineNumber: 273,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                secondSaturday > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-purple-900 border border-purple-400 rounded p-1.5 text-[11px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold text-white",
                                                            children: [
                                                                monthNames[month],
                                                                " ",
                                                                secondSaturday
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-purple-200 text-[9px]",
                                                            children: "2nd Saturday"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                            lineNumber: 282,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 19
                                                }, this),
                                                fourthSaturday > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-purple-900 border border-purple-400 rounded p-1.5 text-[11px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold text-white",
                                                            children: [
                                                                monthNames[month],
                                                                " ",
                                                                fourthSaturday
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                            lineNumber: 287,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-purple-200 text-[9px]",
                                                            children: "4th Saturday"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                            lineNumber: 290,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                            lineNumber: 276,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                    lineNumber: 272,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-h-[450px] overflow-y-auto space-y-1.5",
                                    children: monthHolidays.length > 0 ? monthHolidays.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: item.holidays.map((holiday, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `rounded p-1.5 border-2 ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$holidaysData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["holidayColors"][holiday.type]} transition hover:scale-105`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-base",
                                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$holidaysData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["holidayIcons"][holiday.type]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                                lineNumber: 307,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-bold text-[10px]",
                                                                        children: [
                                                                            monthNames[month],
                                                                            " ",
                                                                            item.day
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                                        lineNumber: 309,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold text-xs leading-tight",
                                                                        children: holiday.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                                        lineNumber: 312,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-[9px] opacity-80 mt-0.5",
                                                                        children: holiday.country
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                                        lineNumber: 313,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    holiday.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-[9px] opacity-70 mt-0.5 line-clamp-1",
                                                                        children: holiday.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                                        lineNumber: 317,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                                lineNumber: 308,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 25
                                                    }, this)
                                                }, idx, false, {
                                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                    lineNumber: 302,
                                                    columnNumber: 23
                                                }, this))
                                        }, index, false, {
                                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                            lineNumber: 300,
                                            columnNumber: 19
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center text-gray-400 py-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl mb-1",
                                                children: "📭"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 329,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs",
                                                children: "No holidays this month"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 330,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 328,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                    lineNumber: 297,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                            lineNumber: 266,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 bg-blue-500 rounded border-2 border-blue-400 ring-2 ring-blue-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Today"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 343,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 bg-[#0d1929] rounded border-2 border-blue-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 346,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Current Month"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 347,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 bg-purple-900 rounded border-2 border-purple-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "2nd/4th Saturday"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 351,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                lineNumber: 349,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 bg-[#0a1420] rounded border-2 border-gray-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Other Month"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 355,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#1a2942] border-2 border-blue-400 rounded-lg shadow-md p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold mb-3 text-center text-white",
                                children: "Holiday Types"
                            }, void 0, false, {
                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-5 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "🎌"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 363,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold text-white",
                                                        children: "National"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                        lineNumber: 365,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-400",
                                                        children: "Public holidays"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 364,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 362,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "🕉️"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 370,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold text-white",
                                                        children: "Religious"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-400",
                                                        children: "Faith celebrations"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                        lineNumber: 373,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 371,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 369,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "🎉"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 377,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold text-white",
                                                        children: "Festival"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-400",
                                                        children: "Cultural events"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 378,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "📅"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 384,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold text-white",
                                                        children: "Observance"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-400",
                                                        children: "Special days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 385,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 383,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "🏢"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 391,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold text-white",
                                                        children: "Bank Holiday"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                        lineNumber: 393,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-400",
                                                        children: "2nd & 4th Sat"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                                lineNumber: 392,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                        lineNumber: 390,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/calendar/MonthlyCalendar.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_8a306d78._.js.map