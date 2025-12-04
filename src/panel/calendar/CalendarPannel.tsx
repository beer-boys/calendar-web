import { Flex, Panel, PanelSpinner } from '@vkontakte/vkui';
import { useOutletContext } from 'react-router';

import type { AuthLayoutOutletContext } from '@/app/AuthLayout';
import { Calendar } from '@/ui/Calendar/Calendar';
import { Sidebar } from '@/ui/Sidebar/Sidebar';

import styles from './CalendarPanel.module.css';

interface CalendarPanelProps {
  id: string;
}

export function CalendarPanel({ id }: CalendarPanelProps) {
  const { isLoading } = useOutletContext<AuthLayoutOutletContext>();

  return (
    <Panel id={id}>
      {isLoading ? (
        <PanelSpinner />
      ) : (
        <Flex className={styles.wrapper} direction="row" gap="2xl">
          <Sidebar />
          <Calendar className={styles.calendar} />
        </Flex>
      )}
    </Panel>
  );
}
