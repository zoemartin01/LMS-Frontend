import { AppointmentId } from "./aliases/appointment-id";
import { SeriesId } from "./aliases/series-id";
import {RoomId} from "./aliases/room-id";
import {UserId} from "./aliases/user-id";
import {Timing} from "./timing";

export interface Appointment {
  appointmentId: AppointmentId,
  seriesId: SeriesId,
  roomId: RoomId,
  userId: UserId,
  time: Timing
}
