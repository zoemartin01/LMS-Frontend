import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { OrderService } from "../../../services/order.service";

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.scss']
})

/**
 * Component for order request popup
 * @typedef {Component} OrderRequestComponent
 * @class
 */
export class OrderRequestComponent {

  constructor(public orderService: OrderService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Creates order request with data
   *
   * @param {NgForm} orderCreationForm submitted create form
   */
  public async requestOrder(orderCreationForm: NgForm): Promise<void> {
  }
}
