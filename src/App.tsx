import { Epic, SplitCol, SplitLayout } from '@vkontakte/vkui';

import { Main } from './main/Main';
const MAIN_VIEW_ID = 'main-view';

export function App() {
  return (
    <SplitLayout>
      <SplitCol stretchedOnMobile autoSpaced>
        <Epic activeStory={MAIN_VIEW_ID}>
          <Main id={MAIN_VIEW_ID} />
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
}
