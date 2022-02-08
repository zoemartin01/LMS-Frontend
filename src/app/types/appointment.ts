import { RoomTimespan } from "./room-timespan";
import { User } from "./user";
import { ConfirmationStatus } from "./enums/confirmation-status";

export interface Appointment extends RoomTimespan {
  user: User,
  confirmationStatus: ConfirmationStatus,
}
