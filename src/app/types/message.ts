import { MessageId } from "./aliases/message-id";

export interface Message {
  id: MessageId,
  title: string,
  content: string,
  linkUrl: string|null,
  linkText: string|null,
  readStatus: boolean,
}
