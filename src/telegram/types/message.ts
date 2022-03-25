import { Chat } from './chat'
import { User } from './user'

/**
 * Message object
 *
 * {@link https://core.telegram.org/bots/api#message}
 */
export interface Message {
  message_id: number
  /**
   * Sender of the message; empty for messages sent to channels. For backward compatibility, the
   * field contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat.
   */
  from?: User
  /**
   * Sender of the message, sent on behalf of a chat. For example, the channel itself for channel
   * posts, the supergroup itself for messages from anonymous group administrators, the linked
   * channel for messages automatically forwarded to the discussion group. For backward
   * compatibility, the field from contains a fake sender user in non-channel chats, if the message
   * was sent on behalf of a chat.
   */
  sender_chat?: Chat
  /**
   * Date the message was sent in Unix time
   */
  date: number
  /**
   * Conversation the message belongs to
   */
  chat: Chat
  /**
   * For text messages, the actual UTF-8 text of the message, 0-4096 characters
   */
  text?: string
}
