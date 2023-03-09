import { Configuration, OpenAIApi } from 'openai'
import type { CreateCompletionResponseUsage } from 'openai'
import { MAX_TOKENS_PER_REQUEST, OPEN_AI_API_TOKEN } from './config'
import {
  ASSITANT_ANSWER,
  FULL_ASSISTANT_MESSAGE,
  Models,
  TOKENS_IN_INITIAL_MESSAGE,
  USER_QUESTION
} from './messages'

export interface AskGPTResponse {
  message: string
  usage?: CreateCompletionResponseUsage
}

export const askGpt = async (message: string) => {
  const configuration = new Configuration({
    apiKey: OPEN_AI_API_TOKEN
  })

  const openai = new OpenAIApi(configuration)

  try {
    const response = await openai.createChatCompletion({
      model: Models.CHATGPT,
      max_tokens: MAX_TOKENS_PER_REQUEST - TOKENS_IN_INITIAL_MESSAGE,
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
      message: (response.data.choices[0].message?.content ?? 'No answer provided by API')?.trim(),
      usage: response.data.usage
    }
  } catch (err: any) {
    console.error(err.response?.data || err.message)
  }
}
