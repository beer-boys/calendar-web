import { createAPICall } from '@/api/api';

// Title, description, durationMin, recurrence { frequency[daily, weekly],  }, flexibility{ earliestTime, latestTime }

type EventPeriod = 'daily' | 'weekly';

// Перечисление дней недели (можно расширить, если есть другие значения)
type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

interface CreateHabitRequest {
  title: string;
  description?: string;
  durationMinutes: number;
  recurrence: { frequency: EventPeriod; daysOfWeek: DayOfWeek[]; startDate: string };
  flexibility: { earliestTime: string; latestTime: string };
}

interface Recurrence {
  frequency: string;
  daysOfWeek: DayOfWeek[];
  interval: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

interface Flexibility {
  earliestTime: string;
  latestTime: string;
  allowCrossDayMove: boolean;
  preferredDurationMinutes: number;
}

interface TimeSlot {
  start: string; // ISO date string
  end: string; // ISO date string
}

interface TimeRange {
  start: string;
  end: string;
}

interface ExcludedTimeRange {
  dayOfWeek: DayOfWeek;
  excludedRanges: TimeRange[];
}

interface ExcludeDatesRule {
  type: string;
  excludedDates?: string[]; // YYYY-MM-DD
  excludedDaysOfWeek?: DayOfWeek[];
  excludedTimeRanges?: ExcludedTimeRange[];
  excludeHolidays?: boolean;
}

interface OccurrenceRule {
  type: string;
  periodDays?: number;
  minOccurrences?: number;
  maxOccurrences?: number;
  minGapMinutes?: number;
}

interface ModifiedOccurrence {
  newStartTime: string;
  newEndTime: string;
  newDurationMinutes: number;
}

interface ModifiedOccurrencesRule {
  type: string;
  cancelledDates?: string[]; // YYYY-MM-DD
  modifiedOccurrences?: {
    [key: string]: ModifiedOccurrence;
  };
}

interface ActiveRangeRule {
  type: string;
  earliestTime?: string;
  latestTime?: string;
  activeDateRangeStart?: string; // YYYY-MM-DD
  activeDateRangeEnd?: string; // YYYY-MM-DD
  activeDaysOfWeek?: DayOfWeek[];
}

interface GenericRule {
  type: string;
  [key: string]: unknown;
}

// Тип для правил (union, если возможно различать по type, или просто общий интерфейс)
type Rule = ExcludeDatesRule | OccurrenceRule | ModifiedOccurrencesRule | ActiveRangeRule | GenericRule;

interface Habit {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  recurrence: Recurrence;
  flexibility: Flexibility;
  priority: number;
  bufferBeforeMinutes: number;
  bufferAfterMinutes: number;
  currentTimeSlot: TimeSlot;
  rules: Rule[];
}

interface Conflict {
  habitTitle: string;
  conflictingEventTitle: string;
  conflictType: string;
  affectedDate: string;
}

interface CreateHabitResponse {
  habit: Habit;
  scheduledSlot: TimeSlot;
  conflicts: Conflict[];
  status: string;
}

const CREATE_HABIT_URL = '/habits';
export const createHabitAPICall = createAPICall<CreateHabitResponse, CreateHabitRequest>('POST', CREATE_HABIT_URL);
