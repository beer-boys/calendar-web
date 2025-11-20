import type { RootState } from '@/modules/store';

const getEventState = (state: RootState) => state.event;

export const getCalendarEvents = (state: RootState) => getEventState(state).events;
