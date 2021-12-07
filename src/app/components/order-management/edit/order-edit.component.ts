import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  constructor(public orderService: OrderService,  private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Get all data of order
   */
  private async getOrderData() : Promise<void> {
  }

  /**
   * Opens form to change data of order
   *
   * @param {NgForm} orderEditForm submitted edit form
   */
  public async openOrderEditForm(orderEditForm: NgForm): Promise<void> {
  }

}
