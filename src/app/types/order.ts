import {OrderId} from "./aliases/order-id";
import {OrderStatus} from "./enums/order-status";
import {User} from "./user";
import {InventoryItem} from "./inventory-item";

export interface Order {
  id: OrderId,
  item: InventoryItem | null,
  itemName: string | null,
  quantity: number | null,
  url: string,
  user: User,
  status: OrderStatus,
}
