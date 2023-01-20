import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import type { Arguments } from '../types/arguments'

export const getArgs = async (): Promise<Arguments> => {
  const { argv } = await yargs(hideBin(process.argv))
    .option('message', {
      alias: 'm',
      description: 'Message to send to OpenAI API',
      type: 'string'
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

  return argv as Arguments
}
