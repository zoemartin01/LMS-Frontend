import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.scss']
})
export class GlobalSettingsComponent implements OnInit {
  // missing global settings service
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Gets global settings (including: max recordings, timespan before autodeletion, whitelist retailers)
   */
  public async getGlobalSettings(): Promise<void> {

  }

  /**
   * changes maximum recordings per user
   */
  public async changeMaxRecordings(): Promise<void>{

  }

  /**
   * changes timespan before autodeletion of recordings
   */
  public async changeTimeAutoDelete(): Promise<void> {

  }
}
