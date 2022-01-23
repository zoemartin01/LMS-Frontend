import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {AdminService} from "../../../services/admin.service";

import {GlobalSetting} from "../../../types/global-setting";
import {WhitelistRetailer} from "../../../types/whitelist-retailer";
import {WhitelistRetailerId} from "../../../types/aliases/whitelist-retailer-id";

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
  public whitelistRetailers: WhitelistRetailer[] = [];
  public globalSettingsForm: FormGroup = new FormGroup({
    "user.max_recordings": new FormControl(1, [
      // Validators.required,
    ]),
    autoDeleteTimespan: new FormControl(500, [
      // Validators.required,
    ]),
  });

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
        this.globalSettingsForm.controls['user.max_recordings'].setValue(+res.filter((setting: GlobalSetting) => setting.key === 'user.max_recordings')[0].value);
        this.globalSettingsForm.controls['recording.auto_delete'].setValue(+res.filter((setting: GlobalSetting) => setting.key === 'recording.auto_delete')[0]
          .value / 1000 / 60 / 60 / 24);
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
   * Changes data of global settings
   *
   */
  public async editGlobalSettings(): Promise<void> {
    console.log("yey");
    if (this.globalSettingsForm.valid) {
      let changedFields: object[] = [];
      for (let key of Object.keys(this.globalSettingsForm.controls)) {
        console.log(this.globalSettingsForm.controls[key]);
        changedFields.push({
          key,
          value: this.globalSettingsForm.controls[key].value,
        });
      }
      this.adminService.updateGlobalSettings(changedFields).subscribe({
        next: res => {
          this.globalSettingsForm.controls['user.max_recordings'].setValue(+res.filter((setting: GlobalSetting) => setting.key === 'user.max_recordings')[0].value);
          this.globalSettingsForm.controls['recording.auto_delete'].setValue(+res.filter((setting: GlobalSetting) => setting.key === 'recording.auto_delete')[0]
            .value / 1000 / 60 / 60 / 24);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }

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
