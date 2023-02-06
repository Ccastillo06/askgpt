import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import type { Arguments } from '../types/arguments'

export const getArgs = async (): Promise<Arguments> => {
  const { argv } = await yargs(hideBin(process.argv))
    .option('message', {
      alias: 'm',
      description: 'Send a message OpenAI API',
      type: 'boolean'
    })
    .option('config', {
      alias: 'c',
      description: 'Run configuration setup',
      type: 'boolean'
    })
    .option('path', {
      alias: 'p',
      description: 'Shows the path where your config file is saved',
      type: 'boolean'
    })
    .option('model', {
      alias: 'd',
      description: 'Shows the current model being used by OpenAI API',
      type: 'boolean'
    })
    .option('tokens', {
      alias: 't',
      description: 'Number of max. tokens you want for this request only',
      type: 'number'
    })
    .option('save', {
      alias: 's',
      description: 'Saves the current request payload to a JSON file',
      type: 'boolean'
    })
    .option('history', {
      alias: 'h',
      description: 'Lists all saved files and READS one of them',
      type: 'boolean'
    })
    .option('remove', {
      alias: 'r',
      description: 'List all saved files and DELETES the one chosen',
      type: 'boolean'
    })

  return argv as Arguments
}
