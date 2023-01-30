import type TelegramBot from 'node-telegram-bot-api'
import { USER_TELEGRAM_ID } from './config'

export const checkAllowlist = async (bot: TelegramBot, chatId: number) => {
  if (USER_TELEGRAM_ID !== chatId) {
    await bot.sendMessage(
      chatId,
      'You are not authorized to use this bot. Create your own by checking the README at https://github.com/Ccastillo06/askgpt'
    )

    throw new Error('Unauthorized user')
  }
}

export const stopCommands = async (message: string) => {
  if (!message || message?.startsWith('/')) {
    throw new Error('Commands not supported')
  }
}
