import { RoomId } from "./aliases/room-id";
import { RoomTimespan } from "./room-timespan";

export interface Room {
  id: RoomId,
  name: string,
  description: string,
  maxConcurrentBookings: number,
  automaticRequestAcceptance: boolean|null,
  availableTimeslots: RoomTimespan[],
  unavailableTimeslots: RoomTimespan[],
}
