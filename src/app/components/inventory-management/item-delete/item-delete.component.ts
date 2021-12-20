import { Component, OnInit } from '@angular/core';

import { InventoryService } from "../../../services/inventory.service";

import { InventoryItem } from "../../../types/inventory-item";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html',
  styleUrls: ['./item-delete.component.scss']
})

/**
 * Component for the deletion of an inventory item
 * @typedef {Component} ItemDeleteComponent
 * @class
 */
export class ItemDeleteComponent implements OnInit {
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
  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryItem.id = params['id'];
    });
  }

  /**
   * Deletes inventory item
   */
  public async deleteInventoryItem(): Promise<void> {
  }
}
