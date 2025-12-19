import * as z from 'zod';

export const EventPrioritySchema = z.enum(['critical', 'standart', 'minor']);
export const EventPeriodSchema = z.enum(['once', 'week', 'month']);

export const CalendarEventSchema = z.object({
  title: z.string().nonempty(),
  date: z.number(),
  priority: EventPrioritySchema,
  period: EventPeriodSchema,
});
