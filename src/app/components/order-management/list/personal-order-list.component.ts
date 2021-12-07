import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {OrderId} from "../../../types/aliases/order-id";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../types/order";

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
   *
   * @param {NgForm} orderCreationForm submitted create form
   */
  public openOrderCreationForm(orderCreationForm: NgForm): void {
  }

  /**
   * Opens order edit form
   *
   * @param orderId id of order to edit
   * @param {NgForm} orderEditForm submitted edit form
   */
  public openOrderEditForm(orderId: OrderId, orderEditForm: NgForm): void {
  }

  /**
   * Opens order delete confirmation popup
   *
   */
  public openOrderDeletionDialog(): void {
  }

  /**
   * Opens order view popup
   *
   * @param orderId
   */
  public openOrderView(orderId: OrderId): void {
  }
}
