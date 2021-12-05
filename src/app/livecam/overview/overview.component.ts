import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public recordings: any[] = [];

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
  public async downloadRecording(recordingId: any): Promise<void> {
  }

  /**
   * Open recording deletion dialog
   * 
   * @param recordingId id of recording
   */
  public deleteRecording(recordingId: any): void {
  }

  /**
   * Open recording schedule dialog
   */
  public scheduleRecording(): void {
  }
}
