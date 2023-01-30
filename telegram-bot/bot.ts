import TelegramBot from 'node-telegram-bot-api'
import { TELEGRAM_BOT_TOKEN } from './setup/config'
import { checkAllowlist, sendBotMessage, stopCommands } from './setup/middlewares'
import { askGpt, AskGPTResponse } from './setup/openai'

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true })

bot.on('message', async (msg) => {
  try {
    const chatId = msg.chat.id
    const message = msg.text as string

    await checkAllowlist(bot, chatId)
    await stopCommands(message)

    const { message: response, usage } = (await askGpt(msg.text as string)) as AskGPTResponse
    const totalTokens = usage?.total_tokens ?? 0
    const totalSpent = (totalTokens * 0.02) / 1000

    await sendBotMessage(bot, chatId, `*OpenAI says:*\n${response}`)
    await sendBotMessage(bot, chatId, `*Approximate cost:*\n$${totalSpent}`)
  } catch (err) {
    console.error(err)
  }
})
