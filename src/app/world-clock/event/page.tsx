'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EventCountdown from '../../../components/world-clock/EventCountdown';
import {
  formatTimeForTimezone,
  formatDateForTimezone,
  getTimezoneAbbreviation,
  getTimezoneOffset,
} from '../../../services/timezoneService';

interface EventData {
  name: string;
  date: Date;
  timezone: string;
  description?: string;
  location?: string;
}

function EventContent() {
  const searchParams = useSearchParams();
  const [event, setEvent] = useState<EventData | null>(null);
  const [error, setError] = useState<string>('');
  const [visitorTimezone, setVisitorTimezone] = useState<string>('');
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    // Get visitor's timezone
    setVisitorTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);

    // Parse event data from URL
    const name = searchParams.get('name');
    const dateStr = searchParams.get('date');
    const timezone = searchParams.get('timezone');
    const description = searchParams.get('description') || '';
    const location = searchParams.get('location') || '';

    if (!name || !dateStr || !timezone) {
      setError('Missing required event information. Please check the link.');
      return;
    }

    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        setError('Invalid date format. Please check the link.');
        return;
      }

      setEvent({
        name: decodeURIComponent(name),
        date,
        timezone,
        description: decodeURIComponent(description),
        location: decodeURIComponent(location),
      });
    } catch (e) {
      setError('Failed to parse event data. Please check the link.');
    }
  }, [searchParams]);

  const visitorTime = useMemo(() => {
    if (!event || !visitorTimezone) return null;

    try {
      const visitorDate = new Date(event.date.toLocaleString('en-US', {
        timeZone: visitorTimezone,
      }));

      return {
        time: formatTimeForTimezone(visitorTimezone, event.date),
        date: formatDateForTimezone(visitorTimezone, event.date, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        timezone: visitorTimezone,
        abbreviation: getTimezoneAbbreviation(visitorTimezone, event.date),
        offset: getTimezoneOffset(visitorTimezone, event.date),
      };
    } catch (e) {
      return null;
    }
  }, [event, visitorTimezone]);

  const eventTime = useMemo(() => {
    if (!event) return null;

    return {
      time: formatTimeForTimezone(event.timezone, event.date),
      date: formatDateForTimezone(event.timezone, event.date, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      timezone: event.timezone,
      abbreviation: getTimezoneAbbreviation(event.timezone, event.date),
    };
  }, [event]);

  const generateCalendarLink = (type: 'google' | 'outlook' | 'apple') => {
    if (!event) return '#';

    const startDate = event.date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(event.date.getTime() + 60 * 60 * 1000)
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0] + 'Z';

    const title = encodeURIComponent(event.name);
    const description = encodeURIComponent(event.description || '');
    const location = encodeURIComponent(event.location || '');

    switch (type) {
      case 'google':
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}`;
      case 'outlook':
        return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${event.date.toISOString()}&enddt=${new Date(event.date.getTime() + 60 * 60 * 1000).toISOString()}&body=${description}&location=${location}`;
      case 'apple':
        return `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:${encodeURIComponent(window.location.href)}%0ADTSTART:${startDate}%0ADTEND:${endDate}%0ASUMMARY:${title}%0ADESCRIPTION:${description}%0ALOCATION:${location}%0AEND:VEVENT%0AEND:VCALENDAR`;
      default:
        return '#';
    }
  };

  const shareEvent = async () => {
    if (!event) return;

    const shareData = {
      title: event.name,
      text: `Join me for ${event.name} on ${eventTime?.date} at ${eventTime?.time} (${event.timezone})`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        // User cancelled or share failed
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-600/30 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Error</h1>
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Event Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full mb-6">
            <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-teal-400 font-medium">Event Invitation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {event.name}
          </h1>
          
          {event.description && (
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {event.description}
            </p>
          )}
        </div>

        {/* Countdown */}
        <div className="mb-12">
          <EventCountdown targetDate={event.date} />
        </div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Event Time (Original Timezone) */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm text-slate-400">Event Time</h3>
                <p className="text-xs text-slate-500">{event.timezone}</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{eventTime?.time}</p>
            <p className="text-slate-400">{eventTime?.date}</p>
            <p className="text-sm text-blue-400 mt-2">{eventTime?.abbreviation}</p>
          </div>

          {/* Visitor's Local Time */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm text-slate-400">Your Local Time</h3>
                <p className="text-xs text-slate-500">{visitorTimezone}</p>
              </div>
            </div>
            {visitorTime ? (
              <>
                <p className="text-2xl font-bold text-white">{visitorTime.time}</p>
                <p className="text-slate-400">{visitorTime.date}</p>
                <p className="text-sm text-teal-400 mt-2">{visitorTime.abbreviation}</p>
              </>
            ) : (
              <p className="text-rose-400">Unable to calculate local time</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Add to Calendar Buttons */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
            <h3 className="text-lg font-semibold text-white mb-4">Add to Calendar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={generateCalendarLink('google')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-xl transition-all duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google Calendar
              </a>
              <a
                href={generateCalendarLink('outlook')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.17,3.25Q21.5,3.25 21.76,3.5 22,3.74 22,4.08V19.92Q22,20.26 21.76,20.5 21.5,20.75 21.17,20.75H7.83Q7.5,20.75 7.24,20.5 7,20.26 7,19.92V17H2.83Q2.5,17 2.24,16.76 2,16.5 2,16.17V7.83Q2,7.5 2.24,7.24 2.5,7 2.83,7H7V4.08Q7,3.74 7.24,3.5 7.5,3.25 7.83,3.25M7,13.06L8.18,15.28H9.97L8,12.06L9.93,8.89H8.22L7.13,10.9L7.09,10.96L7.06,11.03Q6.8,10.5 6.5,9.96 6.25,9.5 5.97,9.03H4.16L6.05,12.08L4,15.28H5.78M13.88,19.5V17H8.25V19.5M13.88,15.75V12.63H12V15.75M13.88,11.38V8.25H12V11.38M13.88,7V4.5H8.25V7M20.75,19.5V17H15.13V19.5M20.75,15.75V12.63H15.13V15.75M20.75,11.38V8.25H15.13V11.38M20.75,7V4.5H15.13V7Z"/>
                </svg>
                Outlook
              </a>
              <a
                href={generateCalendarLink('apple')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                </svg>
                Apple Calendar
              </a>
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={shareEvent}
            className="w-full py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {linkCopied ? 'Link Copied!' : 'Share Event'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventAnnouncerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading event...</div>
      </div>
    }>
      <EventContent />
    </Suspense>
  );
}
