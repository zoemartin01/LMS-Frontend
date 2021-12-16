import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { InventoryService } from "../../../services/inventory.service";
import { OrderService } from "../../../services/order.service";

import { InventoryItem } from "../../../types/inventory-item";
import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/enums/order-status";

@Component({
  selector: 'app-inventory-order',
  templateUrl: './inventory-order.component.html',
  styleUrls: ['./inventory-order.component.scss']
})

/**
 * Component to inventory an order
 * @typedef {Component} InventoryOrderComponent
 * @class
 */
export class InventoryOrderComponent implements OnInit {
  public order: Order = {
    id: null,
    item: '',
    quantity: null,
    purchaseUrl: '',
    userId: null,
    orderStatus: OrderStatus.unknown,
  }
  public inventoryItems: InventoryItem[] = [];

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
  private async getOrderData(): Promise<void> {
  }

  /**
   * Gets all inventory items
   */
  private async getInventoryItems(): Promise<void> {
  }
//@TODO creates always or only if item is new?
  /**
   * Sets order status to "inventoried" and creates new inventory item
   *
   * @param {NgForm} inventoryOrderForm submitted inventory form
   */
  public async inventoryOrder(inventoryOrderForm: NgForm): Promise<void> {
  }
}
