import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Meet } from '@/modules/meet/meet.types';

interface MeetState {
  meets: Meet[];
}

const initialState: MeetState = {
  meets: [],
};

const meetSlice = createSlice({
  name: 'meet',
  initialState,
  reducers: {
    createMeet: (state, action: PayloadAction<{ meet: Meet }>) => {
      const { meet } = action.payload;
      state.meets.push(meet);
    },
  },
});

export const { createMeet } = meetSlice.actions;
export const { reducer: meetReducer } = meetSlice;
