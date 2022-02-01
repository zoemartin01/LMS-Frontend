import { InventoryItem } from "./inventory-item";
import { User } from "./user";
import { OrderId } from "./aliases/order-id";
import { OrderStatus } from "./enums/order-status";

export interface Order {
  id: OrderId,
  item: InventoryItem | null,
  itemName: string | null,
  quantity: number | null,
  url: string,
  user: User,
  status: OrderStatus,
}
