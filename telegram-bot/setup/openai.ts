import { Configuration, OpenAIApi } from 'openai'
import { MAX_TOKENS_PER_REQUEST, OPEN_AI_API_TOKEN } from './config'

export const askGpt = async (message: string, maxTokens?: number) => {
  const configuration = new Configuration({
    apiKey: OPEN_AI_API_TOKEN
  })

  const openai = new OpenAIApi(configuration)

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      max_tokens: MAX_TOKENS_PER_REQUEST,
      prompt: message,
      temperature: 0.9,
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
    console.error(err.response?.data || err.message)
  }
}
