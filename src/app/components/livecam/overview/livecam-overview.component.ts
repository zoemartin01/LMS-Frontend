import { Component, OnInit } from '@angular/core';

import {LivecamService} from "../../../services/livecam.service";

import { Recording } from 'src/app/types/recording';
import { RecordingId } from 'src/app/types/aliases/recording-id';

@Component({
  selector: 'app-livecam-overview',
  templateUrl: './livecam-overview.component.html',
  styleUrls: ['./livecam-overview.component.scss']
})

/**
 * Component for the overview of the livecam
 * @typedef {Component} LivecamOverviewComponent
 * @class
 */
export class LivecamOverviewComponent implements OnInit {
  public recordings: Recording[] = [];

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
   * Gets recording data of all recordings
   */
  public async getRecordings(): Promise<void> {
  }

  /**
   * Gets recording data of all scheduled recordings
   */
  public async getScheduledRecordings(): Promise<void> {
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
}
