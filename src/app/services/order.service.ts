import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { Order } from "../types/order";
import { OrderId } from "../types/aliases/order-id";
import { OrderStatus } from "../types/enums/order-status";
import { PagedResponse } from '../types/paged-response';

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

  /**
   * constructor
   * @param {HttpClient} httpClient httpClient of service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves all pending orders
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getAllPendingOrders(limit: number = 0, offset: number = 0): Observable<PagedResponse<Order>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.getAllPendingOrders}` +
      `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Order>>(apiURL);
  }

  /**
   * Retrieves all accepted orders
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getAllAcceptedOrders(limit: number = 0, offset: number = 0): Observable<PagedResponse<Order>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.getAllAcceptedOrders}` +
      `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Order>>(apiURL);
  }

  /**
   * Retrieves all declined orders
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getAllDeclinedOrders(limit: number = 0, offset: number = 0): Observable<PagedResponse<Order>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.getAllDeclinedOrders}` +
      `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Order>>(apiURL);
  }

  /**
   * Retrieves all pending orders for current user
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getAllPendingOrdersForCurrentUser(limit: number = 0, offset: number = 0): Observable<PagedResponse<Order>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.getCurrentUsersPendingOrders}` +
      `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Order>>(apiURL);
  }

  /**
   * Retrieves all accepted orders for current user
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getAllAcceptedOrdersForCurrentUser(limit: number = 0, offset: number = 0): Observable<PagedResponse<Order>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.getCurrentUsersAcceptedOrders}` +
      `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Order>>(apiURL);
  }

  /**
   * Retrieves all declined orders for current user
   *
   * @param {number} limit maximum of loaded entities per request
   * @param {number} offset start of loaded entities per request
   */
  public getAllDeclinedOrdersForCurrentUser(limit: number = 0, offset: number = 0): Observable<PagedResponse<Order>> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.getCurrentUsersDeclinedOrders}` +
      `?limit=${limit}&offset=${offset}`;

    return this.httpClient.get<PagedResponse<Order>>(apiURL);
  }

  /**
   * Retrieves all data for one order
   *
   * @param {OrderId} orderId id of order
   */
  public getOrderData(orderId: OrderId): Observable<Order> {
    if (orderId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.getSingleOrder
      .replace(':id', orderId)}`;

    return this.httpClient.get<Order>(apiURL);
  }

  /**
   * Creates order with data
   *
   * @param {string} itemName name of item
   * @param {number} quantity quantity of item
   * @param {string} url url of item order
   */
  public requestOrder(itemName: string, quantity: number, url: string): Observable<Order> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.createOrder}`;

    const requestBody = {
      itemName: itemName,
      quantity: quantity,
      url: url,
    }

    return this.httpClient.post<Order>(apiURL, requestBody);
  }

  /**
   * Changes data of order
   *
   * @param {OrderId} orderId    id of associated order
   * @param {object} changedData changed fields of order
   */
  public updateOrderData(orderId: OrderId, changedData: object): Observable<Order> {
    if (orderId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.updateOrder
      .replace(':id', orderId)}`;

    return this.httpClient.patch<Order>(apiURL, changedData);
  }

  /**
   * Sets order request to accepted
   *
   * @param {OrderId} orderId id of order
   */
  public acceptOrderRequest(orderId: OrderId): Observable<Order> {
    return this.updateOrderData(orderId, { status: OrderStatus.ordered });
  }

  /**
   * Sets order request to declined
   *
   * @param {OrderId} orderId id of order
   */
  public declineOrderRequest(orderId: OrderId): Observable<Order> {
    return this.updateOrderData(orderId, { status: OrderStatus.declined });
  }

  /**
   * Deletes order
   *
   * @param {OrderId} orderId id of order
   */
  public deleteOrder(orderId: OrderId): Observable<void> {
    if (orderId === null) {
      throw ParseArgumentException;
    }

    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.deleteOrder
      .replace(':id', orderId)}`;

    return this.httpClient.delete<void>(apiURL);
  }
}
