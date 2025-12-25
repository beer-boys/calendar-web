import * as z from 'zod';

export const EventPrioritySchema = z.enum(['critical', 'standart', 'minor']);
export const EventPeriodSchema = z.enum(['weekly', 'daily']);

export const CalendarEventSchema = z.object({
  title: z.string().nonempty(),
  date: z.number(),
  priority: EventPrioritySchema,
  period: EventPeriodSchema,
});
