import api from '@/api/api';

export const getEventsAPICall = (startDate: string, endDate: string) => {
  return api.get(`/calendar/feed?start=${startDate}&end=${endDate}`);
};
