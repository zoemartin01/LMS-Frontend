import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { OrderService } from "../../../services/order.service";

import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/enums/order-status";

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})

/**
 * Component for the order view popup
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

  constructor(public orderService: OrderService, private route: ActivatedRoute) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.order.id = params['id'];
      this.getOrderData();
    });
  }

  /**
   * Gets all data of order
   */
  public async getOrderData() : Promise<void> {
  }

  /**
   * Opens order edit form
   */
  public openOrderEditForm(): void {
  }

  /**
   * Opens order deletion confirmation dialog
   */
  public openOrderDeletionDialog(): void {
  }
}
