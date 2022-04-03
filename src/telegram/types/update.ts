import { CallbackQuery } from './callback-query'
import { Message } from './message'

/**
 * This object represents an incoming update.
 *
 * {@link https://core.telegram.org/bots/api#getting-updates}
 */
export type Update = MessageUpdate | CallbackQueryUpdate

interface AnyUpdate {
  /**
   * The update's unique identifier. Update identifiers start from a certain positive number and
   * increase sequentially. This ID becomes especially handy if you're using Webhooks, since it
   * allows you to ignore repeated updates or to restore the correct update sequence, should they
   * get out of order. If there are no new updates for at least a week, then identifier of the next
   * update will be chosen randomly instead of sequentially.
   */
  update_id: number
}

/**
 * New incoming message of any kind — text, photo, sticker, etc.
 */
export interface MessageUpdate extends AnyUpdate {
  message: Message
}

export function isMessageUpdate(update: Update): update is MessageUpdate {
  return (update as MessageUpdate).message != null
}

/**
 * New incoming callback query
 */
export interface CallbackQueryUpdate extends AnyUpdate {
  callback_query: CallbackQuery
}

export function isCallbackQueryUpdate(update: Update): update is CallbackQueryUpdate {
  return (update as CallbackQueryUpdate).callback_query != null
}
