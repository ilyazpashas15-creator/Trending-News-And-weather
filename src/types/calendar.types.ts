export interface CalendarEvent {
  id: number;
  title: string;
  date: string; // ISO date string
  time?: string; // Optional time in HH:MM format
  description?: string;
}

export interface Holiday {
  date: string; // ISO date string
  name: string;
  country: string;
}

export interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}