import * as moment from "moment";

import { Room } from "./room";
import { TimespanId } from "./aliases/timespan-id";
import { RoomTimespanType } from "./enums/timespan-type";
import { SeriesId } from "./aliases/series-id";

export interface RoomTimespan {
  id: TimespanId,
  room: Room,
  start: moment.Moment|null,
  end: moment.Moment|null,
  type: RoomTimespanType,
  timeSlotRecurrence: number,
  seriesId: SeriesId,
  maxStart: moment.Moment|null,
  amount: number,
}
