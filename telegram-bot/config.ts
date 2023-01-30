import dotenv from 'dotenv'

dotenv.config()

if (!process.env.TELEGRAM_BOT_TOKEN)
  throw new Error('TELEGRAM_BOT_TOKEN env variable is mandatory, value not set.')
if (!process.env.OPEN_AI_API_TOKEN)
  throw new Error('OPEN_AI_API_TOKEN env variable is mandatory, value not set.')
if (!process.env.USER_TELEGRAM_ID)
  throw new Error('USER_TELEGRAM_ID env variable is mandatory, value not set.')
if (!process.env.MAX_TOKENS_PER_REQUEST)
  throw new Error('MAX_TOKENS_PER_REQUEST env variable is mandatory, value not set.')

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
export const OPEN_AI_API_TOKEN = process.env.OPEN_AI_API_TOKEN
export const USER_TELEGRAM_ID = Number(process.env.USER_TELEGRAM_ID)
export const MAX_TOKENS_PER_REQUEST = Number(process.env.MAX_TOKENS_PER_REQUEST)
