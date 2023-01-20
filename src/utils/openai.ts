import { red } from 'colorette'
import { Configuration, OpenAIApi } from 'openai'
import { readConfigFile } from './file'

export const askGpt = async (message: string) => {
  const { apiKey } = await readConfigFile()

  if (!apiKey) throw new Error('API key not defined. Use --config command to set it up')

  const configuration = new Configuration({
    apiKey
  })

  const openai = new OpenAIApi(configuration)

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      temperature: 0.9,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: '4'
    })

    return {
      message: response.data.choices[0].text?.trim(),
      usage: response.data.usage
    }
  } catch (err: any) {
    console.log(red('OpenAI API error:'))
    console.log(err.response?.data || err.message)
    process.exit(1)
  }
}
