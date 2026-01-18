import { createAsyncThunk, createSlice, type Middleware, type PayloadAction } from '@reduxjs/toolkit';

import { getEventsAPICall } from '@/api/calls/events';
import { createHabitAPICall } from '@/api/calls/habit';
import { getCurrentDates } from '@/modules/calendarEvent/calendarEvent.selectors';
import type { CalendarEvent, EventPeriod, EventPriority } from '@/modules/calendarEvent/calendarEvent.types';
import type { RootState } from '@/modules/store';
import { isReduxAction } from '@/utils/isAction';
import { timestampToIsoString } from '@/utils/timestampToISOString';

const name = 'calendarEvents';

interface GetEventsPayload {
  start: number;
  end: number;
}

export const getEvents = createAsyncThunk(`${name}/getEvents`, async ({ start, end }: GetEventsPayload) => {
  const startDateISO = timestampToIsoString(start);
  const endDateISO = timestampToIsoString(end);

  const { data } = await getEventsAPICall({ start: startDateISO, end: endDateISO });
  return data.events.map((item) => {
    const { startTime, title, description } = item;
    return {
      title,
      description,
      date: new Date(startTime).getTime(),
      priority: 'standart' as EventPriority,
      period: 'daily' as EventPeriod,
    };
  });
});

interface CreateHabitPayload {
  title: string;
  description: string;
  durationMinutes: number;
  frequency: EventPeriod;
  startDate: number;
  earliestTime: number;
  latestTime: number;
}

export const createHabit = createAsyncThunk(
  `${name}/createHabit`,
  async ({ title, description, durationMinutes, frequency, startDate, earliestTime, latestTime }: CreateHabitPayload) => {
    const startDateISO = timestampToIsoString(startDate);
    const earliestTimeISO = timestampToIsoString(earliestTime);
    const latestTimeISO = timestampToIsoString(latestTime);

    const params = {
      title,
      description,
      durationMinutes,
      recurrence: { frequency, startDate: startDateISO },
      flexibility: { earliestTime: earliestTimeISO, latestTime: latestTimeISO },
    };

    await createHabitAPICall(params);
  },
);

export const refetchEventsMiddleware: Middleware<unknown, RootState> = (store) => (next) => (action) => {
  /** Я искренне не понимаю, как написаны типы в Redux */
  if (!isReduxAction(action)) {
    next(action);
    return;
  }

  if (action.type !== `${createHabit.name}/fulfilled`) {
    next(action);
    return;
  }

  const currentDates = getCurrentDates(store.getState());

  // @ts-expect-error
  store.dispatch(getEvents(currentDates));
};

interface CalendarEventsState {
  events: CalendarEvent[];
  currentDates: { start: number; end: number };
  loadedDates: { start: number; end: number };
}

const initialState: CalendarEventsState = {
  events: [],
  currentDates: { start: 0, end: 0 },
  loadedDates: { start: 0, end: 0 },
};

const calendarEventsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCurrentDates: (state, action: PayloadAction<{ currentDates: { start: number; end: number } }>) => {
      const { currentDates } = action.payload;
      state.currentDates = currentDates;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.events = [];
      state.events.push(...action.payload);
    }),
});

export const { setCurrentDates } = calendarEventsSlice.actions;
export const { reducer: calendarEventsReducer } = calendarEventsSlice;
