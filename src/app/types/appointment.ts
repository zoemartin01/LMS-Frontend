import { AppointmentId } from "./aliases/appointment-id";
import { SeriesId } from "./aliases/series-id";

export interface Appointment {
  id: AppointmentId,
  sid: SeriesId
}
