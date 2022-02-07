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
    description: new FormControl(''),
    quantity: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ])
  });

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
      const name = this.createInventoryItemForm.value.itemName;
      const description = this.createInventoryItemForm.value.description;
      const quantity = +this.createInventoryItemForm.value.quantity;
      this.inventoryService.createInventoryItem(name, description,quantity).subscribe({
        next: (inventoryItem: InventoryItem) => {
          if (inventoryItem.id !== null ) {
            this.activeModal.close(`created ${inventoryItem.id}`);
          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    } else {
      console.error('Invalid form values');
    }
  }
}
