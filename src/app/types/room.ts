import { RoomId } from "./aliases/room-id";
import { RoomTimespan } from "./room-timespan";

export interface Room {
  id: RoomId,
  name: string,
  description: string,
  maxConcurrentBookings: number,
  autoAcceptBookings: boolean|null,
}
