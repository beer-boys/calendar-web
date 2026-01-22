import { createAPICall } from '@/api/api';

type RoomStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';

interface Location {
  address: string;
  building: string;
  floor: number;
  wing: string;
  roomNumber: string;
  city: string;
  timeZoneId: string;
}

interface Room {
  id: string;
  name: string;
  capacity: number;
  location: Location;
  status: RoomStatus;
  features: string[];
  attributes: Record<string, string>;
}

type GetRoomsResponse = Room[];

interface GetRoomsRequest {
  minCapacity?: string;
  locationQuery?: string;
  floor?: number;
  building?: string;
  status?: string;
  requiredFeatures?: string[];
}

const GET_ROOMS_URL = '/meeting-rooms';
export const getRoomsAPICall = createAPICall<GetRoomsResponse, GetRoomsRequest>('GET', GET_ROOMS_URL);

interface BookingRequest {
  roomId: string;
  timeSlot: {
    start: string;
    end: string;
  };
  purpose: string;
}

type BookingResponse = unknown;

const BOOK_ROOM_URL = '/meeting-room-bookings';
export const bookRoomAPICall = createAPICall<BookingResponse, BookingRequest>('POST', BOOK_ROOM_URL);
