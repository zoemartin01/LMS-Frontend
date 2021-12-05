import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creation',
  templateUrl: './retailer-creation.component.html',
  styleUrls: ['./retailer-creation.component.scss']
})
export class RetailerCreationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Sets name of whitelist retailer
   */
  public async setName(): Promise<void>{

  }

  /**
   * Sets domain of whitelist retailer
   */
  public async setDomain(): Promise<void>{

  }
}
