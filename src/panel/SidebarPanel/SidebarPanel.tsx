import { Box, Flex, Panel } from '@vkontakte/vkui';

import { CalendarPreview } from '@/ui/CalendarPreview/CalendarPreview';
import { CreateButton } from '@/ui/CreateButton/CreateButton';
import { Filters } from '@/ui/Filters/Filters';
import { Logo } from '@/ui/Logo/Logo';

import styles from './SidebarPanel.module.css';

export function SidebarPanel() {
  return (
    <Panel className={styles.root} id="sidebar-panel" mode="plain">
      <Box padding="3xl">
        <Flex direction="column" gap="4xl">
          <Logo />
          <CreateButton />
          <CalendarPreview />
          <Filters />
        </Flex>
      </Box>
    </Panel>
  );
}
