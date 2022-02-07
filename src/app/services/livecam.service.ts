import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

import { Recording } from '../types/recording';
import { RecordingId } from '../types/aliases/recording-id';
import { VideoResolution } from '../types/enums/video-resolution';
import { WINDOW } from '../providers/window.providers';
import { PagedResponse } from '../types/paged-response';

@Injectable({
  providedIn: 'root',
})

/**
 * Service for the management of the livecam
 *
 * @typedef {Service} LivecamService
 * @class
 */
export class LivecamService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WINDOW) private window: Window
  ) {}

  /**
   * Schedules a recording with the submitted parameters
   *
   * @param {moment} start start of recording
   * @param {moment} end end of recording
   * @param {VideoResolution} resolution video resolution of recording
   * @param {number} bitrate bitrate of recording
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
    const apiURL =
      `${environment.baseUrl}${environment.apiRoutes.livecam.deleteRecording}`.replace(
        ':id',
        recordingId!
      );
    return <Observable<{}>>this.httpClient.delete(apiURL);
  }

  /**
   * Downloads the recording with the submitted id
   *
   * @param {RecordingId} recordingId id of the recording to download
   */
  public downloadRecording(recordingId: RecordingId): Observable<ArrayBuffer> {
    const apiURL =
      `${environment.baseUrl}${environment.apiRoutes.livecam.downloadRecording}`.replace(
        ':id',
        recordingId!
      );
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
    const apiURL =
      `${environment.baseUrl}${environment.apiRoutes.livecam.getSingleRecording}`.replace(
        ':id',
        recordingId!
      );
    return <Observable<Recording>>this.httpClient.get(apiURL);
  }

  /**
   * Gets the data for all recordings
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getFinishedRecordings(limit: number = 0, offset: number = 0): Observable<PagedResponse<Recording>> {
    const apiURL =
      `${environment.baseUrl}${environment.apiRoutes.livecam.getAllRecordings}` +
      `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Recording>>(apiURL);
  }

  /**
   * Gets the data for all scheduled recordings
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getAllScheduledRecordings(limit: number = 0, offset: number = 0): Observable<PagedResponse<Recording>> {
    const apiURL =
      `${environment.baseUrl}${environment.apiRoutes.livecam.getAllScheduled}` +
      `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Recording>>(apiURL);
  }

  /**
   * Gets the live stream feed
   */
  public getLiveStreamFeedPath(): string {
    const isSSL = this.window.location.protocol === 'https:';
    const protocol = isSSL ? 'wss:' : 'ws:';
    const host = environment.production
      ? this.window.location.hostname + environment.baseUrl
      : environment.baseUrl.replace(/http(s)?:\/\//g, '');
    const token = localStorage.getItem('accessToken');
    return `${protocol}//${host}${environment.apiRoutes.livecam.streamFeed}?token=${token}`;
  }
}
