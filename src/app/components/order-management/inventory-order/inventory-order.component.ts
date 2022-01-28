import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { InventoryService } from "../../../services/inventory.service";
import { OrderService } from "../../../services/order.service";

import { InventoryItem } from "../../../types/inventory-item";
import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/enums/order-status";
import {UserRole} from "../../../types/enums/user-role";
import {NotificationChannel} from "../../../types/enums/notification-channel";

@Component({
  selector: 'app-inventory-order',
  templateUrl: './inventory-order.component.html',
  styleUrls: ['./inventory-order.component.scss']
})

/**
 * Component to inventory an order
 *
 *
 */
export class InventoryOrderComponent implements OnInit {
  public order: Order = {
    id: null,
    itemName: null,
    item: null,
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
  public inventoryItems: InventoryItem[] = [];

  /**
   * Constructor
   * @constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {OrderService} orderService service providing order functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(
    public inventoryService: InventoryService,
    public orderService: OrderService,
    private route: ActivatedRoute) {
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
   * Gets all inventory items
   */
  public async getInventoryItems(): Promise<void> {
  }

  /**
   * Sets order status to "inventoried" and creates new inventory item if needed
   *
   * @param {NgForm} inventoryOrderForm submitted inventory form
   */
  public async inventoryOrder(inventoryOrderForm: NgForm): Promise<void> {
  }
}
