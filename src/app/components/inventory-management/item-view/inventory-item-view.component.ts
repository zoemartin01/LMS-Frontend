import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { InventoryItemDeleteComponent } from "../item-delete/inventory-item-delete.component";
import { InventoryItemEditComponent } from "../item-edit/inventory-item-edit.component";
import { OrderRequestComponent } from "../../order-management/request/order-request.component";

import { AuthService } from "../../../services/auth.service";
import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";

@Component({
  selector: 'app-inventory-item-view',
  templateUrl: './inventory-item-view.component.html',
  styleUrls: ['./inventory-item-view.component.scss']
})

/**
 * Component for the inventory item view popup
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
  public dirty: boolean = false;

  /**
   * Constructor
   * @constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {AuthService} authService service authentication functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   * @param {NgbModal} modalService service providing modal functionalities
   * @param {Router} router router providing navigation
   */
  constructor(
    public inventoryService: InventoryService,
    public authService: AuthService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router
  ) {
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
        this.dirty = true;
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
      if (result === 'deleted') {
        this.activeModal.close('dirty');
        return;
      }
    });
  }

  /**
   * Opens order creation form for inventory item
   */
  public openOrderCreationForm(): void {
    const modal = this.modalService.open(OrderRequestComponent);
    modal.componentInstance.requestOrderForm.controls['itemName'].setValue(this.inventoryItem.name);
    modal.componentInstance.requestOrderForm.controls['itemName'].disable();
    modal.result.then((result) => {
      if (result.split(' ')[0] === 'created') {
        this.router.navigateByUrl('/orders');
      }
    });
  }
}
