import { blue } from 'colorette'
import inquirer from 'inquirer'
import { Models } from '../constants'
import type { Config } from '../types/config'
import { writeConfigFile } from '../utils/file'

const configHandler = async () => {
  console.log(
    blue('To keep actual values in any of the options press Enter without typing anything:')
  )

  const responses = await inquirer.prompt([
    {
      message: 'Introduce your OpenAI API key:',
      type: 'input',
      name: 'apiKey'
    },
    {
      message:
        'Daily budget spend on tokens for AskGPT? See https://openai.com/api/pricing/ for more info',
      type: 'number',
      name: 'tokens'
    },
    {
      message:
        'Which model do you want to use? (Davinci is the most powerful but costs more, Ada is the fastest and cheapest model but is not as powerful). More info here https://platform.openai.com/docs/models/overview',
      type: 'list',
      name: 'model',
      choices: [
        { name: 'Davinci ($0.02 per 1K tokens)', value: Models.DAVINCI },
        { name: 'Curie ($0.002 per 1K tokens)', value: Models.CURIE },
        { name: 'Babbage ($0.0005 per 1K tokens)', value: Models.BABBAGE },
        { name: 'Ada ($0.0004 per 1K tokens)', value: Models.ADA }
      ]
    }
  ])

  console.log(blue('Setting up your new configuration settings...'))
  await writeConfigFile(responses as Config)
}

export default configHandler
