// Comprehensive holidays and festivals data for 2026

export interface Holiday {
  date: string; // Format: YYYY-MM-DD
  name: string;
  country: string;
  type: 'national' | 'religious' | 'observance' | 'festival';
  description?: string;
}

export const holidays2026: Holiday[] = [
  // January 2026
  { date: '2026-01-01', name: "New Year's Day", country: 'Worldwide', type: 'national', description: 'First day of the year - Government Holiday' },
  { date: '2026-01-06', name: 'Epiphany', country: 'Christian Countries', type: 'religious', description: 'Christian feast day' },
  { date: '2026-01-14', name: 'Makar Sankranti', country: 'India', type: 'festival', description: 'Hindu harvest festival' },
  { date: '2026-01-14', name: 'Pongal', country: 'India', type: 'festival', description: 'Tamil harvest festival' },
  { date: '2026-01-19', name: 'Martin Luther King Jr. Day', country: 'USA', type: 'national', description: 'US federal holiday - Government Holiday' },
  { date: '2026-01-26', name: 'Republic Day', country: 'India', type: 'national', description: 'Indian Constitution adopted - Government Holiday' },
  { date: '2026-01-26', name: 'Australia Day', country: 'Australia', type: 'national', description: 'National day of Australia - Government Holiday' },
  
  // February 2026
  { date: '2026-02-14', name: "Valentine's Day", country: 'Worldwide', type: 'observance', description: 'Day of love and romance' },
  { date: '2026-02-16', name: 'Presidents Day', country: 'USA', type: 'national', description: 'US federal holiday - Government Holiday' },
  { date: '2026-02-17', name: 'Maha Shivaratri', country: 'India', type: 'religious', description: 'Hindu festival honoring Lord Shiva' },
  { date: '2026-02-24', name: 'Mardi Gras', country: 'USA', type: 'festival', description: 'Carnival celebration' },
  
  // March 2026
  { date: '2026-03-01', name: "St. David's Day", country: 'Wales', type: 'national', description: 'Patron saint of Wales' },
  { date: '2026-03-06', name: 'Holi', country: 'India', type: 'festival', description: 'Festival of colors' },
  { date: '2026-03-08', name: "International Women's Day", country: 'Worldwide', type: 'observance', description: 'Celebrating women' },
  { date: '2026-03-14', name: 'Eid-ul-Fitr (Tentative)', country: 'Islamic Countries', type: 'religious', description: 'End of Ramadan - Government Holiday in Islamic countries' },
  { date: '2026-03-17', name: "St. Patrick's Day", country: 'Ireland', type: 'national', description: 'Irish cultural celebration - Government Holiday in Ireland' },
  { date: '2026-03-20', name: 'Spring Equinox', country: 'Worldwide', type: 'observance', description: 'First day of spring' },
  { date: '2026-03-25', name: 'Holi (Second Day)', country: 'India', type: 'festival', description: 'Festival of colors celebration' },
  
  // April 2026
  { date: '2026-04-01', name: "April Fool's Day", country: 'Worldwide', type: 'observance', description: 'Day of pranks and jokes' },
  { date: '2026-04-02', name: 'Ram Navami', country: 'India', type: 'religious', description: 'Birth of Lord Rama - Government Holiday in some states' },
  { date: '2026-04-03', name: 'Good Friday', country: 'Christian Countries', type: 'religious', description: 'Crucifixion of Jesus - Government Holiday' },
  { date: '2026-04-05', name: 'Easter Sunday', country: 'Christian Countries', type: 'religious', description: 'Resurrection of Jesus' },
  { date: '2026-04-06', name: 'Easter Monday', country: 'UK', type: 'national', description: 'Day after Easter - Government Holiday' },
  { date: '2026-04-10', name: 'Mahavir Jayanti', country: 'India', type: 'religious', description: 'Birth of Lord Mahavira - Government Holiday' },
  { date: '2026-04-13', name: 'Vaisakhi', country: 'India', type: 'festival', description: 'Sikh and Hindu festival' },
  { date: '2026-04-14', name: 'Ambedkar Jayanti', country: 'India', type: 'national', description: 'Birth anniversary of Dr. B.R. Ambedkar - Government Holiday' },
  { date: '2026-04-22', name: 'Earth Day', country: 'Worldwide', type: 'observance', description: 'Environmental awareness day' },
  { date: '2026-04-25', name: 'ANZAC Day', country: 'Australia', type: 'national', description: 'Remembrance day - Government Holiday' },
  
  // May 2026
  { date: '2026-05-01', name: 'Labour Day / May Day', country: 'Worldwide', type: 'national', description: 'International Workers Day - Government Holiday' },
  { date: '2026-05-04', name: 'May the Fourth', country: 'Worldwide', type: 'observance', description: 'Star Wars Day' },
  { date: '2026-05-07', name: 'Buddha Purnima', country: 'India', type: 'religious', description: 'Birth of Buddha - Government Holiday' },
  { date: '2026-05-10', name: "Mother's Day", country: 'USA', type: 'observance', description: 'Honoring mothers' },
  { date: '2026-05-21', name: 'Eid-ul-Adha (Tentative)', country: 'Islamic Countries', type: 'religious', description: 'Festival of Sacrifice - Government Holiday in Islamic countries' },
  { date: '2026-05-25', name: 'Memorial Day', country: 'USA', type: 'national', description: 'US federal holiday - Government Holiday' },
  
  // June 2026
  { date: '2026-06-14', name: 'Flag Day', country: 'USA', type: 'observance', description: 'US flag commemoration' },
  { date: '2026-06-19', name: 'Juneteenth', country: 'USA', type: 'national', description: 'Freedom Day - Government Holiday' },
  { date: '2026-06-21', name: "Father's Day", country: 'USA', type: 'observance', description: 'Honoring fathers' },
  { date: '2026-06-21', name: 'Summer Solstice', country: 'Worldwide', type: 'observance', description: 'Longest day of the year' },
  
  // July 2026
  { date: '2026-07-01', name: 'Canada Day', country: 'Canada', type: 'national', description: 'Canadian national day - Government Holiday' },
  { date: '2026-07-04', name: 'Independence Day', country: 'USA', type: 'national', description: 'US Independence - Government Holiday' },
  { date: '2026-07-14', name: 'Bastille Day', country: 'France', type: 'national', description: 'French national day - Government Holiday' },
  { date: '2026-07-17', name: 'Muharram (Tentative)', country: 'Islamic Countries', type: 'religious', description: 'Islamic New Year - Government Holiday in Islamic countries' },
  
  // August 2026
  { date: '2026-08-03', name: 'Friendship Day', country: 'Worldwide', type: 'observance', description: 'Celebrating friendship' },
  { date: '2026-08-15', name: 'Independence Day', country: 'India', type: 'national', description: 'Indian Independence - Government Holiday' },
  { date: '2026-08-15', name: 'Assumption of Mary', country: 'Christian Countries', type: 'religious', description: 'Christian feast day - Government Holiday in some countries' },
  { date: '2026-08-16', name: 'Raksha Bandhan', country: 'India', type: 'festival', description: 'Brother-sister bond celebration' },
  { date: '2026-08-24', name: 'Janmashtami', country: 'India', type: 'religious', description: 'Birth of Lord Krishna - Government Holiday in some states' },
  { date: '2026-08-31', name: 'Summer Bank Holiday', country: 'UK', type: 'national', description: 'UK bank holiday - Government Holiday' },
  
  // September 2026
  { date: '2026-09-05', name: 'Ganesh Chaturthi', country: 'India', type: 'festival', description: 'Birth of Lord Ganesha - Government Holiday in some states' },
  { date: '2026-09-07', name: 'Labor Day', country: 'USA', type: 'national', description: 'US federal holiday - Government Holiday' },
  { date: '2026-09-22', name: 'Autumn Equinox', country: 'Worldwide', type: 'observance', description: 'First day of autumn' },
  { date: '2026-09-26', name: 'Milad-un-Nabi (Tentative)', country: 'Islamic Countries', type: 'religious', description: 'Birth of Prophet Muhammad - Government Holiday in Islamic countries' },
  
  // October 2026
  { date: '2026-10-02', name: 'Gandhi Jayanti', country: 'India', type: 'national', description: 'Birth of Mahatma Gandhi - Government Holiday' },
  { date: '2026-10-12', name: 'Columbus Day / Indigenous Peoples Day', country: 'USA', type: 'national', description: 'US federal holiday - Government Holiday' },
  { date: '2026-10-13', name: 'Dussehra (Vijaya Dashami)', country: 'India', type: 'festival', description: 'Victory of good over evil - Government Holiday' },
  { date: '2026-10-31', name: 'Halloween', country: 'Western Countries', type: 'observance', description: 'Spooky celebration' },
  
  // November 2026
  { date: '2026-11-01', name: 'All Saints Day', country: 'Christian Countries', type: 'religious', description: 'Christian feast day - Government Holiday in some countries' },
  { date: '2026-11-02', name: 'Day of the Dead', country: 'Mexico', type: 'festival', description: 'Honoring deceased loved ones' },
  { date: '2026-11-05', name: 'Guy Fawkes Night', country: 'UK', type: 'observance', description: 'Bonfire Night' },
  { date: '2026-11-11', name: 'Veterans Day', country: 'USA', type: 'national', description: 'Honoring military veterans - Government Holiday' },
  { date: '2026-11-11', name: 'Remembrance Day', country: 'UK', type: 'national', description: 'Honoring fallen soldiers - Government Holiday' },
  { date: '2026-11-12', name: 'Diwali (Deepavali)', country: 'India', type: 'festival', description: 'Festival of lights - Government Holiday' },
  { date: '2026-11-14', name: "Children's Day", country: 'India', type: 'observance', description: 'Celebrating children - Birth of Jawaharlal Nehru' },
  { date: '2026-11-26', name: 'Thanksgiving', country: 'USA', type: 'national', description: 'US harvest celebration - Government Holiday' },
  { date: '2026-11-27', name: 'Black Friday', country: 'USA', type: 'observance', description: 'Shopping day' },
  { date: '2026-11-30', name: 'Cyber Monday', country: 'Worldwide', type: 'observance', description: 'Online shopping day' },
  { date: '2026-11-30', name: 'Guru Nanak Jayanti', country: 'India', type: 'religious', description: 'Birth of Guru Nanak - Government Holiday' },
  
  // December 2026
  { date: '2026-12-08', name: 'Immaculate Conception', country: 'Christian Countries', type: 'religious', description: 'Christian feast day - Government Holiday in some countries' },
  { date: '2026-12-21', name: 'Winter Solstice', country: 'Worldwide', type: 'observance', description: 'Shortest day of the year' },
  { date: '2026-12-24', name: 'Christmas Eve', country: 'Christian Countries', type: 'religious', description: 'Day before Christmas' },
  { date: '2026-12-25', name: 'Christmas Day', country: 'Worldwide', type: 'religious', description: 'Birth of Jesus Christ - Government Holiday' },
  { date: '2026-12-26', name: 'Boxing Day', country: 'UK', type: 'national', description: 'Day after Christmas - Government Holiday' },
  { date: '2026-12-31', name: "New Year's Eve", country: 'Worldwide', type: 'observance', description: 'Last day of the year' },
];

