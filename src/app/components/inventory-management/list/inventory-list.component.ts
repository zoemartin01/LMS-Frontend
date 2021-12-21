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
 *
 *
 */
export class InventoryListComponent implements OnInit {
  public inventory: InventoryItem[] = [];

  /**
   * Constructor
   * @constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   */
  constructor(public inventoryService: InventoryService) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getInventory();
  }

  /**
   * Gets all items with data
   */
  public async getInventory(): Promise<void> {
  }

  /**
   * Opens form to create item
   */
  public openInventoryItemCreationForm(): void {
  }

  /**
   * Opens form to create order
   *
   * @param {InventoryItemId} inventoryItemId id of item to order
   */
  public openOrderCreationForm(inventoryItemId: InventoryItemId): void {
  }

  /**
   * Opens inventory item view
   *
   * @param {InventoryItemId} inventoryItemId id of item to view
   */
  public openInventoryItemView(inventoryItemId: InventoryItemId): void {
  }

  /**
   * Opens inventory item edit form
   *
   * @param {InventoryItemId} inventoryItemId id of item to edit
   */
  public openInventoryItemEditForm(inventoryItemId: InventoryItemId): void {
  }

  /**
   * Opens inventory item deletion confirmation dialog
   *
   * @param {InventoryItemId} inventoryItemId id of item to delete
   */
  public openItemDeletionDialog(inventoryItemId: InventoryItemId): void {
  }
}
