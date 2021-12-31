import { OrderId } from "./aliases/order-id";
import { UserId } from "./aliases/user-id";
import { OrderStatus } from "./enums/order-status";

export interface Order {
  id: OrderId,
  item: string,
  quantity: number|null,
  purchaseUrl: string,
  userId: UserId,
  userFullName: string,
  orderStatus: OrderStatus,
}
