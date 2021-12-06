import { Component, OnInit } from '@angular/core';

import { GlobalSettingsService } from "../../../services/global-settings.service";

import { WhitelistRetailer } from "../../../types/whitelist-retailer";
import { WhitelistRetailerId } from "../../../types/aliases/whitelist-retailer-id";

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.scss']
})
export class GlobalSettingsComponent implements OnInit {
  public maxRecordings: number|null = null;
  public autodeleteTimespan: number|null = null;
  public whitelistRetailers: WhitelistRetailer[] = [];

  constructor(public globalSettingsService: GlobalSettingsService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.getGlobalSettings();
  }

  /**
   * Gets global settings (including: max recordings, timespan before autodeletion, whitelist retailers)
   */
  public async getGlobalSettings(): Promise<void> {
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
  public openWhitelistRetailerEditForm(whitelistRetailerId: WhitelistRetailerId): void {
  }

  /**
   * Opens whitelist retailer deletion form
   *
   * @param whitelistRetailerId id of whitelist retailer
   */
  public openWhitelistRetailerDeletePopup(whitelistRetailerId: WhitelistRetailerId): void {
  }
}
