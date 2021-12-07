import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import {InventoryService} from "../../../services/inventory.service";


@Component({
  selector: 'app-inventory-order',
  templateUrl: './inventory-order.component.html',
  styleUrls: ['./inventory-order.component.scss']
})
export class InventoryOrderComponent implements OnInit {

  constructor(inventoryService: InventoryService) {
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
   * Opens form to put data of order in a new inventory item
   *
   * @param {NgForm} itemCreationForm submitted edit form
   */
  public async openItemCreationForm(itemCreationForm: NgForm): Promise<void> {
  }
}
