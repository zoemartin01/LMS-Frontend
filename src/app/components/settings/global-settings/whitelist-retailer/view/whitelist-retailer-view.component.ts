import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AdminService } from "../../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../../types/whitelist-retailer";

@Component({
  selector: 'app-view',
  templateUrl: './whitelist-retailer-view.component.html',
  styleUrls: ['./whitelist-retailer-view.component.scss']
})
export class WhitelistRetailerViewComponent implements OnInit {
  public whitelistRetailer: WhitelistRetailer = {
    id: null,
  }

  constructor(public adminService: AdminService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.whitelistRetailer.id = +params['id'];
      this.getWhitelistRetailerData();
    });
  }

  /**
   * Gets whitelist retailer data (including: domain, name)
   */
  public async getWhitelistRetailerData(): Promise<void>{
  }

  /**
   * Opens whitelist retailer edit form
   */
  public openWhitelistRetailerEditForm(): void {
  }

  /**
   * Opens room delete confirmation popup
   */
  public openWhitelistRetailerDeletePopup(): void {
  }
}
