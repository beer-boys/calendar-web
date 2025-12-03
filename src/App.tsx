import { SplitCol, SplitLayout } from '@vkontakte/vkui';

import { Modals } from '@/ui/Modals/Modals';
import { CalendarView } from '@/view/CalendarView';

export function App() {
  return (
    <>
      <Modals />
      <SplitLayout>
        <SplitCol stretchedOnMobile autoSpaced>
          <CalendarView id="calendar-view" />
        </SplitCol>
      </SplitLayout>
    </>
  );
}
