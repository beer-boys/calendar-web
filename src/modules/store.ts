import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { contactReducer } from '@/modules/contact/contact.module';
import { habitReducer } from '@/modules/habit/habit.reducer';
import { meetReducer } from '@/modules/meet/meet.reducer';
import { modalReducer } from '@/modules/modal/modal.reducer';

const reducer = combineReducers({
  modal: modalReducer,
  meet: meetReducer,
  contact: contactReducer,
  habit: habitReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
});
