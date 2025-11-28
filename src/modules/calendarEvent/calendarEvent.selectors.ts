import { createSelector } from '@reduxjs/toolkit';

import { getHabits } from '@/modules/habit/habit.selectors';
import { getMeets } from '@/modules/meet/meet.selectors';

export const getCalendarEvents = createSelector(getMeets, getHabits, (meets, habits) => {
  return [...meets, ...habits];
});
