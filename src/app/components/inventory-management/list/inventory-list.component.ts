import { Component, OnInit } from '@angular/core';

import { OrderService } from "../../../services/order.service";

import { InventoryService } from "../../../services/inventory.service";
import { Item} from "../../../types/item";
import {ItemId} from "../../../types/aliases/item-id";

@Component({
  selector: 'app-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  public inventory: Item[] = [];

  constructor(public inventoryService: InventoryService, public orderService: OrderService) {
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
   * Opens item create form
   */
  public openItemCreationForm(): void {
  }

  /**
   * Opens order create form
   */
  public openOrderCreationForm(): void {
  }

  /**
   * Opens item edit form
   *
   * @param itemId id of item to edit
   */
  public openItemEditForm(itemId: ItemId): void {
  }

  /**
   * Opens item delete confirmation popup
   *
   * @param itemId id of item to delete
   */
  public deleteItem(itemId: ItemId): void {
  }
}
