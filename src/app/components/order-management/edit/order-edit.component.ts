import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { OrderService } from "../../../services/order.service";

import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/enums/order-status";

@Component({
  selector: 'app-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})

/**
 * Component for the order edit popup
 *
 * @typedef {Component} OrderEditComponent
 * @class
 */
export class OrderEditComponent implements OnInit {
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
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.order.id = params['id'];
      this.getOrderData();
    });
  }

  /**
   * Get all data of order
   */
  private async getOrderData(): Promise<void> {
  }

  /**
   * Changes data of order
   *
   * @param {NgForm} orderEditForm submitted edit form
   */
  public async editOrder(orderEditForm: NgForm): Promise<void> {
  }
}
