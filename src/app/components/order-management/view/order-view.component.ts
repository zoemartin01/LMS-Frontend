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
 *
 *
 */
export class OrderViewComponent implements OnInit {
  public order: Order = {
    id: null,
    item: '',
    quantity: null,
    purchaseUrl: '',
    userId: null,
    userFullName: '',
    orderStatus: OrderStatus.unknown,
  }

  /**
   * Constructor
   * @constructor
   * @param {OrderService} orderService service providing order functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
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
