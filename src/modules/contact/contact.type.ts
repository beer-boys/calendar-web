import * as z from 'zod';

import type { ContactSchema } from '@/modules/contact/contact.schemas';

export type Contact = z.infer<typeof ContactSchema>;
