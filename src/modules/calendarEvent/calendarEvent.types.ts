export type EventPriority = 'critical' | 'standart' | 'minor';

export type EventPeriod = 'once' | 'week' | 'month';

export interface CalendarEvent {
  title: string;
  date: number;
  priority: EventPriority;
  period: EventPeriod;
}
