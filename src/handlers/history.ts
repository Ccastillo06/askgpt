import { blue, yellow } from 'colorette'
import fs from 'fs/promises'
import inquirer from 'inquirer'
import { Message } from '../types/message'
import { readQuestionsHistory } from '../utils/file'
import { displayGptMessage } from '../utils/terminal'

const historyHandler = async () => {
  const [questionFiles, historyPath] = await readQuestionsHistory()

  const { file } = await inquirer.prompt([
    {
      message: `Choose a file to read in your terminal, they are located in: ${historyPath}`,
      type: 'list',
      name: 'file',
      choices: questionFiles
    }
  ])

  console.log(blue(`Here's the content of the file ${file}`))
  const config = JSON.parse((await fs.readFile(`${historyPath}/${file}`)).toString()) as Message

  console.log(yellow('Question:'))
  console.log(config.message)

  displayGptMessage(config.response, config.tokensUsed, config.totalCost)
}

export default historyHandler
