import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/modules/store';

const getRoomState = (state: RootState) => state.room;

export const getCurrentActiveRooms = (state: RootState) => getRoomState(state).rooms;

export const getLoadingState = (state: RootState) => getRoomState(state).isLoading;

export const getActiveRoomsForInput = createSelector(getCurrentActiveRooms, (rooms) => {
  const activeRooms = rooms.filter(({ status }) => status === 'ACTIVE');

  if (activeRooms.length === 0) {
    return [{ value: '', label: 'Нет свободных переговорных' }];
  }

  return activeRooms.map(({ id, name, capacity }) => ({
    value: id,
    label: `${name} (${capacity} чел.)`,
  }));
});

export const getRoomBookingDescById = createSelector([getCurrentActiveRooms, (_, id: string) => id], (rooms, roomId) => {
  const room = rooms.find(({ id }) => id === roomId);

  if (!room) {
    return 'Нет переговорной';
  }

  return `${room.name} (${room.capacity} чел.)`;
});
