import { BrowserRouter, Route, Routes } from 'react-router';

import { AppLayout } from '@/app/AppLayout';
import { AuthLayout } from '@/app/AuthLayout';
import { CalendarPanel } from '@/panel/calendar/CalendarPannel';
import { LoginPanel } from '@/panel/login/LoginPanel';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<AuthLayout />}>
            <Route index element={<CalendarPanel id="/" />} />
          </Route>
          <Route path="login" index element={<LoginPanel id="login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
