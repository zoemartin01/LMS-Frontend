import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { RecordingId } from '../types/aliases/recording-id';
import { VideoResolution } from '../types/enums/video-resolution';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivecamService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Schedules a recording with with the submitted parameters
   *
   * @param {Date} startTime start time of the recording
   * @param {Date} endTime end time of the recording
   * @param {VideoResolution} resolution resolution of the recording
   * @param {number} bitrate bitrate of the recording in kbps
   */
  public scheduleRecording(startTime: Date, endTime: Date, resolution: VideoResolution, bitrate: number): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.scheduleRecording}`;
    const requestBody = {
      startTime,
      endTime,
      resolution,
      bitrate,
    };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Deletes the recording with the submitted id
   *
   * @param {RecordingId} recordingId id of the recording to delete
   */
  public deleteRecording(recordingId: RecordingId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.deleteRecording}/${recordingId}`;
    return this.httpClient.delete(apiURL);
  }

  /**
   * Downloads the recording with the submitted id
   *
   * @param {RecordingId} recordingId id of the recording to download
   */
  public downloadRecording(recordingId: RecordingId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.downloadRecording}`;
    if (recordingId === null) throw new Error('recordingId cannot be null');

    apiURL.replace(':id', recordingId);
    return this.httpClient.get(apiURL);
  }

  /**
   * Get the recording data for the recording with the submitted id
   *
   * @param {RecordingId} recordingId id of the recording to get data for
   */
  public getRecordingData(recordingId: RecordingId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.getRecording}/${recordingId}`;
    return this.httpClient.get(apiURL);
  }

  /**
   * Get the data for all recordings
   */
  public getAllRecordings(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.recordings}`;
    return this.httpClient.get(apiURL);
  }

}
