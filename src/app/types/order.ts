import { OrderId } from "./aliases/order-id";
import { User } from "./user";
import { OrderStatus } from "./enums/order-status";
import {UserId} from "./aliases/user-id";


export interface Order {
  id: OrderId,
  item: string,
  quantity: number,
  purchaseUrl: string,
  userId: UserId,
  orderStatus: OrderStatus,
}
