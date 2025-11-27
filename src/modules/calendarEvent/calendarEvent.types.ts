export type EventPriority = 'critical' | 'standart' | 'minor';

export interface CalendarEvent {
  title: string;
  date: number;
  priority: EventPriority;
}
