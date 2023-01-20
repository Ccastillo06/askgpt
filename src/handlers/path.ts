import { green } from 'colorette'
import { getConfigFilePath } from '../utils/file'

const pathHandler = async () => {
  console.log(green(`Your config file is in ${getConfigFilePath()}`))
}

export default pathHandler
