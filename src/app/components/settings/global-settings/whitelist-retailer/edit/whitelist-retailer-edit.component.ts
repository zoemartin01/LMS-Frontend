import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { GlobalSettingsService } from "../../../../../services/global-settings.service";

import { WhitelistRetailer } from "../../../../../types/whitelist-retailer";

@Component({
  selector: 'app-edit',
  templateUrl: './whitelist-retailer-edit.component.html',
  styleUrls: ['./whitelist-retailer-edit.component.scss']
})
export class WhitelistRetailerEditComponent implements OnInit {
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
      this.getWhitelistRetailerData();
    });
  }

  /**
   * Gets whitelist retailer data (including: domain, name)
   */
  public async getWhitelistRetailerData(): Promise<void>{
  }

  /**
   * Changes data of whitelist retailer
   *
   * @param whitelistRetailerEditForm submitted edit form
   */
  public async editWhitelistRetailerData(whitelistRetailerEditForm: NgForm): Promise<void> {
  }
}