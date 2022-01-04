import { Component, OnInit } from '@angular/core';

import { OrderService } from "../../../services/order.service";

import { Order } from "../../../types/order";
import { OrderId } from "../../../types/aliases/order-id";

@Component({
  selector: 'app-personal-order-list',
  templateUrl: './personal-order-list.component.html',
  styleUrls: ['./personal-order-list.component.scss']
})

/**
 * Component for personal order list page
 *
 *
 */
export class PersonalOrderListComponent implements OnInit {
  public orders: Order[] = [];

  /**
   * Constructor
   * @constructor
   * @param {OrderService} orderService service providing order functionalities
   */
  constructor(public orderService: OrderService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getOrders();
  }

  /**
   * Gets data of all orders
   */
  public async getOrders(): Promise<void> {
  }

  /**
   * Opens form to create order
   */
  public openOrderCreationForm(): void {
  }

  /**
   * Opens order edit form
   *
   * @param {OrderId} orderId id of order to edit
   */
  public openOrderEditForm(orderId: OrderId): void {
  }

  /**
   * Opens order deletion confirmation dialog
   *
   * @param {OrderId} orderId id of the order
   */
  public openOrderDeletionDialog(orderId: OrderId): void {
  }

  /**
   * Opens order view popup
   *
   * @param {OrderId} orderId id of the order
   */
  public openOrderView(orderId: OrderId): void {
  }
}
