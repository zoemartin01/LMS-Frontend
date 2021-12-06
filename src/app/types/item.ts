import{ ItemId } from "./aliases/item-id";

export interface Item {
  itemId: ItemId,
  item: string,
  description: string,
  quantity: number,
}
