import { red } from 'colorette'
import configHandler from './handlers/config'
import messageHandler from './handlers/message'
import modelHandler from './handlers/model'
import pathHandler from './handlers/path'
import { getArgs } from './utils/commands'

const main = async () => {
  try {
    const { config, message, path, model } = await getArgs()

    if (config) {
      await configHandler()
    } else if (path) {
      await pathHandler()
    } else if (model) {
      await modelHandler()
    } else if (message) {
      await messageHandler(message)
    }
  } catch (err: any) {
    console.log(red('An error occurred and closed the process:'))
    console.log(err.message)
  }
}

main().finally(() => process.exit())
