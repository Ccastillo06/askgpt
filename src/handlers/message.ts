import { yellow } from 'colorette'
import { askGpt } from '../utils/openai.js'
import { displayGptMessage } from '../utils/terminal.js'

const messageHandler = async (message: string) => {
  console.log(yellow('Asking GPT...'))
  const response = await askGpt(message)
  displayGptMessage(response.message, response.usage?.total_tokens)
}

export default messageHandler
