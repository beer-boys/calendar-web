import { SplitCol, SplitLayout } from '@vkontakte/vkui';
import { Outlet } from 'react-router';

import { Modals } from '@/ui/Modals/Modals';

export function AppLayout() {
  return (
    <>
      <Modals />
      <SplitLayout>
        <SplitCol stretchedOnMobile autoSpaced>
          <Outlet />
        </SplitCol>
      </SplitLayout>
    </>
  );
}
