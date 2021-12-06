import { Component, OnInit } from '@angular/core';

import {LivecamService} from "../../../services/livecam.service";

import { Recording } from 'src/app/types/recording';
import { RecordingId } from 'src/app/types/aliases/recording-id';

@Component({
  selector: 'app-livecam-overview',
  templateUrl: './livecam-overview.component.html',
  styleUrls: ['./livecam-overview.component.scss']
})
export class LivecamOverviewComponent implements OnInit {
  public recordings: Recording[] = [];

  constructor(public livecamService: LivecamService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Gets recording data
   */
  public async getRecordings(): Promise<void> {
  }

  /**
   * Gets live stream feed
   */
  public async getLiveStreamFeed(): Promise<void> {
  }

  /**
   * Download a recording
   *
   * @param recordingId id of recording
   */
  public async downloadRecording(recordingId: RecordingId): Promise<void> {
  }

  /**
   * Open recording deletion dialog
   *
   * @param recordingId id of recording
   */
  public deleteRecording(recordingId: RecordingId): void {
  }

  /**
   * Open recording schedule dialog
   */
  public scheduleRecording(): void {
  }
}
