import type { CalendarEvent } from '@/modules/calendarEvent/calendarEvent.types';
import type { Contact } from '@/modules/contact/contact.type';

export interface Meet extends CalendarEvent {
  attendees: Contact[];
}
