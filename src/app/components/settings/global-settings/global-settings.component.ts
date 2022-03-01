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
import { PagedList } from 'src/app/types/paged-list';

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.scss']
})

/**
 * Component for global settings page
 */
export class GlobalSettingsComponent implements OnInit {
  public whitelistRetailers: PagedList<WhitelistRetailer> = new PagedList<WhitelistRetailer>();
  public globalSettingsForm: FormGroup = new FormGroup({
    "user.max_recordings": new FormControl('', [
      Validators.required,
    ]),
    "recording.auto_delete": new FormControl('', [
      Validators.required,
    ]),
    "static.homepage": new FormControl(''),
    "static.safety_instructions": new FormControl(''),
    "static.lab_rules": new FormControl(''),
    "static.faq": new FormControl(''),
    "static.faq_admin": new FormControl(''),
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

  /**
   * Updates the form for global settings
   * @param {GlobalSetting[]} globalSettings global settings
   * @private
   */
  private updateGlobalSettingsForm(globalSettings: GlobalSetting[]) {
    this.globalSettingsForm.controls['user.max_recordings'].setValue(
      +globalSettings.filter((setting: GlobalSetting) => setting.key === 'user.max_recordings')[0].value
    );
    this.globalSettingsForm.controls['recording.auto_delete'].setValue(
      (
        +globalSettings.filter((setting: GlobalSetting) => setting.key === 'recording.auto_delete')[0].value
      ) / 86400000
    );
    this.globalSettingsForm.controls['static.homepage'].setValue('');
    this.globalSettingsForm.controls['static.lab_rules'].setValue('');
    this.globalSettingsForm.controls['static.faq'].setValue('');
    this.globalSettingsForm.controls['static.faq_admin'].setValue('');
    this.globalSettingsForm.controls['static.safety_instructions'].setValue('');
  }

  /**
   * Gets whitelist retailers
   *
   * @param {number} page current number of page
   */
  public async getWhitelistRetailers(page: number = this.whitelistRetailers.page): Promise<void> {
    const pageSize = this.whitelistRetailers.pageSize;
    const offset = (page - 1) * pageSize;

    this.adminService.getWhitelistRetailers(pageSize, offset).subscribe({
      next: res => {
        this.whitelistRetailers.total = res.total;
        this.whitelistRetailers.page = page;
        this.whitelistRetailers.data = res.data;
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
        if (this.globalSettingsForm.controls[key].value != "") {
          if (key == 'recording.auto_delete') {
            changedFields.push({
              key,
              value: this.globalSettingsForm.controls[key].value * 86400000,
            });
          } else {
            changedFields.push({
              key,
              value: this.globalSettingsForm.controls[key].value,
            });
          }
        }
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
      if (result.split(' ')[0] === 'created') {
        this.openWhitelistRetailerView(result.split(' ')[1]);
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

  /**
   * Updates content of static page
   *
   * @param {any} event file selection event that triggered this method
   * @param {string} staticPageName name of the static page to update
   */
  onFileSelected(event: any, staticPageName: string) {
    const file: File = event.target.files[0];
    if (file.name.endsWith('.md') || file.name.endsWith('.txt')) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileContents = fileReader.result;
        this.globalSettingsForm.controls[staticPageName].setValue(
          fileContents
        );
      };
      fileReader.readAsText(file);
    } else {
      console.error('File must be a markdown file');
    }
  }
}
