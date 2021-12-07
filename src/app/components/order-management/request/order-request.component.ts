import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.scss']
})
export class OrderRequestComponent implements OnInit {

  constructor(public orderService: OrderService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Creates order with data
   *
   * @param {NgForm} orderCreationForm submitted create form
   */
  public async openOrderCreationForm(orderCreationForm: NgForm): Promise<void> {
  }

}
