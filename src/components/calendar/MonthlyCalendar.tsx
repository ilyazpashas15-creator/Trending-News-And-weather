'use client';

import { useState } from 'react';
import { getHolidaysForDate, holidayColors, holidayIcons, type Holiday } from '@/data/holidaysData';

interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  holidays: Holiday[];
}

export default function MonthlyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get current month and year
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Get number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get days in previous month
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Helper function to get the nth occurrence of a day in a month
  const getNthDayOfMonth = (year: number, month: number, dayOfWeek: number, n: number): number => {
    let count = 0;
    for (let day = 1; day <= daysInMonth; day++) {
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
  const isSpecialSaturday = (day: number, isCurrentMonth: boolean): string => {
    if (!isCurrentMonth) return '';
    if (day === secondSaturday) return '2nd Sat';
    if (day === fourthSaturday) return '4th Sat';
    return '';
  };

  // Generate calendar days array
  const calendarDays: DayInfo[] = [];

  // Add previous month's days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const prevMonthDay = daysInPrevMonth - i;
    const date = new Date(year, month - 1, prevMonthDay);
    calendarDays.push({
      day: prevMonthDay,
      isCurrentMonth: false,
      isToday: false,
      holidays: getHolidaysForDate(date)
    });
  }

  // Add current month's days
  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    const date = new Date(year, month, day);
    calendarDays.push({
      day: day,
      isCurrentMonth: true,
      isToday: isToday,
      holidays: getHolidaysForDate(date)
    });
  }

  // Add next month's days to complete the grid
  const remainingDays = 42 - calendarDays.length; // 6 rows × 7 days = 42
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    calendarDays.push({
      day: day,
      isCurrentMonth: false,
      isToday: false,
      holidays: getHolidaysForDate(date)
    });
  }

  // Get all holidays for the current month
  const monthHolidays = calendarDays
    .filter(day => day.isCurrentMonth && day.holidays.length > 0)
    .map(day => ({
      day: day.day,
      holidays: day.holidays
    }))
    .sort((a, b) => a.day - b.day);

  return (
    <div className="max-w-[1800px] mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-center mb-6">
          <h1 className="text-4xl font-bold text-white border-2 border-blue-300 p-4 rounded-lg">
            Monthly Calendar
          </h1>
        </div>
        <p className="text-gray-300 text-center text-lg">
          View the calendar with holidays and festivals for the current month
        </p>
      </div>

      {/* Calendar Controls */}
      <div className="bg-[#1a2942] border-2 border-blue-400 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousMonth}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition border-2 border-blue-400"
              aria-label="Previous Month"
            >
              ← Previous
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                {monthNames[month]} {year}
              </h2>
            </div>

            <button
              onClick={goToNextMonth}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition border-2 border-blue-400"
              aria-label="Next Month"
            >
              Next →
            </button>
          </div>

          <button
            onClick={goToToday}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-semibold border-2 border-blue-400"
          >
            Today
          </button>
        </div>
      </div>

      {/* Main Content: Calendar + Holidays List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-[#1a2942] border-2 border-blue-400 rounded-lg shadow-md p-4">
            {/* Day names header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center font-bold text-white py-2 bg-[#0d1929] rounded border border-blue-400"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((dayObj, index) => {
                const hasHoliday = dayObj.holidays.length > 0;
                const specialSat = isSpecialSaturday(dayObj.day, dayObj.isCurrentMonth);
                
                return (
                  <div
                    key={index}
                    className={`
                      min-h-[90px] flex flex-col p-2 rounded border-2 cursor-pointer
                      transition-all hover:shadow-lg relative
                      ${dayObj.isCurrentMonth
                        ? 'border-blue-400 bg-[#0d1929] text-white font-semibold'
                        : 'border-gray-600 bg-[#0a1420] text-gray-500'
                      }
                      ${dayObj.isToday
                        ? 'bg-blue-500 text-white border-blue-400 font-bold hover:bg-blue-600 ring-2 ring-blue-400'
                        : hasHoliday || specialSat
                        ? 'hover:bg-[#2a3f5f]'
                        : 'hover:bg-[#1a2942]'
                      }
                      ${specialSat ? 'bg-purple-900 border-purple-400' : ''}
                    `}
                    title={dayObj.holidays.map(h => `${h.name} (${h.country})`).join('\n')}
                  >
                    <div className="text-base font-bold mb-1">{dayObj.day}</div>
                    
                    {/* Special Saturday Badge */}
                    {specialSat && (
                      <div className="text-[11px] px-1 py-0.5 rounded mb-1 bg-purple-200 text-purple-900 border border-purple-400 font-semibold">
                        🏢 {specialSat}
                      </div>
                    )}
                    
                    {hasHoliday && (
                      <div className="flex-1 overflow-hidden">
                        {dayObj.holidays.slice(0, 2).map((holiday, idx) => (
                          <div
                            key={idx}
                            className={`text-[11px] px-1 py-0.5 rounded mb-0.5 border ${
                              dayObj.isToday 
                                ? 'bg-white text-gray-800 border-gray-300' 
                                : holidayColors[holiday.type]
                            }`}
                          >
                            <span className="mr-0.5">{holidayIcons[holiday.type]}</span>
                            <span className="truncate block leading-tight">{holiday.name}</span>
                          </div>
                        ))}
                        {dayObj.holidays.length > 2 && (
                          <div className="text-[10px] text-gray-400">
                            +{dayObj.holidays.length - 2}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Holidays List Sidebar - Takes 1 column */}
        <div className="lg:col-span-1">
          <div className="bg-[#1a2942] border-2 border-blue-400 rounded-lg shadow-md p-2.5 sticky top-6">
            <h3 className="text-base font-bold text-white mb-2 text-center border-b-2 border-blue-400 pb-1.5">
              📅 This Month's Events
            </h3>
            
            {/* Special Saturdays */}
            <div className="mb-2.5">
              <h4 className="text-[11px] font-bold text-purple-300 mb-1.5 flex items-center gap-1">
                <span>🏢</span> Bank Holidays
              </h4>
              <div className="space-y-1">
                {secondSaturday > 0 && (
                  <div className="bg-purple-900 border border-purple-400 rounded p-1.5 text-[11px]">
                    <div className="font-semibold text-white">
                      {monthNames[month]} {secondSaturday}
                    </div>
                    <div className="text-purple-200 text-[9px]">2nd Saturday</div>
                  </div>
                )}
                {fourthSaturday > 0 && (
                  <div className="bg-purple-900 border border-purple-400 rounded p-1.5 text-[11px]">
                    <div className="font-semibold text-white">
                      {monthNames[month]} {fourthSaturday}
                    </div>
                    <div className="text-purple-200 text-[9px]">4th Saturday</div>
                  </div>
                )}
              </div>
            </div>

            {/* Holidays List */}
            <div className="max-h-[450px] overflow-y-auto space-y-1.5">
              {monthHolidays.length > 0 ? (
                monthHolidays.map((item, index) => (
                  <div key={index} className="space-y-1">
                    {item.holidays.map((holiday, idx) => (
                      <div
                        key={idx}
                        className={`rounded p-1.5 border-2 ${holidayColors[holiday.type]} transition hover:scale-105`}
                      >
                        <div className="flex items-start gap-1">
                          <span className="text-base">{holidayIcons[holiday.type]}</span>
                          <div className="flex-1">
                            <div className="font-bold text-[10px]">
                              {monthNames[month]} {item.day}
                            </div>
                            <div className="font-semibold text-xs leading-tight">{holiday.name}</div>
                            <div className="text-[9px] opacity-80 mt-0.5">
                              {holiday.country}
                            </div>
                            {holiday.description && (
                              <div className="text-[9px] opacity-70 mt-0.5 line-clamp-1">
                                {holiday.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">
                  <div className="text-2xl mb-1">📭</div>
                  <p className="text-xs">No holidays this month</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded border-2 border-blue-400 ring-2 ring-blue-400"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0d1929] rounded border-2 border-blue-400"></div>
            <span>Current Month</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-900 rounded border-2 border-purple-400"></div>
            <span>2nd/4th Saturday</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0a1420] rounded border-2 border-gray-600"></div>
            <span>Other Month</span>
          </div>
        </div>
        
        <div className="bg-[#1a2942] border-2 border-blue-400 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold mb-3 text-center text-white">Holiday Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎌</span>
              <div>
                <div className="font-semibold text-white">National</div>
                <div className="text-xs text-gray-400">Public holidays</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🕉️</span>
              <div>
                <div className="font-semibold text-white">Religious</div>
                <div className="text-xs text-gray-400">Faith celebrations</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎉</span>
              <div>
                <div className="font-semibold text-white">Festival</div>
                <div className="text-xs text-gray-400">Cultural events</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📅</span>
              <div>
                <div className="font-semibold text-white">Observance</div>
                <div className="text-xs text-gray-400">Special days</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              <div>
                <div className="font-semibold text-white">Bank Holiday</div>
                <div className="text-xs text-gray-400">2nd & 4th Sat</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
