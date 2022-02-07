import { RoomId } from "./aliases/room-id";

export interface Room {
  id: RoomId,
  name: string,
  description: string,
  maxConcurrentBookings: number,
  autoAcceptBookings: boolean|null,
}
