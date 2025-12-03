import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { User } from '@/modules/user/user.types';

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.currentUser = user;
    },
    removeCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, removeCurrentUser } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
