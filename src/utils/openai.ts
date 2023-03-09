import { blue, red } from 'colorette'
import { Configuration, OpenAIApi } from 'openai'
import { ASSITANT_ANSWER, FULL_ASSISTANT_MESSAGE, Models, USER_QUESTION } from '../constants'
import { readConfigFile } from './file'

export const askGpt = async (message: string, maxTokens?: number) => {
  const { apiKey, model, tokens } = await readConfigFile()

  if (!apiKey) throw new Error('API key not defined. Use --config command to set it up')

  const configuration = new Configuration({
    apiKey
  })

  const openai = new OpenAIApi(configuration)

  try {
    const response = await openai.createChatCompletion({
      model: model as Models,
      max_tokens: (maxTokens ?? tokens) as number,
      messages: [
        {
          role: 'system',
          content: FULL_ASSISTANT_MESSAGE
        },
        {
          role: 'user',
          content: USER_QUESTION
        },
        {
          role: 'assistant',
          content: ASSITANT_ANSWER
        },
        { role: 'user', content: message }
      ],
      temperature: 0.5
    })

    console.log(blue('All answers obtained:'))
    const choices = response.data.choices.map(({ message }) => message?.content.trim())
    choices.forEach((choice) => console.log(`> ${choice}`))

    return {
      message: choices[0],
      usage: response.data.usage
    }
  } catch (err: any) {
    console.log(red('OpenAI API error:'))
    console.log(err.response?.data || err.message)
    process.exit(1)
  }
}
