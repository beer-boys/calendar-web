import * as z from 'zod';

export const EventPrioritySchema = z.enum(['critical', 'standart', 'minor']);
export const EventPeriodSchema = z.enum(['daily', 'weekly']);

export const CalendarEventSchema = z.object({
  title: z.string().nonempty(),
  description: z.string(),
  date: z.number(),
  priority: EventPrioritySchema,
  period: EventPeriodSchema,
});
