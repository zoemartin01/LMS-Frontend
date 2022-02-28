import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { WhitelistRetailerDomainCreateComponent } from "../domain-create/whitelist-retailer-domain-create.component";
import { WhitelistRetailerDomainDeleteComponent } from "../domain-delete/whitelist-retailer-domain-delete.component";
import { WhitelistRetailerDomainEditComponent } from "../domain-edit/whitelist-retailer-domain-edit.component";

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";

@Component({
  selector: 'app-whitelist-retailer-create',
  templateUrl: './whitelist-retailer-create.component.html',
  styleUrls: ['./whitelist-retailer-create.component.scss']
})

/**
 * Component for whitelist retailer creation popup
 *
 *
 */
export class WhitelistRetailerCreateComponent {
  public whitelistRetailer: WhitelistRetailer = {
    id: null,
    name: '',
    domains: [],
  }
  public retailerCreateForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
  });
  public domains: string[] = [];
  public dirty: boolean = false;

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public adminService: AdminService, public activeModal: NgbActiveModal, private modalService: NgbModal) {
  }

  /**
   * Creates whitelist retailer
   */
  public async createWhitelistRetailer(): Promise<void> {
    this.adminService.createWhitelistRetailer(this.domains, this.retailerCreateForm.value.name).subscribe({
      next: (whitelistRetailer: WhitelistRetailer) => {
        this.activeModal.close(`created ${whitelistRetailer.id}`);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Opens form to create a domain
   */
  openWhitelistRetailerDomainCreationForm() {
    const modal = this.modalService.open(WhitelistRetailerDomainCreateComponent);
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.domains.push(result);
        this.dirty = true;
      }
    });
  }

  /**
   * Opens form to edit a domain
   *
   * @param whitelistRetailerDomain {string} domain to edit
   */
  openWhitelistRetailerDomainEditForm(whitelistRetailerDomain: string) {
    const modal = this.modalService.open(WhitelistRetailerDomainEditComponent);
    modal.componentInstance.domain = whitelistRetailerDomain;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.domains[this.domains.indexOf(whitelistRetailerDomain, 0)] = result;
        this.dirty = true;
      }
    });
  }

  /**
   * Opens dialog to delete a domain
   *
   * @param whitelistRetailerDomain domain to delete
   */
  openWhitelistRetailerDomainDeletionDialog(whitelistRetailerDomain: string) {
    const modal = this.modalService.open(WhitelistRetailerDomainDeleteComponent);
    modal.componentInstance.domain = whitelistRetailerDomain;
    modal.componentInstance.name = this.retailerCreateForm.value.name;

    modal.result.then((result) => {
      if (result !== 'aborted') {
        const index = this.domains.indexOf(whitelistRetailerDomain, 0);
        if (index > -1) {
          this.domains.splice(index, 1);
          this.dirty = true;
        }
      }
    });
  }
}
