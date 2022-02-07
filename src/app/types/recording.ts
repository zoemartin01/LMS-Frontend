import { RecordingId } from "./aliases/recording-id";
import { User } from "./user";
import { VideoResolution } from "./enums/video-resolution";
import * as moment from "moment";

export interface Recording {
    id: RecordingId,
    user: User,
    start: moment.Moment|null,
    end: moment.Moment|null,
    resolution: VideoResolution,
    bitrate: number|null,
    size: number|null,
}
