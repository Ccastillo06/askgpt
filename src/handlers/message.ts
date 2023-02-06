import { yellow } from 'colorette'
import inquirer from 'inquirer'
import { saveQuestionInHistory } from '../utils/file.js'
import { askGpt } from '../utils/openai.js'
import { displayGptMessage } from '../utils/terminal.js'

const messageHandler = async (_message: string, maxTokens?: number, save = false) => {
  const { message } = await inquirer.prompt([
    {
      message: 'What do you want to ask?',
      type: 'input',
      name: 'message'
    }
  ])

  console.log(yellow(`Asking GPT... ${message}`))
  const { message: response, usage } = await askGpt(message, maxTokens)
  const totalTokens = usage?.total_tokens ?? 0
  const totalSpent = (totalTokens * 0.02) / 1000

  displayGptMessage(response, totalTokens, totalSpent)

  if (save) {
    await saveQuestionInHistory(message, response, totalTokens, totalSpent)
  }
}

export default messageHandler
