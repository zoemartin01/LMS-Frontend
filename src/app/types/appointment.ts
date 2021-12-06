import { RoomTimespan } from "./room-timespan";
import { AppointmentId } from "./aliases/appointment-id";
import { SeriesId } from "./aliases/series-id";
import { UserId } from "./aliases/user-id";
import { ConfirmationStatus } from "./enums/confirmation-status";

export interface Appointment {
  id: AppointmentId,
  userId: UserId,
  roomTimespan: RoomTimespan,
  seriesId: SeriesId,
  confirmationStatus: ConfirmationStatus,
}
