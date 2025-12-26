import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { createHabitAPICall, type CreateHabitRequest } from '@/api/calls/habit';
import type { Habit } from '@/modules/habit/habit.types';
import { getEventsAPICall } from '@/api/calls/events';

export const getHabits = createAsyncThunk('habit/getHabits', async ({ startDate, endDate }: { startDate: string; endDate: string }) => {
  const { data } = await getEventsAPICall(startDate, endDate);
  console.log(data);
  return data.events.map((item: any) => {
    const { startTime, title } = item;
    return { title, date: new Date(startTime).getTime(), priority: 'standart', period: 'daily' };
  });
});

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
  extraReducers: (builder) =>
    builder.addCase(getHabits.fulfilled, (state, action) => {
      state.habits = [];
      state.habits.push(...action.payload);
    }),
});

export const { createHabit } = habitSlice.actions;
export const { reducer: habitReducer } = habitSlice;
