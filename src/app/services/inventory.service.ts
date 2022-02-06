import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import{ InventoryItem } from "../types/inventory-item";
import { InventoryItemId } from "../types/aliases/inventory-item-id";
import { PagedResponse } from '../types/paged-response';

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

  /**
   * constructor
   * @param {HttpClient} httpClient httpClient of service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves all inventory items
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getInventoryItems(limit: number = 0, offset: number = 0): Observable<PagedResponse<InventoryItem>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.getAllItems}` +
    `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<InventoryItem>>(apiURL);
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
   * @param {string} name name of item
   * @param {string} description description of item
   * @param {number} quantity quantity of item
   */
  public createInventoryItem(name: string, description: string, quantity: number): Observable<InventoryItem> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.inventory_item.createItem}`;

    const reqBody = {
      name: name,
      description: description,
      quantity: quantity,
    };
    return this.httpClient.post<InventoryItem>(apiURL, reqBody);
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
