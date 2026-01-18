import type { RootState } from '@/modules/store';

const getCalendarEventsState = (state: RootState) => state.calendarEvents;

export const getCalendarEvents = (state: RootState) => getCalendarEventsState(state).events;

export const getCurrentDates = (state: RootState) => getCalendarEventsState(state).currentDates;

export const getLoadingState = (state: RootState) => getCalendarEventsState(state).isLoading;

export const getError = (state: RootState) => getCalendarEventsState(state).error;
