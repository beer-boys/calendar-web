import { View } from '@vkontakte/vkui';

import { CalendarPanel } from '@/panel/CalendarPannel';

interface CalendarViewProps {
  id: string;
}

export function CalendarView({ id }: CalendarViewProps) {
  return (
    <View id={id} activePanel="calendar-panel">
      <CalendarPanel id="calendar-panel" />
    </View>
  );
}
