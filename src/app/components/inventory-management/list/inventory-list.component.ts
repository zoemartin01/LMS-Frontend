import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { InventoryItemCreateComponent } from "../item-create/inventory-item-create.component";
import { InventoryItemDeleteComponent } from "../item-delete/inventory-item-delete.component";
import { InventoryItemEditComponent } from "../item-edit/inventory-item-edit.component";
import { InventoryItemViewComponent } from "../item-view/inventory-item-view.component";
import { OrderRequestComponent } from "../../order-management/request/order-request.component";

import { AuthService } from "../../../services/auth.service";
import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";
import { InventoryItemId } from "../../../types/aliases/inventory-item-id";
import { PagedList } from 'src/app/types/paged-list';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})

/**
 * Component for the inventory list page
 */
export class InventoryListComponent implements OnInit {
  public inventory: PagedList<InventoryItem> = new PagedList<InventoryItem>();

  /**
   * Constructor
   * @constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {AuthService} authService service providing authentication functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public inventoryService: InventoryService,
    public authService: AuthService,
    private modalService: NgbModal
  ) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getInventory();
  }

  /**
   * Gets all items with data
   *
   * @param {number} page number of current page
   */
  public async getInventory(page: number = this.inventory.page): Promise<void> {
    const pageSize = this.inventory.pageSize;
    const offset = (page - 1) * pageSize;

    this.inventoryService.getInventoryItems(pageSize, offset).subscribe({
      next: res => {
        this.inventory.parse(res, page);
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
    });
  }

  /**
   * Opens form to create order
   *
   * @param {string} inventoryItemName name of item to order
   * @param {InventoryItemId} inventoryItemId name of item to order
   */
  public openOrderCreationForm(inventoryItemName: string, inventoryItemId: InventoryItemId): void {
    const modal = this.modalService.open(OrderRequestComponent);
    modal.componentInstance.requestOrderForm.controls['itemName'].setValue(inventoryItemName);
    modal.componentInstance.requestOrderForm.controls['itemName'].disable();
    modal.result.then((result) => {
      if (result.split(' ')[0] === 'created') {
        this.openInventoryItemViewForm(inventoryItemId);
      }
    });
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
    const modal = this.modalService.open(InventoryItemDeleteComponent);
    modal.componentInstance.inventoryItem.id = inventoryItemId;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getInventory();
      }
    });
  }
}
