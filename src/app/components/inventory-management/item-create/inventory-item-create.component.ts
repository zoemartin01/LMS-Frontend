import { Component, OnInit } from '@angular/core';

import { InventoryService } from "../../../services/inventory.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-item-create',
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
   * Creates item with data
   *
   * @param {NgForm} itemCreationForm submitted create form
   */
  public async openItemCreationForm(itemCreationForm: NgForm): Promise<void> {
  }
}
