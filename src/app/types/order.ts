import { OrderId } from "./aliases/order-id";
import { User } from "./user";
import { OrderStatus } from "./enums/order-status";


export interface Order {
  id: OrderId,
  item: string,
  quantity: number,
  purchaseUrl: string,
  affiliatedUser: User,
  orderStatus: OrderStatus,
}
