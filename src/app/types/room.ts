import { RoomId } from "./aliases/room-id";

export interface Room {
  id: RoomId,
  name: string,
  description: string,
  maxConBookings: number,
}
