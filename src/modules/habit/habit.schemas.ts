import * as z from 'zod';

import { CalendarEventSchema } from '@/modules/calendarEvent/calendarEvent.schemas';

export const HabitSchema = z.object({
  ...CalendarEventSchema.shape,
});
