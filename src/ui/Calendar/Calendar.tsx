import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Box, Card } from '@vkontakte/vkui';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCalendarEvents } from '@/modules/calendarEvent/calendarEvent.selectors';
import { getHabits } from '@/modules/habit/habit.reducer';

import styles from './Calendar.module.css';

interface CalendarProps {
  className?: string;
}

export function Calendar({ className }: CalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // После первого рендера оно тормозит и не расширяет ряды календаря, поэтому вручную триггерим обновление размеров
    calendarRef.current?.getApi().updateSize();
    const startDate = new Date(2025, 11, 1).toISOString(); // 1 декабря 2025
    const endDate = new Date(2025, 11, 12).toISOString(); // 31 декабря 2025
    // @ts-expect-error
    dispatch(getHabits({ startDate, endDate }));
  }, []);

  const events = useSelector(getCalendarEvents);

  return (
    <Card className={clsx(className)} mode="plain">
      <Box className={styles.calendarWrapper} flexGrow={1} padding="3xl">
        <FullCalendar
          ref={calendarRef}
          locale={ruLocale}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="100%"
        />
      </Box>
    </Card>
  );
}
