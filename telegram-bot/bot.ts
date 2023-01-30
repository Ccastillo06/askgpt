import TelegramBot from 'node-telegram-bot-api'
import { TELEGRAM_BOT_TOKEN } from './setup/config'
import { checkAllowlist, stopCommands } from './setup/middlewares'
import { askGpt } from './setup/openai'

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true })

bot.on('message', async (msg) => {
  try {
    const chatId = msg.chat.id
    const message = msg.text as string

    await checkAllowlist(bot, chatId)
    await stopCommands(message)

    const { message: response, usage } = await askGpt(msg.text as string)
    const totalTokens = usage?.total_tokens ?? 0
    const totalSpent = (totalTokens * 0.02) / 1000

    await bot.sendMessage(chatId, `*OpenAI says:*\n${response}`, {
      parse_mode: 'Markdown'
    })
    await bot.sendMessage(chatId, `*Approximate cost:*\n$${totalSpent}`, {
      parse_mode: 'Markdown'
    })
  } catch (err) {
    console.error(err)
  }
})
