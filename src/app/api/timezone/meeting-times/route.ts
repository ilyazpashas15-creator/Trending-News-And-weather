import { NextRequest, NextResponse } from 'next/server';
import { calculateOptimalMeetingTimes } from '@/services/timezoneService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      timezones,
      durationMinutes = 60,
      startHour = 6,
      endHour = 22,
      workStart = 9,
      workEnd = 17
    } = body;

    if (!timezones || !Array.isArray(timezones) || timezones.length === 0) {
      return NextResponse.json(
        { error: 'Missing required parameter: timezones (array)' },
        { status: 400 }
      );
    }

    if (timezones.length > 20) {
      return NextResponse.json(
        { error: 'Too many timezones. Maximum is 20.' },
        { status: 400 }
      );
    }

    const suggestions = calculateOptimalMeetingTimes(
      timezones,
      durationMinutes,
      startHour,
      endHour,
      workStart,
      workEnd
    );

    // Return top 10 suggestions
    const topSuggestions = suggestions.slice(0, 10).map(suggestion => ({
      utcTime: suggestion.utcTime.toISOString(),
      formattedUtcTime: suggestion.utcTime.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      score: suggestion.score,
      allInBusinessHours: suggestion.allInBusinessHours,
      participantsInBusinessHours: suggestion.localTimes.filter((t: { isBusinessHours: boolean }) => t.isBusinessHours).length,
      totalParticipants: suggestion.localTimes.length,
      localTimes: suggestion.localTimes.map((lt: { timezone: string; time: string; isBusinessHours: boolean }) => ({
        timezone: lt.timezone,
        time: lt.time,
        isBusinessHours: lt.isBusinessHours
      }))
    }));

    return NextResponse.json({
      success: true,
      timezones,
      durationMinutes,
      workHours: { start: workStart, end: workEnd },
      suggestions: topSuggestions
    });

  } catch (error) {
    console.error('Meeting times API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
