import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import {LivecamService} from '../../../services/livecam.service';

import {VideoResolution} from 'src/app/types/enums/video-resolution';
import {UtilityService} from "../../../services/utility.service";

@Component({
  selector: 'app-livecam-schedule',
  templateUrl: './livecam-schedule.component.html',
  styleUrls: ['./livecam-schedule.component.scss']
})

/**
 * Component for the scheduling of a livecam recording
 */
export class LivecamScheduleComponent {
  public recordingScheduleForm: FormGroup = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    resolution: new FormControl(VideoResolution.V1080),
    bitrate: new FormControl('', Validators.required),
    bitrate_unit: new FormControl('kbps', Validators.required),
  });
  public moment = moment;
  public endMin = moment();
  public errorMessage: string = '';

  /**
   * Constructor
   * @constructor
   * @param {LivecamService} livecamService service providing livecam functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public livecamService: LivecamService,
    public utilityService: UtilityService,
    public activeModal: NgbActiveModal
  ) {
  }

  /**
   * Schedules a livecam recording with the passed parameters
   */
  public async scheduleRecording(): Promise<void> {
    this.errorMessage = '';

    if (!this.recordingScheduleForm.valid) {
      this.errorMessage = 'You need to fill in all required fields!';
      return;
    }

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
        this.activeModal.close('scheduled');
      },
      error: error => {
        console.error(error);
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }

  /**
   * Helper method that sets the minimum of end moment to be the start moment
   */
  public async updateEndField(): Promise<void> {
    this.endMin = moment(this.recordingScheduleForm.value.start, 'YYYY-MM-DDTHH:mm');
  }

  /**
   * Helper method that turns all non-null enum values into strings
   */
  public resolutions(): string[] {
    const keys = Object.keys(VideoResolution).filter(x => !(parseInt(x) >= 0)).filter(x => x != '' && x != 'unknown');
    return keys.map(x => Object.keys(VideoResolution)[Object.values(VideoResolution).indexOf(x)]);
  }
}
