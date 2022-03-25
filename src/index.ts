import express from 'express'
import { BotApi } from './telegram/bot-api'
import { CommandHandler } from './telegram/command-handler'

const port = process.env.PORT || 3000
const botToken = process.env.BOT_TOKEN

const app = express()

const host = `559f-217-30-64-206.ngrok.io`
const botHookUrl = `https://${host}/telegram-hook?t=${botToken}`
const api = new BotApi(botToken, botHookUrl)
const tgHandler = new CommandHandler(api)

app.use(express.json())

app.post('/telegram-hook', async (req, res) => {
  const token = req.query.t
  if (token !== botToken) {
    return res.sendStatus(401)
  }

  // TODO: filter out users
  tgHandler.handle(req.body)
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log('Server started')
})
