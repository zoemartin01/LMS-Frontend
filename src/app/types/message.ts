import { MessageId } from "./aliases/message-id";

export interface Message {
  id: MessageId,
  title: string,
  content: string,
  link: {
    url: string,
    text: string,
  },
}
