import type { RootState } from '@/modules/store';

const getContactState = (state: RootState) => state.contact;

export const getContactsList = (state: RootState) => Object.values(getContactState(state).contacts);
