import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { InventoryService } from "../../../services/inventory.service";

import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/enums/order-status";

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})

/**
 * Component for the order view popup
 *
 * @typedef {Component} OrderViewComponent
 * @class
 */
export class OrderViewComponent implements OnInit {
  public order: Order = {
    id: null,
    item: '',
    quantity: null,
    purchaseUrl: '',
    userId: null,
    orderStatus: OrderStatus.unknown,
  }

  constructor(public inventoryService: InventoryService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.order.id = params['id'];
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
