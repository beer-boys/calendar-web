import * as z from 'zod';

export const DateRangeSchema = z
  .object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  })
  .refine(({ startDate, endDate }) => !startDate || !endDate || startDate < endDate, {
    message: 'Дата начала должна быть меньше даты окончания',
    path: ['endDate'],
  });

export type DateRange = z.infer<typeof DateRangeSchema>;

export const extractDateRangeError = (error: z.ZodError<DateRange>) => {
  const treeError = z.flattenError(error);
  return treeError.fieldErrors.endDate?.[0];
};
