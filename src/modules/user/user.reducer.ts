import { createAction, createSlice } from '@reduxjs/toolkit';

import type { User } from '@/modules/user/user.types';

const name = 'user';

interface CreateUserRequestPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
}
export const createUserRequest = createAction<CreateUserRequestPayload>(`${name}/createUserRequest`);

interface CreateUserSuccessPayload {
  user: User;
}
export const createUserSuccess = createAction<CreateUserSuccessPayload>(`${name}/createUserSuccess`);

interface CreateUserErrorPayload {
  error: string;
}
export const createUserError = createAction<CreateUserErrorPayload>(`${name}/createUserError`);

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name,
  initialState,
  reducers: {},
});
