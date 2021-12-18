import { Component, OnInit } from '@angular/core';

import { OrderService } from "../../../services/order.service";

import { Order } from "../../../types/order";
import { OrderId } from "../../../types/aliases/order-id";

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})

/**
 * Component for the admin order list page
 * @typedef {Component} AdminOrderListComponent
 * @class
 */
export class AdminOrderListComponent implements OnInit {
  public orderList: Order[] = [];

  constructor(public orderService: OrderService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
  }
  //@TODO accept/deny

  /**
   * Gets all orders with data
   */
  private async getInventory(): Promise<void> {
  }

  /**
   * Opens form to create order
   */
  public openOrderCreationForm(): void {
  }

  /**
   * Opens order edit form
   *
   * @param orderId id of order to edit
   */
  public openOrderEditForm(orderId: OrderId): void {
  }

  /**
   * Opens order deletion confirmation dialog
   *
   * @param orderId id of order
   */
  public openOrderDeletionDialog(orderId: OrderId): void {
  }

  /**
   * Opens order view popup
   *
   * @param orderId id of order
   */
  public openOrderView(orderId: OrderId): void {
  }
}
