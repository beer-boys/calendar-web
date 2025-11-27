import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { contactReducer } from '@/modules/contact/contact.module';
import { meetReducer } from '@/modules/meet/meet.reducer';
import { modalReducer } from '@/modules/modal/modal.reducer';

const reducer = combineReducers({
  modal: modalReducer,
  meet: meetReducer,
  contact: contactReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
});
