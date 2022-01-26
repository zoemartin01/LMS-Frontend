import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { VideoResolution } from 'src/app/types/enums/video-resolution';

import { LivecamService } from '../../../services/livecam.service';

@Component({
  selector: 'app-livecam-schedule',
  templateUrl: './livecam-schedule.component.html',
  styleUrls: ['./livecam-schedule.component.scss']
})

/**
 * Component for the scheduling of a livecam recording
 *
 *
 */
export class LivecamScheduleComponent {
  public recordingScheduleForm: FormGroup = new FormGroup({
    start: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$')
    ]),
    end: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$')
    ]),
    resolution: new FormControl(VideoResolution.V1080),
    bitrate: new FormControl('', [
      Validators.required,
    ]),
    bitrate_unit: new FormControl('mbps', [
      Validators.required,
    ]),
  });

  public moment = moment;
  public endMin = moment();

  /**
   * Constructor
   * @constructor
   * @param {LivecamService} livecamService service providing livecam functionalities
   */
  constructor(public livecamService: LivecamService, public activeModal: NgbActiveModal) {
  }

  /**
   * Schedules a livecam recording with the passed parameters
   */
  public async scheduleRecording(): Promise<void> {
    if (this.recordingScheduleForm.valid) {
      const start = moment(this.recordingScheduleForm.value.start, 'YYYY-MM-DDTHH:mm');
      const end = moment(this.recordingScheduleForm.value.end, 'YYYY-MM-DDTHH:mm');
      const resolution = this.recordingScheduleForm.value.resolution;
      const bitrate_unit = this.recordingScheduleForm.value.bitrate_unit;
      let bitrate = this.recordingScheduleForm.value.bitrate;
  
      if (bitrate_unit === 'kbps') {
        bitrate = bitrate * 1000;
      } else if (bitrate_unit === 'mbps') {
        bitrate = bitrate * 1000 * 1000;
      }
  
      this.livecamService.scheduleRecording(start, end, resolution, bitrate).subscribe({
        next: () => {
          this.activeModal.close('created');
        }
      });
    }
  }

  public async updateEndField() : Promise<void> {
    this.endMin = moment(this.recordingScheduleForm.value.start, 'YYYY-MM-DDTHH:mm');
  }
}
