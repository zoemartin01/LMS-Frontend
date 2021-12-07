import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

import {InventoryService} from "../../../services/inventory.service";

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  constructor(public inventoryService: InventoryService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Get all data of order
   */
  private async getOrderData() : Promise<void> {
  }

  /**
   * Opens order edit form
   *
   * @param {NgForm} orderEditForm submitted edit form
   */
  public openOrderEditForm(orderEditForm: NgForm): void {
  }

  /**
   * Opens order delete confirmation popup
   */
  public openOrderDeletionDialog(): void {
  }

}
