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
  private async getOrderData(): Promise<void> {
  }

  /**
   * Get all inventory items
   */
  private async getInventoryItems(): Promise<void> {
  }

  /**
   * Inventories order
   *
   * @param {NgForm} inventoryOrderForm submitted inventory form
   */
  public async inventoryOrder(inventoryOrderForm: NgForm): Promise<void> {
  }
}
