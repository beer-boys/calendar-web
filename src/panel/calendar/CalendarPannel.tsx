import { Flex, Panel } from '@vkontakte/vkui';

import { Calendar } from '@/ui/Calendar/Calendar';
import { Sidebar } from '@/ui/Sidebar/Sidebar';

import styles from './CalendarPanel.module.css';

interface CalendarPanelProps {
  id: string;
}

export function CalendarPanel({ id }: CalendarPanelProps) {
  return (
    <Panel id={id}>
      <Flex className={styles.wrapper} direction="row" gap="2xl">
        <Sidebar />
        <Calendar className={styles.calendar} />
      </Flex>
    </Panel>
  );
}
