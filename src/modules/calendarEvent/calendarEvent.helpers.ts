import type { EventWeekday } from '@/modules/calendarEvent/calendarEvent.types';

const days: EventWeekday[] = ['TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'MONDAY'];

export const getDateWeekday = (date: Date): EventWeekday => {
  return days[date.getDay()];
};
