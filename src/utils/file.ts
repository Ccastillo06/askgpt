import { gray, green } from 'colorette'
import fs from 'fs/promises'
import type { Config } from '../types/config'
import type { Message } from '../types/message'
import { mergeTruthyObjectValues } from './objects'
import { getDataPath } from './ospath'

export const getConfigFilePath = () => {
  const pathToSave = getDataPath()
  return `${pathToSave}/.askgptconfig`
}

export const getHistoryFolderPath = async () => {
  const pathToSave = getDataPath()
  const path = `${pathToSave}/askgpt_history`

  try {
    await fs.mkdir(path)
  } catch {}

  return path
}

export const getFilenameFromMessage = (message: string) => {
  const today = new Date()
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  const formattedMessage = message.replace(/[^\w]/g, ' ').replace(/\s+/g, ' ')

  const filename = `${date}_${formattedMessage}`
    .slice(0, 50)
    .trim()
    .split(' ')
    .join('_')
    .toLowerCase()

  return filename
}

export const readConfigFile = async (hideWarning = false): Promise<Config> => {
  try {
    const configPath = getConfigFilePath()
    const config = JSON.parse((await fs.readFile(configPath)).toString())
    return config as Config
  } catch (err) {
    if (!hideWarning) {
      console.log(gray(`Config file does not exist, configure it first with --config`))
    }

    return {}
  }
}

export const writeConfigFile: (newConfig: Config) => Promise<void> = async (newConfig) => {
  try {
    const configPath = getConfigFilePath()
    const currentConfig = await readConfigFile(true)
    const jsonConfig = JSON.stringify(
      mergeTruthyObjectValues<Config>(currentConfig, newConfig),
      null,
      2
    )

    await fs.writeFile(configPath, jsonConfig)
    console.log(green(`Saved your config in ${configPath}`))
  } catch (err) {}
}

export const saveQuestionInHistory = async (
  message: string,
  response = '',
  tokensUsed = 0,
  totalCost = 0
) => {
  const content: Message = {
    message,
    response,
    tokensUsed,
    totalCost
  }

  const historyPath = await getHistoryFolderPath()
  const messageAsFilename = getFilenameFromMessage(message)
  const filePath = `${historyPath}/${messageAsFilename}.json`
  await fs.writeFile(filePath, JSON.stringify(content, null, 2))
  console.log(green(`Saved response in your history. Path: ${filePath}`))
}

export const readQuestionsHistory = async (): Promise<[string[], string]> => {
  const historyPath = await getHistoryFolderPath()
  const dirFiles = await fs.readdir(historyPath)

  return [dirFiles, historyPath]
}
