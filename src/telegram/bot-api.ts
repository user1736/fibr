import axios from 'axios'
import { InlineKeyboardMarkup } from './types/inline-keyboard-markup'
import { Message } from './types/message'
import { MessageEntity } from './types/message-entity'
import { ReplyKeyboardMarkup } from './types/reply-keyboard-markup'

/**
 * Client for Telegram Bot API {@link https://core.telegram.org/api}
 */
export class BotApi {
  private readonly apiUrl: string

  /**
   * Creates an api client instance
   *
   * @param token - Bot token received from BotFather
   * @param webhookUrl - Url of the deployed instance
   */
  constructor(token: string, webhookUrl: string) {
    this.apiUrl = `https://api.telegram.org/bot${token}/`

    this.execute('setWebhook', {
      url: webhookUrl,
      // TODO: whitelist only essential update types
      allowed_updates: [],
    })
  }

  /**
   * Use this method to send text messages. On success, the sent Message is returned.
   *
   * @param params
   */
  public async sendMessage(params: SendMessageParams): Promise<Message> {
    return axios.post(this.apiUrl + 'sendMessage', params).then(res => res.data)
  }

  /**
   * Use this method to edit text and [game]{@link https://core.telegram.org/bots/api#games}
   * messages. On success, if the edited message is not an inline message, the edited Message is returned.
   *
   * Note: omit reply_markup param to delete the existing keyboard
   *
   * @param params
   */
  public async editMessageText(params: EditMessageTextParams): Promise<Message> {
    return this.execute('editMessageText', params)
  }

  /**
   * Use this method to edit only the reply markup of messages. On success, if the edited message is
   * not an inline message, the edited Message is returned.
   *
   * Note: omit reply_markup param to delete the existing keyboard
   *
   * @param params
   */
  public async editMessageReplyMarkup(params: EditMessageReplyMarkupParams): Promise<Message> {
    return this.execute('editMessageReplyMarkup', params)
  }

  private async execute<TParams, TResult>(method: string, params: TParams): Promise<TResult> {
    return axios
      .post(this.apiUrl + method, params)
      .then(res => res.data)
      .catch(e => {
        throw new Error(e.response?.data?.description ?? e.message)
      })
  }
}

interface SendMessageParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   */
  chat_id: number | string
  /**
   * Text of the message to be sent, 1-4096 characters after entities parsing
   */
  text: string
  /**
   * Mode for parsing entities in the message text. See [formatting
   * options]{@link https://core.telegram.org/bots/api#formatting-options} for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in message text, which can be specified
   * instead of parse_mode
   */
  entities?: MessageEntity[]
  /**
   * Disables link previews for links in this message
   */
  disable_web_page_preview?: boolean
  /**
   * Sends the message [silently]{@link https://telegram.org/blog/channels-2-0#silent-messages}.
   * Users will receive a notification with no sound.
   */
  disable_notification?: boolean
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number
  /**
   * Pass True, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean
  /**
   * A JSON-serialized object for an [inline
   * keyboard]{@link https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating},
   * [custom reply keyboard]{@link https://core.telegram.org/bots#keyboards}, instructions to remove
   * reply keyboard or to force a reply from the user.
   */
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup
}

interface EditMessageParams {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   */
  chat_id: number | string
  /**
   * Identifier of the message to edit
   */
  message_id: string | number
}

interface EditMessageTextParams extends EditMessageParams {
  /**
   * Text of the message to be sent, 1-4096 characters after entities parsing
   */
  text: string
  /**
   * Mode for parsing entities in the message text. See [formatting
   * options]{@link https://core.telegram.org/bots/api#formatting-options} for more details.
   */
  parse_mode?: string
  /**
   * A JSON-serialized list of special entities that appear in message text, which can be specified
   * instead of parse_mode
   */
  entities?: MessageEntity[]
  /**
   * Disables link previews for links in this message
   */
  disable_web_page_preview?: boolean
  /**
   * A JSON-serialized object for an [inline
   * keyboard]{@link https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating}.
   */
  reply_markup?: InlineKeyboardMarkup
}

interface EditMessageReplyMarkupParams extends EditMessageParams {
  /**
   * A JSON-serialized object for an [inline
   * keyboard]{@link https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating}.
   */
  reply_markup?: InlineKeyboardMarkup
}
