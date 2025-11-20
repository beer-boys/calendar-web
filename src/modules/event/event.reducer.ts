import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CalendarEvent } from '@/modules/event/event.types';

interface EventState {
  events: CalendarEvent[];
}

const initialState: EventState = {
  events: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    createCalendarEvent: (state, action: PayloadAction<{ event: CalendarEvent }>) => {
      const { event } = action.payload;
      state.events.push(event);
    },
  },
});

export const { createCalendarEvent } = eventSlice.actions;
export const { reducer: eventReducer } = eventSlice;
