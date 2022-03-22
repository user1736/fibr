import express from 'express'
import { TgBotApi } from './services/tg-bot-api'

const port = process.env.PORT || 3000
const appName = process.env.WEBSITE_SITE_NAME
const botToken = process.env.BOT_TOKEN

const app = express()

const botHookUrl = `https://${appName}.azurewebsites.net/telegram-hook?t=${botToken}`
const api = new TgBotApi(botToken, botHookUrl)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Lailai!')
})

app.post('/telegram-hook', async (req, res) => {
  const token = req.query.t
  if (token !== botToken) {
    console.log('server#telegram-hook-forbidden')
    return res.sendStatus(401)
  }

  console.log(req.body)
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log('lailai')
})
