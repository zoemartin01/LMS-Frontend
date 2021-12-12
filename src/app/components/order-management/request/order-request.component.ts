import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { OrderService } from "../../../services/order.service";

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.scss']
})
export class OrderRequestComponent {

  constructor(public orderService: OrderService) {
  }

  /**
   * Creates order with data
   *
   * @param {NgForm} orderCreationForm submitted create form
   */
  public async requestOrder(orderCreationForm: NgForm): Promise<void> {
  }
}
