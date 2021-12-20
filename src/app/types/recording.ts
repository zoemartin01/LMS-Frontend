import { RecordingId } from "./aliases/recording-id";
import { VideoResolution } from "./enums/video-resolution";

export interface Recording {
    id: RecordingId,
    start: moment.Moment|null,
    end: moment.Moment|null,
    resolution: VideoResolution,
    bitrate: number,
    size: number,
}
