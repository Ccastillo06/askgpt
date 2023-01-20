import { red } from 'colorette'
import fs from 'fs/promises'
import inquirer from 'inquirer'
import { readQuestionsHistory } from '../utils/file'

const removeHandler = async () => {
  const [questionFiles, historyPath] = await readQuestionsHistory()

  const { file } = await inquirer.prompt([
    {
      message: `Choose a file to read in your terminal, they are located in: ${historyPath}`,
      type: 'list',
      name: 'file',
      choices: questionFiles
    }
  ])

  console.log(red(`Removing file: ${file}`))
  await fs.rm(`${historyPath}/${file}`)
}

export default removeHandler
