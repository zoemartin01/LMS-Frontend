import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { AdminService } from "../../../services/admin.service";

import { WhitelistRetailer } from "../../../types/whitelist-retailer";
import { PagedList } from "../../../types/paged-list";

@Component({
  selector: 'app-whitelist-retailer-user-list',
  templateUrl: './whitelist-retailer-user-list.component.html',
  styleUrls: ['./whitelist-retailer-user-list.component.scss']
})

/**
 * Component for the whitelist retailer list dialog
 * @typedef {Component} WhitelistRetailerUserListComponent
 * @class
 */
export class WhitelistRetailerUserListComponent implements OnInit {
  public whitelistRetailers: PagedList<WhitelistRetailer> = new PagedList<WhitelistRetailer>();

  /**
   * Constructor
   *
   * @param {AdminService} adminService service providing admin functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public adminService: AdminService, public activeModal: NgbActiveModal, private modalService: NgbModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getWhitelistRetailers(this.whitelistRetailers.page);
  }

  /**
   * Gets whitelist retailers
   *
   * @param {number} page current number of page
   */
  public async getWhitelistRetailers(page: number = this.whitelistRetailers.page): Promise<void> {
    this.adminService.getWhitelistRetailers().subscribe({
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
}
