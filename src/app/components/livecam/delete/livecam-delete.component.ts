import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { LivecamOverviewComponent } from '../overview/livecam-overview.component';

import { LivecamService } from 'src/app/services/livecam.service';

import { Recording } from 'src/app/types/recording';
import { VideoResolution } from '../../../types/enums/video-resolution';
import { UserRole } from 'src/app/types/enums/user-role';
import { NotificationChannel } from 'src/app/types/enums/notification-channel';

@Component({
  selector: 'app-livecam-delete',
  templateUrl: './livecam-delete.component.html',
  styleUrls: ['./livecam-delete.component.scss'],
})

/**
 * Component for the deletion of a livecam recording
 *
 *
 */
export class LivecamDeleteComponent implements OnInit {
  public recording: Recording = {
    id: null,
    user: {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    },
    start: null,
    end: null,
    resolution: VideoResolution.unknown,
    bitrate: 0,
    size: 0,
  };

  public recordingDeleteForm: FormGroup = new FormGroup({
    user_name: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    resolution: new FormControl(''),
    bitrate: new FormControl(''),
    size: new FormControl(''),
  });

  public moment = moment;

  /**
   * Constructor
   * @constructor
   * @param {LivecamService} livecamService service providing livecam functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbActiveModal} activeModal service providing modal functionalities
   */
  constructor(
    public livecamService: LivecamService, public activeModal: NgbActiveModal
  ) {
    this.recordingDeleteForm.disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getRecordingData();
  }

  public async getRecordingData(): Promise<void> {
    this.livecamService.getRecordingData(this.recording.id).subscribe({
      next: (res) => {
        this.recording = res;

        this.recording.start = moment(this.recording.start);
        this.recording.end = moment(this.recording.end);

        this.recordingDeleteForm.controls['user_name'].setValue(`${this.recording.user.firstName} ${this.recording.user.lastName}`);
        this.recordingDeleteForm.controls['start'].setValue(this.recording.start.format('YYYY-MM-DDTHH:mm'));
        this.recordingDeleteForm.controls['end'].setValue(this.recording.end.format('YYYY-MM-DDTHH:mm'));
        this.recordingDeleteForm.controls['resolution'].setValue(this.recording.resolution);
        this.recordingDeleteForm.controls['bitrate'].setValue(LivecamOverviewComponent.readableBytes(this.recording.bitrate!));
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  /**
   * Deletes recording
   */
  public async deleteRecording(): Promise<void> {
    this.livecamService.deleteRecording(this.recording.id).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
