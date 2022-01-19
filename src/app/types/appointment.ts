import { RoomTimespan } from "./room-timespan";
import { SeriesId } from "./aliases/series-id";
import { User } from "./user";
import { ConfirmationStatus } from "./enums/confirmation-status";

export interface Appointment extends RoomTimespan {
  user: User,
  seriesId: SeriesId,
  confirmationStatus: ConfirmationStatus,
}
