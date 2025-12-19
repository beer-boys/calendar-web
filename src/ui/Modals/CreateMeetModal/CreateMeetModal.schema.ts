import * as z from 'zod';

import { EventPrioritySchema } from '@/modules/calendarEvent/calendarEvent.schemas';
import { ContactSchema } from '@/modules/contact/contact.schemas';

export const CreateMeetDataSchema = z.object({
  name: z.string().nonempty('Укажите название встречи'),
  attendees: z.array(ContactSchema),
  date: z.date('Укажите дату встречи'),
  priority: EventPrioritySchema,
});

export type CreateMeetData = z.infer<typeof CreateMeetDataSchema>;

export const extractCreateMeetDataErrors = (error?: z.ZodError<CreateMeetData>) => {
  const flattenErrors = error && z.flattenError(error);

  return {
    nameError: flattenErrors?.fieldErrors.name?.[0],
    dateError: flattenErrors?.fieldErrors.date?.[0],
  };
};

export type CreateMeetErrorMessages = ReturnType<typeof extractCreateMeetDataErrors>;
