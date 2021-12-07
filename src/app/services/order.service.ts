import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Order } from "../types/order";
import { OrderId } from "../types/aliases/order-id";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Creates order with data
   *
   * @param {Order} order data of new order
   */
  public createOrder(order: Order): Observable<any> {
  }

  /**
   * Changes data of order
   *
   * @param {OrderId} orderId    id of associated order
   * @param {object} changedData changed fields of order
   */
  public editOrderData(orderId: OrderId, changedData: object): Observable<any> {
  }

  /**
   * Deletes order
   *
   * @param {OrderId} orderId id of order
   */
  public deleteOrder(orderId: OrderId): Observable<any> {
  }
}
