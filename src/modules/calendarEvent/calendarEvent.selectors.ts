import { createSelector } from '@reduxjs/toolkit';

import { getMeets } from '@/modules/meet/meet.selectors';

export const getCalendarEvents = createSelector(getMeets, (meets) => {
  return [...meets];
});
