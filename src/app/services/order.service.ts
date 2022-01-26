import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Order } from "../types/order";
import { OrderId } from "../types/aliases/order-id";
import {environment} from "../../environments/environment";
import {User} from "../types/user";
import {Appointment} from "../types/appointment";
import {ParseArgumentException} from "@angular/cli/models/parser";
import {ConfirmationStatus} from "../types/enums/confirmation-status";
import {OrderStatus} from "../types/enums/order-status";

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
  public getAllOrders(): Observable<Order[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.getAllOrders}`;

    return this.httpClient.get<Order[]>(apiURL);
  }

  /**
   * Retrieves all orders for current user
   */
  public getAllOrdersForCurrentUser(): Observable<Order[]> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.getCurrentUserOrders}`;

    return this.httpClient.get<Order[]>(apiURL);
  }

  /**
   * Retrieves all data for one order
   *
   * @param {OrderId} orderId id of order
   */
  public getOrderData(orderId: OrderId): Observable<any> {
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
   * @param {Order} order data of new order
   */
  public requestOrder(order: Order): Observable<any> {
    const apiURL = `${environment.baseUrl}${environment.apiRoutes.orders.createOrder}`;

    return this.httpClient.post<Order>(apiURL, order);
  }

  /**
   * Changes data of order
   *
   * @param {OrderId} orderId    id of associated order
   * @param {object} changedData changed fields of order
   */
  public updateOrderData(orderId: OrderId, changedData: object): Observable<any> {
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
  public acceptOrderRequest(orderId: OrderId): Observable<any> {
    return this.updateOrderData(orderId, { orderStatus: OrderStatus.ordered });
  }

  /**
   * Sets order request to declined
   *
   * @param {OrderId} orderId id of order
   */
  public declineOrderRequest(orderId: OrderId): Observable<any> {
    return this.updateOrderData(orderId, { orderStatus: OrderStatus.denied });
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
