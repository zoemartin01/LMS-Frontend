import { Component, OnInit } from '@angular/core';
import { ParseArgumentException } from "@angular/cli/models/parser";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { OrderRequestComponent } from "../request/order-request.component";

import { OrderService } from "../../../services/order.service";
import { UserService } from "../../../services/user.service";

import { Order } from "../../../types/order";
import { OrderId } from "../../../types/aliases/order-id";
import { OrderStatus } from "../../../types/enums/order-status";

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
  public pendingOrders: Order[] = [];
  public acceptedOrders: Order[] = [];
  public declinedOrders: Order[] = [];

  /**
   * Constructor
   * @constructor
   * @param {OrderService} orderService service providing order functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public orderService: OrderService, public userService: UserService, private modalService: NgbModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getInventory();
  }

  /**
   * Gets all orders with data
   */
  public async getInventory(): Promise<void> {
    this.orderService.getAllOrders().subscribe({
      next: res => {
        this.pendingOrders = res.data.filter((order: Order) => +order.status === OrderStatus.pending);
        this.acceptedOrders = res.data.filter((order: Order) => +order.status !== OrderStatus.pending && +order.status !== OrderStatus.declined);
        this.declinedOrders = res.data.filter((order: Order) => +order.status === OrderStatus.declined);
      },
      error: error => {
        console.error('There was an error!', error)
      }
    })
  }

  /**
   * Opens form to create order
   */
  public openOrderCreationForm(): void {
    const modal = this.modalService.open(OrderRequestComponent);
    modal.result.then((result) => {
      if (result.split(' ')[0] === 'created') {
        this.openOrderView(result.split(' ')[1]);
      }

      if (result !== 'aborted') {
        this.getInventory();
      }
    });
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
  public async openOrderAcceptDialog(orderId: OrderId): Promise<void> {
  }

  /**
   * Sets order request to declined
   *
   * @param {OrderId} orderId id of order
   */
  public async openOrderDeclineDialog(orderId: OrderId): Promise<void> {
  }

  public getItemName(order: Order) {
    if (order === null) {
      throw ParseArgumentException;
    }
    return ((order.item === null) ? order.itemName : order.item.name);
  }
}
