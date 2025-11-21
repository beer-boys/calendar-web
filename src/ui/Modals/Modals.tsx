import { ModalPage, ModalRoot } from '@vkontakte/vkui';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, MODALS } from '@/modules/modal/modal.reducer';
import { getActitveModal } from '@/modules/modal/modal.selectors';
import { CreateItemModal } from '@/ui/Modals/CreateItemModal/CreateItemModal';

export const Modals = memo(function Modals() {
  const activeModal = useSelector(getActitveModal);

  const dispatch = useDispatch();
  const close = () => dispatch(closeModal());

  return (
    <ModalRoot activeModal={activeModal}>
      <ModalPage id={MODALS.createMeet} onClose={close}>
        <CreateItemModal />
      </ModalPage>
    </ModalRoot>
  );
});
