import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {NgForm} from "@angular/forms";

import { InventoryService } from "../../../services/inventory.service";
import { Item } from "../../../types/item";

@Component({
  selector: 'app-item-view',
  templateUrl: './inventory-item-view.component.html',
  styleUrls: ['./inventory-item-view.component.scss']
})
export class InventoryItemViewComponent implements OnInit {

  constructor(public inventoryService: InventoryService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    // leave method stub like this?
  }

  /**
   * Get all data of item
   */
  private async getItemData() : Promise<void> {
  }

  /**
   * opens item edit form
   *
   * @param {NgForm} itemEditForm submitted create form
   */
  public openItemEditForm(itemEditForm: NgForm): void {
  }

  /**
   * Opens item delete confirmation popup
   */
  public openItemDeletionDialog(): void {
  }

}
