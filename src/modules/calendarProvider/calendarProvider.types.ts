import * as z from 'zod';

import type { calendarProviderNameSchema, calendarProviderSchema } from '@/modules/calendarProvider/calendarProvider.schemas';

export type CalendarProviderName = z.infer<typeof calendarProviderNameSchema>;
export type CalendarProvider = z.infer<typeof calendarProviderSchema>;
