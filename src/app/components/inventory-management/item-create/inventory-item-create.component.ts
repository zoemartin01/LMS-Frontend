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
  public inventoryItemNames: String[] = []

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
    this.getAllInventoryItemNames()
  }

  /**
   * Gets all names of existing inventory items
   */
  public async getAllInventoryItemNames(): Promise<void> {
  }

  /**
   * Checks if name of item to be created against the names of all existing items
   *
   * @param {String} itemName name of the item to be created
   */
  public async checkNameAgainstExistingInventoryItems(itemName: String): Promise<void> {
  }


  /**
   * Opens inventory creation form
   *
   * @param {NgForm} inventoryItemCreationForm submitted create form
   */
  public async createInventoryItem(inventoryItemCreationForm: NgForm): Promise<void> {
  }
}
