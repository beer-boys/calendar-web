import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
    createHabit: (state, action: PayloadAction<{ habit: Habit }>) => {
      const { habit } = action.payload;
      state.habits.push(habit);
    },
  },
});

export const { createHabit } = habitSlice.actions;
export const { reducer: habitReducer } = habitSlice;
