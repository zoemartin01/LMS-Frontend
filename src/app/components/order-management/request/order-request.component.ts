import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AdminService } from "../../../services/admin.service";
import { InventoryService } from "../../../services/inventory.service";
import { OrderService } from "../../../services/order.service";

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.scss']
})

/**
 * Component for order request popup
 *
 *
 */
export class OrderRequestComponent {
  public existingItems: String[] = []

  /**
   * Constructor
   * @constructor
   * @param {OrderService} orderService service providing order functionalities
   */
  constructor(public orderService: OrderService, public adminService: AdminService, public inventoryService: InventoryService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getAllInventoryItems()
  }

  /**
   * Gets all inventory items
   */
  public async getAllInventoryItems(): Promise<void> {
  }

  /**
   * Checks url of item to order against urls of whitelisted retailers
   *
   * @param {String} orderUrl name of item to be ordered
   */
  public async checkUrlAgainstWhitelistedRetailers(orderUrl: String): Promise<void> {
  }

  /**
   * Creates order request with data
   *
   * @param {NgForm} orderCreationForm submitted create form
   */
  public async requestOrder(orderCreationForm: NgForm): Promise<void> {
  }
}
