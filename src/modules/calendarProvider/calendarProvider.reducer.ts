import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AUTH_URL } from '@/api/api';
import { linkGoogleAPICall } from '@/api/calls/linkGoogle';
import type { CalendarProvider, CalendarProviderName } from '@/modules/calendarProvider/calendarProvider.types';

export const checkGoogleLink = createAsyncThunk('calendarProvider/checkGoogleLink', async () => {
  const { data } = await linkGoogleAPICall();
  return data.connected;
});

export const linkGoogle = createAsyncThunk('calendarProvider/linkGoogle', async () => {
  const { data } = await linkGoogleAPICall();

  if (!data.redirectUrl) {
    throw new TypeError('no redirectUrl');
  }

  window.open(`${AUTH_URL}${data.redirectUrl}`, '_self');
});

type CalendarProviderState = Record<CalendarProviderName, CalendarProvider>;

const initialState: CalendarProviderState = {
  GOOGLE: {
    name: 'GOOGLE',
    connected: false,
    isLoading: false,
    error: '',
  },
};

const calendarProviderSlice = createSlice({
  name: 'calendarProvider',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(checkGoogleLink.pending, (state) => {
        state.GOOGLE.isLoading = true;
      })
      .addCase(checkGoogleLink.fulfilled, (state, action) => {
        state.GOOGLE.connected = action.payload;
        state.GOOGLE.isLoading = false;
        state.GOOGLE.error = '';
      })
      .addCase(checkGoogleLink.rejected, (state, action) => {
        state.GOOGLE.error = action.error.message ?? 'Что-то пошло не так';
        state.GOOGLE.isLoading = false;
      }),
});

export const { reducer: calendarProviderReducer } = calendarProviderSlice;
