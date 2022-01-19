import * as moment from "moment";

import { TimespanId } from "./aliases/timespan-id";
import { Room } from "./room";
import { RoomTimespanType } from "./enums/timespan-type";

export interface RoomTimespan {
  id: TimespanId,
  room: Room,
  start: moment.Moment|null,
  end: moment.Moment|null,
  type: RoomTimespanType,
}
