import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";

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

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public adminService : AdminService, public activeModal: NgbActiveModal, private modalService: NgbModal) {
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
    this.adminService.deleteWhitelistRetailer(this.whitelistRetailer.id).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
