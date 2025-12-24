import * as z from 'zod';

export const calendarProviderNameSchema = z.enum(['GOOGLE']);

export const calendarProviderSchema = z.object({
  name: calendarProviderNameSchema,
  connected: z.boolean(),
  isLoading: z.boolean(),
  error: z.string(),
});
