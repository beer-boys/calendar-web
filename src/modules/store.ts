import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { calendarEventsReducer, refetchEventsMiddleware } from '@/modules/calendarEvent/calendarEvent.reducer';
import { calendarProviderReducer } from '@/modules/calendarProvider/calendarProvider.reducer';
import { contactReducer } from '@/modules/contact/contact.module';
import { modalReducer } from '@/modules/modal/modal.reducer';
import { userReducer } from '@/modules/user/user.reducer';

const reducer = combineReducers({
  modal: modalReducer,
  contact: contactReducer,
  user: userReducer,
  calendarProvider: calendarProviderReducer,
  calendarEvents: calendarEventsReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(refetchEventsMiddleware),
});
