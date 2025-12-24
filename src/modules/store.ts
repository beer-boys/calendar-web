import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { calendarProviderReducer } from '@/modules/calendarProvider/calendarProvider.reducer';
import { contactReducer } from '@/modules/contact/contact.module';
import { habitReducer } from '@/modules/habit/habit.reducer';
import { meetReducer } from '@/modules/meet/meet.reducer';
import { modalReducer } from '@/modules/modal/modal.reducer';
import { userReducer } from '@/modules/user/user.reducer';

const reducer = combineReducers({
  modal: modalReducer,
  meet: meetReducer,
  contact: contactReducer,
  habit: habitReducer,
  user: userReducer,
  calendarProvider: calendarProviderReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
});
