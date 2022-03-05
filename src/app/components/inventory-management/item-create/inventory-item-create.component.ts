import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import {InventoryService} from "../../../services/inventory.service";

import {InventoryItem} from "../../../types/inventory-item";
import {UtilityService} from "../../../services/utility.service";

@Component({
  selector: 'app-inventory-item-create',
  templateUrl: './inventory-item-create.component.html',
  styleUrls: ['./inventory-item-create.component.scss']
})

/**
 * Component for the inventory item create popup
 */
export class InventoryItemCreateComponent {
  public createInventoryItemForm: FormGroup = new FormGroup({
    itemName: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl(''),
    quantity: new FormControl('', [
      Validators.required,
    ])
  });
  public errorMessage = '';

  /**
   * Constructor
   * @constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public inventoryService: InventoryService, public utilityService: UtilityService, public activeModal: NgbActiveModal) {
  }


  /**
   * Opens inventory creation form
   */
  public async createInventoryItem(): Promise<void> {
    this.errorMessage = '';
    if (this.createInventoryItemForm.invalid) {
      this.errorMessage = 'You need to fill in all required fields!'
      return;
    }
    const name = this.createInventoryItemForm.value.itemName;
    const description = this.createInventoryItemForm.value.description;
    const quantity = +this.createInventoryItemForm.value.quantity;
    this.inventoryService.createInventoryItem(name, description, quantity).subscribe({
      next: (inventoryItem: InventoryItem) => {
        if (inventoryItem.id !== null) {
          this.activeModal.close(`created ${inventoryItem.id}`);
        }
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    })
  }
}
