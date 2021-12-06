import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import { GlobalSettingsService } from "../../../services/global-settings.service";

import {WhitelistRetailer} from "../../../types/whitelist-retailer";

@Component({
  selector: 'app-view',
  templateUrl: './retailer-view.component.html',
  styleUrls: ['./retailer-view.component.scss']
})
export class RetailerViewComponent implements OnInit {
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
<<<<<<< Updated upstream
   * Opens room edit form
   */
  public openWhitelistRetailerEditForm(): void {
  }

  /**
   * Opens room delete confirmation popup
   */
  public openWhitelistRetailerDeletePopup(): void {
=======
   * Opens whitelist retailer edit form
   */
  public async editRetailer(): Promise<void>{
  }

  /**
   * Deletes whitelist retailer
   */
  public async deleteRetailer(): Promise<void>{
>>>>>>> Stashed changes
  }
}
