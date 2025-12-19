import * as z from 'zod';

import type { MeetSchema } from '@/modules/meet/meet.schemas';

export type Meet = z.infer<typeof MeetSchema>;
