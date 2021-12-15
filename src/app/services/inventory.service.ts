import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import{ InventoryItem } from "../types/inventory-item";
import { InventoryItemId } from "../types/aliases/inventory-item-id";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for the management of the Inventory
 *
 * @typedef {Service} InventoryService
 * @class
 */
export class InventoryService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves all inventory items
   */
  public getInventoryItems(): Observable<any> {
  }

  /**
   * Retrieves all data for one inventory item
   *
   * @param {InventoryItemId} inventoryItemId id of inventory item
   */
  public getInventoryItemData(inventoryItemId: InventoryItemId): Observable<any> {
  }

  /**
   * Creates inventory item with data
   *
   * @param {InventoryItem} inventoryItem data of new inventory item
   */
  public createInventoryItem(inventoryItem: InventoryItem): Observable<any> {
  }

  /**
   * Changes data of inventory item
   *
   * @param {InventoryItemId} inventoryItemId id of associated inventory item
   * @param {object} changedData changed fields of inventory item
   */
  public changeInventoryItemData(inventoryItemId: InventoryItemId, changedData: object): Observable<any> {
  }

  /**
   * Deletes inventory item
   *
   * @param {InventoryItemId} inventoryItemId id of inventory item
   */
  public deleteInventoryItem(inventoryItemId: InventoryItemId): Observable<any> {
  }
}
