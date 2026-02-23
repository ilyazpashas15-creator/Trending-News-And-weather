import { NextRequest, NextResponse } from 'next/server';
import { 
  convertTimeBetweenZones, 
  getTimezoneOffset, 
  isDSTActive,
  formatDateTimeForTimezone
} from '@/services/timezoneService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      fromTimezone, 
      toTimezones, 
      date,
      includeDST = true 
    } = body;

    if (!fromTimezone || !toTimezones || !date) {
      return NextResponse.json(
        { error: 'Missing required parameters: fromTimezone, toTimezones, date' },
        { status: 400 }
      );
    }

    if (!Array.isArray(toTimezones)) {
      return NextResponse.json(
        { error: 'toTimezones must be an array' },
        { status: 400 }
      );
    }

    const inputDate = new Date(date);
    
    if (isNaN(inputDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    const results = toTimezones.map((timezone: string) => {
      try {
        const convertedDate = convertTimeBetweenZones(fromTimezone, timezone, inputDate);
        const offset = getTimezoneOffset(timezone, convertedDate);
        const dst = includeDST ? isDSTActive(timezone, convertedDate) : false;
        
        return {
          timezone,
          convertedDate: convertedDate.toISOString(),
          formatted: formatDateTimeForTimezone(timezone, convertedDate),
          offset,
          dst,
          offsetFormatted: `UTC${offset >= 0 ? '+' : '-'}${Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0')}:${Math.abs(offset % 60).toString().padStart(2, '0')}`
        };
      } catch (error) {
        return {
          timezone,
          error: 'Invalid timezone',
          convertedDate: null,
          formatted: null,
          offset: null,
          dst: false
        };
      }
    });

    return NextResponse.json({
      success: true,
      fromTimezone,
      originalDate: inputDate.toISOString(),
      results
    });

  } catch (error) {
    console.error('Timezone conversion API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
