import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { eventReducer } from '@/modules/event/event.reducer';
import { modalReducer } from '@/modules/modal/modal.reducer';

const reducer = combineReducers({
  modal: modalReducer,
  event: eventReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
});
