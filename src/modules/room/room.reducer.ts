import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { bookRoomAPICall, getRoomsAPICall } from '@/api/calls/rooms';
import type { Room } from '@/modules/room/room.type';
import { combineDateAndTime } from '@/utils/dates';

const name = 'rooms';

interface GetRoomsPayload {
  minCapacity: string;
  features: string[];
}

export const getRooms = createAsyncThunk(`${name}/getRooms`, async ({ minCapacity, features }: GetRoomsPayload) => {
  const params = {
    minCapacity,
    requiredFeatures: features,
  };

  const { data } = await getRoomsAPICall(params);

  return data;
});

interface BookRoomPayload {
  roomId: string;
  date: number;
  start: string;
  end: string;
}

export const bookRoom = createAsyncThunk(`${name}/bookRoom`, async ({ roomId, date, start, end }: BookRoomPayload) => {
  const startDateTime = combineDateAndTime(date, start);
  const endDateTime = combineDateAndTime(date, end);

  const params = {
    roomId,
    timeSlot: {
      start: startDateTime,
      end: endDateTime,
    },
    purpose: 'Встреча',
  };

  await bookRoomAPICall(params);
});

interface RoomState {
  rooms: Room[];
  isLoading: boolean;
}

const initialState: RoomState = {
  rooms: [],
  isLoading: false,
};

const roomSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        const { payload } = action;
        state.rooms = payload;
        state.isLoading = false;
      }),
});

export const { reducer: roomReducer } = roomSlice;
