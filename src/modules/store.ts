import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { calendarEventsReducer, createHabitMiddleware } from '@/modules/calendarEvent/calendarEvent.reducer';
import { calendarProviderReducer } from '@/modules/calendarProvider/calendarProvider.reducer';
import { contactReducer } from '@/modules/contact/contact.module';
import { modalReducer } from '@/modules/modal/modal.reducer';
import { userReducer } from '@/modules/user/user.reducer';

export const rootReducer = combineReducers({
  modal: modalReducer,
  contact: contactReducer,
  user: userReducer,
  calendarProvider: calendarProviderReducer,
  calendarEvents: calendarEventsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createHabitMiddleware),
});
