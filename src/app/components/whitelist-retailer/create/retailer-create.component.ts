import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { GlobalSettingsService } from "../../../services/global-settings.service";

@Component({
  selector: 'app-creation',
  templateUrl: './retailer-create.component.html',
  styleUrls: ['./retailer-create.component.scss']
})
export class RetailerCreateComponent implements OnInit {

  constructor(public globalSettingsService: GlobalSettingsService) {
  }

  ngOnInit(): void {
  }

  /**
   * Creates whitelist retailer with data
   *
   * @param whitelistRetailerForm submitted create form
   */
  public async createRetailer(whitelistRetailerForm: NgForm): Promise<void> {
  }
}
