import { Component } from '@angular/core';

import { InventoryService } from "../../../services/inventory.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-inventory-item-create',
  templateUrl: './inventory-item-create.component.html',
  styleUrls: ['./inventory-item-create.component.scss']
})

/**
 * Component for the inventory item create popup
 *
 * @typedef {Component} InventoryItemCreateComponent
 * @class
 */
export class InventoryItemCreateComponent {

  constructor(public inventoryService: InventoryService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }
  /**
   * Opens inventory creation form
   *
   * @param {NgForm} inventoryItemCreationForm submitted create form
   */
  public async createInventoryItem(inventoryItemCreationForm: NgForm): Promise<void> {
  }
}
