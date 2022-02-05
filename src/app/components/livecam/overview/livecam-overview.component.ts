import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
const JSMpeg: any = require('@cycjimmy/jsmpeg-player');

import { LivecamDeleteComponent } from '../delete/livecam-delete.component';
import { LivecamScheduleComponent } from '../schedule/livecam-schedule.component';

import { LivecamService } from '../../../services/livecam.service';
import { UserService } from 'src/app/services/user.service';

import { Recording } from 'src/app/types/recording';
import { RecordingId } from 'src/app/types/aliases/recording-id';
import { PagedList } from 'src/app/types/paged-list';
import { PagedResponse } from 'src/app/types/paged-response';

@Component({
  selector: 'app-livecam-overview',
  templateUrl: './livecam-overview.component.html',
  styleUrls: ['./livecam-overview.component.scss'],
})

/**
 * Component for the overview of the livecam
 *
 *
 */
export class LivecamOverviewComponent implements OnInit, AfterViewInit {
  public doneRecordings: PagedList<Recording> = new PagedList<Recording>();
  public scheduledRecordings: PagedList<Recording> = new PagedList<Recording>();
  public moment = moment;

  @ViewChild('camera') streaming_canvas: ElementRef<HTMLCanvasElement> =
    {} as ElementRef;

  /**
   * Constructor
   * @constructor
   * @param {LivecamService} livecamService service providing livecam functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public livecamService: LivecamService,
    public userService: UserService,
    private modalService: NgbModal
  ) {}

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getFinishedRecordings(this.doneRecordings.page);
    this.getScheduledRecordings(this.scheduledRecordings.page);
  }

  ngAfterViewInit(): void {
    new JSMpeg.Player(this.livecamService.getLiveStreamFeedPath(), {
      canvas: this.streaming_canvas.nativeElement,
    });
  }

  /**
   * Gets recording data of all recordings
   */
  public async getFinishedRecordings(page: number): Promise<void> {
    const pageSize = this.doneRecordings.pageSize;
    const offset = (page - 1) * pageSize;

    this.livecamService.getFinishedRecordings(pageSize, offset).subscribe({
      next: (res) => {
        this.doneRecordings.parse(
          res,
          page,
          (recording: Recording) => {
            recording.start = moment(recording.start);
            recording.end = moment(recording.end);
            return recording;
          }
        )
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  /**
   * Gets recording data of all scheduled recordings
   */
  public async getScheduledRecordings(page: number): Promise<void> {
    const pageSize = this.scheduledRecordings.pageSize;
    const offset = (page - 1) * pageSize;

    this.livecamService.getAllScheduledRecordings(pageSize, offset).subscribe({
      next: (res: PagedResponse<Recording>) => {
        this.scheduledRecordings.parse(
          res,
          page,
          (recording: Recording) => {
            recording.start = moment(recording.start);
            recording.end = moment(recording.end);
            return recording;
          }
        );
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  /**
   * Gets live stream feed
   */
  public async getLiveStreamFeed(): Promise<void> {}

  /**
   * Downloads a recording
   *
   * @param {RecordingId} recordingId id of recording
   */
  public async downloadRecording(recordingId: RecordingId): Promise<void> {
    this.livecamService.getRecordingData(recordingId).subscribe({
      next: (recording: Recording) => {
        recording.start = moment(recording.start);

        this.livecamService
          .downloadRecording(recording.id)
          .subscribe((stream) => {
            const blob = new Blob([stream], { type: 'application/mp4' });

            const data = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = data;
            link.download = `Recording-${recording.start?.format(
              'YYYY-MM-DD_HH-mm'
            )}.mp4`;

            link.dispatchEvent(
              new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
              })
            );

            setTimeout(function () {
              window.URL.revokeObjectURL(data);
              link.remove();
            }, 100);
          });
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  /**
   * Opens recording deletion dialog
   *
   * @param {RecordingId} recordingId id of recording
   */
  public openRecordingDeletionDialog(recordingId: RecordingId): void {
    const modal = this.modalService.open(LivecamDeleteComponent);
    modal.componentInstance.recording.id = recordingId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getFinishedRecordings(this.doneRecordings.page);
        this.getScheduledRecordings(this.scheduledRecordings.page);
      }
    });
  }

  /**
   * Opens recording schedule form
   */
  public openScheduleRecordingForm(): void {
    const modal = this.modalService.open(LivecamScheduleComponent);
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getFinishedRecordings(this.doneRecordings.page);
        this.getScheduledRecordings(this.scheduledRecordings.page);
      }
    });
  }

  public readableBytes = (bytes: number, decimals: number = 2) =>
    LivecamOverviewComponent.readableBytes(bytes, decimals);

  public static readableBytes(bytes: number, decimals: number = 2): string {
    if (bytes == 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
    );
  }
}
