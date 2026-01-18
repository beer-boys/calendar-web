import { createAPICall } from '@/api/api';

interface GetEventsRequest {
  startDate: string;
  endDate: string;
}

const GET_EVENTS_URL = '/calendar/feed';

export const getEventsAPICall = createAPICall<GetEventsRequest>('GET', GET_EVENTS_URL);
