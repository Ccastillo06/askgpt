import { red } from 'colorette'
import configHandler from './handlers/config'
import messageHandler from './handlers/message'
import { getArgs } from './utils/commands'

const main = async () => {
  try {
    const { config, message } = await getArgs()

    if (config) {
      await configHandler()
    } else if (message) {
      await messageHandler(message)
    }
  } catch (err: any) {
    console.log(red('An error occurred and closed the process:'))
    console.log(err.message)
  }
}

main().finally(() => process.exit())
