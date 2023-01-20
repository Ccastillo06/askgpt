import path from 'path'
import os from 'os'

const home = () => {
  if ('homedir' in os) return os.homedir()

  switch (process.platform) {
    case 'win32':
      return path.resolve(process.env.USERPROFILE as string)
    default:
      return path.resolve(process.env.HOME as string)
  }
}

export const getDataPath = () => {
  switch (process.platform) {
    case 'win32':
      return path.resolve(process.env.APPDATA as string)
    case 'darwin':
      return path.resolve(path.join(home.call(this), 'Library/Application Support/'))
    default:
      return process.env.XDG_CONFIG_HOME
        ? path.resolve(process.env.XDG_CONFIG_HOME)
        : path.resolve(path.join(home.call(this), '.config/'))
  }
}
