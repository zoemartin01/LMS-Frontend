import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
export class LivecamScheduleComponent implements OnInit {

  /**
   * Constructor
   * @param {LivecamService} livecamService service providing livecam functionalities
   */
  constructor(public livecamService: LivecamService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
  }

  /**
   * Schedules a livecam recording with the passed parameters
   *
   * @param {NgForm} scheduleForm submitted scheduling form
   */
  public async scheduleRecording(scheduleForm: NgForm): Promise<void> {
  }
}
