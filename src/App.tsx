import { SplitCol, SplitLayout } from '@vkontakte/vkui';

import { CalendarPanel } from './panel/CalendarPanel/CalendarPanel';
import { SidebarPanel } from './panel/SidebarPanel/SidebarPanel';

export function App() {
  return (
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
  );
}
