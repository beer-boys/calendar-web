import type { EventPriority } from '@/modules/calendarEvent/calendarEvent.types';

export const defaultPriority: EventPriority = 'standart';

export const priorityNames: Record<EventPriority, string> = {
  critical: 'Срочный',
  standart: 'Стандартный',
  minor: 'Низкий',
};
