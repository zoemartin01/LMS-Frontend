import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { InventoryItemDeleteComponent } from "../item-delete/inventory-item-delete.component";
import { InventoryItemEditComponent } from "../item-edit/inventory-item-edit.component";

import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";

@Component({
  selector: 'app-inventory-item-view',
  templateUrl: './inventory-item-view.component.html',
  styleUrls: ['./inventory-item-view.component.scss']
})

/**
 * Component for the inventory item view popup
 *
 */
export class InventoryItemViewComponent implements OnInit {
  public inventoryItemViewForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    quantity: new FormControl(null)
  });
  public inventoryItem: InventoryItem = {
    id: null,
    name: '',
    description: '',
    quantity: null,
  };
  public dirty: boolean = true;

  /**
   * Constructor
   * @constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {NgbModal} modalService service providing modal functionalities
   */
  constructor(
    public inventoryService: InventoryService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal) {
    this.inventoryItemViewForm.disable();
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getInventoryItemData();
  }

  /**
   * Gets inventory item data
   */
  public async getInventoryItemData() : Promise<void> {
    this.inventoryService.getInventoryItemData(this.inventoryItem.id).subscribe({
      next: res => {
        this.inventoryItem = res;

        this.inventoryItemViewForm.controls['name'].setValue(res.name);
        this.inventoryItemViewForm.controls['description'].setValue(res.description);
        this.inventoryItemViewForm.controls['quantity'].setValue(res.quantity);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Opens inventory item edit form
   */
  public openInventoryItemEditForm(): void {
    const modal = this.modalService.open(InventoryItemEditComponent);
    modal.componentInstance.inventoryItem.id = this.inventoryItem.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getInventoryItemData();
      }
    });
  }

  /**
   * Opens inventory item deletion confirmation dialog
   */
  public openInventoryItemDeletionDialog(): void {
    const modal = this.modalService.open(InventoryItemDeleteComponent);
    modal.componentInstance.inventoryItem.id = this.inventoryItem.id;
    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.getInventoryItemData();
        this.dirty = true;
      }
    });
  }

}
