import * as z from 'zod';

import type {
  CalendarEventSchema,
  EventPeriodSchema,
  EventPrioritySchema,
  EventWeekdaySchema,
} from '@/modules/calendarEvent/calendarEvent.schemas';

export type EventPriority = z.infer<typeof EventPrioritySchema>;
export type EventPeriod = z.infer<typeof EventPeriodSchema>;
export type EventWeekday = z.infer<typeof EventWeekdaySchema>;

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;
