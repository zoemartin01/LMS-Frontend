import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WhitelistRetailerDomainEditComponent} from "../domain-edit/whitelist-retailer-domain-edit.component";
import {WhitelistRetailerDomainDeleteComponent} from "../domain-delete/whitelist-retailer-domain-delete.component";
import {WhitelistRetailerDomainId} from "../../../../types/aliases/whitelist-retailer-domain-id";

@Component({
  selector: 'app-edit',
  templateUrl: './whitelist-retailer-edit.component.html',
  styleUrls: ['./whitelist-retailer-edit.component.scss']
})

/**
 * Component for whitelist retailer edit popup
 *
 *
 */
export class WhitelistRetailerEditComponent implements OnInit {
  public retailerEditForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });


  public whitelistRetailer: WhitelistRetailer = {
    id: null,
    name: '',
    domains: [],
  }
  public dirty: boolean = true;

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbModal} modalService service providing modal functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public adminService: AdminService, private route: ActivatedRoute, public activeModal: NgbActiveModal, private modalService: NgbModal) {
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
        this.retailerEditForm.controls['name'].setValue(res.name);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Changes data of whitelist retailer
   *
   */
  public async editWhitelistRetailerData(): Promise<void> {
    this.adminService.editWhitelistRetailerData(this.whitelistRetailer.id, {
        name: this.retailerEditForm.controls['name'].value
      }
    ).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  openWhitelistRetailerDomainEditForm(whitelistRetailerDomainId : WhitelistRetailerDomainId) {
    const modal = this.modalService.open(WhitelistRetailerDomainEditComponent);
    modal.componentInstance.whitelistRetailer.id = this.whitelistRetailer.id;
    modal.componentInstance.whitelistRetailerDomain.id = whitelistRetailerDomainId;

    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getWhitelistRetailerData();
        this.dirty= true;
      }
    });
  }

  openWhitelistRetailerDomainDeletionDialog(whitelistRetailerDomainId : WhitelistRetailerDomainId) {
    const modal = this.modalService.open(WhitelistRetailerDomainDeleteComponent);
    modal.componentInstance.whitelistRetailer.id = this.whitelistRetailer.id;
    modal.componentInstance.whitelistRetailerDomain.id = whitelistRetailerDomainId;

    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getWhitelistRetailerData();
        this.dirty= true;
      }
    });
  }
}
