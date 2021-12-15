import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";

@Component({
  selector: 'app-edit',
  templateUrl: './whitelist-retailer-edit.component.html',
  styleUrls: ['./whitelist-retailer-edit.component.scss']
})

/**
 * Class for editing a whitelist retailer
 * @typedef {Component} WhitelistRetailerEditComponent
 * @class
 */
export class WhitelistRetailerEditComponent implements OnInit {
  public whitelistRetailer: WhitelistRetailer = {
    id: null,
    name: '',
    domains: [],
  }

  constructor(public adminService: AdminService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.whitelistRetailer.id = params['id'];
      this.getWhitelistRetailerData();
    });
  }

  /**
   * Gets whitelist retailer data
   */
  public async getWhitelistRetailerData(): Promise<void>{
  }

  /**
   * Changes data of whitelist retailer
   *
   * @param {NgForm} whitelistRetailerEditForm submitted edit form
   */
  public async editWhitelistRetailerData(whitelistRetailerEditForm: NgForm): Promise<void> {
  }
}
