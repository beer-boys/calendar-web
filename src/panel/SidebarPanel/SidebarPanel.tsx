import { Box, Button, Flex, Panel } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';

import { MODALS, openModal } from '@/modules/modal/modal.reducer';
import { CalendarPreview } from '@/ui/CalendarPreview/CalendarPreview';
import { Filters } from '@/ui/Filters/Filters';
import { Logo } from '@/ui/Logo/Logo';

import styles from './SidebarPanel.module.css';

export function SidebarPanel() {
  const dispatch = useDispatch();

  const onCreateClick = () => {
    dispatch(openModal({ modalId: MODALS.createItem }));
  };

  return (
    <Panel className={styles.root} id="sidebar-panel" mode="plain">
      <Box padding="3xl">
        <Flex direction="column" gap="4xl">
          <Logo />
          <Button onClick={onCreateClick} className={styles.createBttn} size="l" stretched>
            + Создать
          </Button>
          <CalendarPreview />
          <Filters />
        </Flex>
      </Box>
    </Panel>
  );
}
