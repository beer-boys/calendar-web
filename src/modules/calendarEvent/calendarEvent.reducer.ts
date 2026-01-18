import { createAsyncThunk, createSlice, type Middleware, type PayloadAction } from '@reduxjs/toolkit';

import { getEventsAPICall } from '@/api/calls/events';
import { createHabitAPICall } from '@/api/calls/habit';
import { getDateWeekday } from '@/modules/calendarEvent/calendarEvent.helpers';
import { getCurrentDates } from '@/modules/calendarEvent/calendarEvent.selectors';
import type { CalendarEvent, EventPeriod, EventPriority } from '@/modules/calendarEvent/calendarEvent.types';
import { closeModal } from '@/modules/modal/modal.reducer';
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
  name: string;
  description?: string;
  durationMinutes: number;
  period: EventPeriod;
  startDate: number;
  earliestTime: string;
  latestTime: string;
}

export const createHabit = createAsyncThunk(
  `${name}/createHabit`,
  async ({ name, description, durationMinutes, period, startDate, earliestTime, latestTime }: CreateHabitPayload) => {
    const startDateISO = timestampToIsoString(startDate);
    const dayOfWeek = getDateWeekday(new Date(startDate));

    const params = {
      title: name,
      description,
      durationMinutes,
      recurrence: { frequency: period, daysOfWeek: [dayOfWeek], startDate: startDateISO },
      flexibility: { earliestTime, latestTime },
    };

    await createHabitAPICall(params);
  },
);

export const createHabitMiddleware: Middleware<unknown, RootState> = (store) => (next) => (action) => {
  /** Я искренне не понимаю, как написаны типы в Redux */
  if (!isReduxAction(action)) {
    next(action);
    return;
  }

  if (action.type !== createHabit.fulfilled.type) {
    next(action);
    return;
  }

  const currentDates = getCurrentDates(store.getState());
  // @ts-expect-error
  store.dispatch(getEvents(currentDates));

  store.dispatch(closeModal());

  next(action);
};

interface CalendarEventsState {
  events: CalendarEvent[];
  isLoading: boolean;
  error: string;
  currentDates: { start: number; end: number };
  loadedDates: { start: number; end: number };
}

const initialState: CalendarEventsState = {
  events: [],
  isLoading: false,
  error: '',
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
    builder
      .addCase(createHabit.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(createHabit.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createHabit.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Что-то пошло не так';
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = [];
        state.events.push(...action.payload);
      }),
});

export const { setCurrentDates } = calendarEventsSlice.actions;
export const { reducer: calendarEventsReducer } = calendarEventsSlice;
