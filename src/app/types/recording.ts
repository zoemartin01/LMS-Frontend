import { RecordingId } from "./aliases/recording-id";
import { UserId } from "./aliases/user-id";
import { VideoResolution } from "./enums/video-resolution";
import { User } from "./user";

export interface Recording {
    id: RecordingId,
    user: User|null,
    start: moment.Moment|null,
    end: moment.Moment|null,
    resolution: VideoResolution,
    bitrate: number|null,
    size: number|null,
}
