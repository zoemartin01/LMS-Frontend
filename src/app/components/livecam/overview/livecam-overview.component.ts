import { Component, OnInit } from '@angular/core';

import { LivecamService } from "../../../services/livecam.service";

import { Recording } from 'src/app/types/recording';
import { RecordingId } from 'src/app/types/aliases/recording-id';
import * as moment from 'moment';

@Component({
  selector: 'app-livecam-overview',
  templateUrl: './livecam-overview.component.html',
  styleUrls: ['./livecam-overview.component.scss']
})

/**
 * Component for the overview of the livecam
 *
 *
 */
export class LivecamOverviewComponent implements OnInit {
  public doneRecordings: Recording[] = [];
  public scheduledRecordings: Recording[] = [];
  public moment = moment;

  /**
   * Constructor
   * @constructor
   * @param {LivecamService} livecamService service providing livecam functionalities
   */
  constructor(public livecamService: LivecamService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getRecordings();
    this.getScheduledRecordings();
  }

  /**
   * Gets recording data of all recordings
   */
  public async getRecordings(): Promise<void> {
    this.livecamService.getAllRecordings().subscribe({
      next: res => {
        this.doneRecordings = res.map((recording: Recording) => {
          recording.start = moment(recording.start);
          recording.end = moment(recording.end);
          return recording;
        });
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Gets recording data of all scheduled recordings
   */
  public async getScheduledRecordings(): Promise<void> {
    this.livecamService.getAllScheduledRecordings().subscribe({
      next: res => {
        this.scheduledRecordings = res.map((recording: Recording) => {
          recording.start = moment(recording.start);
          recording.end = moment(recording.end);
          return recording;
        });
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Gets live stream feed
   */
  public async getLiveStreamFeed(): Promise<void> {
  }

  /**
   * Downloads a recording
   *
   * @param {RecordingId} recordingId id of recording
   */
  public async downloadRecording(recordingId: RecordingId): Promise<void> {
    this.livecamService.getRecordingData(recordingId).subscribe({
      next: (recording: Recording) => {
        recording.start = moment(recording.start);

        this.livecamService.downloadRecording(recording.id)
        .subscribe(stream => {
            const blob = new Blob([stream], { type: "application/mp4" });

            const data = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = data;
            link.download = `Recording-${recording.start?.format("YYYY-MM-DD_HH-mm")}.mp4`;

            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });


  }

  /**
   * Opens recording deletion dialog
   *
   * @param {RecordingId} recordingId id of recording
   */
  public openRecordingDeletionDialog(recordingId: RecordingId): void {
  }

  /**
   * Opens recording schedule form
   */
  public openScheduleRecordingForm(): void {
  }

  public readableBytes(bytes: number, decimals: number = 2): string {
    if(bytes == 0) return '0 Bytes';
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
 }
}
