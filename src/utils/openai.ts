import { red } from 'colorette'
import { Configuration, OpenAIApi } from 'openai'
import {
  ASSITANT_ANSWER,
  FULL_ASSISTANT_MESSAGE,
  Models,
  TOKENS_IN_INITIAL_MESSAGE,
  USER_QUESTION
} from '../constants'
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
      max_tokens: ((maxTokens ?? tokens) as number) - TOKENS_IN_INITIAL_MESSAGE,
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

    return {
      message: response.data.choices[0]?.message?.content.trim(),
      usage: response.data.usage
    }
  } catch (err: any) {
    console.log(red('OpenAI API error:'))
    console.log(err.response?.data || err.message)
    process.exit(1)
  }
}
