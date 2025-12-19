import * as z from 'zod';

import { EventPeriodSchema } from '@/modules/calendarEvent/calendarEvent.schemas';

export const CreateHabitDataSchema = z.object({
  name: z.string().nonempty('Укажите название привычки'),
  date: z.date('Укажите дату привычки'),
  period: EventPeriodSchema,
});

export type CreateHabitData = z.infer<typeof CreateHabitDataSchema>;

export const extractCreateHabitDataErrors = (error?: z.ZodError<CreateHabitData>) => {
  const flattenErrors = error && z.flattenError(error);

  return {
    nameError: flattenErrors?.fieldErrors.name?.[0],
    dateError: flattenErrors?.fieldErrors.date?.[0],
  };
};

export type CreateHabitErrorMessages = ReturnType<typeof extractCreateHabitDataErrors>;
