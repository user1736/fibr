import { BotApi } from './bot-api'
import { Message } from './types/message'
import { isCallbackQueryUpdate, isMessageUpdate, Update } from './types/update'

interface Note {
  title?: string
  content: string
  tags: string[]
}

enum Command {
  editTitle = '$$editTitle$$',
  editTags = '$$editTags$$',
  saveTags = '$$saveTags$$',
  resetTags = '$$resetTags$$',
  editLinks = '$$editLinks$$',
  saveNote = '$$saveNote$$',
  discardNote = '$$discardNote$$',
}

const tagPrefix = '$$tag$$'
const sampleTags = ['foo', 'bar', 'baz', 'snafu']

export class CommandHandler {
  private note: Note | null = null
  private pendingTags = new Set<string>()
  private lastInteractiveMessage: [chat_id: number, message_id: number] | null = null

  constructor(private api: BotApi) {}

  public handle(update: Update) {
    if (isMessageUpdate(update)) {
      const {
        message: { text, message_id, chat },
      } = update

      return this.handleMessageUpdate(text, chat.id, message_id)
    }

    if (isCallbackQueryUpdate(update)) {
      const {
        data,
        message: { message_id, chat },
      } = update.callback_query

      return this.handleCallback(data, chat.id, message_id)
    }
  }

  private async handleMessageUpdate(text: string, chat_id: number, message_id?: number) {
    let message: Message
    if (!this.note) {
      this.note = {
        content: text,
        tags: [],
      }

      message = await this.api.sendMessage({
        chat_id,
        reply_to_message_id: message_id,
        text: 'New note created',
        reply_markup: this.getMainMenuKeyboard(),
      })
    } else {
      this.note.title = text
      message = await this.api.sendMessage({
        chat_id,
        text: this.printNote(this.note),
        reply_markup: this.getMainMenuKeyboard(),
      })
    }
    if (
      this.lastInteractiveMessage?.[0] !== message.chat.id ||
      this.lastInteractiveMessage?.[1] !== message_id
    ) {
      if (this.lastInteractiveMessage) {
        const [prevChatId, prevMessageId] = this.lastInteractiveMessage
        this.api.editMessageReplyMarkup({ chat_id: prevChatId, message_id: prevMessageId })
      }

      this.lastInteractiveMessage = [message.chat.id, message.message_id]
    }
  }

  private async handleCallback(
    data: string,
    chat_id: number,
    message_id: number,
  ): Promise<unknown> {
    if (!this.note) {
      /**
       * Erase keyboard on a dated message
       */
      return this.api.editMessageReplyMarkup({ chat_id, message_id })
    }

    switch (data) {
      case Command.editTitle:
        return this.api.sendMessage({
          chat_id,
          text: 'OK. Send me a new title for the note',
        })
      case Command.editTags:
        return this.api.editMessageText({
          chat_id,
          message_id,
          text: 'Select node tags',
          reply_markup: this.getTagKeyboard(),
        })
      case Command.saveTags:
        this.note.tags = Array.from(this.pendingTags)
        this.api.editMessageText({
          chat_id,
          message_id,
          text: this.printNote(this.note),
          reply_markup: this.getMainMenuKeyboard(),
        })
        return
      case Command.resetTags:
        this.pendingTags = new Set(this.note.tags)
        this.api.editMessageText({
          chat_id,
          message_id,
          text: this.printNote(this.note),
          reply_markup: this.getMainMenuKeyboard(),
        })
        return
      case Command.discardNote:
        this.note = null
        this.pendingTags = new Set()
        this.api.editMessageText({
          chat_id,
          message_id,
          text: 'Note discarded',
        })
        return
      case Command.saveNote:
        // TODO: add note save logic
        this.note = null
        this.pendingTags = new Set()
        this.api.editMessageText({
          chat_id,
          message_id,
          text: 'Note saved',
        })
        return
    }

    if (data.startsWith(tagPrefix)) {
      const tag = data.slice(tagPrefix.length)
      this.pendingTags.has(tag) ? this.pendingTags.delete(tag) : this.pendingTags.add(tag)
      this.api.editMessageReplyMarkup({
        chat_id,
        message_id,
        reply_markup: this.getTagKeyboard(),
      })
      return
    }
  }

  private printNote(note: Note) {
    return [
      `title: ${note.title ?? '<empty>'}`,
      `content: ${note.content}`,
      `tags: ${note.tags.join(', ')}`,
    ].join('\n')
  }

  private getMainMenuKeyboard() {
    return {
      inline_keyboard: [
        [{ text: 'Edit title', callback_data: Command.editTitle }],
        [{ text: 'Edit tags', callback_data: Command.editTags }],
        [{ text: 'Edit links', callback_data: Command.editLinks }],
        [
          { text: 'Discard', callback_data: Command.discardNote },
          { text: 'Save', callback_data: Command.saveNote },
        ],
      ],
    }
  }

  private getTagKeyboard() {
    // TODO: add pagination
    return {
      inline_keyboard: [
        [
          { text: 'Cancel', callback_data: Command.resetTags },
          { text: 'Save', callback_data: Command.saveTags },
        ],
        ...sampleTags.map(tag => [
          {
            text: this.pendingTags.has(tag) ? '✅ ' + tag : tag,
            callback_data: tagPrefix + tag,
          },
        ]),
      ],
    }
  }
}
