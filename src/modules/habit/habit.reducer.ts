import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { createHabitAPICall, type CreateHabitRequest } from '@/api/calls/habit';
import type { Habit } from '@/modules/habit/habit.types';

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: 'habit',
  initialState,
  reducers: {
    createHabit: (_, action: PayloadAction<{ habit: CreateHabitRequest }>) => {
      const { habit } = action.payload;
      createHabitAPICall(habit);
    },
  },
});

export const { createHabit } = habitSlice.actions;
export const { reducer: habitReducer } = habitSlice;
