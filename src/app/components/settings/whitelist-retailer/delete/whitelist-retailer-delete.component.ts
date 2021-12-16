import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WhitelistRetailer} from "../../../../types/whitelist-retailer";
import {AdminService} from "../../../../services/admin.service";

@Component({
  selector: 'app-delete',
  templateUrl: './whitelist-retailer-delete.component.html',
  styleUrls: ['./whitelist-retailer-delete.component.scss']
})
/**
 * Component for the deletion of a whitelist retailer
 * @typedef {Component} WhitelistRetailerDeleteComponent
 * @class
 */
export class WhitelistRetailerDeleteComponent implements OnInit {
  public whitelistRetailer: WhitelistRetailer = {
    domains: [],
    id: null,
    name: ""

  }

  constructor(public adminService: AdminService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.whitelistRetailer.id = params['id'];
    });
  }

  /**
   * Deletes whitelist retailer
   */
  public async deleteWhitelistRetailer(): Promise<void> {
  }
}
