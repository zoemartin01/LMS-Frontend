import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";
import { WhitelistRetailerDomain } from "../../../../types/whitelist-retailer-domain";
import {UtilityService} from "../../../../services/utility.service";

@Component({
  selector: 'app-domain-edit',
  templateUrl: './whitelist-retailer-domain-edit.component.html',
  styleUrls: ['./whitelist-retailer-domain-edit.component.scss']
})

/**
 * Component for editing of a whitelist retailer domain
 */
export class WhitelistRetailerDomainEditComponent implements OnInit {
  public domainEditForm: FormGroup = new FormGroup({
    domain: new FormControl('', [
      Validators.required,
    ]),
  });
  public whitelistRetailer: WhitelistRetailer = {
    id: null,
    name: '',
    domains: [],
  }
  public whitelistRetailerDomain: WhitelistRetailerDomain = {
    id: null,
    domain: '',
  }
  public domain : string = '';
  public errorMessage: string = '';

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public adminService: AdminService, public utilityService: UtilityService, public activeModal: NgbActiveModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getWhitelistRetailerData();
  }

  /**
   * Gets whitelist retailer data
   */
  public async getWhitelistRetailerData(): Promise<void> {
    if (this.whitelistRetailer.id === null) {
      this.domainEditForm.controls['domain'].setValue(this.domain);
    } else {
      this.adminService.getWhitelistRetailerData(this.whitelistRetailer.id).subscribe({
        next: res => {
          this.whitelistRetailer = res;
          this.domainEditForm.controls['domain'].setValue(res.domains.filter((whitelistRetailerDomain: WhitelistRetailerDomain) => whitelistRetailerDomain.id == this.whitelistRetailerDomain.id)[0].domain);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }
  }

  /**
   * Edits domain of whitelist retailer
   */
  public async editDomainOfWhitelistRetailer(): Promise<void> {
    this.errorMessage ='';
    if (this.whitelistRetailer.id === null) {
      this.activeModal.close(this.domainEditForm.controls['domain'].value);
      return;
    }
    if (!this.domainEditForm.valid) {
      this.errorMessage = 'Domain can not be empty!';
      return;
    }
    this.adminService.editDomainOfWhitelistRetailer(
      this.whitelistRetailer.id,
      this.whitelistRetailerDomain.id,
      {
        domain: this.domainEditForm.controls['domain'].value
      }
    ).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }
}
