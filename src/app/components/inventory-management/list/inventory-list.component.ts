import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import { OrderService } from "../../../services/order.service";
import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";
import { InventoryItemId } from "../../../types/aliases/inventory-item-id";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
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

  /**
   * Lists all items with data
   */
  private async getInventory(): Promise<void> {
  }

  /**
   * Opens form to create item
   */
  public openItemCreationForm(): void {
  }

  /**
   * Opens form to create order
   *
   * @param itemId id of item to order
   */
  public openOrderCreationForm(itemId: InventoryItemId): void {
  }

  /**
   * Opens item edit form
   *
   * @param itemId id of item to edit
   */
  public openItemEditForm(itemId: InventoryItemId): void {
  }

  /**
   * Opens item delete confirmation popup
   */
  public openItemDeletionDialog(itemId: InventoryItemId): void {
  }
}
