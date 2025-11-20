import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Box } from '@vkontakte/vkui';
import { useEffect, useRef } from 'react';

import styles from './Calendar.module.css';

export function Calendar() {
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    // После первого рендера оно тормозит и не расширяет ряды календаря, поэтому вручную триггерим обновление размеров
    calendarRef.current?.getApi().updateSize();
  }, []);

  return (
    // Я пытался не нарушать семантику VKUI, но пришлось сделать Box flex-контейнером
    <Box className={styles.rootFlex} flexGrow={1} padding="3xl">
      <FullCalendar
        ref={calendarRef}
        locale={ruLocale}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={[{ title: 'Конец спринта 1', date: '2025-11-07' }]}
        height="100%"
      />
    </Box>
  );
}
