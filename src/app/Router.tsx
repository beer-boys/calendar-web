import { BrowserRouter, Route, Routes } from 'react-router';

import { AppLayout } from '@/app/AppLayout';
import { LoginPanel } from '@/panel/login/LoginPanel';
import { CalendarView } from '@/view/calendar/CalendarView';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<CalendarView id="/" />} />
          <Route path="login" index element={<LoginPanel id="login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
