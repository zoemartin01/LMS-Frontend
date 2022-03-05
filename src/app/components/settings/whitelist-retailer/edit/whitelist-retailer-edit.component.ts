import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { WhitelistRetailerDomainCreateComponent } from "../domain-create/whitelist-retailer-domain-create.component";
import { WhitelistRetailerDomainDeleteComponent } from "../domain-delete/whitelist-retailer-domain-delete.component";
import { WhitelistRetailerDomainEditComponent } from "../domain-edit/whitelist-retailer-domain-edit.component";

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";
import { WhitelistRetailerDomainId } from "../../../../types/aliases/whitelist-retailer-domain-id";
import {UtilityService} from "../../../../services/utility.service";

@Component({
  selector: 'app-edit',
  templateUrl: './whitelist-retailer-edit.component.html',
  styleUrls: ['./whitelist-retailer-edit.component.scss']
})

/**
 * Component for whitelist retailer edit popup
 */
export class WhitelistRetailerEditComponent implements OnInit {
  public retailerEditForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
  });
  public whitelistRetailer: WhitelistRetailer = {
    id: null,
    name: '',
    domains: [],
  }
  public dirty: boolean = true;
  public errorMessage: string = '';

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {ActivatedRoute} route route that activated this component
   * @param {NgbModal} modalService service providing modal functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public adminService: AdminService,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    public utilityService: UtilityService,
    private modalService: NgbModal
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
    this.errorMessage = '';
    if (!this.retailerEditForm.valid) {
      this.errorMessage = 'Retailer name cannot be empty';
      return;
    }
    this.adminService.editWhitelistRetailerData(this.whitelistRetailer.id, {
        name: this.retailerEditForm.controls['name'].value
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

  /**
   * Opens form to edit a domain of whitelist retailer
   * @param whitelistRetailerDomainId {WhitelistRetailerDomainId} id of domain to edit
   */
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

  /**
   * Opens form to delete a domain of whitelist retailer
   * @param whitelistRetailerDomainId {WhitelistRetailerDomainId} id of domain to delete
   */
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

  /**
   * Opens form to create a domain
   */
  openWhitelistRetailerDomainCreationForm() {
    const modal = this.modalService.open(WhitelistRetailerDomainCreateComponent);
    modal.componentInstance.whitelistRetailer.id = this.whitelistRetailer.id;

    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getWhitelistRetailerData();
        this.dirty= true;
      }
    });
  }
}
