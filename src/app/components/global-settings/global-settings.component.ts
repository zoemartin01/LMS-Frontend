import { Component, OnInit } from '@angular/core';

import { GlobalSettingsService } from "../../services/global-settings.service";

import { WhitelistRetailer } from "../../types/whitelist-retailer";
import { WhitelistRetailerId } from "../../types/aliases/whitelist-retailer-id";

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.scss']
})
export class GlobalSettingsComponent implements OnInit {
  public maxRecordings: number|null = null;
  public autodeleteTimespan: number|null = null;
  public whitelistRetailers: WhitelistRetailer[] = [];

  constructor(public globalSettingsService: GlobalSettingsService) { }

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
  public async setMaxRecordings(): Promise<void> {
  }

  /**
   * changes timespan before autodeletion of recordings
   */
  public async setAutodeleteTimespan(): Promise<void> {
  }

  /**
   * Opens whitelist retailer creation form
   */
  public openWhitelistRetailerCreationForm(): void {
  }

  /**
   * Opens whitelist retailer edit form
   *
   * @param whitelistRetailerId id of whitelist retailer
   */
  public editWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId): void {
  }

  /**
   * Deletes whitelist retailer
   *
   * @param whitelistRetailerId id of whitelist retailer
   */
  public deleteWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId) : Promise<void> {
  }
}
