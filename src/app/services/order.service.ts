import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Order } from "../types/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  /**
   * Creates order with data
   *
   * @param order data of new order
   */
  public createOrder(order: Order): Observable<any> {

  }

  /**
   * Changes data of order
   *
   * @param orderId      id of associated order
   * @param changedData changed fields of order
   */
  public editOrderData(orderId: number, changedData: object): Observable<any> {
  }

  /**
   * Deletes order
   *
   * @param orderId id of order
   */
  public deleteOrder(orderId: number): Observable<any> {
  }
}
