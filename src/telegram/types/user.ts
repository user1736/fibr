/**
 * This object represents a Telegram user or bot.
 *
 * {@link https://core.telegram.org/bots/api#user}
 */
export interface User {
  /**
   * Unique identifier for this user or bot. This number may have more than 32 significant bits and
   * some programming languages may have difficulty/silent defects in interpreting it. But it has at
   * most 52 significant bits, so a 64-bit integer or double-precision float type are safe for
   * storing this identifier.
   */
  id: number
  /**
   * True, if this user is a bot
   */
  is_bot: boolean
  /**
   * User's or bot's first name
   */
  first_name: string
  /**
   * User's or bot's last name
   */
  last_name?: string
  /**
   * User's or bot's username
   */
  username?: string
  /**
   * IETF language tag of the user's language
   */
  language_code?: string
  /**
   * True, if the bot can be invited to groups. Returned only in
   * [getMe]{@link https://core.telegram.org/bots/api#getme}.
   */
  can_join_groups?: boolean
  /**
   * True, if privacy mode is disabled for the bot. Returned only in
   * [getMe]{@link https://core.telegram.org/bots/api#getme}.
   */
  can_read_all_group_messages?: boolean
  /**
   * True, if the bot supports inline queries. Returned only in
   * [getMe]{@link https://core.telegram.org/bots/api#getme}.
   */
  supports_inline_queries?: boolean
}
