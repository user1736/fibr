/**
 * This object represents an [inline
 * keyboard]{@link https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating} that
 * appears right next to the message it belongs to.
 *
 * Allows for maximum of 8 buttons per row
 *
 * {@link https://core.telegram.org/bots/api#inlinekeyboardmarkup}
 */
export interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][]
}

/**
 * This object represents one button of an inline keyboard
 *
 * {@link https://core.telegram.org/bots/api#inlinekeyboardbutton}
 */
type InlineKeyboardButton = UrlKeyboardButton | CallbackKeyboardButton

interface KeyboardButton {
  /**
   * Label text on the button
   */
  text: string
}

interface UrlKeyboardButton extends KeyboardButton {
  /**
   * HTTP or tg:// url to be opened when the button is pressed. Links tg://user?id=<user_id> can be
   * used to mention a user by their ID without using a username, if this is allowed by their
   * privacy settings.
   */
  url: string
}

interface CallbackKeyboardButton extends KeyboardButton {
  /**
   * Data to be sent in a [callback query]{@link https://core.telegram.org/bots/api#callbackquery} to
   * the bot when button is pressed, 1-64 bytes
   */
  callback_data: string
}
