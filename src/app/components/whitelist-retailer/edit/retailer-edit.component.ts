import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './retailer-edit.component.html',
  styleUrls: ['./retailer-edit.component.scss']
})
export class RetailerEditComponent implements OnInit {

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

  /**
   * Changes name of whitelist retailer
   */
  public async changeName(): Promise<void>{

  }

  /**
   * Changes domain of whitelist retailer
   */
  public async changeDomain(): Promise<void>{

  }
}
