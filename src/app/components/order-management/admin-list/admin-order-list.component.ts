import { Component, OnInit } from '@angular/core';
import { ParseArgumentException } from "@angular/cli/models/parser";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { InventoryOrderComponent } from "../inventory-order/inventory-order.component";
import { OrderAcceptComponent } from "../order-accept/order-accept.component";
import { OrderDeclineComponent } from "../order-decline/order-decline.component";
import { OrderDeleteComponent } from "../delete/order-delete.component";
import { OrderEditComponent } from "../edit/order-edit.component";
import { OrderRequestComponent } from "../request/order-request.component";
import { OrderViewComponent } from "../view/order-view.component";

import { OrderService } from "../../../services/order.service";
import { UserService } from "../../../services/user.service";

import { Order } from "../../../types/order";
import { OrderId } from "../../../types/aliases/order-id";
import { PagedList } from "../../../types/paged-list";

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})

/**
 * Component for the admin order list page
 * @todo Lena fix JSDoc of methods
 */
export class AdminOrderListComponent implements OnInit {
  public pendingOrders: PagedList<Order> = new PagedList<Order>();
  public acceptedOrders: PagedList<Order> = new PagedList<Order>();
  public declinedOrders: PagedList<Order> = new PagedList<Order>();

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
    this.getPendingOrders(this.pendingOrders.page);
    this.getAcceptedOrders(this.acceptedOrders.page);
    this.getDeclinedOrders(this.declinedOrders.page);
  }

  /**
   * Gets data of all pending orders
   * @param page
   */
  public async getPendingOrders(page: number): Promise<void> {
    const pageSize = this.pendingOrders.pageSize;
    const offset = (page - 1) * pageSize;
    this.orderService.getAllPendingOrders(pageSize, offset).subscribe({
      next: res => {
        this.pendingOrders.total = res.total;
        this.pendingOrders.page = page;

        this.pendingOrders.data = res.data;
      },
      error: error => {
        console.error('There was an error!', error)
      },
    })
  }

  /**
   * Gets data of all accepted orders
   * @param page
   */
  public async getAcceptedOrders(page: number): Promise<void> {
    const pageSize = this.acceptedOrders.pageSize;
    const offset = (page - 1) * pageSize;
    this.orderService.getAllAcceptedOrders(pageSize, offset).subscribe({
      next: res => {
        this.acceptedOrders.total = res.total;
        this.acceptedOrders.page = page;

        this.acceptedOrders.data = res.data;
      },
      error: error => {
        console.error('There was an error!', error)
      },
    })
  }

  /**
   * Gets data of all declined orders
   * @param page
   */
  public async getDeclinedOrders(page: number): Promise<void> {
    const pageSize = this.declinedOrders.pageSize;
    const offset = (page - 1) * pageSize;
    this.orderService.getAllDeclinedOrders(pageSize, offset).subscribe({
      next: res => {
        this.declinedOrders.total = res.total;
        this.declinedOrders.page = page;

        this.declinedOrders.data = res.data;
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
        this.getPendingOrders(this.pendingOrders.page);
        this.getAcceptedOrders(this.acceptedOrders.page);
        this.getDeclinedOrders(this.declinedOrders.page);
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
        this.getPendingOrders(this.pendingOrders.page);
        this.getAcceptedOrders(this.acceptedOrders.page);
        this.getDeclinedOrders(this.declinedOrders.page);
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
        this.getPendingOrders(this.pendingOrders.page);
        this.getAcceptedOrders(this.acceptedOrders.page);
        this.getDeclinedOrders(this.declinedOrders.page);
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
        this.getPendingOrders(this.pendingOrders.page);
        this.getAcceptedOrders(this.acceptedOrders.page);
        this.getDeclinedOrders(this.declinedOrders.page);
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
        this.getPendingOrders(this.pendingOrders.page)
        this.getAcceptedOrders(this.acceptedOrders.page);
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
        this.getPendingOrders(this.pendingOrders.page)
        this.getDeclinedOrders(this.declinedOrders.page);
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
        this.getAcceptedOrders(this.acceptedOrders.page);
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
