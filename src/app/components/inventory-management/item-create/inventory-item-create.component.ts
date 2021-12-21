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
  public inventoryItems: String[] = []

  /**
   * Constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   */
  constructor(public inventoryService: InventoryService) {
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
   * Opens inventory creation form
   *
   * @param {NgForm} inventoryItemCreationForm submitted create form
   */
  public async createInventoryItem(inventoryItemCreationForm: NgForm): Promise<void> {
  }
}
