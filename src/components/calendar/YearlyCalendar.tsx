'use client';

import { useState } from 'react';

interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export default function YearlyCalendar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper function to generate mini calendar for each month
  const generateMonthGrid = (year: number, monthIndex: number) => {
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const calendarDays: DayInfo[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push({ day: 0, isCurrentMonth: false, isToday: false });
    }

    // Add actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const today = new Date();
      const isToday =
        day === today.getDate() &&
        monthIndex === today.getMonth() &&
        year === today.getFullYear();

      calendarDays.push({
        day: day,
        isCurrentMonth: true,
        isToday: isToday
      });
    }

    return calendarDays;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 dark:text-white">Yearly Calendar - {currentYear}</h1>

      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setCurrentYear(currentYear - 1)}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          ← {currentYear - 1}
        </button>
        <button
          onClick={() => setCurrentYear(new Date().getFullYear())}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Current Year
        </button>
        <button
          onClick={() => setCurrentYear(currentYear + 1)}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {currentYear + 1} →
        </button>
      </div>

      {/* 12 Month Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {monthNames.map((monthName, monthIndex) => {
          const calendarDays = generateMonthGrid(currentYear, monthIndex);

          return (
            <div key={monthIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold text-center mb-3 text-blue-600 dark:text-blue-400">
                {monthName}
              </h3>

              {/* Mini calendar for each month */}
              <div className="grid grid-cols-7 gap-1 text-xs">
                {/* Day headers */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center font-bold text-gray-600 dark:text-gray-400">
                    {day}
                  </div>
                ))}

                {calendarDays.map((dayObj, idx) => {
                  if (!dayObj.isCurrentMonth) {
                    // Empty cell before month starts
                    return <div key={idx} />;
                  }

                  return (
                    <div
                      key={idx}
                      className={`
                        text-center py-1 rounded
                        ${dayObj.isToday
                          ? 'bg-blue-500 text-white font-bold'
                          : 'hover:bg-blue-100 dark:hover:bg-gray-700'}
                      `}
                    >
                      {dayObj.day}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}