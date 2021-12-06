import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { InventoryService } from "../../../services/inventory.service";
import { Item } from "../../../types/item";


@Component({
  selector: 'app-item-edit',
  templateUrl: './inventory-item-edit.component.html',
  styleUrls: ['./inventory-item-edit.component.scss']
})
export class InventoryItemEditComponent implements OnInit {

  // do we really need route here? don't really get what for
  constructor(public inventoryService: InventoryService,  private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    // not sure if here should be the code for route stuff
    // will leave the method stub like this...?
  }

  /**
   * Get all data of item
   */
  public async getItemData() : Promise<void> {
  }

  /**
   * Changes data of item
   *
   * @param itemEditForm submitted create form
   */
  public async editItemData(itemEditForm: NgForm): Promise<void> {
  }
}
