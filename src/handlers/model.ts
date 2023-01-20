import { green } from 'colorette'
import { readConfigFile } from '../utils/file'

const modelHandler = async () => {
  const { model } = await readConfigFile()
  console.log(green(`askGpt is currently using ${model} model`))
}

export default modelHandler
