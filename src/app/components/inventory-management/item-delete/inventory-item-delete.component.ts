import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import {InventoryService} from "../../../services/inventory.service";

import {InventoryItem} from "../../../types/inventory-item";
import {UtilityService} from "../../../services/utility.service";

@Component({
  selector: 'app-item-delete',
  templateUrl: './inventory-item-delete.component.html',
  styleUrls: ['./inventory-item-delete.component.scss']
})

/**
 * Component for the deletion of an inventory item
 */
export class InventoryItemDeleteComponent implements OnInit {
  public inventoryItemDeleteForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    quantity: new FormControl(null),
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
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {UtilityService} utilityService service providing utility functionalities
   */
  constructor(public inventoryService: InventoryService, public activeModal: NgbActiveModal, public utilityService: UtilityService,
  ) {
    this.inventoryItemDeleteForm.disable();
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
  public async getInventoryItemData(): Promise<void> {
    this.inventoryService.getInventoryItemData(this.inventoryItem.id).subscribe({
      next: res => {
        this.inventoryItem = res;

        this.inventoryItemDeleteForm.controls['name'].setValue(res.name);
        this.inventoryItemDeleteForm.controls['description'].setValue(res.description);
        this.inventoryItemDeleteForm.controls['quantity'].setValue(res.quantity);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Deletes inventory item
   */
  public async deleteInventoryItem(): Promise<void> {
    this.errorMessage = '';
    this.inventoryService.deleteInventoryItem(this.inventoryItem.id).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: error => {
        this.errorMessage = this.utilityService.formatErrorMessage(error);
      }
    });
  }
}
