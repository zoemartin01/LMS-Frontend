import { RecordingId } from "./aliases/recording-id";
import { UserId } from "./aliases/user-id";
import { VideoResolution } from "./enums/video-resolution";

export interface Recording {
    id: RecordingId,
    userId: UserId,
    start: moment.Moment|null,
    end: moment.Moment|null,
    resolution: VideoResolution,
    bitrate: number,
    size: number,
}
