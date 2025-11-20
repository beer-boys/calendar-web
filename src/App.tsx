import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Icon24GearOutline } from '@vkontakte/icons';
import { Button, Calendar, Checkbox, FormLayoutGroup } from '@vkontakte/vkui';

import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.root}>
      <div className={styles.sideBar}>
        <div className={styles.logo}>
          <span className={styles.logoFirstLetter}>X</span>-Calendar
        </div>
        <Button size="l">+ Создать</Button>
        <Calendar />
        <FormLayoutGroup mode="vertical">
          <Checkbox name="meetings" defaultChecked>
            Встречи
          </Checkbox>
          <Checkbox name="habbits" defaultChecked>
            Привычки
          </Checkbox>
        </FormLayoutGroup>
        <div className={styles.iconWrapper}>
          <Icon24GearOutline />
        </div>
      </div>
      <div className={styles.calendarWrapper}>
        <FullCalendar
          locale={ruLocale}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={[{ title: 'Конец спринта 1', date: '2025-11-07' }]}
        />
      </div>
    </div>
  );
}