// Helper function to get holidays for a specific date
export function getHolidaysForDate(date: Date): Holiday[] {
  // Format date as YYYY-MM-DD in local timezone to avoid timezone issues
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;
  return holidays2026.filter(holiday => holiday.date === dateStr);
}

// Helper function to get holidays for a specific month
export function getHolidaysForMonth(year: number, month: number): Holiday[] {
  const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
  return holidays2026.filter(holiday => holiday.date.startsWith(monthStr));
}

// Helper function to get all unique countries
export function getCountries(): string[] {
  const countries = Array.from(new Set(holidays2026.map(h => h.country)));
  return countries.sort();
}

// Helper function to get holidays by type
export function getHolidaysByType(type: Holiday['type']): Holiday[] {
  return holidays2026.filter(holiday => holiday.type === type);
}

// Color coding for different holiday types
export const holidayColors = {
  national: 'bg-red-700 border-red-500 text-white',
  religious: 'bg-purple-700 border-purple-500 text-white',
  observance: 'bg-blue-700 border-blue-500 text-white',
  festival: 'bg-amber-700 border-amber-500 text-white',
};

// Icon emojis for different holiday types
export const holidayIcons = {
  national: '🎌',
  religious: '🕉️',
  observance: '📅',
  festival: '🎉',
};
