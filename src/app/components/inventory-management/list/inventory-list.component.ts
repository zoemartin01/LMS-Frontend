import { Component, OnInit } from '@angular/core';

import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";
import { InventoryItemId } from "../../../types/aliases/inventory-item-id";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})

/**
 * Component for the inventory list page
 *
 * @typedef {Component} InventoryListComponent
 * @class
 */
export class InventoryListComponent implements OnInit {
  public inventory: InventoryItem[] = [];

  constructor(public inventoryService: InventoryService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.getInventory();
  }
// doesnt list them, just gets the data?
  /**
   * Lists all items with data
   */
  private async getInventory(): Promise<void> {
  }

  /**
   * Opens form to create item
   */
  public openInventoryItemCreationForm(): void {
  }

  /**
   * Opens form to create order
   *
   * @param inventoryItemId id of item to order
   */
  public openOrderCreationForm(inventoryItemId: InventoryItemId): void {
  }

  /**
   * Opens inventory item view
   *
   * @param inventoryItemId id of item to view
   */
  public openInventoryItemView(inventoryItemId: InventoryItemId): void {
  }

  /**
   * Opens inventory item edit form
   *
   * @param inventoryItemId id of item to edit
   */
  public openInventoryItemEditForm(inventoryItemId: InventoryItemId): void {
  }
//deletion
  /**
   * Opens inventory item delete confirmation popup
   */
  public openItemDeletionDialog(inventoryItemId: InventoryItemId): void {
  }
}
