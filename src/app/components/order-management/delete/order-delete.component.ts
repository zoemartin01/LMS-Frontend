import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { OrderService } from "../../../services/order.service";

import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/enums/order-status";

@Component({
  selector: 'app-order-delete',
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-delete.component.scss']
})

/**
 * Component for the deletion of an order
 * @typedef {Component} OrderDeleteComponent
 * @class
 */
export class OrderDeleteComponent implements OnInit {
  public order: Order = {
    id: null,
    item: '',
    quantity: null,
    purchaseUrl: '',
    userId: null,
    orderStatus: OrderStatus.unknown,
  }

  /**
   * Constructor
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
    });
  }

  /**
   * Deletes order
   */
  public async deleteOrder(): Promise<void> {
  }
}