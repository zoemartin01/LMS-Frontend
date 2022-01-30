import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

import { Recording } from '../types/recording';
import { RecordingId } from '../types/aliases/recording-id';
import { VideoResolution } from '../types/enums/video-resolution';

@Injectable({
  providedIn: 'root'
})

/**
 * Service for the management of the livecam
 *
 * @typedef {Service} LivecamService
 * @class
 */
export class LivecamService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Schedules a recording with the submitted parameters
   *
   * @param {Recording} recording data of the recording to schedule
   */
  public scheduleRecording(start: moment.Moment, end: moment.Moment, resolution: VideoResolution, bitrate: number): Observable<Recording> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.createSchedule}`;
    const requestBody = {
      start: start.toISOString(),
      end: end.toISOString(),
      resolution: resolution,
      bitrate: bitrate,
    };

    return <Observable<Recording>>this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Deletes the recording with the submitted id
   *
   * @param {RecordingId} recordingId id of the recording to delete
   */
  public deleteRecording(recordingId: RecordingId): Observable<{}> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.deleteRecording}`
      .replace(':id', recordingId!);
    return <Observable<{}>>this.httpClient.delete(apiURL);
  }

  /**
   * Downloads the recording with the submitted id
   *
   * @param {RecordingId} recordingId id of the recording to download
   */
  public downloadRecording(recordingId: RecordingId): Observable<ArrayBuffer> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.downloadRecording}`
      .replace(':id', recordingId!);
    if (recordingId === null) throw new Error('recordingId cannot be null');

    apiURL.replace(':id', recordingId);
    return this.httpClient.get(apiURL, { responseType: 'arraybuffer' });
  }

  /**
   * Gets the recording data for the recording with the submitted id
   *
   * @param {RecordingId} recordingId id of the recording to get data for
   */
  public getRecordingData(recordingId: RecordingId): Observable<Recording> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.getSingleRecording}`
      .replace(':id', recordingId!);
    return <Observable<Recording>>this.httpClient.get(apiURL);
  }

  /**
   * Gets the data for all recordings
   */
  public getAllRecordings(): Observable<Recording[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.getAllRecordings}`;
    return <Observable<Recording[]>>this.httpClient.get(apiURL);
  }

  /**
   * Gets the data for all scheduled recordings
   */
  public getAllScheduledRecordings(): Observable<Recording[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.getAllScheduled}`;
    return <Observable<Recording[]>>this.httpClient.get(apiURL);
  }

  /**
   * Gets the live stream feed
   */
  public getLiveStreamFeed(): Observable<{url: string}> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.streamFeed}`;
    return <Observable<{url: string}>>this.httpClient.get(apiURL);
  }
}
