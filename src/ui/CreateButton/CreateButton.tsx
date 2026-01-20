import { ActionSheet, ActionSheetDefaultIosCloseItem, ActionSheetItem, Button } from '@vkontakte/vkui';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MODALS, openModal } from '@/modules/modal/modal.reducer';
import { getCSSPxVariableAsInt } from '@/utils/getCSSVariable';

import styles from './CreateButton.module.css';

export function CreateButton() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const onCreateMeetClick = () => {
    dispatch(openModal({ modalId: MODALS.createMeet }));
    setOpen(false);
  };

  const onCreateHabitClick = () => {
    dispatch(openModal({ modalId: MODALS.createHabit }));
    setOpen(false);
  };

  return (
    <>
      {open && (
        <ActionSheet
          iosCloseItem={<ActionSheetDefaultIosCloseItem>Отмена</ActionSheetDefaultIosCloseItem>}
          className={styles.dropdown}
          placement="bottom-start"
          popupOffsetDistance={getCSSPxVariableAsInt('--vkui--spacing_size_xs') || 0}
          toggleRef={buttonRef}
          onClose={handleClose}
        >
          <ActionSheetItem onClick={onCreateMeetClick}>Встречу</ActionSheetItem>
          <ActionSheetItem onClick={onCreateHabitClick}>Привычку</ActionSheetItem>
        </ActionSheet>
      )}
      <Button getRootRef={buttonRef} onClick={handleOpen} className={styles.createBttn} size="l" data-qa-id="event-create-bttn">
        + Создать
      </Button>
    </>
  );
}
