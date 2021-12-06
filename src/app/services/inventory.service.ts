import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import{ Item } from "../types/item";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }

  /**
   * Creates item with data
   *
   * @param item data of new item
   */
  public createItem(item: Item): Observable<any> {
  }

  /**
   * Changes data of item
   *
   * @param itemId      id of associated item
   * @param changedData changed fields of item
   */
  public editItemData(itemId: number, changedData: object): Observable<any> {
  }

  /**
   * Deletes item
   *
   * @param itemId id of item
   */
  public deleteItem(itemId: number): Observable<any> {
  }
}
