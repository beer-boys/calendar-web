import { createSelector } from '@reduxjs/toolkit';

import { calendarProviderNameMapper } from '@/modules/calendarProvider/calendarProvider.constants';
import type { CalendarProviderName } from '@/modules/calendarProvider/calendarProvider.types';
import type { RootState } from '@/modules/store';

const getCalendarProvider = (state: RootState) => state.calendarProvider;

export const getMappedProvidersConnection = createSelector(getCalendarProvider, (providers) => {
  return Object.entries(providers).map(([name, { connected }]) => ({
    id: name as CalendarProviderName,
    name: calendarProviderNameMapper[name as CalendarProviderName],
    connected,
  }));
});
