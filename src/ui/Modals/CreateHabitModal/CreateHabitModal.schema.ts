import * as z from 'zod';

import { EventPeriodSchema } from '@/modules/calendarEvent/calendarEvent.schemas';

export const CreateHabitDataSchema = z
  .object({
    name: z.string().nonempty('Укажите название привычки'),
    description: z.string().optional(),
    period: EventPeriodSchema,
    duration: z.string().nonempty('Укажите длительность привычки').regex(/^\d+$/, 'Укажите длительность привычки в минутах'),
    startDate: z.date('Укажите дату начала привычки'),
    start: z.iso.time('Укажите время начала диапазона'),
    end: z.iso.time('Укажите время конца диапазона'),
  })
  .refine(({ start, end }) => start < end, {
    message: 'Время начала должно быть меньше времени конца',
    path: ['end'],
  });

export type CreateHabitData = z.infer<typeof CreateHabitDataSchema>;

export const extractCreateHabitDataErrors = (error?: z.ZodError<CreateHabitData>) => {
  const flattenErrors = error && z.flattenError(error);

  return {
    nameError: flattenErrors?.fieldErrors.name?.[0],
    startDateError: flattenErrors?.fieldErrors.startDate?.[0],
    durationError: flattenErrors?.fieldErrors.duration?.[0],
    startError: flattenErrors?.fieldErrors.start?.[0],
    endError: flattenErrors?.fieldErrors.end?.[0],
  };
};

export type CreateHabitErrorMessages = ReturnType<typeof extractCreateHabitDataErrors>;
