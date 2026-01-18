import { createAPICall } from '@/api/api';

interface GetEventsRequest {
  start: string;
  end: string;
}

interface Capabilities {
  canDelete: boolean;
  canReschedule: boolean;
  canEdit: boolean;
}

interface Conflict {
  conflictType: 'TIME_OVERLAP' | string;
  conflictingEventIds: string[];
  message: string;
}

interface EventDetails {
  type: string;
  calendarId: string;
  isAllDay: boolean;
}

interface Event {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  itemType: 'HABIT' | string;
  source: 'INTERNAL_ONLY' | string;
  externalEventId: string;
  capabilities: Capabilities;
  conflict?: Conflict;
  details: EventDetails;
}

interface Period {
  start: string;
  end: string;
}

interface GetEventsResponse {
  events: Event[];
  period: Period;
  totalCount: number;
  hasConflicts: boolean;
}

const GET_EVENTS_URL = '/calendar/feed';
export const getEventsAPICall = createAPICall<GetEventsResponse, GetEventsRequest>('GET', GET_EVENTS_URL);
