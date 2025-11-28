import type { EventPeriod, EventPriority } from '@/modules/calendarEvent/calendarEvent.types';

export const defaultPeriod: EventPeriod = 'once';
export const periodNames: Record<EventPeriod, string> = {
  once: 'Никогда',
  week: 'Еженедельно',
  month: 'Ежемесячно',
};

export const defaultPriority: EventPriority = 'standart';
export const priorityNames: Record<EventPriority, string> = {
  critical: 'Срочный',
  standart: 'Стандартный',
  minor: 'Низкий',
};
