import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const MODALS = {
  createItem: 'createItem',
} as const;

export type ModalId = keyof typeof MODALS;

interface ModalState {
  activeModal: ModalId | null;
}

const initialState: ModalState = {
  activeModal: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ modalId: ModalId }>) => {
      const { modalId } = action.payload;
      state.activeModal = modalId;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const { reducer: modalReducer } = modalSlice;
