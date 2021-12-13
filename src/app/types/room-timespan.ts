import * as moment from "moment";

import { TimespanId } from "./aliases/timespan-id";
import { RoomId } from "./aliases/room-id";
import { RoomTimespanType } from "./enums/timespan-type";

export interface RoomTimespan {
  id: TimespanId,
  roomId: RoomId,
  start: moment.Moment|null,
  end: moment.Moment|null,
  type: RoomTimespanType,
}
