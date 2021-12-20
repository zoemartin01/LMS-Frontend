import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";

@Component({
  selector: 'app-inventory-item-edit',
  templateUrl: './inventory-item-edit.component.html',
  styleUrls: ['./inventory-item-edit.component.scss']
})

/**
 * Component for the inventory item edit popup
 *
 * @typedef {Component} InventoryItemEditComponent
 * @class
 */
export class InventoryItemEditComponent implements OnInit {
  public inventoryItem: InventoryItem = {
    id: null,
    name: '',
    description: '',
    quantity: null,
  };

  /**
   * Constructor
   * @param {InventoryService} inventoryService service providing inventory functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(public inventoryService: InventoryService,  private route: ActivatedRoute) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryItem.id = params['id'];
      this.getInventoryItemData();
    });
  }

  /**
   * Gets all data of inventory item
   */
  public async getInventoryItemData() : Promise<void> {
  }

  /**
   * Changes data of inventory item
   *
   * @param {NgForm} inventoryItemEditForm submitted edit form
   */
  public async editInventoryItemData(inventoryItemEditForm: NgForm): Promise<void> {
  }
}
