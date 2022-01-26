import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

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
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.getAllItems}`;

    return this.httpClient.get(apiURL);
  }

  /**
   * Retrieves all data for one inventory item
   *
   * @param {InventoryItemId} inventoryItemId id of inventory item
   */
  public getInventoryItemData(inventoryItemId: InventoryItemId): Observable<InventoryItem> {
    if (inventoryItemId === null) {
      throw ParseArgumentException;
    }
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.getSingleItem.replace(':id', inventoryItemId)}`;

    return this.httpClient.get<InventoryItem>(apiURL);
  }

  /**
   * Creates inventory item with data
   *
   * @param {InventoryItem} inventoryItem data of new inventory item
   */
  public createInventoryItem(inventoryItem: InventoryItem): Observable<InventoryItem> {
    if (inventoryItem === null) {
      throw ParseArgumentException;
    }
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.createItem}`;

    return this.httpClient.post<InventoryItem>(apiURL, {
      name: inventoryItem.name,
      description: inventoryItem.description,
      quantity: inventoryItem.quantity,
    });
  }

  /**
   * Changes data of inventory item
   *
   * @param {InventoryItemId} inventoryItemId id of associated inventory item
   * @param {object} changedData changed fields of inventory item
   */
  public editInventoryItem(inventoryItemId: InventoryItemId, changedData: object): Observable<InventoryItem> {
    if (inventoryItemId === null) {
      throw ParseArgumentException;
    }
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.updateItem.replace(':id', inventoryItemId)}`;

    return this.httpClient.patch<InventoryItem>(apiURL, changedData);
  }

  /**
   * Deletes inventory item
   *
   * @param {InventoryItemId} inventoryItemId id of inventory item
   */
  public deleteInventoryItem(inventoryItemId: InventoryItemId): Observable<InventoryItem> {
    if (inventoryItemId === null) {
      throw ParseArgumentException;
    }
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.deleteItem.replace(':id', inventoryItemId)}`;

    return this.httpClient.delete<InventoryItem>(apiURL);
  }
}
