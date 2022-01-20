import { MessageId } from "./aliases/message-id";

export interface Message {
  id: MessageId,
  title: string,
  content: string,
  correspondingUrl: string|null,
  correspondingUrlText: string|null,
  readStatus: boolean,
}
