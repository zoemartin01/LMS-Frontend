import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { OrderService } from "../../../services/order.service";
import { AdminService } from "../../../services/admin.service";
import { InventoryService } from "../../../services/inventory.service";

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
  public existingItems: String[] = []
  public whitelistedRetailerUrls: String[] = []

  //TODO: do we need the extra services to get whitelisted retailer urls/inventory item names?
  /**
   * Constructor
   * @param {OrderService} orderService service providing order functionalities
   */
  constructor(public orderService: OrderService, public adminService: AdminService, public inventoryService: InventoryService) {
  }


  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getAllItemNames()
    this.getAllWhitelistedRetailerUrls()
  }

  /**
   * Gets all names of existing inventory items
   */
  public async getAllItemNames(): Promise<void> {
  }

  /**
   * Gets all urls of whitelisted retailers
   */
  public async getAllWhitelistedRetailerUrls(): Promise<void> {
  }

  //TODO: also check for existing order names?
  //TODO: check in component or in service? when in component: Mario has to change his admin service
  /**
   * Checks name of item to order against names of all existing inventory items
   *
   * @param {String} orderItemName name of item to be ordered
   */
  public async checkNameAgainstExistingInventoryItems(orderItemName: String): Promise<void> {
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
