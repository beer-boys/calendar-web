import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { meetReducer } from '@/modules/meet/meet.reducer';
import { modalReducer } from '@/modules/modal/modal.reducer';

const reducer = combineReducers({
  modal: modalReducer,
  meet: meetReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
});
