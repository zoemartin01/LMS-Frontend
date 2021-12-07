import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import { OrderService } from "../../../services/order.service";
import { InventoryService } from "../../../services/inventory.service";

import { Item } from "../../../types/item";
import { ItemId } from "../../../types/aliases/item-id";

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
   * Opens form to create item
   *
   * @param {ngForm} itemCreationForm submitted create form
   */
  public openItemCreationForm(itemCreationForm: NgForm): void {
  }

  /**
   * Opens form to create order
   *
   * @param {ngForm} orderCreationForm submitted create form
   */
  public openOrderCreationForm(orderCreationForm: NgForm): void {
  }

  /**
   * Opens item edit form
   *
   * @param itemId id of item to edit
   * @param {NgForm} itemEditForm submitted edit form
   */
  public openItemEditForm(itemId: ItemId, itemEditForm: NgForm): void {
  }

  /**
   * Opens item delete confirmation popup
   *
   */
  public openItemDeletionDialog(): void {
  }
}
