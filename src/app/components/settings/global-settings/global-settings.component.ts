import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { WhitelistRetailerCreateComponent } from "../whitelist-retailer/create/whitelist-retailer-create.component";
import { WhitelistRetailerDeleteComponent } from "../whitelist-retailer/delete/whitelist-retailer-delete.component";
import { WhitelistRetailerEditComponent } from "../whitelist-retailer/edit/whitelist-retailer-edit.component";
import { WhitelistRetailerViewComponent } from "../whitelist-retailer/view/whitelist-retailer-view.component";

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
  public whitelistRetailers: WhitelistRetailer[] = [];
  public globalSettingsForm: FormGroup = new FormGroup({
    "user.max_recordings": new FormControl('', [
       Validators.required,
    ]),
    "recording.auto_delete": new FormControl('', [
       Validators.required,
    ]),
  });

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public adminService: AdminService, private modalService: NgbModal) {
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
        this.updateGlobalSettingsForm(res);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  private updateGlobalSettingsForm(globalSettings: GlobalSetting[]) {
    this.globalSettingsForm.controls['user.max_recordings'].setValue(
      +globalSettings.filter((setting: GlobalSetting) => setting.key === 'user.max_recordings')[0].value
    );
    this.globalSettingsForm.controls['recording.auto_delete'].setValue(
      (
        +globalSettings.filter((setting: GlobalSetting) => setting.key === 'recording.auto_delete')[0].value
      ) / 86400000
    );
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
   */
  public async editGlobalSettings(): Promise<void> {
    if (this.globalSettingsForm.valid) {
      let changedFields: object[] = [];
      for (let key of Object.keys(this.globalSettingsForm.controls)) {
        changedFields.push({
          key,
          value: this.globalSettingsForm.controls[key].value,
        });
      }

      this.adminService.updateGlobalSettings(changedFields).subscribe({
        next: res => {
          this.updateGlobalSettingsForm(res);
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
    const modal = this.modalService.open(WhitelistRetailerCreateComponent);
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getWhitelistRetailers();
      }
    });
  }

  /**
   * Opens whitelist retailer view
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public openWhitelistRetailerView(whitelistRetailerId: WhitelistRetailerId): void {
    const modal = this.modalService.open(WhitelistRetailerViewComponent);
    modal.componentInstance.whitelistRetailer.id = whitelistRetailerId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getWhitelistRetailers();
      }
    });
  }

  /**
   * Opens whitelist retailer edit form
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public openWhitelistRetailerEditForm(whitelistRetailerId: WhitelistRetailerId): void {
    const modal = this.modalService.open(WhitelistRetailerEditComponent);
    modal.componentInstance.whitelistRetailer.id = whitelistRetailerId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getWhitelistRetailers();
      }
    });
  }

  /**
   * Opens whitelist retailer deletion dialog
   *
   * @param {WhitelistRetailerId} whitelistRetailerId id of whitelist retailer
   */
  public openWhitelistRetailerDeletionDialog(whitelistRetailerId: WhitelistRetailerId): void {
    const modal = this.modalService.open(WhitelistRetailerDeleteComponent);
    modal.componentInstance.whitelistRetailer.id = whitelistRetailerId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getWhitelistRetailers();
      }
    });
  }
}
