import * as moment from "moment";

import { RoomId } from "./aliases/room-id";
import { RoomTimespanType } from "./enums/timespan-type";

export interface RoomTimespan {
  roomId: RoomId,
  start: moment.Moment|null,
  end: moment.Moment|null,
  type: RoomTimespanType,
}
