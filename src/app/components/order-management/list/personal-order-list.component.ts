import { Component, OnInit } from '@angular/core';

import { OrderService } from "../../../services/order.service";

import { Order } from "../../../types/order";
import { OrderId } from "../../../types/aliases/order-id";
import {OrderRequestComponent} from "../request/order-request.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderEditComponent} from "../edit/order-edit.component";
import {OrderStatus} from "../../../types/enums/order-status";
import {ParseArgumentException} from "@angular/cli/models/parser";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

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
  public pendingOrders: Order[] = [];
  public acceptedOrders: Order[] = [];
  public declinedOrders: Order[] = [];

  /**
   * Constructor
   * @constructor
   * @param {OrderService} orderService service providing order functionalities
   * @param {UserService} userService service providing user functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public orderService: OrderService, public userService: UserService, public authService: AuthService, private modalService: NgbModal) {
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
    this.orderService.getAllOrdersForCurrentUser().subscribe({
      next: res => {
        this.pendingOrders = res.filter((order: Order) => +order.status === OrderStatus.pending);
        this.acceptedOrders = res.filter((order: Order) => +order.status !== OrderStatus.pending && +order.status !== OrderStatus.declined);
        this.declinedOrders = res.filter((order: Order) => +order.status === OrderStatus.declined);
      },
      error: error => {
        console.error('There was an error!', error);
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
        this.getOrders();
      }
    });
  }

  /**
   * Opens order edit form
   *
   * @param {OrderId} orderId id of order to edit
   */
  public openOrderEditForm(orderId: OrderId): void {
    const modal = this.modalService.open(OrderEditComponent);
    modal.componentInstance.order.id = orderId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getOrders();
      }
    });
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

  public getItemName(order: Order) {
    if (order === null) {
      throw ParseArgumentException;
    }
    return ((order.item === null) ? order.itemName : order.item.name);
  }
}
