import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { InventoryService } from "../../../services/inventory.service";

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

  /**
   * Constructor
   * @constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(public inventoryService: InventoryService,  public activeModal: NgbActiveModal, private route: ActivatedRoute) {
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
        this.updateInventoryItemEditForm(res);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Helper method to update inventory item form
   * @param {InventoryItem} inventoryItem inventory item
   * @private
   */
  private updateInventoryItemEditForm(inventoryItem: InventoryItem) {
    this.inventoryItem = inventoryItem;

    this.inventoryItemEditForm.controls['name'].setValue(inventoryItem.name);
    this.inventoryItemEditForm.controls['description'].setValue(inventoryItem.description);
    this.inventoryItemEditForm.controls['quantity'].setValue(inventoryItem.quantity);
  }

  /**
   * Changes data of inventory item
   */
  public async editInventoryItemData(): Promise<void> {
    this.inventoryService.editInventoryItem(this.inventoryItem.id, {
        name: this.inventoryItemEditForm.controls['name'].value,
        description: this.inventoryItemEditForm.controls['description'].value,
        quantity: this.inventoryItemEditForm.controls['quantity'].value,
      }
    ).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
