import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { WhitelistRetailerDeleteComponent } from "../delete/whitelist-retailer-delete.component";
import { WhitelistRetailerEditComponent } from "../edit/whitelist-retailer-edit.component";

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";

@Component({
  selector: 'app-view',
  templateUrl: './whitelist-retailer-view.component.html',
  styleUrls: ['./whitelist-retailer-view.component.scss']
})

/**
 * Component for whitelist retailer view popup
 *
 *
 */
export class WhitelistRetailerViewComponent implements OnInit {
  public retailerViewForm: FormGroup = new FormGroup({
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
  constructor(
    public adminService: AdminService,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {
    this.retailerViewForm.disable();
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
    this.adminService.getWhitelistRetailerData(this.whitelistRetailer.id).subscribe({
      next: res => {
        this.whitelistRetailer = res;
        this.retailerViewForm.controls['name'].setValue(res.name);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Opens whitelist retailer edit form
   */
  public openWhitelistRetailerEditForm(): void {
    const modal = this.modalService.open(WhitelistRetailerEditComponent);
    modal.componentInstance.whitelistRetailer.id = this.whitelistRetailer.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getWhitelistRetailerData();
        this.dirty= true;
      }
    });
  }

  /**
   * Opens room delete confirmation dialog
   */
  public openWhitelistRetailerDeletionDialog(): void {
    const modal = this.modalService.open(WhitelistRetailerDeleteComponent);
    modal.componentInstance.whitelistRetailer.id = this.whitelistRetailer.id;
    modal.result.then((result) => {
      if (result === 'deleted') {
        this.activeModal.close('dirty');
        return;
      }

      if (result !== 'aborted') {
        this.getWhitelistRetailerData();
        this.dirty = true;
      }
    });
  }
}
