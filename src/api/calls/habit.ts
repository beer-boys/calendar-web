import { createAPICall } from '@/api/api';
import type { EventPeriod } from '@/modules/calendarEvent/calendarEvent.types';

// Title, description, durationMin, recurrence { frequency[daily, weekly],  }, flexibility{ earliestTime, latestTime }

export interface CreateHabitRequest {
  title: string;
  description: string;
  durationMinutes: number;
  recurrence: { frequency: EventPeriod; startDate: string };
  flexibility: { earliestTime: string; latestTime: string };
}

/** Боже прости я потом опищу типы */
type CreateHabitResponse = any;

export const createHabitAPICall = createAPICall<CreateHabitRequest, CreateHabitResponse>('POST', '/habits');
