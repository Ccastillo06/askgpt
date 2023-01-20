import inquirer from 'inquirer'
import type { Config } from '../types/config'
import { writeConfigFile } from '../utils/file'

const configHandler = async () => {
  const responses = await inquirer.prompt([
    {
      message: 'Introduce your OpenAI API key:',
      type: 'input',
      name: 'apiKey'
    }
  ])

  await writeConfigFile(responses as Config)
}

export default configHandler
