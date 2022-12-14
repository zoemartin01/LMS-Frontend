import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { AdminService } from "../../../../services/admin.service";
import { UtilityService } from "../../../../services/utility.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";
import { WhitelistRetailerDomain } from "../../../../types/whitelist-retailer-domain";

@Component({
  selector: 'app-domain-create',
  templateUrl: './whitelist-retailer-domain-create.component.html',
  styleUrls: ['./whitelist-retailer-domain-create.component.scss']
})

/**
 * Component for creating a domain of a whitelist retailer
 */
export class WhitelistRetailerDomainCreateComponent implements OnInit {
  public domainCreateForm: FormGroup = new FormGroup({
    domain: new FormControl('', Validators.required),
  });
  public whitelistRetailer: WhitelistRetailer = {
    id: null,
    name: '',
    domains: [],
  }
  public errorMessage: string = '';

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public adminService: AdminService,
    public utilityService: UtilityService,
    public activeModal: NgbActiveModal
  ) {
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
    if (this.whitelistRetailer.id !== null) {
      this.adminService.getWhitelistRetailerData(this.whitelistRetailer.id).subscribe({
        next: res => {
          this.whitelistRetailer = res;
        },
        error: error => {
          console.error('There was an error!', error);
        },
      })
    }
  }

  /**
   * Creates new domain
   */
  public async addDomainToWhitelistRetailer(): Promise<void> {
    this.errorMessage = '';
    if (this.domainCreateForm.valid) {
      if (this.whitelistRetailer.id === null) {
        this.activeModal.close(this.domainCreateForm.value.domain);
        return;
      }

      this.adminService.addDomainToWhitelistRetailer(
        this.whitelistRetailer.id,
        this.domainCreateForm.value.domain
      ).subscribe({
        next: (domain: WhitelistRetailerDomain) => {
          if (domain.id !== null) {
            this.activeModal.close(`created ${domain.id}`);
          }
        },
        error: error => {
          this.errorMessage = this.utilityService.formatErrorMessage(error);
        },
      });
    } else {
      this.errorMessage = 'Domain can not be empty!';
    }
  }
}
