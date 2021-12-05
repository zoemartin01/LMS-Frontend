import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { GlobalSettingsService } from "../../../services/global-settings.service";

import { WhitelistRetailer } from "../../../types/whitelist-retailer";

@Component({
  selector: 'app-edit',
  templateUrl: './retailer-edit.component.html',
  styleUrls: ['./retailer-edit.component.scss']
})
export class RetailerEditComponent implements OnInit {
  public whitelistRetailer: WhitelistRetailer = {
    id: null,
  }

  constructor(public globalSettingsService: GlobalSettingsService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.whitelistRetailer.id = +params['id'];
      this.getRetailerData();
    });
  }

  /**
   * Gets retailer data (including: domain, name)
   */
  public async getRetailerData(): Promise<void>{
  }

  /**
   * Changes data of whitelist retailer
   *
   * @param retailerEditForm submitted edit form
   */
  public async editRetailerData(retailerEditForm: NgForm): Promise<void> {
  }
}
