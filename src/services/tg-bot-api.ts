import axios from 'axios'

/**
 * Client for Telegram Bot API
 * {@link https://core.telegram.org/api}
 */
export class TgBotApi {
  private readonly apiUrl: string

  /**
   * Creates an api client instance
   *
   * @param token - bot token received from BotFather
   * @param webhookUrl - url of the deployed instance
   */
  constructor(token: string, webhookUrl: string) {
    this.apiUrl = `https://api.telegram.org/bot${token}/`

    console.log('TgBotAPI#settingWebHook')
    axios
      .post(this.apiUrl + 'setWebhook', {
        url: webhookUrl,
      })
      .then(res => {
        const isOk = res.status >= 200 && res.status < 300
        isOk
          ? console.log('TgBotAPI#webHookSet')
          : console.error('TgBotAPI#webHookSetFailure', res.data)
      })
  }
}
