import { View, type ViewProps } from '@vkontakte/vkui';

import { MainPannel } from './main-pannel/MainPannel';

const MAIN_PANNEL_ID = 'main-pannel';

type MainProps = Pick<ViewProps, 'id'>;

export function Main({ id }: MainProps) {
  return (
    <View id={id} activePanel={MAIN_PANNEL_ID}>
      <MainPannel id={MAIN_PANNEL_ID} />
    </View>
  );
}
