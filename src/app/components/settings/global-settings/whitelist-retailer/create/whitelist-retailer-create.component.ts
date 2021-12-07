import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { GlobalSettingsService } from "../../../../../services/global-settings.service";

@Component({
  selector: 'app-whitelist-retailer-create',
  templateUrl: './whitelist-retailer-create.component.html',
  styleUrls: ['./whitelist-retailer-create.component.scss']
})
export class WhitelistRetailerCreateComponent implements OnInit {

  constructor(public globalSettingsService: GlobalSettingsService) {
  }

  ngOnInit(): void {
  }

  /**
   * Creates whitelist retailer with data
   *
   * @param whitelistRetailerForm submitted create form
   */
  public async createWhitelistRetailer(whitelistRetailerForm: NgForm): Promise<void> {
  }
}
