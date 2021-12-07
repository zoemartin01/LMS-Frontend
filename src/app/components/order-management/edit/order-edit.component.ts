import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

import {OrderService} from "../../../services/order.service";
import {Order} from "../../../types/order";
import {NONE_TYPE} from "@angular/compiler";

@Component({
  selector: 'app-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  public order: Order = {
    // why can i not null quantity?
    // what should be the correct "null" form for User/order status
    id: null,
    item: '',
    quantity: null,
    purchaseUrl: '',
    affiliatedUser: NONE_TYPE,
    orderStatus: NONE_TYPE,
  }

  constructor(public orderService: OrderService,  private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.order.id = +params['id'];
      this.getOrderData();
    });
  }

  /**
   * Get all data of order
   */
  private async getOrderData() : Promise<void> {
  }

  /**
   * Changes data of order
   *
   * @param {NgForm} orderEditForm submitted edit form
   */
  public async openOrderEditForm(orderEditForm: NgForm): Promise<void> {
  }

}
