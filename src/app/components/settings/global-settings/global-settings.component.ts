import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AdminService } from "../../../services/admin.service";

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

  constructor(public adminService: AdminService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.getGlobalSettings();
  }

  /**
   * Gets global settings
   */
  public async getGlobalSettings(): Promise<void> {
  }

  /**
   * Changes data of user
   *
   * @param globalSettingsEditForm form to edit user
   */
  public async editGlobalSettings(globalSettingsEditForm: NgForm): Promise<void> {
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
   * Opens whitelist retailer deletion dialog
   *
   * @param whitelistRetailerId id of whitelist retailer
   */
  public openWhitelistRetailerDeletionDialog(whitelistRetailerId: WhitelistRetailerId): void {
  }
}
