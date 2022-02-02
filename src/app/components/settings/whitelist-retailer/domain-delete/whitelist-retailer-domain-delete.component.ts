import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";
import { WhitelistRetailerDomain } from "../../../../types/whitelist-retailer-domain";

@Component({
  selector: 'app-domain-delete',
  templateUrl: './whitelist-retailer-domain-delete.component.html',
  styleUrls: ['./whitelist-retailer-domain-delete.component.scss']
})

/**
 * Component for the deletion of a whitelist retailer domain
 */
export class WhitelistRetailerDomainDeleteComponent implements OnInit {
  public domainDeleteForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    domain: new FormControl(''),
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

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public adminService: AdminService, public activeModal: NgbActiveModal, private modalService: NgbModal) {
    this.domainDeleteForm.disable();

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
      this.domainDeleteForm.controls['domain'].setValue(this.domain);
      return;
    }
    this.adminService.getWhitelistRetailerData(this.whitelistRetailer.id).subscribe({
      next: res => {
        this.whitelistRetailer = res;
        this.domainDeleteForm.controls['name'].setValue(res.name);
        this.domainDeleteForm.controls['domain'].setValue(res.domains
          .filter(
            (whitelistRetailerDomain: WhitelistRetailerDomain) => {
              return whitelistRetailerDomain.id == this.whitelistRetailerDomain.id;
            })[0].domain
        );
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Deletes domain of whitelist retailer
   */
  public async deleteDomainOfWhitelistRetailer(): Promise<void> {
    if (this.whitelistRetailer.id === null) {
      this.activeModal.close('deleted');
      return;
    }
    //@todo Mario: fix edit (throws 404)
    this.adminService.deleteDomainOfWhitelistRetailer(this.whitelistRetailer.id, this.whitelistRetailerDomain.id).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}