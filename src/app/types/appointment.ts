import { RoomTimespan } from "./room-timespan";
import { SeriesId } from "./aliases/series-id";
import { User } from "./user";
import { ConfirmationStatus } from "./enums/confirmation-status";
import { TimeslotRecurrence } from "./enums/timeslot-recurrence";

export interface Appointment extends RoomTimespan {
  user: User,
  seriesId: SeriesId,
  confirmationStatus: ConfirmationStatus,
  timeSlotRecurrence: TimeslotRecurrence,
}
