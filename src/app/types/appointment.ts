import { RoomTimespan } from "./room-timespan";
import { SeriesId } from "./aliases/series-id";
import { UserId } from "./aliases/user-id";
import { ConfirmationStatus } from "./enums/confirmation-status";

export interface Appointment extends RoomTimespan {
  userId: UserId,
  seriesId: SeriesId,
  confirmationStatus: ConfirmationStatus,
}
