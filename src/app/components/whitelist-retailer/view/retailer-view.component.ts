import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './retailer-view.component.html',
  styleUrls: ['./retailer-view.component.scss']
})
export class RetailerViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Gets retailer data (including: domain, name)
   */
  public async getRetailerData(): Promise<void>{

  }

  /**
   * Deletes whitelist retailer
   */
  public async deleteRetailer(): Promise<void>{

  }
}
