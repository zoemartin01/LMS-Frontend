import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Order } from "../types/order";
import { OrderId } from "../types/aliases/order-id";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for the management of orders
 *
 * @typedef {Service} OrderService
 * @class
 */
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves all orders
   */
  public getAllOrders(): Observable<any> {
  }

  /**
   * Retrieves all orders for current user
   */
  public getAllOrdersForCurrentUser(): Observable<any> {
  }

  /**
   * Retrieves all data for one order
   *
   * @param {OrderId} orderId id of order
   */
  public getOrderData(orderId: OrderId): Observable<any> {
  }

  /**
   * Creates order with data
   *
   * @param {Order} order data of new order
   */
  public requestOrder(order: Order): Observable<any> {
  }

  /**
   * Changes data of order
   *
   * @param {OrderId} orderId    id of associated order
   * @param {object} changedData changed fields of order
   */
  public updateOrderData(orderId: OrderId, changedData: object): Observable<any> {
  }

  /**
   * Deletes order
   *
   * @param {OrderId} orderId id of order
   */
  public deleteOrder(orderId: OrderId): Observable<any> {
  }
}
