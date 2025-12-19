import * as z from 'zod';

import { CalendarEventSchema } from '@/modules/calendarEvent/calendarEvent.schemas';
import { ContactSchema } from '@/modules/contact/contact.schemas';

export const MeetSchema = z.object({
  ...CalendarEventSchema.shape,
  attendees: z.array(ContactSchema),
});
