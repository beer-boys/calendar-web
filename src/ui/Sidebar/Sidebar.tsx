import { Box, Card, Flex } from '@vkontakte/vkui';

import { CalendarPreview } from '@/ui/CalendarPreview/CalendarPreview';
import { CalendarProviderSelector } from '@/ui/CalendarProviderSelector/CalendarProviderSelector';
import { CreateButton } from '@/ui/CreateButton/CreateButton';
import { Filters } from '@/ui/Filters/Filters';
import { Logo } from '@/ui/Logo/Logo';

import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <Card className={styles.root} mode="plain">
      <Box className={styles.fullHeight} padding="3xl">
        <Flex className={styles.fullHeight} direction="column" gap="4xl">
          <Logo />
          <CreateButton />
          <CalendarPreview />
          <Filters />
          <Flex className={styles.calendarSelectorWrapper} direction="column" justify="end">
            <CalendarProviderSelector />
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
}
