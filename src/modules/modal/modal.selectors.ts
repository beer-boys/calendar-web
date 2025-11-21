import type { RootState } from '@/modules/store';

const getModalState = (state: RootState) => state.modal;

export const getActitveModal = (state: RootState) => getModalState(state).activeModal;
