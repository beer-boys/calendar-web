import { SplitCol, SplitLayout } from '@vkontakte/vkui';

import { Modals } from '@/ui/Modals/Modals';

import { CalendarPanel } from './panel/CalendarPanel/CalendarPanel';
import { SidebarPanel } from './panel/SidebarPanel/SidebarPanel';

export function App() {
  return (
    <>
      <Modals />
      <SplitLayout>
        <SplitCol stretchedOnMobile autoSpaced>
          <SplitLayout>
            <SplitCol maxWidth="fit-content">
              <SidebarPanel />
            </SplitCol>
            <SplitCol>
              <CalendarPanel />
            </SplitCol>
          </SplitLayout>
        </SplitCol>
      </SplitLayout>
    </>
  );
}
