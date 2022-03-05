import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";
import {UtilityService} from "../../../../services/utility.service";

@Component({
  selector: 'app-delete',
  templateUrl: './whitelist-retailer-delete.component.html',
  styleUrls: ['./whitelist-retailer-delete.component.scss']
})

/**
 * Component for the deletion of a whitelist retailer
 */
export class WhitelistRetailerDeleteComponent implements OnInit {
  public retailerDeleteForm: FormGroup = new FormGroup({
    name: new FormControl(''),
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
   * @param {NgbModal} modalService service providing modal functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public adminService : AdminService, public activeModal: NgbActiveModal, public utilityService: UtilityService, private modalService: NgbModal) {
    this.retailerDeleteForm.disable();
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
  public async getWhitelistRetailerData(): Promise<void>{
    this.adminService.getWhitelistRetailerData(this.whitelistRetailer.id).subscribe({
      next: res => {
        this.whitelistRetailer = res;
        this.retailerDeleteForm.controls['name'].setValue(res.name);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Deletes whitelist retailer
   */
  public async deleteWhitelistRetailer(): Promise<void> {
    this.errorMessage = '';
    this.adminService.deleteWhitelistRetailer(this.whitelistRetailer.id).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        console.error('There was an error!', error);
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }
}
