import type { EventPeriod, EventPriority } from '@/modules/calendarEvent/calendarEvent.types';

export const defaultPeriod: EventPeriod = 'daily';
export const periodNames: Record<EventPeriod, string> = {
  daily: 'Ежедневно',
  weekly: 'Еженедельно',
};

export const defaultPriority: EventPriority = 'standart';
export const priorityNames: Record<EventPriority, string> = {
  critical: 'Срочный',
  standart: 'Стандартный',
  minor: 'Низкий',
};
