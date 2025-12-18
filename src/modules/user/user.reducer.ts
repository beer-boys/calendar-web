import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { meAPICall } from '@/api/calls/me';
import type { User } from '@/modules/user/user.types';

export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser', async () => {
  const { data } = await meAPICall();
  return data;
});

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: '',
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        const { payload } = action;

        state.currentUser = {
          email: payload.login,
          firstName: payload.firstName,
          lastName: payload.lastName,
          middleName: payload.middleName,
          roles: payload.roles,
        };

        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Что-то пошло не так';
        state.isLoading = false;
      });
  },
});

export const { setCurrentUser, removeCurrentUser } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
