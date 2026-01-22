export interface RoomFeature {
  id: string;
  label: string;
}

export type RoomStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';

export interface RoomLocation {
  address: string;
  building: string;
  floor: number;
  wing: string;
  roomNumber: string;
  city: string;
  timeZoneId: string;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  location: RoomLocation;
  status: RoomStatus;
  features: string[];
  attributes: Record<string, string>;
}
