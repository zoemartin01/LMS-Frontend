import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { OrderService } from "../../../services/order.service";

import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/enums/order-status";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})

/**
 * Component for the order edit popup
 *
 *
 */
export class OrderEditComponent implements OnInit {
  public order: Order = {
    id: null,
    itemName: '',
    item: {
      id: null,
      name: '',
      description: '',
      quantity: null,
    },
    quantity: null,
    url: '',
    user: {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      role: UserRole.unknown,
      notificationChannel: NotificationChannel.unknown,
      emailVerification: true,
      isActiveDirectory: false,
    },
    status: OrderStatus.unknown,
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
  public async getOrderData(): Promise<void> {
  }

  /**
   * Changes data of order
   *
   * @param {NgForm} orderEditForm submitted edit form
   */
  public async editOrder(orderEditForm: NgForm): Promise<void> {
  }
}
