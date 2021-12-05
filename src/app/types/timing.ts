import {TimingStatus} from "./enums/timing-status";

export interface Timing {
  start: number,
  end: number,
  status: TimingStatus;
}
