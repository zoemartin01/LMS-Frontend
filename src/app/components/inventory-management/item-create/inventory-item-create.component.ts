import { Component, OnInit } from '@angular/core';

import { InventoryService } from "../../../services/inventory.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-inventory-item-create',
  templateUrl: './inventory-item-create.component.html',
  styleUrls: ['./inventory-item-create.component.scss']
})
export class InventoryItemCreateComponent implements OnInit {

  constructor(public inventoryService: InventoryService) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Creates inventory item with data
   *
   * @param {NgForm} inventoryItemCreationForm submitted create form
   */
  public async openInventoryItemCreationForm(inventoryItemCreationForm: NgForm): Promise<void> {
  }
}
