import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {InventoryService} from "../../../services/inventory.service";

@Component({
  selector: 'app-inventory-order',
  templateUrl: './inventory-order.component.html',
  styleUrls: ['./inventory-order.component.scss']
})
export class InventoryOrderComponent implements OnInit {

  constructor(public inventoryService: InventoryService) {
  }

  ngOnInit(): void {
  }

  /**
   * Get all data of order
   */
  private async getOrderData() : Promise<void> {
  }

  /**
   * Inventories order
   *
   * @param {NgForm} inventoryOrderForm submitted edit form
   */
  public async inventoryOrder(inventoryOrderForm: NgForm): Promise<void> {
  }
}
