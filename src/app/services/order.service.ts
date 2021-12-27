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
    //@todo implement
    return this.httpClient.get('');
  }

  /**
   * Retrieves all orders for current user
   */
  public getAllOrdersForCurrentUser(): Observable<any> {
    //@todo implement
    return this.httpClient.get('');
  }

  /**
   * Retrieves all data for one order
   *
   * @param {OrderId} orderId id of order
   */
  public getOrderData(orderId: OrderId): Observable<any> {
    //@todo implement
    return this.httpClient.get('');
  }

  /**
   * Creates order with data
   *
   * @param {Order} order data of new order
   */
  public requestOrder(order: Order): Observable<any> {
    //@todo implement
    return this.httpClient.get('');
  }

  /**
   * Changes data of order
   *
   * @param {OrderId} orderId    id of associated order
   * @param {object} changedData changed fields of order
   */
  public updateOrderData(orderId: OrderId, changedData: object): Observable<any> {
    //@todo implement
    return this.httpClient.get('');
  }

  /**
   * Sets order request to accepted
   *
   * @param {OrderId} orderId id of order
   */
  public acceptOrderRequest(orderId: OrderId): Observable<any> {
    //@todo implement
    return this.httpClient.get('');
  }

  /**
   * Sets order request to declined
   *
   * @param {OrderId} orderId id of order
   */
  public declineOrderRequest(orderId: OrderId): Observable<any> {
    //@todo implement
    return this.httpClient.get('');
  }

  /**
   * Sets order request to accepted
   *
   * @param {OrderId} orderId id of order
   */
  public acceptOrderRequest(orderId: OrderId): Observable<any> {
  }

  /**
   * Sets order request to declined
   *
   * @param {OrderId} orderId id of order
   */
  public declineOrderRequest(orderId: OrderId): Observable<any> {
  }

  /**
   * Deletes order
   *
   * @param {OrderId} orderId id of order
   */
  public deleteOrder(orderId: OrderId): Observable<any> {
    //@todo implement
    return this.httpClient.get('');
  }
}
