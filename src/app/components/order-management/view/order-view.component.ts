import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NONE_TYPE } from "@angular/compiler";

import { InventoryService } from "../../../services/inventory.service";

import { Order } from "../../../types/order";

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  // why can i not null quantity?
  // what should be the correct "null" form for User/order status
  public order: Order = {
    id: null,
    item: '',
    quantity: null,
    purchaseUrl: '',
    affiliatedUser: NONE_TYPE,
    orderStatus: NONE_TYPE,
  }

  constructor(public inventoryService: InventoryService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.order.id = +params['id'];
      this.getOrderData();
    });
  }

  /**
   * Get all data of order
   */
  private async getOrderData() : Promise<void> {
  }

  /**
   * Opens order edit form
   */
  public openOrderEditForm(): void {
  }

  /**
   * Opens order delete confirmation popup
   */
  public openOrderDeletionDialog(): void {
  }

}
