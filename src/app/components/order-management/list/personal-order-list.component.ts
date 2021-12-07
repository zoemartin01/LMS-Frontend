import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { OrderService } from "../../../services/order.service";

import { Order } from "../../../types/order";
import { OrderId } from "../../../types/aliases/order-id";

@Component({
  selector: 'app-personal-order-list',
  templateUrl: './personal-order-list.component.html',
  styleUrls: ['./personal-order-list.component.scss']
})
export class PersonalOrderListComponent implements OnInit {
  public orderList: Order[] = [];

  constructor(public orderService: OrderService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Lists all orders with data
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
   * Opens order delete confirmation popup
   *
   * @param orderId id of the order
   */
  public openOrderDeletionDialog(orderId: OrderId): void {
  }

  /**
   * Opens order view popup
   *
   * @param orderId
   */
  public openOrderView(orderId: OrderId): void {
  }
}
