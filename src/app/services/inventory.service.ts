import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

import{ InventoryItem } from "../types/inventory-item";
import { InventoryItemId } from "../types/aliases/inventory-item-id";
import {ParseArgumentException} from "@angular/cli/models/parser";

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
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.getAllItems}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Retrieves all data for one inventory item
   *
   * @param {InventoryItemId} inventoryItemId id of inventory item
   */
  public getInventoryItemData(inventoryItemId: InventoryItemId): Observable<any> {
    if (inventoryItemId === null) {
      throw ParseArgumentException;
    }
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.getSingleItem.replace(':id', inventoryItemId)}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Creates inventory item with data
   *
   * @param {InventoryItem} inventoryItem data of new inventory item
   */
  public createInventoryItem(inventoryItem: InventoryItem): Observable<any> {
    if (inventoryItem === null) {
      throw ParseArgumentException;
    }
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.createItem}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Changes data of inventory item
   *
   * @param {InventoryItemId} inventoryItemId id of associated inventory item
   * @param {object} changedData changed fields of inventory item
   */
  public changeInventoryItemData(inventoryItemId: InventoryItemId, changedData: object): Observable<any> {
    if (inventoryItemId === null) {
      throw ParseArgumentException;
    }
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.updateItem.replace(':id', inventoryItemId)}`;

    return this.httpClient.patch(apiURL, changedData);
  }

  /**
   * Deletes inventory item
   *
   * @param {InventoryItemId} inventoryItemId id of inventory item
   */
  public deleteInventoryItem(inventoryItemId: InventoryItemId): Observable<any> {
    if (inventoryItemId === null) {
      throw ParseArgumentException;
    }
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.deleteItem.replace(':id', inventoryItemId)}`;

    return this.httpClient.delete(apiURL);
  }
}
