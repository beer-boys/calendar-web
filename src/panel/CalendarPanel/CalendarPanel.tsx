import { Panel } from '@vkontakte/vkui';

import { Calendar } from '@/ui/Calendar/Calendar';

export function CalendarPanel() {
  return (
    <Panel id="calendar-panel" mode="card">
      <Calendar />
    </Panel>
  );
}
