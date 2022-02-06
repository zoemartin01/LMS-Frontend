import { Component, OnInit } from '@angular/core';
import { ParseArgumentException } from "@angular/cli/models/parser";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { OrderEditComponent } from "../edit/order-edit.component";
import { OrderRequestComponent } from "../request/order-request.component";
import { OrderViewComponent } from "../view/order-view.component";
import { OrderDeleteComponent } from "../delete/order-delete.component";
import { OrderDeclineComponent } from "../order-decline/order-decline.component";
import { OrderAcceptComponent } from "../order-accept/order-accept.component";

import { OrderService } from "../../../services/order.service";
import { UserService } from "../../../services/user.service";

import { Order } from "../../../types/order";
import { OrderId } from "../../../types/aliases/order-id";
import { OrderStatus } from "../../../types/enums/order-status";
import {InventoryItemCreateComponent} from "../../inventory-management/item-create/inventory-item-create.component";
import {InventoryItemId} from "../../../types/aliases/inventory-item-id";
import {InventoryItemViewComponent} from "../../inventory-management/item-view/inventory-item-view.component";
import {InventoryItemEditComponent} from "../../inventory-management/item-edit/inventory-item-edit.component";
import {InventoryOrderComponent} from "../inventory-order/inventory-order.component";

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
    this.getOrders();
  }

  /**
   * Gets all orders with data
   */
  public async getOrders(): Promise<void> {
    this.orderService.getAllOrders().subscribe({
      next: res => {
        this.pendingOrders = res.data.filter((order: Order) => +order.status === OrderStatus.pending);
        this.acceptedOrders = res.data.filter((order: Order) => +order.status !== OrderStatus.pending && +order.status !== OrderStatus.declined);
        this.declinedOrders = res.data.filter((order: Order) => +order.status === OrderStatus.declined);
      },
      error: error => {
        console.error('There was an error!', error)
      },
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
   * @param {OrderId} orderId id of order
   */
  public openOrderDeletionDialog(orderId: OrderId): void {
    const modal = this.modalService.open(OrderDeleteComponent);
    modal.componentInstance.order.id = orderId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getOrders();
      }
    });
  }

  /**
   * Opens order view popup
   *
   * @param {OrderId} orderId id of order
   */
  public openOrderView(orderId: OrderId): void {
    const modal = this.modalService.open(OrderViewComponent);
    modal.componentInstance.order.id = orderId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getOrders();
      }
    });
  }

  /**
   * Sets order request to accepted
   *
   * @param {OrderId} orderId id of order
   */
  public async openOrderAcceptDialog(orderId: OrderId): Promise<void> {
    const modal = this.modalService.open(OrderAcceptComponent);
    modal.componentInstance.order.id = orderId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getOrders();
      }
    });
  }

  /**
   * Sets order request to declined
   *
   * @param {OrderId} orderId id of order
   */
  public async openOrderDeclineDialog(orderId: OrderId): Promise<void> {
    const modal = this.modalService.open(OrderDeclineComponent);
    modal.componentInstance.order.id = orderId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getOrders();
      }
    });
  }

  /**
   * Opens form to create order
   *
   * @param {OrderId} orderId id of order
   */
  public openInventoryOrderForm(orderId: OrderId): void {
    const modal = this.modalService.open(InventoryOrderComponent);
    modal.componentInstance.order.id = orderId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getOrders();
      }
    });
  }

  public getItemName(order: Order) {
    if (order === null) {
      throw ParseArgumentException;
    }
    return ((order.item === null) ? order.itemName : order.item.name);
  }
}
