import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { InventoryService } from "../../../services/inventory.service";
import { UtilityService } from "../../../services/utility.service";

import { InventoryItem } from "../../../types/inventory-item";

@Component({
  selector: 'app-inventory-item-edit',
  templateUrl: './inventory-item-edit.component.html',
  styleUrls: ['./inventory-item-edit.component.scss']
})

/**
 * Component for the inventory item edit popup
 */
export class InventoryItemEditComponent implements OnInit {
  public inventoryItemEditForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    quantity: new FormControl(null, Validators.required),
  });
  public inventoryItem: InventoryItem = {
    id: null,
    name: '',
    description: '',
    quantity: null,
  };
  public errorMessage = '';

  /**
   * Constructor
   * @constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {UtilityService} utilityService service providing utility functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(
    public inventoryService: InventoryService,
    public utilityService: UtilityService,
    public activeModal: NgbActiveModal
  ) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getInventoryItemData();
  }

  /**
   * Gets all data of inventory item
   */
  public async getInventoryItemData() : Promise<void> {
    this.inventoryService.getInventoryItemData(this.inventoryItem.id).subscribe({
      next: res => {
        this.inventoryItem = res;

        this.inventoryItemEditForm.controls['name'].setValue(res.name);
        this.inventoryItemEditForm.controls['description'].setValue(res.description);
        this.inventoryItemEditForm.controls['quantity'].setValue(res.quantity);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  /**
   * Changes data of inventory item
   */
  public async editInventoryItemData(): Promise<void> {
    this.errorMessage = '';

    if(this.inventoryItemEditForm.invalid){
      this.errorMessage = 'You need to fill in all required fields!'
      return;
    }

    let changedData = this.utilityService.getDirtyValues(this.inventoryItemEditForm);

    if (this.inventoryItemEditForm.controls['quantity'].dirty) {
      changedData['quantity'] = +changedData['quantity'];
    }

    this.inventoryService.editInventoryItem(
      this.inventoryItem.id,
      changedData
    ).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }
}
