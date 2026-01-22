import * as z from 'zod';

import { ContactSchema } from '@/modules/contact/contact.schemas';

export const CreateMeetDataSchema = z
  .object({
    name: z.string().nonempty('Укажите название встречи'),
    attendees: z.array(ContactSchema),
    date: z.date('Укажите дату встречи'),
    start: z.iso.time('Укажите время начала встречи'),
    end: z.iso.time('Укажите время конца встречи'),
  })
  .refine(({ start, end }) => start < end, {
    message: 'Время начала должно быть меньше времени конца',
    path: ['end'],
  });

export type CreateMeetData = z.infer<typeof CreateMeetDataSchema>;

export const extractCreateMeetDataErrors = (error?: z.ZodError<CreateMeetData>) => {
  const flattenErrors = error && z.flattenError(error);

  return {
    nameError: flattenErrors?.fieldErrors.name?.[0],
    dateError: flattenErrors?.fieldErrors.date?.[0],
    startError: flattenErrors?.fieldErrors.start?.[0],
    endError: flattenErrors?.fieldErrors.end?.[0],
  };
};

export type CreateMeetErrorMessages = ReturnType<typeof extractCreateMeetDataErrors>;
