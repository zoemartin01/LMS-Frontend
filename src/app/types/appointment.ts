import { RoomTimespan } from "./room-timespan";
import { TimespanId } from "./aliases/timespan-id";
import { SeriesId } from "./aliases/series-id";
import { UserId } from "./aliases/user-id";
import { ConfirmationStatus } from "./enums/confirmation-status";

export interface Appointment extends RoomTimespan {
  id: TimespanId,
  userId: UserId,
  seriesId: SeriesId,
  confirmationStatus: ConfirmationStatus,
}
