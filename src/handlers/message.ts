import { yellow } from 'colorette'
import { saveQuestionInHistory } from '../utils/file.js'
import { askGpt } from '../utils/openai.js'
import { displayGptMessage } from '../utils/terminal.js'

const messageHandler = async (message: string, maxTokens?: number, save = false) => {
  console.log(yellow('Asking GPT...'))
  const { message: response, usage } = await askGpt(message, maxTokens)
  const totalTokens = usage?.total_tokens ?? 0
  const totalSpent = (totalTokens * 0.02) / 1000

  displayGptMessage(response, totalTokens, totalSpent)

  if (save) {
    await saveQuestionInHistory(message, response, totalTokens, totalSpent)
  }
}

export default messageHandler
