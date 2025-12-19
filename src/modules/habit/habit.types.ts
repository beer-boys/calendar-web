import * as z from 'zod';

import type { HabitSchema } from '@/modules/habit/habit.schemas';

export type Habit = z.infer<typeof HabitSchema>;
