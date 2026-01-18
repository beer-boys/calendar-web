import type { DatesSetArg } from '@fullcalendar/core/index.js';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Box, Card } from '@vkontakte/vkui';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getEvents, setCurrentDates } from '@/modules/calendarEvent/calendarEvent.reducer';
import { getCalendarEvents, getCurrentDates } from '@/modules/calendarEvent/calendarEvent.selectors';

import styles from './Calendar.module.css';

interface CalendarProps {
  className?: string;
}

export function Calendar({ className }: CalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!calendarRef.current) {
      return;
    }

    const calendarApi = calendarRef.current.getApi();
    calendarApi.updateSize();
  }, []);

  const { start, end } = useSelector(getCurrentDates);
  useEffect(() => {
    if (start && end) {
      // @ts-expect-error
      dispatch(getEvents({ start, end }));
    }
  }, [start, end]);

  const events = useSelector(getCalendarEvents);

  const onDatesSet = ({ start, end }: DatesSetArg) => {
    dispatch(
      setCurrentDates({
        currentDates: { start: start.getTime(), end: end.getTime() },
      }),
    );
  };

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
          datesSet={onDatesSet}
        />
      </Box>
    </Card>
  );
}
