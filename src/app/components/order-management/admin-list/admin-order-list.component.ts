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
 *
 *
 */
export class AdminOrderListComponent implements OnInit {
  public orderList: Order[] = [];

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
  }

  /**
   * Gets all orders with data
   */
  public async getInventory(): Promise<void> {
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
   * @param {OrderId} orderId id of order
   */
  public openOrderDeletionDialog(orderId: OrderId): void {
  }

  /**
   * Opens order view popup
   *
   * @param {OrderId} orderId id of order
   */
  public openOrderView(orderId: OrderId): void {
  }

  /**
   * Sets order request to accepted
   *
   * @param {OrderId} orderId id of order
   */
  public async acceptOrderRequest(orderId: OrderId): Promise<void> {
  }

  /**
   * Sets order request to declined
   *
   * @param {OrderId} orderId id of order
   */
  public async declineOrderRequest(orderId: OrderId): Promise<void> {
  }
}
