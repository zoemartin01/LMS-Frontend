import { Component, OnInit } from '@angular/core';
import { RecordingId } from 'src/app/types/aliases/recording-id';
import { Recording } from 'src/app/types/recording';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class LivecamOverviewComponent implements OnInit {
  public recordings: Recording[] = [];

  constructor() { }

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
