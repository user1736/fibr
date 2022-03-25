import { BotApi } from './bot-api'
import { isCallbackQueryUpdate, isMessageUpdate, Update } from './types/update'

type WorkflowState = 'Idle' | 'NewNote'

export class CommandHandler {
  private state: WorkflowState = 'Idle'

  constructor(private api: BotApi) {}

  public handle(update: Update) {
    if (isMessageUpdate(update)) {
      switch (this.state) {
        case 'Idle':
          this.state = 'NewNote'
          /**
           * TODO:
           *
           * - Create a new note
           * - Send confirmation message with buttons to tag/link.capture new note
           */
          break
      }

      return
    }

    if (isCallbackQueryUpdate(update)) {
      // TODO: update initial message using editMessageText/editMessageReplyMarkup
      return
    }
  }
}
