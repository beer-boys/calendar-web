import { ModalPage, ModalRoot } from '@vkontakte/vkui';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, MODALS } from '@/modules/modal/modal.reducer';
import { getActitveModal } from '@/modules/modal/modal.selectors';
import { CreateHabitModal } from '@/ui/Modals/CreateHabitModal/CreateHabitModal';
import { CreateItemModal } from '@/ui/Modals/CreateMeetModal/CreateMeetModal';
import { LoginModal } from '@/ui/Modals/LoginModal/LoginModal';
import { RegistationModal } from '@/ui/Modals/RegistationModal/RegistationModal';

export const Modals = memo(function Modals() {
  const activeModal = useSelector(getActitveModal);

  const dispatch = useDispatch();
  const close = () => dispatch(closeModal());

  return (
    <ModalRoot activeModal={activeModal ? MODALS[activeModal] : activeModal}>
      <ModalPage id={MODALS.createMeet} onClose={close}>
        <CreateItemModal />
      </ModalPage>
      <ModalPage id={MODALS.createHabit} onClose={close}>
        <CreateHabitModal />
      </ModalPage>
      <ModalPage id={MODALS.login} onClose={close}>
        <LoginModal />
      </ModalPage>
      <ModalPage id={MODALS.registration} onClose={close}>
        <RegistationModal />
      </ModalPage>
    </ModalRoot>
  );
});
