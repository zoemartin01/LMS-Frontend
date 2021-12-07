import { Component, OnInit } from '@angular/core';
import { NONE_TYPE } from "@angular/compiler";
import { ActivatedRoute } from "@angular/router";

import { InventoryService } from "../../../services/inventory.service";

import { Order } from "../../../types/order";
import { OrderId } from "../../../types/aliases/order-id";

@Component({
  selector: 'app-inventory-order',
  templateUrl: './inventory-order.component.html',
  styleUrls: ['./inventory-order.component.scss']
})
export class InventoryOrderComponent implements OnInit {
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
   * Opens form to put data of order in a new inventory item
   *
   * @param orderId id of the order to be inventoried
   */
  public async openItemCreationForm(orderId: OrderId): Promise<void> {
  }
}
