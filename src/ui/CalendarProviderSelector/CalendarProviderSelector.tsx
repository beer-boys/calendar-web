import { Icon20CheckCircleOff, Icon20CheckCircleOn, Icon28CheckCircleOff, Icon28CheckCircleOn } from '@vkontakte/icons';
import { ActionSheet, ActionSheetDefaultIosCloseItem, ActionSheetItem, AdaptiveIconRenderer, Button } from '@vkontakte/vkui';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkGoogleLink, linkGoogle } from '@/modules/calendarProvider/calendarProvider.reducer';
import { getMappedProvidersConnection } from '@/modules/calendarProvider/calendarProvider.selectors';
import type { CalendarProviderName } from '@/modules/calendarProvider/calendarProvider.types';
import { getCSSPxVariableAsInt } from '@/utils/getCSSVariable';

import styles from './CalendarProviderSelector.module.css';

export function CalendarProviderSelector() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // Закэшировать
    // @ts-expect-error Редакс сам не хочет дружить со своими типами
    dispatch(checkGoogleLink());
  }, []);

  const providersConnections = useSelector(getMappedProvidersConnection);

  const onProviderClick = (provider: CalendarProviderName, connected: boolean) => {
    if (connected) {
      return;
    }

    if (provider === 'GOOGLE') {
      // @ts-expect-error Редакс сам не хочет дружить со своими типами
      dispatch(linkGoogle());
    }
  };

  return (
    <>
      {open && (
        <ActionSheet
          iosCloseItem={<ActionSheetDefaultIosCloseItem>Отмена</ActionSheetDefaultIosCloseItem>}
          className={styles.dropdown}
          placement="top-start"
          popupOffsetDistance={getCSSPxVariableAsInt('--vkui--spacing_size_l') || 0}
          toggleRef={buttonRef}
          onClose={handleClose}
        >
          {providersConnections.map(({ id, name, connected }) => (
            <ActionSheetItem
              key={id}
              onClick={() => onProviderClick(id, connected)}
              after={
                connected ? (
                  <AdaptiveIconRenderer IconCompact={Icon20CheckCircleOn} IconRegular={Icon28CheckCircleOn} />
                ) : (
                  <AdaptiveIconRenderer IconCompact={Icon20CheckCircleOff} IconRegular={Icon28CheckCircleOff} />
                )
              }
            >
              {name}
            </ActionSheetItem>
          ))}
        </ActionSheet>
      )}
      <Button className={styles.selectBttn} getRootRef={buttonRef} onClick={handleOpen} mode="outline" size="l">
        Список провайдеров
      </Button>
    </>
  );
}
