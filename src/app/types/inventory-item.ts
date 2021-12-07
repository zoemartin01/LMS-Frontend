import{ InventoryItemId } from "./aliases/inventory-item-id";

export interface InventoryItem {
  id: InventoryItemId,
  name: string,
  description: string,
  quantity: number|null,
}
