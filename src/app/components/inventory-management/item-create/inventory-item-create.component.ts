import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";

@Component({
  selector: 'app-inventory-item-create',
  templateUrl: './inventory-item-create.component.html',
  styleUrls: ['./inventory-item-create.component.scss']
})

/**
 * Component for the inventory item create popup
 *
 *
 *
 */
export class InventoryItemCreateComponent {
  public inventoryItems: InventoryItem[] = [];
  public createInventoryItemForm: FormGroup = new FormGroup({
    itemName: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
    quantity: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ])
  });
  createInventoryItemError: boolean = false;
  createInventoryItemErrorMessage: string = '';

  /**
   * Constructor
   * @constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public inventoryService: InventoryService, public activeModal: NgbActiveModal) {
  }

  /**
   * Opens inventory creation form
   */
  public async createInventoryItem(): Promise<void> {
    if (this.createInventoryItemForm.valid) {
      const inventoryItem: InventoryItem = {
        id: null,
        name: this.createInventoryItemForm.value.itemName,
        description: this.createInventoryItemForm.value.description,
        quantity: this.createInventoryItemForm.value.quantity,
      };

      this.inventoryService.createInventoryItem(inventoryItem).subscribe({
        next: (inventoryItem: InventoryItem) => {
          if (inventoryItem.id !== null ) {
            this.activeModal.close(`created ${inventoryItem.id}`);
          }
        },
        error: error => {
          this.createInventoryItemError = true;
          this.createInventoryItemErrorMessage = error.error.message;
          console.error('There was an error!', error);
        }
      })
    } else {
      this.createInventoryItemError = true;
      this.createInventoryItemErrorMessage = 'Invalid form values';
    }
  }
}
