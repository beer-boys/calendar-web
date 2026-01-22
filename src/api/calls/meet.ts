// "{\"start\":{\"dateTime\":\"2026-01-21T17:00:00+03:00\",\"timeZone\":\"Europe/Moscow\"},\"end\":{\"dateTime\":\"2026-01-21T19:00:00+03:00\",\"timeZone\":\"Europe/Moscow\"},\
// "attendees\":[{\"email\":\"kalinfromru@gmail.com\"},{\"email\":\"vinder_vs1@mail.ru\"}],\"summary\":\"Event example with guests\"}"

import { createAPICall } from '@/api/api';

interface DateTimeWithTimezone {
  dateTime: string; // ISO String
  timeZone: string;
}

interface Attendee {
  email: string;
}

interface CreateMeetRequest {
  start: DateTimeWithTimezone;
  end: DateTimeWithTimezone;
  attendees?: Attendee[];
  summary: string;
  description?: string;
}

type CreateMeetResponse = unknown;

const CREATE_MEET_URL = '/google/calendars/primary/events';
export const createMeetAPICall = createAPICall<CreateMeetResponse, CreateMeetRequest>('POST', CREATE_MEET_URL);
