import type { RootState } from '@/modules/store';

const getMeetState = (state: RootState) => state.meet;

export const getMeets = (state: RootState) => getMeetState(state).meets;
