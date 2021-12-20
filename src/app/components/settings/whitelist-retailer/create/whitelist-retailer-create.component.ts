import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AdminService } from "../../../../services/admin.service";

@Component({
  selector: 'app-whitelist-retailer-create',
  templateUrl: './whitelist-retailer-create.component.html',
  styleUrls: ['./whitelist-retailer-create.component.scss']
})

/**
 * Component whitelist retailer creation popup
 * @typedef {Component} WhitelistRetailerCreateComponent
 * @class
 */
export class WhitelistRetailerCreateComponent implements OnInit {

  /**
   * Constructor
   * @param {AdminService} adminService service providing admin functionalities
   */
  constructor(public adminService: AdminService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
  }

  /**
   * Creates whitelist retailer with data
   *
   * @param {NgForm} whitelistRetailerForm submitted create form
   */
  public async createWhitelistRetailer(whitelistRetailerForm: NgForm): Promise<void> {
  }
}
