import { red } from 'colorette'
import configHandler from './handlers/config'
import historyHandler from './handlers/history'
import messageHandler from './handlers/message'
import modelHandler from './handlers/model'
import pathHandler from './handlers/path'
import removeHandler from './handlers/remove'
import { getArgs } from './utils/commands'

const main = async () => {
  try {
    const {
      config,
      message,
      path,
      model,
      tokens: maxTokens,
      save,
      history,
      remove
    } = await getArgs()

    if (config) {
      await configHandler()
    } else if (path) {
      await pathHandler()
    } else if (model) {
      await modelHandler()
    } else if (history) {
      await historyHandler()
    } else if (remove) {
      await removeHandler()
    } else if (message) {
      await messageHandler(message, maxTokens, save)
    }
  } catch (err: any) {
    console.log(red('An error occurred and closed the process:'))
    console.log(err.message)
  }
}

main().finally(() => process.exit())
