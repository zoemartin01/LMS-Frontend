import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

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
 *
 *
 */
export class InventoryItemViewComponent implements OnInit {
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
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(public inventoryService: InventoryService, private route: ActivatedRoute) {
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
   * Opens inventory item edit form
   */
  public openInventoryItemEditForm(): void {
  }

  /**
   * Opens inventory item deletion confirmation dialog
   */
  public openInventoryItemDeletionDialog(): void {
  }

}
