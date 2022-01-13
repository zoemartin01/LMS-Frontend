import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

import { Recording } from '../types/recording';
import { RecordingId } from '../types/aliases/recording-id';

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
  public scheduleRecording(recording: Recording): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.createSchedule}`;
    const requestBody = { recording };

    return this.httpClient.post(apiURL, requestBody);
  }

  /**
   * Deletes the recording with the submitted id
   *
   * @param {RecordingId} recordingId id of the recording to delete
   */
  public deleteRecording(recordingId: RecordingId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.deleteRecording}/${recordingId}`;
    return this.httpClient.delete(apiURL);
  }

  /**
   * Downloads the recording with the submitted id
   *
   * @param {RecordingId} recordingId id of the recording to download
   */
  public downloadRecording(recordingId: RecordingId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.downloadRecording}`;
    if (recordingId === null) throw new Error('recordingId cannot be null');

    apiURL.replace(':id', recordingId);
    return this.httpClient.get(apiURL);
  }

  /**
   * Gets the recording data for the recording with the submitted id
   *
   * @param {RecordingId} recordingId id of the recording to get data for
   */
  public getRecordingData(recordingId: RecordingId): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.getSingleRecording}/${recordingId}`;
    return this.httpClient.get(apiURL);
  }

  /**
   * Gets the data for all recordings
   */
  public getAllRecordings(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.getAllRecordings}`;
    return this.httpClient.get(apiURL);
  }

  /**
   * Gets the data for all scheduled recordings
   */
  public getAllScheduledRecordings(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.getAllScheduled}`;
    return this.httpClient.get(apiURL);
  }

  /**
   * Gets the live stream feed
   */
  public getLiveStreamFeed(): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.livecam.streamFeed}`;
    return this.httpClient.get(apiURL);
  }
}
