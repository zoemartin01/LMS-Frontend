import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { InventoryItemCreateComponent } from "../item-create/inventory-item-create.component";
import { InventoryItemViewComponent } from "../item-view/inventory-item-view.component";

import { AuthService } from "../../../services/auth.service";
import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";
import { InventoryItemId } from "../../../types/aliases/inventory-item-id";
import {InventoryItemEditComponent} from "../item-edit/inventory-item-edit.component";

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
   * @param {AuthService} authService service providing authentication functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(public inventoryService: InventoryService, public authService: AuthService, private modalService: NgbModal) {
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
    this.inventoryService.getInventoryItems().subscribe({
      next: res => {
        this.inventory = res;
      },
      error: error => {
        console.error('There was an error!', error);
    }
  })
  }

  /**
   * Opens form to create item
   */
  public openInventoryItemCreationForm(): void {
    const modal = this.modalService.open(InventoryItemCreateComponent);
    modal.result.then((result) => {
      if (result.split(' ')[0] === 'created') {
        this.openInventoryItemViewForm(result.split(' ')[1]);
      }

      if (result !== 'aborted') {
        this.getInventory();
      }
    });
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
  public openInventoryItemViewForm(inventoryItemId: InventoryItemId): void {
    const modal = this.modalService.open(InventoryItemViewComponent);
    modal.componentInstance.inventoryItem.id = inventoryItemId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getInventory();
      }
    });
  }

  /**
   * Opens inventory item edit form
   *
   * @param {InventoryItemId} inventoryItemId id of item to edit
   */
  public openInventoryItemEditForm(inventoryItemId: InventoryItemId): void {
    const modal = this.modalService.open(InventoryItemEditComponent);
    modal.componentInstance.inventoryItem.id = inventoryItemId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getInventory();
      }
    });
  }

  /**
   * Opens inventory item deletion confirmation dialog
   *
   * @param {InventoryItemId} inventoryItemId id of item to delete
   */
  public openItemDeletionDialog(inventoryItemId: InventoryItemId): void {
  }
}
