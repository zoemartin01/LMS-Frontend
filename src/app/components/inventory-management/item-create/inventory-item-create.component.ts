import { Component } from '@angular/core';

import { InventoryService } from "../../../services/inventory.service";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {InventoryItem} from "../../../types/inventory-item";
import {InventoryItemId} from "../../../types/aliases/inventory-item-id";
import {Router} from "@angular/router";

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
  public inventoryItems: String[] = []

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
   * @param {Router} router router providing navigation
   */
  constructor(public inventoryService: InventoryService, private router: Router) {
  }

  /**
   * Opens inventory creation form
   *
   * @param {NgForm} inventoryItemCreationForm submitted create form
   */
  public async createInventoryItem(): Promise<void> {
    if (this.createInventoryItemForm.valid) {
      const inventoryItem: InventoryItem = {
        id: null,
        name: this.createInventoryItemForm.value.itemName,
        description: this.createInventoryItemForm.value.description,
        quantity: this.createInventoryItemForm.value.quantity,
      }
      this.inventoryService.createInventoryItem(inventoryItem).subscribe({
        next: (inventoryItem: InventoryItem) => {
          if (inventoryItem.id !== null ) {
            this.router.navigateByUrl('/inventory/item/:id'
              .replace(':id', inventoryItem.id))
          }
        },
        error: error => {
          this.createInventoryItemError = true;
          this.createInventoryItemErrorMessage = error;
          console.error('There was an error!', error);
        }
      })
    } else {
      this.createInventoryItemError = true;
      this.createInventoryItemErrorMessage = 'Invalid form values';
    }
  }
}
