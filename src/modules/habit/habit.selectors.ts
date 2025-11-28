import type { RootState } from '@/modules/store';

const getHabitState = (state: RootState) => state.habit;

export const getHabits = (state: RootState) => getHabitState(state).habits;
