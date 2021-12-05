import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecordingId } from '../types/aliases/recording-id';
import { VideoResolution } from '../types/enums/video-resolution';

@Injectable({
  providedIn: 'root'
})
export class LivecamService {

  constructor() { }

  /**
   * Schedules a recording with with the submitted parameters
   * 
   * @param {Date} startTime start time of the recording
   * @param {Date} endTime end time of the recording
   * @param {VideoResolution} resolution resolution of the recording
   * @param {number} bitrate bitrate of the recording in kbps
   */
  public scheduleRecording(startTime: Date, endTime: Date, resolution: VideoResolution, bitrate: number): Observable<any> { 
  }

  /**
   * Deletes the recording with the submitted id
   * 
   * @param {RecordingId} recordingId id of the recording to delete
   */
  public deleteRecording(recordingId: RecordingId): Observable<any> {
  }

}
