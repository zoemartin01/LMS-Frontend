import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AdminService } from "../../../services/admin.service";

import { GlobalSetting } from "../../../types/global-setting";
import { WhitelistRetailer } from "../../../types/whitelist-retailer";
import { WhitelistRetailerId } from "../../../types/aliases/whitelist-retailer-id";

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.scss']
})

/**
 * Component for global settings page
 *
 *
 */
export class GlobalSettingsComponent implements OnInit {
  public maxRecordings: number|null = null;
  public autoDeleteTimespan: number|null = null;
  public whitelistRetailers: WhitelistRetailer[] = [];

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   */
  constructor(public adminService: AdminService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getGlobalSettings();
    this.getWhitelistRetailers();
  }

  /**
   * Gets global settings
   */
  public async getGlobalSettings(): Promise<void> {
    this.adminService.getGlobalSettings().subscribe({
      next: res => {
        this.maxRecordings = +res.filter((setting: GlobalSetting) => setting.key === 'user.max_recordings')[0].value;
        this.autoDeleteTimespan = +res.filter((setting: GlobalSetting) => setting.key === 'recording.auto_delete')[0]
          .value;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Gets whitelist retailers
   */
  public async getWhitelistRetailers(): Promise<void> {
    this.adminService.getWhitelistRetailers().subscribe({
      next: res => {
        this.whitelistRetailers = res;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Changes data of user
   *
   * @param {NgForm} globalSettingsEditForm form to edit user
   */
  public async editGlobalSettings(globalSettingsEditForm: NgForm): Promise<void> {
  }

  /**
   * Opens whitelist retailer creation form
   */
  public openWhitelistRetailerCreationForm(): void {
  }

  /**
   * Opens whitelist retailer view
   *
   * @param {whitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public openWhitelistRetailerView(whitelistRetailerId: WhitelistRetailerId): void {
  }

  /**
   * Opens whitelist retailer edit form
   *
   * @param {whitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public openWhitelistRetailerEditForm(whitelistRetailerId: WhitelistRetailerId): void {
  }

  /**
   * Opens whitelist retailer deletion dialog
   *
   * @param {whitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public openWhitelistRetailerDeletionDialog(whitelistRetailerId: WhitelistRetailerId): void {
  }
}
